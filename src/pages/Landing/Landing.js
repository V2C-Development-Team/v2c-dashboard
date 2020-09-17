import React from 'react';
import { Paper, Button, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Brightness4, Brightness7 } from '@material-ui/icons';
import classes from './Landing.module.scss';

import logo from '../../assets/images/v2c_logo.png';

const useStyles = makeStyles((theme) => ({
    btn: {
        marginTop: '35px',
    },
    title: {
        marginBottom: '15px',
        fontWeight: 400,
    },
}));

const Landing = (props) => {
    const _classes = useStyles();
    const themeColor = props.themeColor;
    return (
        <Paper elevation={0} square className={classes.page}>
            <div className={classes.logo}>
                <img src={logo} alt="v2c logo" />
            </div>
            <Typography variant="h2" className={_classes.title}>
                Voice to Command
            </Typography>
            <Typography variant="h5">
                Remote voice control for all your devices
            </Typography>
            <Button
                variant="contained"
                color="primary"
                className={_classes.btn}
                size="large"
            >
                Get Started with V2C
            </Button>
            <IconButton
                className={_classes.btn}
                onClick={() => props.setThemeColor()}
            >
                {themeColor === 'light' ? (
                    <Brightness4 fontSize="large" />
                ) : (
                    <Brightness7 fontSize="large" />
                )}
            </IconButton>
        </Paper>
    );
};

export default Landing;
