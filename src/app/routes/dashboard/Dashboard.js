import React from 'react';
import classes from './Dashboard.module.scss';
import Home from '../../pages/Home/Home';
import { Switch, Route } from 'react-router-dom';
import Metrics from '../../pages/Metrics/Metrics';
import Dispatcher from '../../pages/Dispatcher/Dispatcher';
import Sessions from '../../pages/Sessions/Sessions';
import Actions from '../../pages/Actions/Actions';

const Dashboard = (props) => {
    return (
        <div className={classes.dashboard}>
            <main className={classes.main}>
                <Switch>
                    <Route path="/dashboard/metrics" component={Metrics} />
                    <Route
                        exact
                        path="/dashboard/dispatcher"
                        component={Dispatcher}
                    />
                    <Route
                        exact
                        path="/dashboard/sessions"
                        component={Sessions}
                    />
                    <Route
                        exact
                        path="/dashboard/actions"
                        component={Actions}
                    />
                    <Route>
                        <Home />
                    </Route>
                </Switch>
            </main>
        </div>
    );
};

export default Dashboard;
