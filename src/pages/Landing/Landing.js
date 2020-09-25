import React from 'react';
import { Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import classes from './Landing.module.scss';
import { Link } from 'react-router-dom';
import withHeaderAndFooter from '../../hoc/withHeaderAndFooter';

import logo from '../../assets/images/v2c_logo.png';
import feat_img from '../../assets/images/feat_img.png';
import games_img from '../../assets/images/games.png';
import metrics_img from '../../assets/images/metrics.png';

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
    return (
        <Paper elevation={0} square className={classes.page}>
            <section className={classes.section} style={{ marginTop: '5em' }}>
                <div className={classes.logo}>
                    <img src={logo} alt="v2c logo" />
                </div>
                <Typography variant="h2" className={_classes.title}>
                    Voice to Command
                </Typography>
                <Typography variant="h5">
                    Remote voice control for all your devices
                </Typography>
                <Link to="/register">
                    <Button
                        variant="contained"
                        color="primary"
                        className={_classes.btn}
                        size="large"
                    >
                        Get Started with V2C
                    </Button>
                </Link>
                <div className={classes.imgContainer}>
                    <img src={feat_img} alt="featured v2c dashboard" />
                </div>
                <Typography variant="h4">Now you're talking</Typography>
                <Typography variant="body1" style={{ marginTop: 10 }}>
                    Open Applications and execute common tasks on your desktop
                    <br /> using your voice.
                </Typography>
            </section>
            <section className={`${classes.section} bg-secondary`}>
                <Typography variant="h4">Stay in control</Typography>
                <Typography variant="body1" style={{ marginTop: 10 }}>
                    Connect and control any V2C enabled game
                    <br /> using your voice.
                </Typography>
                <div className={classes.imgContainer} style={{ maxWidth: 700 }}>
                    <img src={games_img} alt="featured games" />
                </div>
            </section>
            <section className={classes.section} style={{ paddingBottom: 0 }}>
                <Typography variant="h4">Gain insights in real-time</Typography>
                <Typography variant="body1" style={{ marginTop: 10 }}>
                    Frequent commands, execution feedback, connected devices
                    etc.
                    <br />
                    all on your dashboard
                </Typography>
                <div
                    className={classes.imgContainer}
                    style={{ maxWidth: 700, marginBottom: 0 }}
                >
                    <img src={metrics_img} alt="featured metrics" />
                </div>
            </section>
            <section className={`${classes.section} bg-secondary`}>
                <div className={classes.logo}>
                    <img src={logo} alt="v2c logo" />
                </div>
                <Typography variant="h4" className={_classes.title}>
                    Voice to Command
                </Typography>
                <Link to="/register">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ marginTop: 15 }}
                    >
                        Get Started with V2C
                    </Button>
                </Link>
            </section>
        </Paper>
    );
};

export default withHeaderAndFooter(Landing);
