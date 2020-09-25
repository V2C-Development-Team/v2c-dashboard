import React, { useState } from 'react';
import classes from './Layout.module.scss';
// import App from '../../app/App';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { AuthContext } from '../../context/authContext';
import auth from '../../whoami/auth';

const Layout = (props) => {
    const [isAuth, setIsAuth] = useState(auth.authenticated);
    return (
        <AuthContext.Provider
            value={{ isAuthenticated: isAuth, setIsAuthenticated: setIsAuth }}
        >
            <div className={classes.layout}>
                <Main setAuthState={setIsAuth} />
                {/* <App /> */}
            </div>
        </AuthContext.Provider>
    );
};

export default Layout;
