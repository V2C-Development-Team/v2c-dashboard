import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classes from './Cards.module.scss';
import { Divider } from '@material-ui/core';

const PercentageCircleCard = (props) => {
    const dashed = props.dashed;
    return (
        <Card
            variant="outlined"
            style={{ border: dashed && '2px dashed rgba(0, 0, 0, 0.12)' }}
        >
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.title}
                </Typography>
                <br />
                <Divider />
                <br />
                <div className={classes.pCircle}>
                    <span>50%</span>
                    <div className={classes.slice}>
                        <div className={classes.bar}></div>
                        <div className={classes.fill}></div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PercentageCircleCard;
