import React from 'react';
import Header from '../Header/Header';
import classes from './Layout.module.scss';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Dashboard from '../../app/dashboard/Dashboard';
import App from '../../app/App';

const Layout = (props) => {
    return (
        <div className={classes.layout}>
            {/*  <Header
                themeColor={props.themeColor}
                setThemeColor={props.setThemeColor}
            />
            <Main />
            <Footer /> */}
            <App />
        </div>
    );
};

export default Layout;
