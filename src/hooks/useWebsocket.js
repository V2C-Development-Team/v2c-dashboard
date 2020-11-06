import { useState, useEffect, useCallback } from 'react';
import socket, { stateEnum } from '../services/websocket';

const conn = {};

export const useWebsocket = ({
    subscription,
    subscribe = true,
    allowBroadcast = false,
    allowVerbose = false,
    onMessage,
    onCommand,
}) => {
    const [isSubscribed, setIsSubscribed] = useState(subscribe);

    const filterMessage = useCallback(
        (rawPayload) => {
            const payload = JSON.parse(rawPayload);
            // console.log(payload)
            if (allowVerbose && isSubscribed === true) {
                onMessage(JSON.stringify(payload));
            }
            if (
                (allowBroadcast &&
                    isSubscribed === true &&
                    !payload.recipient) ||
                (payload.recipient === subscription && isSubscribed === true)
            ) {
                if (payload.action === 'ROUTE_COMMAND') {
                    if (onCommand) onCommand(payload.command);
                } else {
                    onMessage(payload?.message?.message);
                }
            }
        },
        [
            allowVerbose,
            isSubscribed,
            allowBroadcast,
            subscription,
            onMessage,
            onCommand,
        ]
    );

    conn.dispatchMessage = (message, recipient = '', machine = '') => {
        if (socket.readyState === stateEnum.OPEN) {
            socket.send(
                JSON.stringify({
                    action: 'DISPATCH_MESSAGE',
                    message,
                    machine,
                    recipient,
                })
            );
        }
    };
    conn.dispatchCommand = (command) => {
        if (socket.readyState === stateEnum.OPEN) {
            socket.send(
                JSON.stringify({
                    action: 'DISPATCH_COMMAND',
                    command,
                })
            );
        }
    };
    conn.config = (config = {}, app = '') => {
        if (socket.readyState === stateEnum.OPEN) {
            socket.send(
                JSON.stringify({
                    action: 'UPDATE_CONFIGURATION',
                    config,
                    app,
                })
            );
        }
    };

    conn.subscribe = () => {
        setIsSubscribed(true);
    };
    conn.unsubscribe = () => {
        setIsSubscribed(false);
        socket.removeEventListener('message', filterMessage);
    };

    /*     const route = (message, sender, recipient = '') => {
    if (socket.readyState === stateEnum.OPEN) {
        socket.send(
            JSON.stringify({
                action: 'ROUTE_MESSAGE',
                message,
                sender,
                recipient,
            })
        );
    }
}; */

    useEffect(() => {
        // update the message state when onMessage
        socket.addEventListener('message', (event) => {
            filterMessage(event.data);
        });
    }, [filterMessage]);

    return [conn];
};
