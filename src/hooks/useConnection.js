import { useState, useEffect, useCallback } from 'react';
import { useSnackbar } from 'notistack';
// import { Button } from '@material-ui/core';
import socket, {
    wsRegister,
    wsDeregister,
    reconnect,
} from '../services/websocket';

/* const action = (cb) => (
    <Button
        onClick={() => {
            cb();
        }}
        color="default"
    >
        Stay Offline
    </Button>
); */

let ws = socket;
export const useConnection = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [isConnected, setIsConnected] = useState(false);
    const [attempt, setAttempt] = useState(1);

    // handle ws connections onMount & onUnMount

    const connectListener = useCallback(() => {
        ws.addEventListener('open', () => {
            wsRegister(ws);
            setIsConnected(true);
            setAttempt(1);
            enqueueSnackbar('DASHBOARD connected', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                preventDuplicate: true,
            });
        });
    }, [enqueueSnackbar]);

    const disconnectListener = useCallback(() => {
        ws.addEventListener('close', () => {
            wsDeregister(ws);
            setIsConnected(false);
            enqueueSnackbar('Not connected', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                preventDuplicate: true,
            });
        });
    }, [enqueueSnackbar]);

    const resuscitate = useCallback(() => {
        ws = reconnect();
        connectListener();
        disconnectListener();
        setAttempt((attempt) => attempt + 1);
        enqueueSnackbar(`Reconnecting... ${attempt} of 3`, {
            variant: 'warning',
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
            },
            preventDuplicate: true,
        });
    }, [attempt, connectListener, disconnectListener, enqueueSnackbar]);

    useEffect(() => {
        connectListener();
        disconnectListener();
        return () => {
            ws.close();
        };
    }, [connectListener, disconnectListener]);

    useEffect(() => {
        let interval = null;
        if (isConnected === false) {
            if (attempt <= 3) {
                interval = setInterval(() => {
                    resuscitate();
                }, 7000);
            }
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [attempt, isConnected, resuscitate]);

    return [isConnected];
};

export default useConnection;
