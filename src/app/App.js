import React, { useContext, useEffect } from 'react';
import Dashboard from './routes/dashboard/Dashboard';
import classes from './App.module.scss';
import { Paper } from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';
import { AuthContext } from '../context/authContext';

const App = (props) => {
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        setIsAuthenticated(true);
    }, [setIsAuthenticated]);

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
