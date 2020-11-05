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
import Help from '../../pages/misc/Help/Help';
import Privacy from '../../pages/misc/Privacy/Privacy';
import About from '../../pages/misc/About/About';
import Team from '../../pages/misc/Team/Team';

const Main = (props) => {
    return (
        <div className={classes.main}>
            <Switch>
                <Route exact path="/" component={Landing} />
                <ProtectedRoute
                    path="/login"
                    rule={br.login}
                    routeTo="/dashboard"
                    component={SignIn}
                />
                <ProtectedRoute
                    path="/register"
                    rule={br.register}
                    routeTo="/dashboard"
                    component={SignUp}
                />
                <ProtectedRoute
                    path="/dashboard"
                    rule={br.dashboard}
                    routeTo="/login"
                    component={App}
                />
                <Route exact path="/privacy" component={Privacy} />
                <Route exact path="/about" component={About} />
                <Route exact path="/team" component={Team} />
                <Route exact path="/help" component={Help} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
};

export default Main;
