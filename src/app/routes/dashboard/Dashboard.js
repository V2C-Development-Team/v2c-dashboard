import React from 'react';
import classes from './Dashboard.module.scss';
import Home from '../../pages/Home/Home';
import { Switch, Route } from 'react-router-dom';
import Metrics from '../../pages/Metrics/Metrics';
import Dispatcher from '../../pages/Dispatcher/Dispatcher';

const Dashboard = (props) => {
    return (
        <div className={classes.dashboard}>
            <main className={classes.main}>
                <Switch>
                    <Route exact path="/metrics">
                        <Metrics
                            themeColor={props.themeColor}
                            setThemeColor={props.setThemeColor}
                        />
                    </Route>
                    <Route exact path="/dispatcher">
                        <Dispatcher
                            themeColor={props.themeColor}
                            setThemeColor={props.setThemeColor}
                        />
                    </Route>
                    <Route>
                        <Home
                            themeColor={props.themeColor}
                            setThemeColor={props.setThemeColor}
                        />
                    </Route>
                </Switch>
            </main>
        </div>
    );
};

export default Dashboard;
