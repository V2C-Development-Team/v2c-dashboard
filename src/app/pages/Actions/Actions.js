import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ToolBar from '../../components/ToolBar/ToolBar';
import { Typography, Grid, Divider } from '@material-ui/core';
import classes from './Actions.module.scss';
import Commands from './Commands/Commands';
import Macros from './Macros/Macros';
import ActionsRaw from './ActionsRaw/ActionsRaw';
import { useWebsocket } from '../../../hooks/useWebsocket';
import apiInterface from '../../../services/apiInterface';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}));

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const cancelSource = apiInterface.CancelToken.source();
const Actions = (props) => {
    const _classes = useStyles();
    const DEVICE_NAME = 'desktop';
    const [value, setValue] = useState(0);
    const [cid, setCid] = useState(0);
    const [mid, setMid] = useState(0);
    const [commands, setCommands] = useState([]);
    const [macros, setMacros] = useState([]);
    const [actions, setActions] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [messages, conn] = useWebsocket({ subscription: DEVICE_NAME });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddCommand = (command) => {
        command.cid = cid;
        setCommands([command, ...commands]);
        setCid((cid) => cid + 1);
    };
    const handleAddMacros = (macro) => {
        macro.mid = mid;
        setMacros([macro, ...macros]);
        setMid((mid) => mid + 1);
    };

    const handleAddActions = ({ commands, macros }) => {
        commands.forEach((command, index) => {
            command.cid = index;
        });
        macros.forEach((macro, index) => {
            macro.mid = index;
        });
        setCommands(commands);
        setMacros(macros);
        setActions({ commands, macros });
    };

    const updateConfig = useCallback(async () => {
        if (commands.length === 0 && macros.length === 0) return;
        conn.config(actions, DEVICE_NAME);
        try {
            await apiInterface.setConfig({ actions }, cancelSource.token);
        } catch (error) {
            console.log(
                'actions config failed to update -- backend maybe down'
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [actions, conn]);

    useEffect(() => {
        handleAddActions({ commands, macros });
    }, [commands, macros]);

    useEffect(() => {
        updateConfig();
    }, [updateConfig]);

    useEffect(() => {
        const fetchActionsConfig = async () => {
            try {
                const response = await apiInterface.getConfig(
                    { isAuth: false },
                    cancelSource.token
                );
                const data = response.data?.user?.actions;
                if (data) handleAddActions(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchActionsConfig();
        return () => {
            cancelSource.cancel();
        };
    }, []);

    return (
        <div className={classes.sessions}>
            <ToolBar crumbs={['Actions']} />
            <Typography variant="h5" component="h5">
                V2C Actions
            </Typography>
            <Typography
                variant="body1"
                component="p"
                style={{ paddingLeft: 10, opacity: 0.7, marginTop: 15 }}
            >
                With actions, you can create custom commands and macros that are
                triggered via voice.
            </Typography>
            <Grid container style={{ marginTop: 15 }}>
                <Grid item xs={12}>
                    <div className={_classes.root}>
                        <AppBar position="static" color="inherit" elevation={0}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="secondary"
                                variant="standard"
                            >
                                <Tab label="Commands" {...a11yProps(0)} />
                                <Tab label="Macros" {...a11yProps(1)} />
                                <Tab label="actions.v2c" {...a11yProps(2)} />
                            </Tabs>
                            <Divider style={{ marginTop: -1 }} />
                        </AppBar>
                        <TabPanel value={value} index={0}>
                            <Commands
                                data={actions.commands || []}
                                addCommand={handleAddCommand}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Macros
                                data={actions.macros || []}
                                addMacro={handleAddMacros}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <ActionsRaw
                                data={actions}
                                updateActions={handleAddActions}
                            />
                        </TabPanel>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Actions;
