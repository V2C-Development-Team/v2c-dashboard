import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const ActivityCard = (props) => {
    const dashed = props.dashed;
    return (
        <Card
            variant="outlined"
            style={{
                border: dashed && '2px dashed rgba(0, 0, 0, 0.12)',
                width: '100%',
                overflowY: 'auto',
            }}
        >
            <CardContent>
                <Typography variant="h6" component="h6">
                    Stats
                </Typography>
                <br />
                <Divider />
                <br />
                <Typography
                    variant="body1"
                    component="p"
                    style={{ color: '#5487EB' }}
                >
                    <span
                        style={{
                            width: 7,
                            height: 7,
                            backgroundColor: '#5487EB',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: 10,
                        }}
                    ></span>{' '}
                    Connections
                </Typography>
                <div style={{ color: '#5487EB' }}>
                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>Modules</span> <span>3</span>
                    </p>
                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>Devices</span> <span>1</span>
                    </p>
                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>Apps</span> <span>1</span>
                    </p>
                </div>
                <br />
                <Typography
                    variant="body1"
                    component="p"
                    style={{ color: '#D760B0' }}
                >
                    <span
                        style={{
                            width: 7,
                            height: 7,
                            backgroundColor: '#D760B0',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: 10,
                        }}
                    ></span>
                    Commands
                </Typography>
                <div style={{ color: '#D760B0' }}>
                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>Total</span> <span>55</span>
                    </p>
                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>Completed</span> <span>45</span>
                    </p>
                    <p
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>Failed</span> <span>10</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ActivityCard;
