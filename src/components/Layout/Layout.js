import React from 'react';
import classes from './Layout.module.scss';
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
            <App
                themeColor={props.themeColor}
                setThemeColor={props.setThemeColor}
            />
        </div>
    );
};

export default Layout;
