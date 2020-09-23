import React from 'react';
import classes from './Dashboard.module.scss';
import Home from '../pages/Home/Home';

const Dashboard = () => {
    return (
        <div className={classes.dashboard}>
            <main className={classes.main}>
                <Home />
            </main>
        </div>
    );
};

export default Dashboard;
