import React, { useState } from 'react';
import classes from './Layout.module.scss';
// import App from '../../app/App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { AuthContext } from '../../context/authContext';

const Layout = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <AuthContext.Provider
            value={{ isAuthenticated: isAuth, setIsAuthenticated: setIsAuth }}
        >
            <div className={classes.layout}>
                {!isAuth && <Header />}
                <Main setAuthState={setIsAuth} />
                {!isAuth && <Footer />}
                {/* <App /> */}
            </div>
        </AuthContext.Provider>
    );
};

export default Layout;
