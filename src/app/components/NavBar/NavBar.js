import React from 'react';
import classes from './NavBar.module.scss';

import v2c_logo from '../../../assets/images/v2c_logo.png';
import {
    FiGrid,
    FiBarChart2,
    FiAirplay,
    FiBell,
    FiLogOut,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

const NavBar = () => {
    return (
        <div className={classes.sidebar}>
            <div className={classes.logoContainer}>
                <img src={v2c_logo} alt="v2c logo" />
            </div>
            <nav className={classes.nav}>
                <ul>
                    <Tooltip title="Home" placement="right-end">
                        <li>
                            <Link to="#" className={classes.active}>
                                <FiGrid className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Devices &amp; Apps" placement="right-end">
                        <li>
                            <Link to="#">
                                <FiAirplay className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Metrics" placement="right-end">
                        <li>
                            <Link to="#">
                                <FiBarChart2 className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Notifications" placement="right-end">
                        <li>
                            <Link to="#">
                                <FiBell className={classes.icon} />
                            </Link>
                        </li>
                    </Tooltip>
                    <Tooltip title="Logout" placement="right-end">
                        <li className={classes.last}>
                            <Link to="#">
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
