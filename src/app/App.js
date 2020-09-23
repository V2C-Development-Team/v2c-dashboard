import React from 'react';
import Dashboard from './dashboard/Dashboard';
import classes from './App.module.scss';
import { Paper } from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';

const App = () => {
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
