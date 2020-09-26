import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classes from './Cards.module.scss';

const LogCard = (props) => {
    const dashed = props.dashed;
    return (
        <Card
            variant="outlined"
            style={{ border: dashed && '2px dashed rgba(0, 0, 0, 0.12)' }}
        >
            <CardContent>
                <div className={classes.logEntry}>
                    <Typography variant="body2">{props.value}</Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default LogCard;
