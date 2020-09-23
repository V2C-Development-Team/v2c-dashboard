import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classes from './Cards.module.scss';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';

const StateCounterCard = (props) => {
    const [secondsLeft, setSecondsLeft] = useState(20);
    const dashed = props.dashed;
    const title = 'Seconds Left';

    useEffect(() => {
        const setTimerValue = () => {
            if (secondsLeft === 0) {
                setSecondsLeft(20);
            } else {
                setSecondsLeft((secondsLeft) => secondsLeft - 1);
            }
        };

        const timer = setInterval(() => {
            setTimerValue();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [secondsLeft]);

    return (
        <Card
            variant="outlined"
            style={{ border: dashed && '2px dashed rgba(0, 0, 0, 0.12)' }}
            className={classes.card}
        >
            <CardContent>
                <Typography variant="body1" component="h2">
                    {title}
                </Typography>
                <div className={classes.counterCardRow}>
                    <div className={classes.counterCardIcon}>
                        <TimerOutlinedIcon style={{ color: 'red' }} />
                    </div>
                    <Typography variant="h1">{secondsLeft}</Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default StateCounterCard;
