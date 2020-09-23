import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IconButton, Tooltip } from '@material-ui/core';
import { FiZap, FiTrash } from 'react-icons/fi';

const useStyles = makeStyles({
    root: {
        height: 220,
    },
    empty: {
        border: '2px dashed rgba(0, 0, 0, 0.12)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    image: {
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A73E8',
        color: '#fff',
    },
});

const PinnedCard = ({ title, type, empty }) => {
    const classes = useStyles();

    if (empty) {
        return (
            <Card
                className={`${classes.root} ${classes.empty}`}
                variant="outlined"
            >
                <Typography variant="body1" component="p">
                    Add new App / Device
                </Typography>
            </Card>
        );
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    {type}
                </Typography>
                {/* <Typography variant="h5" component="h2">
                    Simon
                </Typography> */}
                <div className={classes.image}>
                    <Typography variant="body1" component="p">
                        {title}
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <Tooltip title="Connect">
                    <IconButton>
                        <FiZap fontSize="18px" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Remove from pinned">
                    <IconButton>
                        <FiTrash fontSize="18px" />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default PinnedCard;
