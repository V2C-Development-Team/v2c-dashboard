import React from 'react';
import classes from './Layout.module.scss';
// import App from '../../app/App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

const Layout = (props) => {
    return (
        <div className={classes.layout}>
            <Header
                themeColor={props.themeColor}
                setThemeColor={props.setThemeColor}
            />
            <Main />
            <Footer />
            {/* <App /> */}
        </div>
    );
};

export default Layout;
