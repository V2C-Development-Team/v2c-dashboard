import React from 'react';
import Typography from '@material-ui/core/Typography';
import withHeaderAndFooter from '../../../hoc/withHeaderAndFooter';
import { Container, Paper } from '@material-ui/core';

import classes from '../Misc.module.scss';
import team_img from '../../../assets/images/team.svg';
import everistus from '../../../assets/images/team/Everistus.jpg';
import nicholas from '../../../assets/images/team/Nicholas.jpg';
import rashed from '../../../assets/images/team/Rashed.png';
import james from '../../../assets/images/team/James.jpg';
import jonathan from '../../../assets/images/team/Jonathan.jpg';
import glen from '../../../assets/images/team/Glen.jpg';
import caleb from '../../../assets/images/team/Caleb.png';

const Team = () => {
    return (
        <Paper
            square
            style={{ flex: 1, paddingTop: '5em', paddingBottom: '5em' }}
        >
            <Container maxWidth="lg">
                <div className={classes.imgContainer}>
                    <img src={team_img} alt="team" />
                </div>
                <Typography
                    variant="h4"
                    style={{ fontWeight: 'bold' }}
                    align="center"
                >
                    The Team
                </Typography>
                <div>
                    <div className={classes.team}>
                        <figure className={classes.teamCard}>
                            <div className={classes.teamImgContainer}>
                                <img src={everistus} alt="everistus" />
                            </div>
                            <figcaption>Everistus Akpabio</figcaption>
                        </figure>
                        <figure className={classes.teamCard}>
                            <div className={classes.teamImgContainer}>
                                <img src={nicholas} alt="nicholas" />
                            </div>
                            <figcaption>Nicholas Clemmons</figcaption>
                        </figure>
                        <figure className={classes.teamCard}>
                            <div className={classes.teamImgContainer}>
                                <img src={rashed} alt="rashed" />
                            </div>
                            <figcaption>Rashed Alrashed</figcaption>
                        </figure>
                        <figure className={classes.teamCard}>
                            <div className={classes.teamImgContainer}>
                                <img src={james} alt="james" />
                            </div>
                            <figcaption>James Cole Riggall</figcaption>
                        </figure>
                        <figure className={classes.teamCard}>
                            <div className={classes.teamImgContainer}>
                                <img src={jonathan} alt="jonathan" />
                            </div>
                            <figcaption>Jonathan Craig</figcaption>
                        </figure>
                        <figure className={classes.teamCard}>
                            <div className={classes.teamImgContainer}>
                                <img src={glen} alt="glen" />
                            </div>
                            <figcaption>Glen Mathew</figcaption>
                        </figure>
                        <figure className={classes.teamCard}>
                            <div className={classes.teamImgContainer}>
                                <img src={caleb} alt="caleb" />
                            </div>
                            <figcaption>Caleb L. Power</figcaption>
                        </figure>
                    </div>
                </div>
            </Container>
        </Paper>
    );
};

export default withHeaderAndFooter(Team);
