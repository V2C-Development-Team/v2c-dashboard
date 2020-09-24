import React from 'react';
import ToolBar from '../../components/ToolBar/ToolBar';
import { Typography, Grid } from '@material-ui/core';
import classes from './Dispatcher.module.scss';
import TemplateCard from '../../components/Cards/TemplateCard';
import ColoredCard from '../../components/Cards/ColoredCard';
import CounterCard from '../../components/Cards/CounterCard';

import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import PhonelinkOutlinedIcon from '@material-ui/icons/PhonelinkOutlined';
import StateCounterCard from '../../components/Cards/StateCounterCard';

import LogCard from '../../components/Cards/LogCard';
import StreamCard from '../../components/Cards/StreamCard';

const Dispatcher = (props) => {
    return (
        <div className={classes.dispatcher}>
            <ToolBar
                themeColor={props.themeColor}
                setThemeColor={props.setThemeColor}
                crumbs={['Dispatcher']}
            />
            <Typography variant="h5" component="h5">
                V2C Dispatcher
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                <Grid item xs={12}>
                    <LogCard
                        title="Dispatcher Log"
                        value="Starting log collection..."
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                <Grid item xs={12}>
                    <StreamCard title="Command Stream" value="placeholder" />
                </Grid>
            </Grid>
        </div>
    );
};

export default Dispatcher;
