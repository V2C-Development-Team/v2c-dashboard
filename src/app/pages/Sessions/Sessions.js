import React, { useState, useEffect, useCallback } from 'react';
import ApiInterface from '../../../services/apiInterface';
import ToolBar from '../../components/ToolBar/ToolBar';
import { Typography, Grid } from '@material-ui/core';
import classes from './Sessions.module.scss';

import LogCard from '../../components/Cards/LogCard';
import StreamCard from '../../components/Cards/StreamCard';

const cancelSource = ApiInterface.CancelToken.source();
const Sessions = (props) => {
    const [sessions, setSessions] = useState([]);

    const fetchSessions = useCallback(async () => {
        try {
            let sessions = await ApiInterface.pullSessions(cancelSource.token);
            setSessions(sessions);
            console.log(JSON.stringify(sessions));
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        fetchSessions();
        return () => {
            cancelSource.cancel();
        };
    }, [fetchSessions]);

    return (
        <div className={classes.sessions}>
            <ToolBar crumbs={['Sessions']} />
            <Typography variant="h5" component="h5">
                V2C Network
            </Typography>
            <Grid container spacing={3} style={{ marginTop: 15 }}>
                <Grid item xs={12}>
                    <div className={classes.logArea}>
                        {sessions.map((session, index) => (
                            <LogCard key={index} value={`${session}`} />
                        ))}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Sessions;
