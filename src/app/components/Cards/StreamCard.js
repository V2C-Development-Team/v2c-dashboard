import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classes from './Cards.module.scss';

const StreamCard = (props) => {
    const dashed = props.dashed;
    return (
        <Card
            variant="outlined"
            style={{ border: dashed && '2px dashed rgba(0, 0, 0, 0.12)' }}
        >
            <CardContent>
                <Typography variant="body1" component="h2">
                    {props.title}
                </Typography>
                <div className={classes.streamArea}>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                    <div className={classes.streamEntry}>
                        <Typography variant="body2">{props.value}</Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StreamCard;
