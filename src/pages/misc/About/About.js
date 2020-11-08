import React from 'react';
import Typography from '@material-ui/core/Typography';
import withHeaderAndFooter from '../../../hoc/withHeaderAndFooter';
import { Container, Paper } from '@material-ui/core';

import classes from '../Misc.module.scss';
import about_img from '../../../assets/images/about.svg';

const About = () => {
    return (
        <Paper
            square
            style={{ flex: 1, paddingTop: '5em', paddingBottom: '5em' }}
        >
            <Container maxWidth="md">
                <div className={classes.imgContainer}>
                    <img src={about_img} alt="about" />
                </div>
                <Typography
                    variant="h4"
                    style={{ fontWeight: 'bold' }}
                    align="center"
                >
                    About V2C
                </Typography>
                <div className={classes.content}>
                    <p>
                        <b>V2C</b> is a Voice to Command platform. There
                        currently exists no standard by which those with motor
                        disabilities are given the ability access computing
                        machinery without specialized equipment.
                    </p>
                    <p>
                        Several speech-to-text (STT) applications are available,
                        but two problems exist with existing implementations:
                    </p>
                    <ul>
                        <li>
                            Most STT applications simply allows for dictation,
                            and do not interface with existing software.
                        </li>
                        <li>
                            Existing applications that do interface with
                            existing software are very expensive.
                        </li>
                    </ul>

                    <p>
                        V2C is proposed as a protocol standard that will allow
                        institutions to enable voice access to standard programs
                        without the use of specialized hardware by which users
                        can use their own devices to manipulate standard
                        machinery.
                    </p>
                    <p>
                        The proposed project is a V2C proof-of-concept that will
                        prove that the protocol is feasible, easily-adopted, and
                        generalizable.
                    </p>
                </div>
            </Container>
        </Paper>
    );
};

export default withHeaderAndFooter(About);
