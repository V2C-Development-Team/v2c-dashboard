import React from 'react';
import Dashboard from './routes/dashboard/Dashboard';
import classes from './App.module.scss';
import { Paper } from '@material-ui/core';
import NavBar from './components/NavBar/NavBar';
import InfoBar from './components/InfoBar/InfoBar';

const App = (props) => {
    return (
        <div className={classes.app}>
            <Paper square elevation={0} className={classes.paper}>
                <NavBar />
                <Dashboard
                    themeColor={props.themeColor}
                    setThemeColor={props.setThemeColor}
                />
                <InfoBar />
            </Paper>
        </div>
    );
};

export default App;
