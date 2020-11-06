import React from 'react';
import { Button, TextField } from '@material-ui/core';
import classes from './Commander.module.scss';
import { useWebsocket } from '../../hooks/useWebsocket';
import robot from './robot';
import { useHistory } from 'react-router-dom';

const Commander = () => {
    const history = useHistory();
    const [conn] = useWebsocket({ subscription: 'dashboard', onCommand });
    const [msg, setMsg] = React.useState('');

    function onCommand(command) {
        if (!command || typeof command !== 'string') return;

        const instructions = command.split(' ');

        if (instructions && instructions.length >= 3) {
            const keyword = instructions[0];
            const action = instructions[1];
            const command = instructions.slice(2);

            switch (keyword) {
                case 'page':
                    handlePage(action, command);
                    break;
                default:
                    break;
            }
        } else {
            return;
        }
    }

    const handlePage = (action, command) => {
        const route = action.join('/');
        const go = route === 'landing' ? '' : route;
        console.log(route);
        switch (action) {
            case 'navigate':
                history.push('/' + go);
                break;
            case 'go':
                if (route === 'back') {
                    history.goBack();
                    break;
                }
                if (route === 'forward') {
                    history.goForward();
                    break;
                }
                break;
            default:
                break;
        }
    };

    const dispatchMessage = () => {
        onCommand(msg);
        // conn.dispatchCommand(msg);
    };

    return (
        <div className={classes.commander} tabIndex={-1}>
            <TextField
                label="Command"
                variant="outlined"
                size="small"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
            />
            <Button
                style={{ marginLeft: 15 }}
                variant="contained"
                color="primary"
                onClick={dispatchMessage}
            >
                Send
            </Button>
        </div>
    );
};

export default Commander;
