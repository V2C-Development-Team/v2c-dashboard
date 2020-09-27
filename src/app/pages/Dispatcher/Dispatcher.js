import React, { useState, useEffect, useCallback } from 'react';
import ApiInterface from '../../../services/apiInterface';
import ToolBar from '../../components/ToolBar/ToolBar';
import { Typography, Grid } from '@material-ui/core';
import classes from './Dispatcher.module.scss';

import LogCard from '../../components/Cards/LogCard';
import StreamCard from '../../components/Cards/StreamCard';

const cancelSource = ApiInterface.CancelToken.source();
const Dispatcher = (props) => {
    const [logs, setLogs] = useState([]);

    const fetchLogs = useCallback(async () => {
        try {
            let logs = await ApiInterface.pullLogs(cancelSource.token);
            setLogs(logs);
            console.log(JSON.stringify(logs));
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        fetchLogs();
        return () => {
            cancelSource.cancel();
        };
    }, [fetchLogs]);

    return (
        <div className={classes.dispatcher}>
            <ToolBar crumbs={['Dispatcher']} />
            <Typography variant="h5" component="h5">
                V2C Dispatcher
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                <Grid item xs={12}>
                    <div className={classes.logArea}>
                        {logs.map((log, index) => (
                            <LogCard
                                key={index}
                                value={`[${log.timestamp}: ${log.type}] ${log.label} - ${log.message}`}
                            />
                        ))}
                    </div>
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
