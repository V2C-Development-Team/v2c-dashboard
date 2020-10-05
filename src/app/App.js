import React, { useContext, useEffect } from 'react';
import Dashboard from './routes/dashboard/Dashboard';
import classes from './App.module.scss';
import { Paper } from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';
import { AuthContext } from '../context/authContext';
import socket, { wsRegister, wsDeregister } from '../services/websocket';

const App = (props) => {
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        setIsAuthenticated(true);
    }, [setIsAuthenticated]);

    // handle ws connections onMount & onUnMount
    useEffect(() => {
        socket.addEventListener('open', wsRegister);
        socket.addEventListener('close', wsDeregister);

        return () => {
            socket.close();
        };
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
