export const stateEnum = { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 };
Object.freeze(stateEnum);

let socket = new WebSocket(process.env.REACT_APP_WS_URL);

const appName = 'DASHBOARD';
const eavesDrop = true;

export const reconnect = () => new WebSocket(process.env.REACT_APP_WS_URL);

export const wsRegister = () => {
    if (socket.readyState === stateEnum.OPEN) {
        // register listener when connection is established
        socket.send(
            JSON.stringify({
                action: 'REGISTER_LISTENER',
                app: appName,
                eavesdrop: eavesDrop,
            })
        );
    }
};

export const wsDeregister = () => {
    if (socket.readyState === stateEnum.OPEN) {
        socket.send(
            JSON.stringify({
                action: 'DEREGISTER_LISTENER',
                app: appName,
            })
        );
    }
};

export default socket;
