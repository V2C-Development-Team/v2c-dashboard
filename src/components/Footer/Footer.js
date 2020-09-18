import React from 'react';
import { Container, Typography, Link as MLink } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import classes from './Footer.module.scss';

const Footer = () => {
    return (
        <footer>
            <Container maxWidth="md">
                <div className={classes.footer}>
                    <Typography color="textSecondary">
                        <MLink
                            href="#"
                            underline="none"
                            color="textPrimary"
                            variant="h5"
                            style={{
                                fontFamily: 'Inter',
                                marginRight: 55,
                                fontWeight: 600,
                            }}
                        >
                            V2C
                        </MLink>
                        <MLink
                            href="#"
                            underline="none"
                            color="inherit"
                            style={{ marginRight: 35 }}
                        >
                            Privacy
                        </MLink>
                        <MLink
                            href="#"
                            underline="none"
                            color="inherit"
                            style={{ marginRight: 35 }}
                        >
                            About
                        </MLink>
                        <MLink
                            href="#"
                            underline="none"
                            color="inherit"
                            style={{ marginRight: 35 }}
                        >
                            Team
                        </MLink>
                    </Typography>
                    <Typography
                        style={{ marginLeft: 'auto', display: 'inline-block' }}
                        color="textSecondary"
                    >
                        <MLink href="#" color="inherit" underline="none">
                            <HelpOutlineIcon
                                color="inherit"
                                style={{
                                    verticalAlign: 'bottom',
                                    marginRight: 5,
                                }}
                            />
                            Help
                        </MLink>
                    </Typography>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
