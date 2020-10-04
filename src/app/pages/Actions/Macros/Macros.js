import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { Button, Divider, Paper, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Add from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Chip from '@material-ui/core/Chip';
import VKMap from '../../../../utils/VKMap.json';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        marginBottom: theme.spacing(3),
    },
    exec: {
        marginBottom: theme.spacing(1),
        paddingLeft: 5,
        fontFamily: '"consolas" , monospace',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    form: {
        '& > *': {
            marginBottom: theme.spacing(2),
            maxWidth: '100%',
            display: 'flex',
        },
    },
}));

const Macros = (props) => {
    const classes = useStyles();
    const data = props.data || [];
    const [error, setError] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [macroModalOpen, setMacroModalOpen] = useState(false);
    const [checked, setChecked] = useState([0]);
    const [toggleAll, setToggleAll] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [directive, setDirective] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [keystroke, setKeystroke] = useState('');
    const [macroEnabled, setMacroEnabled] = useState(true);
    const [kid, setKid] = useState(0);
    const [keystrokes, setKeystrokes] = useState([]);
    const [VKKeystrokes, setVKKeystrokes] = useState([]);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const resetForm = () => {
        setDirective('');
        setName('');
        setDescription('');
        setKeystroke('');
        setMacroEnabled(true);
        setKeystrokes([]);
        setError('');
    };

    const getVKValue = (entry) => {
        const values = entry.split('+');
        const VKValues = [];
        for (const value of values) {
            VKValues.push(VKMap[value]);
        }
        return VKValues.join(',');
    };

    const handleAddKeystrokes = (e) => {
        e.preventDefault();
        let modifier = '';
        modifier += e.altKey ? 'Alt+' : '';
        modifier += e.ctrlKey ? 'Control+' : '';
        modifier += e.shiftKey ? 'Shift+' : '';
        const entry = (modifier + e.key.toUpperCase()).trim();
        if (entry === '') return;
        if (e.key === 'Control' || e.key === 'Shift' || e.key === 'Alt') return; // prevent entries with only modifier keys
        const VKValue = getVKValue(entry);
        setKeystrokes((ks) => [...ks, { kid, entry }]);
        setVKKeystrokes((ks) => [...ks, { kid, VKValue }]);
        setKeystroke(entry);
        setKid((kid) => kid + 1);
    };

    const handleKeystrokeDown = (e) => {
        e.preventDefault();
        if (e.altKey || e.ctrlKey || e.shiftKey) return false;
    };

    const handleDeleteKeystroke = (kid) => {
        const tempKeystrokes = keystrokes.filter((ks) => ks.kid !== kid);
        setKeystrokes(tempKeystrokes);
    };

    const handleMoveKeystrokeUp = (kid) => {
        const index = keystrokes.findIndex((element) => element.kid === kid);
        // swap
        const tempKeystrokes = [...keystrokes];
        if (index === 0) return;
        const temp = tempKeystrokes[index];
        tempKeystrokes[index] = tempKeystrokes[index - 1];
        tempKeystrokes[index - 1] = temp;

        setKeystrokes(tempKeystrokes);
    };
    const handleMoveKeystrokeDown = (kid) => {
        const index = keystrokes.findIndex((element) => element.kid === kid);
        // swap
        const tempKeystrokes = [...keystrokes];
        if (index === tempKeystrokes.length - 1) return;
        const temp = tempKeystrokes[index];
        tempKeystrokes[index] = tempKeystrokes[index + 1];
        tempKeystrokes[index + 1] = temp;

        setKeystrokes(tempKeystrokes);
    };

    const handleCreateMacro = () => {
        if (directive.trim() === '' || keystrokes.length <= 0) {
            setError('Enter all required fields (*)');
            return;
        }
        const macro = {
            name,
            description,
            keypresses: [...[VKKeystrokes.map((ks) => ks.VKValue)]],
            directive,
            enabled: macroEnabled,
        };
        props.addMacro(macro);
        resetForm();
        handleModalClose();
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        console.log(newChecked);

        if (newChecked.length === data.length) {
            setIndeterminate(false);
            setToggleAll(true);
        } else if (newChecked.length === 0) {
            setIndeterminate(false);
            setToggleAll(false);
        } else {
            setIndeterminate(true);
        }
        setChecked(newChecked);
    };
    const handleToggleAll = () => {
        setIndeterminate(false);
        setToggleAll((toggleAll) => !toggleAll);
    };

    const handleModalClose = () => {
        setMacroModalOpen(false);
    };

    useEffect(() => {
        toggleAll ? setChecked(data.map((d) => d.mid)) : setChecked([]);
    }, [toggleAll, data]);

    return (
        <Fragment>
            <Button
                variant="contained"
                size="small"
                color="secondary"
                className={classes.button}
                startIcon={<Add />}
                onClick={() => setMacroModalOpen(true)}
            >
                Add Macro
            </Button>
            <List className={classes.root}>
                <Paper variant="outlined">
                    {data.length > 0 ? (
                        <Paper
                            elevation={0}
                            style={{ marginBottom: 10 }}
                            className="bg-secondary"
                        >
                            <ListItem role={undefined} dense key={0}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={toggleAll}
                                        tabIndex={-1}
                                        disableRipple
                                        onClick={handleToggleAll}
                                        indeterminate={indeterminate}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={`Name`}
                                    primaryTypographyProps={{
                                        variant: 'body1',
                                    }}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        disabled={checked.length <= 0}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Paper>
                    ) : (
                        <Typography style={{ textAlign: 'center', margin: 15 }}>
                            No macros available
                        </Typography>
                    )}
                    {data.map((el) => {
                        const labelId = `checkbox-list-label-${el.mid}`;

                        return (
                            <Fragment key={el.mid}>
                                <ListItem
                                    role={undefined}
                                    dense
                                    button
                                    onClick={handleToggle(el.mid)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={
                                                checked.indexOf(el.mid) !== -1
                                            }
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{
                                                'aria-labelledby': labelId,
                                            }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        id={labelId}
                                        primary={el.name}
                                        className={classes.label}
                                    />
                                    <Chip
                                        label={
                                            el.enabled ? 'enabled' : 'disabled'
                                        }
                                        variant="outlined"
                                        style={{
                                            color: el.enabled
                                                ? 'green'
                                                : 'tomato',
                                            borderColor: el.enabled
                                                ? 'green'
                                                : 'tomato',
                                        }}
                                        size="small"
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="more"
                                            aria-haspopup="true"
                                            onClick={handleMenuClick}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                            elevation={1}
                                        >
                                            <MenuItem onClick={handleMenuClose}>
                                                Edit
                                            </MenuItem>
                                            <MenuItem onClick={handleMenuClose}>
                                                Duplicate
                                            </MenuItem>
                                            <MenuItem onClick={handleMenuClose}>
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider />
                            </Fragment>
                        );
                    })}
                </Paper>
            </List>
            <Dialog
                open={macroModalOpen}
                onClose={handleModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick
            >
                <DialogTitle id="alert-dialog-title">{'Add Macro'}</DialogTitle>
                <DialogContent style={{ width: 500, maxWidth: '100%' }}>
                    <div className={classes.form}>
                        <TextField
                            type="text"
                            label="Directive"
                            value={directive}
                            onChange={(e) => setDirective(e.target.value)}
                            size="small"
                            variant="outlined"
                            color="secondary"
                            helperText="Trigger phrase"
                            placeholder="Copy"
                            required
                        />
                        <TextField
                            type="text"
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            size="small"
                            variant="outlined"
                            color="secondary"
                            helperText="The name of the macro"
                            placeholder="Copy text"
                        />
                        <TextField
                            type="text"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            size="small"
                            variant="outlined"
                            color="secondary"
                            helperText="The description of the macro"
                            placeholder="Copy selected text"
                            multiline
                            rows={2}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={macroEnabled}
                                    onChange={() =>
                                        setMacroEnabled((enabled) => !enabled)
                                    }
                                    name="checkedB"
                                    color="secondary"
                                />
                            }
                            label="Enable Macro"
                        />
                        <TextField
                            type="text"
                            label="keystroke"
                            value={keystroke}
                            // onChange={(e) => setKeystroke(e.target.value)}
                            onKeyUp={handleAddKeystrokes}
                            onKeyDown={handleKeystrokeDown}
                            size="small"
                            variant="outlined"
                            color="secondary"
                            helperText="Enter a single key or modifier(ctrl, alt, shift) + key for combo"
                            placeholder="CTRL + C"
                            required
                            style={{ fontFamily: '"consolas", monospace' }}
                        />
                    </div>
                    {keystrokes.map((ks) => (
                        <Paper className={classes.exec} key={ks.kid}>
                            <Typography style={{ flex: 1 }}>
                                {ks.entry}
                            </Typography>
                            <div>
                                <IconButton
                                    onClick={() =>
                                        handleMoveKeystrokeUp(ks.kid)
                                    }
                                >
                                    <ArrowUpwardIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        handleMoveKeystrokeDown(ks.kid)
                                    }
                                >
                                    <ArrowDownwardIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        handleDeleteKeystroke(ks.kid)
                                    }
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                            <Divider />
                        </Paper>
                    ))}
                </DialogContent>
                <DialogActions>
                    <small style={{ color: 'tomato' }}>{error}</small>
                    <Button onClick={handleModalClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleCreateMacro}
                        variant="contained"
                        color="secondary"
                        autoFocus
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default Macros;
