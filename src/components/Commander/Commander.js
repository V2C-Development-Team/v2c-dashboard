/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import classes from './Commander.module.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { useWebsocket } from '../../hooks/useWebsocket';
import { useHistory } from 'react-router-dom';

import map_img from '../../assets/images/sitemap.png';

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
    const [helpType, setHelpType] = React.useState('guide');
    const [isOpen, setIsOpen] = React.useState(false);

    function onCommand(cmd) {
        // console.log(cmd);
        if (!cmd || typeof cmd !== 'string') return;

        const command = cmd.toLowerCase();
        const instructions = command.split(' ');

        if (instructions && instructions.length >= 3) {
            const keyword = instructions[0];
            const action = instructions[1];
            const subject = instructions.slice(2);

            switch (keyword) {
                case 'help':
                    handleHelp(action, subject);
                    break;
                case 'page':
                case 'paige':
                    handlePage(action, subject);
                    break;
                case 'event':
                    handleEvent(action, subject);
                    break;
                case 'context':
                    handleContext(action, subject);
                    break;
                default:
                    break;
            }
        } else {
            return;
        }
    }

    const handleHelp = (action, subject) => {
        const type = subject.join(' ');
        switch (action) {
            case 'show':
                if (type === 'guide') {
                    setHelpType('guide');
                    setIsOpen(true);
                    break;
                }
                if (type === 'map') {
                    setHelpType('map');
                    setIsOpen(true);
                    break;
                }
                break;
            case 'close':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    const handlePage = (action, subject) => {
        const route = subject.join('/');
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
    const handleContext = (action, subject) => {
        const rest = subject.join(' ');
        switch (action) {
            case 'type':
                {
                    const activeElement = document.activeElement;
                    activeElement.focus();
                    activeElement.value = rest;
                }
                break;
            case 'append':
                {
                    const activeElement = document.activeElement;
                    activeElement.focus();
                    activeElement.value += rest;
                }
                break;
            case 'delete':
                {
                    const activeElement = document.activeElement;
                    activeElement.focus();
                    activeElement.value = '';
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

    const handleEvent = (action, subject) => {
        const input = subject.join(' ');

        switch (action) {
            case 'scroll':
                if (subject[0] === 'up') {
                    if (subject[1] === 'max') window.scrollBy(0, -500000);
                    else window.scrollBy(0, parseInt(`-${subject[1]}`) * 2);
                }
                if (subject[0] === 'down') {
                    if (subject[1] === 'max') window.scrollBy(0, 500000);
                    else window.scrollBy(0, parseInt(`${subject[1]}`) * 2);
                }
                break;
            case 'click':
                if (input === 'sign in') {
                    const el = document.getElementById('signIn');
                    if (el) el.click();
                }
                break;
            case 'connect':
            case 'close':
                if (input === 'gaming') {
                    const el = document.getElementById('gaming-btn');
                    if (el) el.click();
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
        // onCommand(msg);
        conn.dispatchCommand(msg);
    };

    return (
        <Fragment>
            <AlertDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                type={helpType}
            />
            {/*             <div className={classes.commander}>
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
            </div> */}
        </Fragment>
    );
};

export default Commander;

function AlertDialog(props) {
    return (
        <div>
            <Dialog
                open={props.isOpen}
                onClose={() => props.setIsOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="lg"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    style={{ textTransform: 'capitalize' }}
                >
                    {props.type}
                </DialogTitle>
                <DialogContent>
                    {props.type === 'guide' ? <Guide /> : <Map />}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => props.setIsOpen(false)}
                        color="primary"
                        variant="contained"
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function Guide() {
    return (
        <table>
            <thead>
                <tr>
                    <th>Keyword</th>
                    <th>Action</th>
                    <th>Subject</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <b>help</b>
                    </td>
                    <td>show</td>
                    <td>[Map | Guide]</td>
                </tr>
                <tr>
                    <td>help</td>
                    <td>close</td>
                    <td>Dialog</td>
                </tr>
                <tr>
                    <td>
                        <b>page</b>
                    </td>
                    <td>navigate</td>
                    <td>[Landing | Login | About | Help...]</td>
                </tr>
                <tr>
                    <td>page</td>
                    <td>navigate</td>
                    <td>[Dashboard Home | Dashboard Dispatcher...]</td>
                </tr>
                <tr>
                    <td>
                        <b>event</b>
                    </td>
                    <td>click</td>
                    <td>[Sign In]</td>
                </tr>
                <tr>
                    <td>event</td>
                    <td>focus</td>
                    <td>[Email | Password]</td>
                </tr>
                <tr>
                    <td>event</td>
                    <td>scroll</td>
                    <td>[Up | Down] &nbsp; [&lt;number&gt; | Max]</td>
                </tr>
                <tr>
                    <td>event</td>
                    <td>[connect | close]</td>
                    <td>[gaming]</td>
                </tr>
                <tr>
                    <td>context</td>
                    <td>format</td>
                    <td>[Email | Password]</td>
                </tr>
                <tr>
                    <td>
                        <b>context</b>
                    </td>
                    <td>[type | append]</td>
                    <td>[&lt;text&gt;]</td>
                </tr>
                <tr>
                    <td>context</td>
                    <td>delete</td>
                    <td>
                        [<i>this</i>]
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

function Map() {
    return (
        <div className={classes.map}>
            <img src={map_img} alt="sitemap" />
        </div>
    );
}
