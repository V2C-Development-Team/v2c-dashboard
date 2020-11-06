import React from 'react';
import { Button, TextField } from '@material-ui/core';
import classes from './Commander.module.scss';
import { useWebsocket } from '../../hooks/useWebsocket';

const Commander = () => {
    const onCommand = (command) => {
        console.log(command);

        const instructions = command.split(' ');
        console.log(instructions);
        if (instructions && instructions.length > 3) {
            const keyword = instructions[0];
            console.log(keyword);
        }
    };

    const [conn] = useWebsocket({ subscription: 'dashboard', onCommand });
    const [msg, setMsg] = React.useState('');

    const dispatchMessage = () => {
        conn.dispatchCommand(msg);
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
