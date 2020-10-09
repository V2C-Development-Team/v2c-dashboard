import React from 'react';
import classes from './Dashboard.module.scss';
import Home from '../../pages/Home/Home';
import { Switch, Route } from 'react-router-dom';
import Metrics from '../../pages/Metrics/Metrics';
import Dispatcher from '../../pages/Dispatcher/Dispatcher';
import Sessions from '../../pages/Sessions/Sessions';

const Dashboard = (props) => {
    return (
        <div className={classes.dashboard}>
            <main className={classes.main}>
                <Switch>
                    <Route path="/dashboard/metrics">
                        <Metrics />
                    </Route>
                    <Route exact path="/dashboard/dispatcher">
                        <Dispatcher
                            themeColor={props.themeColor}
                            setThemeColor={props.setThemeColor}
                        />
                    </Route>
                    <Route exact path="/dashboard/sessions">
                        <Sessions
                            themeColor={props.themeColor}
                            setThemeColor={props.setThemeColor}
                        />
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
