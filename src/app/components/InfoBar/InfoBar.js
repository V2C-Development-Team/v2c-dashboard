import React from 'react';
import ActivityCard from '../Cards/ActivityCard';
import { Scrollbars } from 'react-custom-scrollbars';
import ProfileCard from '../Cards/ProfileCard';
import StreamWidgetCard from '../Cards/StreamWidgetCard';
import classes from './InfoBar.module.scss';

const InfoBar = () => {
    return (
        <aside className={`${classes.infoBar} bg-secondary`}>
            <ProfileCard />
            <br />
            <Scrollbars
                style={{ width: '100%', height: '100%', minHeight: 350 }}
            >
                <ActivityCard />
                <br />
                <StreamWidgetCard />
            </Scrollbars>
        </aside>
    );
};

export default InfoBar;
