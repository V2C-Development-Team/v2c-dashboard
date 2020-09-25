import React from 'react';
import { Container, Typography, Paper } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import classes from './Footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Paper square elevation={0}>
                <Container maxWidth="md">
                    <div className={classes.footer}>
                        <div style={{ verticalAlign: 'bottom' }}>
                            <Link to="/">
                                <Typography
                                    color="textSecondary"
                                    variant="h6"
                                    style={{
                                        fontFamily: 'Inter',
                                        marginRight: 55,
                                        fontWeight: 600,
                                    }}
                                    display="inline"
                                >
                                    V2C
                                </Typography>
                            </Link>
                            <Link to="/privacy">
                                <Typography
                                    color="textSecondary"
                                    className={classes.links}
                                >
                                    Privacy
                                </Typography>
                            </Link>
                            <Link to="/about">
                                <Typography
                                    color="textSecondary"
                                    className={classes.links}
                                >
                                    About
                                </Typography>
                            </Link>
                            <Link to="/team">
                                <Typography
                                    color="textSecondary"
                                    className={classes.links}
                                >
                                    Team
                                </Typography>
                            </Link>
                        </div>
                        <div
                            style={{
                                marginLeft: 'auto',
                                display: 'inline-block',
                            }}
                        >
                            <Link to="/help">
                                <Typography
                                    color="textSecondary"
                                    display="inline"
                                >
                                    <HelpOutlineIcon
                                        color="inherit"
                                        style={{
                                            verticalAlign: 'bottom',
                                            marginRight: 5,
                                        }}
                                    />
                                    Help
                                </Typography>
                            </Link>
                        </div>
                    </div>
                </Container>
            </Paper>
        </footer>
    );
};

export default Footer;
