export const stateEnum = { CONNECTING: 0, OPEN: 1, CLOSING: 2, CLOSED: 3 };
Object.freeze(stateEnum);

let socket = new WebSocket(process.env.REACT_APP_WS_URL);

const appName = 'DASHBOARD';
const pocName = 'DESKTOP';
const eavesDrop = true;

export const reconnect = () => new WebSocket(process.env.REACT_APP_WS_URL);

export const wsRegister = (ws) => {
    if (ws.readyState === stateEnum.OPEN) {
        // register listener when connection is established
        ws.send(
            JSON.stringify({
                action: 'REGISTER_LISTENER',
                app: appName,
                eavesdrop: eavesDrop,
            })
        );

        // setup and route gaming poc commands
        ws.send(
            JSON.stringify({
                action: 'REGISTER_LISTENER',
                app: pocName,
                eavesdrop: false,
            })
        );

        ws.addEventListener('message', (event) => {
            const payload = JSON.parse(event.data);
            console.log(payload);
            // if message is for gaming call the available fn
            if (
                payload?.recipient &&
                payload.recipient.toLowerCase() === pocName.toLowerCase()
            ) {
                const gameStationEl = document.getElementById('game-station');
                const message = payload.command || '';
                console.log(`pocMessage will be => ${message}`);
                if (gameStationEl) {
                    try {
                        gameStationEl.contentWindow.postMessage(message);
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        });
    }

    ws.send(
        JSON.stringify({
            action: 'DISPATCH_COMMAND',
            command: 'move right',
        })
    );
};

export const wsDeregister = (ws) => {
    if (ws.readyState === stateEnum.OPEN) {
        ws.send(
            JSON.stringify({
                action: 'DEREGISTER_LISTENER',
                app: appName,
            })
        );
    }
};

export default socket;
