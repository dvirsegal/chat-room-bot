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

                console.log(
                    `User ${user} disconnected. Users: ${Object.values(clients)}`
                );
                io.emit('onlineUsers', {users: Object.values(clients)});
            });

            socket.on('message', async (content, timestamp) => {
                io.emit('message', clients[socket.id], content, timestamp);
                await sendMessage(clients[socket.id], content, timestamp);

                // If message is a question, try to get an answer from Bot with attitude
                if (content?.includes('?')) {
                    const possibleAnswer = await getAnswerForQuestion(content);

                    if (possibleAnswer) {
                        const botMessage = friendlify(possibleAnswer.content);
                        const dateNow = new Date();

                        await sendMessage('Bot', botMessage, dateNow);
                        io.emit('message', 'Bot', botMessage, dateNow);
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
