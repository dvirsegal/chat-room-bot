import config from '../config';

let socket, events = {};

export function connect(user) {
    socket = io(
        config.socketUrl,
        {
            query: {username: user},
            extraHeaders: {
                "Access-Control-Allow-Origin": "*"
            }
        }
    );

    socket.onAny((eventName, ...args) => {
        events[eventName]?.map((cb) => cb(args));
    });
}

/**
 * Register an event listener to the socket.
 *
 * @param {String} event
 * @param {Function} callback
 * @returns {Function} unsubscribe function
 */
export function registerToSocket(event, callback) {
    if (!events[event]) {
        events[event] = [];
    }

    events[event].push(callback);

    return () => {
        events[event].splice(
            events[event].indexOf(callback),
            1
        );
    };
}

export function sendMessage(message) {
    socket.emit('message', message, new Date());
}
