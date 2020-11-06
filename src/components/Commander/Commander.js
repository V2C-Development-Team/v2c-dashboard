import React from 'react';
import { Button, TextField } from '@material-ui/core';
import classes from './Commander.module.scss';
import { useWebsocket } from '../../hooks/useWebsocket';
import { useHistory } from 'react-router-dom';

const wordToNumber = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

const Commander = () => {
    const history = useHistory();
    const [conn] = useWebsocket({ subscription: 'dashboard', onCommand });
    const [msg, setMsg] = React.useState('');

    function onCommand(cmd) {
        if (!cmd || typeof cmd !== 'string') return;

        const command = cmd.toLowerCase();
        const instructions = command.split(' ');

        if (instructions && instructions.length >= 3) {
            const keyword = instructions[0];
            const action = instructions[1];
            const command = instructions.slice(2);

            switch (keyword) {
                case 'page':
                    handlePage(action, command);
                    break;
                case 'event':
                    handleEvent(action, command);
                    break;
                case 'context':
                    handleContext(action, command);
                    break;
                default:
                    break;
            }
        } else {
            return;
        }
    }

    const handlePage = (action, command) => {
        const route = command.join('/');
        const go = route === 'landing' ? '' : route;
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
    const handleContext = (action, command) => {
        const rest = command.join(' ');
        switch (action) {
            case 'type':
                {
                    const activeElement = document.activeElement;
                    activeElement.focus();
                    activeElement.value = rest;
                }
                break;
            case 'format':
                if (rest === 'email') {
                    const activeElement = document.activeElement;
                    activeElement.focus();
                    let format = activeElement.value.replace(/ /g, '');
                    format = format.replace(/at/, '@');
                    format = format.replace(/dot/, '.');
                    activeElement.value = format;
                    break;
                }
                if (rest === 'number') {
                    const activeElement = document.activeElement;
                    activeElement.focus();
                    let format = activeElement.value;
                    let arr = format.split(' ');
                    arr.forEach((e, i, a) => (a[i] = wordToNumber[e]));
                    format = arr.join('');
                    activeElement.value = format;
                    break;
                }
                break;
            default:
                break;
        }
    };

    const handleEvent = (action, command) => {
        const input = command.join(' ');

        switch (action) {
            case 'scroll':
                if (command[0] === 'up') {
                    if (command[1] === 'max') window.scrollBy(0, -500000);
                    else window.scrollBy(0, parseInt(`-${command[1]}`) * 2);
                }
                if (command[0] === 'down') {
                    if (command[1] === 'max') window.scrollBy(0, 500000);
                    else window.scrollBy(0, parseInt(`${command[1]}`) * 2);
                }
                break;
            case 'click':
                if (input === 'sign in') {
                    const el = document.getElementById('signIn');
                    if (el) el.click();
                    break;
                }
                break;
            case 'focus':
                if (input === 'email') {
                    const el = document.getElementById('email');
                    if (el) el.focus();
                    break;
                }
                if (input === 'password') {
                    const el = document.getElementById('password');
                    if (el) el.focus();
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
