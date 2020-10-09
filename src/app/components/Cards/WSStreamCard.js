import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classes from './Cards.module.scss';
import { useWebsocket } from '../../../hooks/useWebsocket';

const WSStreamCard = (props) => {
    const dashed = props.dashed;
    const name = props.title;
    const [message, setMessage] = useState('');
    const [to, setTo] = useState('');

    const [messages, conn] = useWebsocket({
        subscription: name,
        allowBroadcast: true,
        allowVerbose: true,
    });
    const handleSendMessage = () => {
        conn.dispatch({ message }, to);
    };

    return (
        <Card
            variant="outlined"
            style={{ border: dashed && '2px dashed rgba(0, 0, 0, 0.12)' }}
            className={classes.card}
        >
            <CardContent>
                <Typography variant="body1" component="p">
                    Subscribe to messages for: {name}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>
                        message:
                        <input
                            type="text"
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        from:
                        <input type="text" value="DASHBOARD" disabled />
                        to:
                        <input
                            type="text"
                            onChange={(e) => setTo(e.target.value)}
                        />
                        <input
                            type="button"
                            value="send"
                            onClick={handleSendMessage}
                        />
                    </label>
                </div>
                <hr />
                <div style={{ maxHeight: 500 }}>
                    {messages.map((msg, index) => (
                        <Typography variant="body2" component="p" key={index}>
                            {msg}
                        </Typography>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default WSStreamCard;
