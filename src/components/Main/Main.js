import React from 'react';
import classes from './Main.module.scss';
import Landing from '../../pages/Landing/Landing';

const Main = () => {
    return (
        <div className={classes.main}>
            <Landing />
        </div>
    );
};

export default Main;
