import React, { useState } from 'react';
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
import ActionsRaw from './ActionsRaw/ActionsRaw';

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

const Actions = (props) => {
    const _classes = useStyles();
    const [value, setValue] = useState(0);
    const [cid, setCid] = useState(0);
    const [commands, setCommands] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddCommand = (command) => {
        command.cid = cid;
        setCommands([command, ...commands]);
        setCid((cid) => cid + 1);
    };

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
                                data={commands}
                                addCommand={handleAddCommand}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Macros
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <ActionsRaw data={{ commands }} />
                        </TabPanel>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default Actions;
