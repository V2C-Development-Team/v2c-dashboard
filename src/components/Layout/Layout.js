import React, { useState } from 'react';
import classes from './Layout.module.scss';
// import App from '../../app/App';
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { AuthContext } from '../../context/authContext';
import { AppStateContext } from '../../context/appStateContext';
import auth from '../../whoami/auth';
import Commander from '../Commander/Commander';
import { useConnection } from '../../hooks/useConnection';

const Layout = (props) => {
    const [isConnected] = useConnection();
    const [isAuth, setIsAuth] = useState(auth.authenticated);
    return (
        <AuthContext.Provider
            value={{ isAuthenticated: isAuth, setIsAuthenticated: setIsAuth }}
        >
            <AppStateContext.Provider value={{ isConnected }}>
                <div className={classes.layout}>
                    <Main />
                    <Commander />
                    {/* <App /> */}
                </div>
            </AppStateContext.Provider>
        </AuthContext.Provider>
    );
};

export default Layout;
