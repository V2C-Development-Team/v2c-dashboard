import React, { Fragment } from 'react';
import { Grid, Typography } from '@material-ui/core';
import PinnedCard from '../../components/Cards/PinnedCard';
import ToolBar from '../../components/ToolBar/ToolBar';
import FrameDialog from '../../components/FrameDialog/FrameDialog';

const Home = (props) => {
    const [isFrameOpen, setIsFrameOpen] = React.useState(false);

    return (
        <Fragment>
            <ToolBar crumbs={['Home']} />
            <FrameDialog
                isFrameOpen={isFrameOpen}
                setIsFrameOpen={setIsFrameOpen}
            />
            <Typography variant="h5">Pinned Connections</Typography>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                <Grid item xs={12} md={3}>
                    <PinnedCard
                        type="Game"
                        title="Gaming Station"
                        onConnect={() => setIsFrameOpen(true)}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <PinnedCard empty />
                </Grid>
                <Grid item xs={12} md={3}>
                    <PinnedCard empty />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default Home;
