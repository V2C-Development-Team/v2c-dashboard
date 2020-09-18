import React, { Fragment } from 'react';
import Header from '../Header/Header';
import classes from './Layout.module.scss';
import Landing from '../../pages/Landing/Landing';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const Layout = (props) => {
    return (
        <div className={classes.layout}>
            <Header
                themeColor={props.themeColor}
                setThemeColor={props.setThemeColor}
            />
            <Main />
            <Footer />
        </div>
    );
};

export default Layout;
