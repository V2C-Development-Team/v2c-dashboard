import React, { useState } from 'react';
import classes from './NavBar.module.scss';

import v2c_logo from '../../../assets/images/v2c_logo.png';
import {
    FiGrid,
    FiBarChart2,
    FiAirplay,
    FiBell,
    FiLogOut,
    FiGitPullRequest,
    FiCpu,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

const NavBar = () => {
    const [currentTab, setCurrentTab] = useState('dashboard');

    return (
        <div className={`${classes.sidebar} bg-secondary `}>
            <div className={classes.logoContainer}>
                <img src={v2c_logo} alt="v2c logo" />
            </div>
            <nav className={classes.nav}>
                <ul>
                    <Tooltip title="Home" placement="right-end">
                        <li>
                            <Link
                                to="/"
                                className={`${
                                    currentTab === 'dashboard' && classes.active
                                } text-primary`}
                                onClick={() => setCurrentTab('dashboard')}
                            >
                                <FiGrid className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Connections" placement="right-end">
                        <li>
                            <Link to="#" className={`text-primary`}>
                                <FiAirplay className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Commands" placement="right-end">
                        <li>
                            <Link to="#" className={`text-primary`}>
                                <FiGitPullRequest className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Metrics" placement="right-end">
                        <li>
                            <Link
                                to="/metrics"
                                className={`${
                                    currentTab === 'metrics' && classes.active
                                } text-primary`}
                                onClick={() => setCurrentTab('metrics')}
                            >
                                <FiBarChart2 className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Dispatcher" placement="right-end">
                        <li>
                            <Link
                                to="/dispatcher"
                                className={`${
                                    currentTab === 'dispatcher' &&
                                    classes.active
                                } text-primary`}
                                onClick={() => setCurrentTab('dispatcher')}
                            >
                                <FiCpu className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Notifications" placement="right-end">
                        <li>
                            <Link to="#" className={`text-primary`}>
                                <FiBell className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Logout" placement="right-end">
                        <li className={classes.last}>
                            <Link to="#" className={`text-primary`}>
                                <FiLogOut className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;
