import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import PinnedCard from '../../components/Cards/PinnedCard';
import ToolBar from '../../components/ToolBar/ToolBar';

const Home = (props) => {
    return (
        <Fragment>
            <ToolBar crumbs={['Home']} />
            <Typography variant="h5">Pinned Connections</Typography>
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
