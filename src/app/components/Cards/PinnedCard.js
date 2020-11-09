import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton, Tooltip } from '@material-ui/core';
import { FiZap, FiTrash, FiPlusSquare } from 'react-icons/fi';

const useStyles = makeStyles({
    root: {
        height: 220,
    },
    empty: {
        borderWidth: 2,
        borderStyle: 'dashed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: 15,
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

const PinnedCard = ({ title, type, empty, onConnect, onDelete }) => {
    const classes = useStyles();

    if (empty) {
        return (
            <Card
                className={`${classes.root} ${classes.empty}`}
                variant="outlined"
            >
                <FiPlusSquare fontSize="18px" style={{ marginRight: 10 }} />
                <Typography variant="body1" component="p">
                    Add New
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
                    <IconButton
                        onClick={onConnect ? onConnect : null}
                        id={title + '-btn'}
                    >
                        <FiZap fontSize="18px" />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Remove pin">
                    <IconButton onClick={onDelete ? onDelete : null}>
                        <FiTrash fontSize="18px" />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default PinnedCard;
