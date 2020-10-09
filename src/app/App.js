import React, { useContext, useEffect } from 'react';
import Dashboard from './routes/dashboard/Dashboard';
import classes from './App.module.scss';
import { useSnackbar } from 'notistack';
import { Button, Paper } from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';
import { AuthContext } from '../context/authContext';
import socket, { wsRegister, wsDeregister } from '../services/websocket';

const App = (props) => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        setIsAuthenticated(true);
    }, [setIsAuthenticated]);

    const action = (key) => (
        <Button
            onClick={() => {
                closeSnackbar(key);
            }}
            color="default"
        >
            Stay Offline
        </Button>
    );

    // handle ws connections onMount & onUnMount
    useEffect(() => {
        socket.addEventListener('open', () => {
            wsRegister();
            enqueueSnackbar('DASHBOARD connected', {
                variant: 'success',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        });
        socket.addEventListener('close', () => {
            wsDeregister();
            enqueueSnackbar('Not connected', {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                action,
                persist: true,
            });
        });

        return () => {
            socket.close();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classes.app}>
            <Paper square elevation={0} className={classes.paper}>
                <NavBar />
                <Dashboard />
                <InfoBar />
            </Paper>
        </div>
    );
};

export default App;
