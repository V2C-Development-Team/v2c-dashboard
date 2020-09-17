import React, { Fragment } from 'react';
import Header from '../Header/Header';
import classes from './Layout.module.scss';
import Landing from '../../pages/Landing/Landing';
import Main from '../Main/Main';

const Layout = (props) => {
    return (
        <div className={classes.layout}>
            <Header />
            <Main
                themeColor={props.themeColor}
                setThemeColor={props.setThemeColor}
            />
        </div>
    );
};

export default Layout;
