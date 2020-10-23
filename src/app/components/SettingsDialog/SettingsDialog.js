import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonIcon from '@material-ui/icons/Person';
import { TextField, Typography } from '@material-ui/core';
import apiInterface from '../../../services/apiInterface';
import auth from '../../../whoami/auth';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },
    form: {
        '& > *': {
            display: 'block',
            margin: 8,
        },
    },
});
const cancelSource = apiInterface.CancelToken.source();
export default function SettingsDialog(props) {
    const classes = useStyles();
    const formRef = React.useRef(null);
    const [value, setValue] = useState(0);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ msg: '', type: '' });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSave = async () => {
        if (formRef.current.reportValidity()) {
            if (!email || !password || !username) {
                setStatus({
                    msg: 'Enter all the required fields',
                    type: 'error',
                });
                return;
            } else {
                setStatus('');
            }
            // update user
            try {
                await apiInterface.updateUser(
                    {
                        uid: auth.getUserID(),
                        email,
                        username,
                        password,
                    },
                    cancelSource.token
                );
                await apiInterface.setConfig(
                    {
                        username,
                    },
                    cancelSource.token
                );
                setStatus({
                    msg: 'Settings updated successfully',
                    type: 'success',
                });
            } catch (error) {
                setStatus({ msg: error.message.toString(), type: 'error' });
            }
        }
    };
    const EmptyTab = () => <div></div>;

    useEffect(() => {
        return () => {
            cancelSource.cancel();
        };
    }, []);
    return (
        <div>
            <Dialog
                open={props.settingsOpen}
                disableBackdropClick
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ padding: 0 }}>
                    <Typography
                        variant="body1"
                        style={{ margin: 15, textAlign: 'center' }}
                    >
                        Settings
                    </Typography>
                    <Paper square className={classes.root}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                            aria-label="icon label tabs example"
                        >
                            <Tab icon={<PersonIcon />} label="PROFILE" />
                            <Tab icon={<EmptyTab />} disabled />
                            <Tab icon={<EmptyTab />} disabled />
                        </Tabs>
                    </Paper>
                </DialogTitle>
                <DialogContent>
                    <form
                        autoComplete="off"
                        className={classes.form}
                        ref={formRef}
                    >
                        <TextField
                            type="text"
                            name="username"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            type="email"
                            name="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            type="password"
                            name="password"
                            label="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            required
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <small
                        style={{
                            marginRight: 15,
                            color:
                                status.type === 'success' ? 'green' : 'tomato',
                        }}
                    >
                        {status.msg}
                    </small>
                    <Button
                        onClick={() => props.setSettingsOpen(false)}
                        color="secondary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        color="secondary"
                        variant="contained"
                        autoFocus
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
