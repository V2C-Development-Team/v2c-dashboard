import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ReplayIcon from '@material-ui/icons/Replay';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

const StreamWidgetCard = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const dashed = props.dashed;
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Card
            variant="outlined"
            style={{
                border: dashed && '2px dashed rgba(0, 0, 0, 0.12)',
                width: '100%',
            }}
        >
            <CardContent>
                <Typography variant="h6" component="h6">
                    Stream
                </Typography>
                <br />
                <Divider />
                <br />
                <List
                    component="div"
                    aria-labelledby="nested-list-subheader"
                    className={classes.root}
                >
                    <ListItem button onClick={handleClick}>
                        <ListItemText
                            primary="Open Microsoft Word"
                            style={{ color: '#61BD4F' }}
                        />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem className={classes.nested}>
                                <ListItemText secondary="performed @ 9:08 a.m." />
                                <ReplayIcon style={{ opacity: 0.5 }} />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem>
                        <ListItemText
                            primary="Switch windows"
                            style={{ color: '#61BD4F' }}
                        />
                        <ExpandMore />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Preach windows"
                            style={{ color: '#D32F2F' }}
                        />
                        <ExpandMore />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
};

export default StreamWidgetCard;
