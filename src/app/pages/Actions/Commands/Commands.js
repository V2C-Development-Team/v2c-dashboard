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
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SendIcon from '@material-ui/icons/Send';
import Chip from '@material-ui/core/Chip';

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
        fontFamily: '""consolas"" , monospace',
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

const Commands = (props) => {
    const classes = useStyles();
    const data = props.data || [];
    const [error, setError] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [commandModalOpen, setCommandModalOpen] = useState(false);
    const [checked, setChecked] = useState([0]);
    const [toggleAll, setToggleAll] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [directive, setDirective] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [executable, setExecutable] = useState('');
    const [commandEnabled, setCommandEnabled] = useState(true);
    const [cid, setCid] = useState(0);
    const [commands, setCommands] = useState([]);

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
        setExecutable('');
        setCommands([]);
        setError('');
    };

    const handleAddCommand = () => {
        const entry = executable.trim();
        if (entry === '') return;
        setCommands((commands) => [...commands, { cid, entry }]);
        setExecutable('');
        setCid((cid) => cid + 1);
    };
    const handleDeleteCommand = (cid) => {
        const tempCommands = commands.filter((command) => command.cid !== cid);
        setCommands(tempCommands);
    };

    const handleMoveCommandUp = (cid) => {
        const index = commands.findIndex((element) => element.cid === cid);
        // swap
        const tempCommands = [...commands];
        if (index === 0) return;
        const temp = tempCommands[index];
        tempCommands[index] = tempCommands[index - 1];
        tempCommands[index - 1] = temp;

        setCommands(tempCommands);
    };
    const handleMoveCommandDown = (cid) => {
        const index = commands.findIndex((element) => element.cid === cid);
        // swap
        const tempCommands = [...commands];
        if (index === tempCommands.length - 1) return;
        const temp = tempCommands[index];
        tempCommands[index] = tempCommands[index + 1];
        tempCommands[index + 1] = temp;

        setCommands(tempCommands);
    };

    const handleCreateCommand = () => {
        if (directive.trim() === '' || commands.length <= 0) {
            setError('Enter all required fields (*)');
            return;
        }
        const command = {
            name,
            description,
            executables: [...[commands.map((cmd) => cmd.entry)]],
            directive,
            enabled: commandEnabled,
        };
        props.addCommand(command);
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
        setCommandModalOpen(false);
    };

    useEffect(() => {
        toggleAll ? setChecked([0, 1, 2, 3]) : setChecked([]);
    }, [toggleAll]);

    return (
        <Fragment>
            <Button
                variant="contained"
                size="small"
                color="secondary"
                className={classes.button}
                startIcon={<Add />}
                onClick={() => setCommandModalOpen(true)}
            >
                Add Command
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
                        <Typography style={{ textAlign: 'center' }}>
                            No commands available
                        </Typography>
                    )}
                    {data.map((el) => {
                        const labelId = `checkbox-list-label-${el.cid}`;

                        return (
                            <Fragment key={el.cid}>
                                <ListItem
                                    role={undefined}
                                    dense
                                    button
                                    onClick={handleToggle(el.cid)}
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={
                                                checked.indexOf(el.cid) !== -1
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
                open={commandModalOpen}
                onClose={handleModalClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick
            >
                <DialogTitle id="alert-dialog-title">
                    {'Add Command'}
                </DialogTitle>
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
                            placeholder="Open Browser"
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
                            helperText="The name of the command"
                            placeholder="Open Google Chrome browser"
                        />
                        <TextField
                            type="text"
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            size="small"
                            variant="outlined"
                            color="secondary"
                            helperText="The description of the command"
                            placeholder="Opens Chrome browser"
                            multiline
                            rows={2}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={commandEnabled}
                                    onChange={() =>
                                        setCommandEnabled((enabled) => !enabled)
                                    }
                                    name="checkedB"
                                    color="secondary"
                                />
                            }
                            label="Enable Command"
                        />
                        <TextField
                            type="text"
                            label="Executables"
                            value={executable}
                            onChange={(e) => setExecutable(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && handleAddCommand()
                            }
                            size="small"
                            variant="outlined"
                            color="secondary"
                            helperText="Enter valid command-line executables in sequence"
                            placeholder="start chrome"
                            required
                            style={{ fontFamily: '"consolas", monospace' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleAddCommand}
                                            edge="end"
                                        >
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    {commands.map((command, index) => (
                        <Paper className={classes.exec} key={index}>
                            <Typography style={{ flex: 1 }}>
                                {command.entry}
                            </Typography>
                            <div>
                                <IconButton
                                    onClick={() =>
                                        handleMoveCommandUp(command.cid)
                                    }
                                >
                                    <ArrowUpwardIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        handleMoveCommandDown(command.cid)
                                    }
                                >
                                    <ArrowDownwardIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        handleDeleteCommand(command.cid)
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
                        onClick={handleCreateCommand}
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

export default Commands;
