const {
    getAnswerForQuestion,
    loadChatHistory,
    sendMessage
} = require('../db/elasticsearch');
const {Server} = require('socket.io');
const {friendlify} = require('../bot/attitude');
const DadJokes = require('dadjokes-wrapper');


const avatarsNames = [
    "beam",
    "marble",
    "pixel",
    "ring",
    "sunset",
    "bauhaus"
];

const clients = {};
const avatars = {};
const botName = 'Bot';
const botAvatar = `https://api.dicebear.com/5.x/bottts/svg?seed=Midnight?size=32`;

/**@type {Server} */
let io;

/**
 * Initialize socket server
 * @param httpServer
 */
function initSocketServer(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: true,
            methods: ['GET', 'POST', 'PUT']
        }
    });

    io.on('connection', onConnection);
}

/**
 * On connection event handler
 * @param socket
 * @returns {Promise<void>}
 */
async function onConnection(socket) {
    try {
        const {username} = socket.handshake.query;

        if (!username) {
            console.error('User tried to connect without username');
        }

        if (Object.values(clients).includes(username)) {
            socket.emit('usernameTaken', username);
        }

        const avatarName =
            avatarsNames[Math.floor(Math.random() * avatarsNames.length)];
        avatars[username] = `https://source.boringavatars.com/${avatarName}/15/${username}`;

        io.emit('request_avatar_response', {avatars: avatars});

        clients[socket.id] = username;
        console.log(`User ${username} has joined! Users: ${Object.values(clients)}`);

        const messages = await loadChatHistory();
        socket.emit('getHistory', {messages});
        io.emit('onlineUsers', {users: Object.values(clients)});

        socket.on('disconnect', () => onDisconnect(socket));


        socket.on('message', (content, timestamp) =>
            onMessage(socket, content, timestamp));
    } catch (error) {
        console.error('Got error in socket server: ', error);
        throw error;
    }
}

/**
 * On disconnect
 * @param socket
 * @returns {Promise<void>}
 */
async function onDisconnect(socket) {
    const user = clients[socket.id];

    delete clients[socket.id];

    console.log(`User ${user} disconnected. Users: ${Object.values(clients)}`);
    io.emit('onlineUsers', {users: Object.values(clients)});
}


/**
 * Send message to all users
 * @param socket
 * @param content
 * @param timestamp
 * @returns {Promise<void>}
 */
async function onMessage(socket, content, timestamp) {
    io.emit('message', clients[socket.id], content, timestamp);
    await sendMessage(avatars[clients[socket.id]], clients[socket.id], content, timestamp);

    if (content?.includes('?')) {
        await onQuestionMessage(content);
    }

    if (content?.includes('bot tell me a joke')) {
        await onJokeMessage();
    }
}

/**
 * Send bot message with an answer to a question
 * @param content
 * @returns {Promise<void>}
 */
async function onQuestionMessage(content) {
    const possibleAnswer = await getAnswerForQuestion(content);

    if (!avatars[botName]) {
        avatars[botName] = botAvatar;
        io.emit('request_avatar_response', {avatars: avatars});
    }

    if (possibleAnswer) {
        const botMessage = friendlify(possibleAnswer.content);
        const dateNow = new Date();
        await sendBotMessage(botMessage, dateNow);
    }
}

/**
 * Send bot message with a dad joke event handler
 * @returns {Promise<void>}
 */
async function onJokeMessage() {
    const dj = new DadJokes();

    try {
        const botMessage = await dj.randomJoke();
        const dateNow = new Date();

        if (!avatars[botName]) {
            avatars[botName] = botAvatar;
            io.emit('request_avatar_response', {avatars: avatars});
        }

        await sendBotMessage(botMessage, dateNow);
    } catch (err) {
        console.error(err);
    }
}

/**
 * Generic send bot message function
 * @param content
 * @param timestamp
 * @returns {Promise<void>}
 */
async function sendBotMessage(content, timestamp) {
    await sendMessage(botAvatar, botName, content, timestamp);
    io.emit('message', botName, content, timestamp);
}

module.exports = {initSocketServer};
