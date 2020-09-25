import React from 'react';
import ToolBar from '../../components/ToolBar/ToolBar';
import { Typography, Grid } from '@material-ui/core';
import classes from './Metrics.module.scss';
import TemplateCard from '../../components/Cards/TemplateCard';
import ColoredCard from '../../components/Cards/ColoredCard';
import CounterCard from '../../components/Cards/CounterCard';

import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import PhonelinkOutlinedIcon from '@material-ui/icons/PhonelinkOutlined';
import StateCounterCard from '../../components/Cards/StateCounterCard';

const Metrics = (props) => {
    return (
        <div className={classes.metrics}>
            <ToolBar crumbs={['Metrics']} />
            <Typography variant="h5" component="h5">
                Some Header
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                <Grid item xs={12}>
                    <TemplateCard />
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                <Grid item xs={12} md={8}>
                    <StateCounterCard />
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                <Grid item xs={12} md={4}>
                    <CounterCard
                        icon={<LinkOutlinedIcon style={{ color: 'orange' }} />}
                        title="Word Count"
                        value="95"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <CounterCard
                        icon={
                            <PhonelinkOutlinedIcon style={{ color: 'green' }} />
                        }
                        title="Devices Connected"
                        value="8"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <ColoredCard />
                </Grid>
            </Grid>
        </div>
    );
};

export default Metrics;
