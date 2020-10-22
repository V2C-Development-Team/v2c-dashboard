import React, { useState, useContext, Fragment } from 'react';
import {
    Typography,
    Button,
    Breadcrumbs,
    IconButton,
    Link as MLink,
    Tooltip,
} from '@material-ui/core';
import { FiSettings } from 'react-icons/fi';
import classes from './ToolBar.module.scss';
import { ThemeContext } from '../../../context/themeContext';

import { Brightness4, Brightness7 } from '@material-ui/icons';
import SettingsDialog from '../SettingsDialog/SettingsDialog';

const ToolBar = (props) => {
    const context = useContext(ThemeContext);
    const { themeColor, toggleThemeColor } = context;
    const [settingsOpen, setSettingsOpen] = useState(false);
    const crumbs = props.crumbs || [];

    return (
        <Fragment>
            <SettingsDialog
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
            />
            <div className={classes.toolBar}>
                <div>
                    <Breadcrumbs aria-label="breadcrumb">
                        <MLink color="inherit" href="/dashboard">
                            Dashboard
                        </MLink>

                        <Typography color="textPrimary">{crumbs[0]}</Typography>
                    </Breadcrumbs>
                </div>
                <div>
                    <Tooltip title="Toggle theme">
                        <IconButton
                            onClick={() => toggleThemeColor()}
                            className={classes.iconButton}
                        >
                            {themeColor === 'light' ? (
                                <Brightness4 />
                            ) : (
                                <Brightness7 />
                            )}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="settings">
                        <IconButton
                            style={{ marginRight: 25 }}
                            onClick={() => setSettingsOpen((s) => !s)}
                        >
                            <FiSettings />
                        </IconButton>
                    </Tooltip>
                    <Button variant="contained" color="primary">
                        Create task
                    </Button>
                </div>
            </div>
        </Fragment>
    );
};

export default ToolBar;
