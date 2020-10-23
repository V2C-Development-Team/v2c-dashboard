import React, { useState, useEffect } from 'react';
import ActivityCard from '../Cards/ActivityCard';
import { Scrollbars } from 'react-custom-scrollbars';
import ProfileCard from '../Cards/ProfileCard';
import StreamWidgetCard from '../Cards/StreamWidgetCard';
import classes from './InfoBar.module.scss';
import apiInterface from '../../../services/apiInterface';

const cancelSource = apiInterface.CancelToken.source();
const InfoBar = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUserConfig = async () => {
            try {
                const res = await apiInterface.getConfig(
                    { isAuth: false },
                    cancelSource.token
                );
                if (res.data?.user?.username) {
                    setUser(res.data.user);
                }
            } catch (error) {}
        };
        getUserConfig();
        return () => {
            cancelSource.cancel();
        };
    }, []);
    return (
        <aside className={`${classes.infoBar} bg-secondary`}>
            <ProfileCard username={user.username || 'Hack3r'} />
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
