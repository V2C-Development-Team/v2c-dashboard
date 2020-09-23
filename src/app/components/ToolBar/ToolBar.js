import React from 'react';
import {
    Typography,
    Button,
    Breadcrumbs,
    IconButton,
    Link as MLink,
} from '@material-ui/core';
import { FiSettings } from 'react-icons/fi';
import classes from './ToolBar.module.scss';

import { Brightness4, Brightness7 } from '@material-ui/icons';

const ToolBar = (props) => {
    const themeColor = props.themeColor;
    const crumbs = props.crumbs || [];

    return (
        <div className={classes.toolBar}>
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <MLink color="inherit" href="/">
                        Dashboard
                    </MLink>

                    <Typography color="textPrimary">{crumbs[0]}</Typography>
                </Breadcrumbs>
            </div>
            <div>
                <IconButton
                    onClick={() => props.setThemeColor()}
                    className={classes.iconButton}
                >
                    {themeColor === 'light' ? <Brightness4 /> : <Brightness7 />}
                </IconButton>
                <IconButton style={{ marginRight: 25 }}>
                    <FiSettings />
                </IconButton>
                <Button variant="contained" color="primary">
                    Create task
                </Button>
            </div>
        </div>
    );
};

export default ToolBar;
