import React from 'react';
import { Container, Typography, Link as MLink, Paper } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import classes from './Footer.module.scss';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <Paper square elevation={0}>
                <Container maxWidth="md">
                    <div className={classes.footer}>
                        <Typography
                            color="textSecondary"
                            style={{ verticalAlign: 'bottom' }}
                        >
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
                                    style={{ marginRight: 35 }}
                                    display="inline"
                                >
                                    Privacy
                                </Typography>
                            </Link>
                            <Link to="/about">
                                <Typography
                                    color="textSecondary"
                                    style={{ marginRight: 35 }}
                                    display="inline"
                                >
                                    About
                                </Typography>
                            </Link>
                            <Link to="/team">
                                <Typography
                                    color="textSecondary"
                                    style={{ marginRight: 35 }}
                                    display="inline"
                                >
                                    Team
                                </Typography>
                            </Link>
                        </Typography>
                        <Typography
                            style={{
                                marginLeft: 'auto',
                                display: 'inline-block',
                            }}
                            color="textSecondary"
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
                        </Typography>
                    </div>
                </Container>
            </Paper>
        </footer>
    );
};

export default Footer;
