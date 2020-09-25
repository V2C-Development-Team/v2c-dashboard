import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './NavBar.module.scss';
import { AuthContext } from '../../../context/authContext';

import v2c_logo from '../../../assets/images/v2c_logo.png';
import {
    FiGrid,
    FiBarChart2,
    FiAirplay,
    FiBell,
    FiLogOut,
    FiGitPullRequest,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import auth from '../../../whoami/auth';

const NavBar = () => {
    const [currentTab, setCurrentTab] = useState('dashboard');
    const history = useHistory();
    const { setIsAuthenticated } = useContext(AuthContext);

    return (
        <div className={`${classes.sidebar} bg-secondary `}>
            <Tooltip title="Back to main page">
                <div
                    className={classes.logoContainer}
                    onClick={() => history.push('/')}
                >
                    <img src={v2c_logo} alt="v2c logo" />
                </div>
            </Tooltip>
            <nav className={classes.nav}>
                <ul>
                    <Tooltip title="Home" placement="right-end">
                        <li>
                            <Link
                                to="/dashboard"
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
                                to="/dashboard/metrics"
                                className={`${
                                    currentTab === 'metrics' && classes.active
                                } text-primary`}
                                onClick={() => setCurrentTab('metrics')}
                            >
                                <FiBarChart2 className={classes.icon} />
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
                            <Link
                                to="#"
                                className={`text-primary`}
                                onClick={() => {
                                    auth.logout();
                                    setIsAuthenticated(false);
                                    history.push('/login');
                                }}
                            >
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
