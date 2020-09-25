import React from 'react';
import classes from './Dashboard.module.scss';
import Home from '../../pages/Home/Home';
import { Switch, Route } from 'react-router-dom';
import Metrics from '../../pages/Metrics/Metrics';

const Dashboard = (props) => {
    return (
        <div className={classes.dashboard}>
            <main className={classes.main}>
                <Switch>
                    <Route path="/dashboard/metrics">
                        <Metrics />
                    </Route>
                    <Route>
                        <Home />
                    </Route>
                </Switch>
            </main>
        </div>
    );
};

export default Dashboard;
