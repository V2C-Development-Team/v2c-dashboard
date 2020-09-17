import React, { Fragment } from 'react';
import classes from './Main.module.scss';
import Landing from '../../pages/Landing/Landing';

const Main = (props) => {
    return (
        <div className={classes.main}>
            <Landing
                themeColor={props.themeColor}
                setThemeColor={props.setThemeColor}
            />
        </div>
    );
};

export default Main;
