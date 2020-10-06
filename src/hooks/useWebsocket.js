import { useState, useEffect, useCallback } from 'react';
import socket, { stateEnum } from '../services/websocket';

const conn = {};

export const useWebsocket = ({
    subscription,
    subscribe = true,
    allowBroadcast = false,
    allowVerbose = false,
}) => {
    const [messages, setMessages] = useState([]);
    const [isSubscribed, setIsSubscribed] = useState(subscribe);

    const filterMessage = useCallback(
        (rawPayload) => {
            const payload = JSON.parse(rawPayload);
            if (allowVerbose && isSubscribed === true) {
                setMessages((messages) => [
                    ...messages,
                    JSON.stringify(payload),
                ]);
            }
            if (
                (allowBroadcast &&
                    isSubscribed === true &&
                    !payload.recipient) ||
                (payload.recipient === subscription && isSubscribed === true)
            ) {
                setMessages((messages) => [
                    ...messages,
                    payload?.message?.message,
                ]);
            }
        },
        [isSubscribed, allowBroadcast, allowVerbose, subscription]
    );

    conn.dispatch = (message, recipient = '', machine = '') => {
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

    return [messages, conn];
};
