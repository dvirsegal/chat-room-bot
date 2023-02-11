const {
    getAnswerForQuestion,
    loadChatHistory,
    sendMessage
} = require('../db/elasticsearch');
const {Server} = require('socket.io');
const {friendlify} = require('../bot/attitude');

/**@type {Server} */
let io;

const clients = {};
const avatars = {};
const botName = 'Bot';
const botAvatar = `https://api.dicebear.com/5.x/bottts/svg?seed=Midnight?size=32`;

/**
 * Initialize socket server
 * Exception is thrown if user tries to connect without username
 * @param httpServer
 */
function initSocketServer(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: true,
            methods: ['GET', 'POST', 'PUT']
        }
    });

    io.on('connection', async (socket) => {
        try {
            const {username} = socket.handshake.query;

            if (!username) {
                console.log('User tried to connect without username');
            }

            if (Object.values(clients).includes(username)) {
                socket.emit('usernameTaken', username);
            }

            const avatarsNames = [
                "beam",
                "marble",
                "pixel",
                "ring",
                "sunset",
                "bauhaus"
            ];
            avatars[username] = ["https://source.boringavatars.com/",
                avatarsNames[Math.floor(Math.random() * avatarsNames.length)], "/15", "/" + username].join('');
            io.emit('request_avatar_response', {avatars: avatars});


            clients[socket.id] = username;
            console.log(
                `User ${username} has joined! Users: ${Object.values(clients)}`
            );

            const messages = await loadChatHistory();
            socket.emit('getHistory', {messages});
            io.emit('onlineUsers', {users: Object.values(clients)});

            socket.on('disconnect', () => {
                const user = clients[socket.id];

                delete clients[socket.id];

                delete avatars[user];

                console.log(
                    `User ${user} disconnected. Users: ${Object.values(clients)}`
                );
                io.emit('onlineUsers', {users: Object.values(clients)});
            });

            socket.on('message', async (content, timestamp) => {
                io.emit('message', clients[socket.id], content, timestamp);
                await sendMessage(avatars[clients[socket.id]], clients[socket.id], content, timestamp);

                // If message is a question, try to get an answer from Bot with attitude
                if (content?.includes('?')) {
                    const possibleAnswer = await getAnswerForQuestion(content);
                    
                    if (!avatars[botName]) {
                        avatars[botName] = botAvatar;
                    }
                    io.emit('request_avatar_response', {avatars: avatars});

                    if (possibleAnswer) {
                        const botMessage = friendlify(possibleAnswer.content);
                        const dateNow = new Date();

                        await sendMessage(botAvatar, botName, botMessage, dateNow);
                        io.emit('message', botName, botMessage, dateNow);
                    }
                }
            });
        } catch (error) {
            console.error("Got error in socket server: ", error);
            throw error;
        }
    });
}

module.exports = {initSocketServer};
