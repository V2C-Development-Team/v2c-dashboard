import React from 'react';
import { Switch, Route } from 'react-router-dom';
import classes from './Main.module.scss';
import Landing from '../../pages/Landing/Landing';
import SignIn from '../../pages/auth/SignIn';
import SignUp from '../../pages/auth/SignUp';
import NotFound from '../../pages/auth/NotFound';
import ProtectedRoute from '../../hoc/ProtectedRoute';
import App from '../../app/App';
import br from '../../whoami/businessRules';

const Main = (props) => {
    return (
        <div className={classes.main}>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/register" component={SignUp} />
                <ProtectedRoute
                    path="/dashboard"
                    rule={br.dashboard}
                    routeTo="/login"
                    component={App}
                />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default Main;
