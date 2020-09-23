import React, { Fragment } from 'react';
import {
    Paper,
    Grid,
    Typography,
    Button,
    Breadcrumbs,
    Link as MLink,
    IconButton,
} from '@material-ui/core';
import classes from './Home.module.scss';
import { FiSettings } from 'react-icons/fi';
import PinnedCard from '../../components/PinnedCard/PinnedCard';
const Home = () => {
    return (
        <Fragment>
            <div className={classes.infoBar}>
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        {/* <MLink color="inherit" href="/">
                            Dashboard
                        </MLink> */}

                        <Typography color="textPrimary">Dashboard</Typography>
                    </Breadcrumbs>
                </div>
                <div>
                    <IconButton style={{ marginRight: 25 }}>
                        <FiSettings />
                    </IconButton>
                    <Button variant="contained" color="primary">
                        Create task
                    </Button>
                </div>
            </div>
            <Typography variant="h5">Pinned Apps</Typography>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                <Grid item xs={12} md={3}>
                    <PinnedCard type="Game" title="Simon" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <PinnedCard type="Game" title="8Puzzle" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <PinnedCard empty />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Home;
