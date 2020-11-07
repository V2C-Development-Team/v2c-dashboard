import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        minWidth: 400,
        '&>*': {
            margin: theme.spacing(0.5),
        },
    },
}));

const AddConnectionDialog = (props) => {
    const classes = useStyles();
    const [url, setUrl] = useState('');
    const [type, setType] = useState('Game');
    const [title, setTitle] = useState('');

    React.useEffect(() => {
        setUrl('');
        setType('');
        setTitle('');
    }, []);

    return (
        <div>
            <Dialog
                open={props.isConnOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => props.setIsConnOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {'Add a Connection'}
                </DialogTitle>
                <DialogContent className={classes.form}>
                    <TextField
                        label="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">
                            Type
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value={'Game'} selected>
                                Game
                            </MenuItem>
                            <MenuItem value={'App'}>App</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Url"
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => props.setIsConnOpen(false)}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() =>
                            props.addConnection({ url, type, title })
                        }
                        color="secondary"
                        variant="contained"
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddConnectionDialog;
