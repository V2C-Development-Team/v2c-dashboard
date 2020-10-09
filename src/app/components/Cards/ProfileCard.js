import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// import classes from './Cards.module.scss';

const ProfileCard = (props) => {
    const dashed = props.dashed;
    return (
        <Card
            variant="outlined"
            style={{
                border: dashed && '2px dashed rgba(0, 0, 0, 0.12)',
                padding: '5px 20px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: 100,
                minHeight: 75,
            }}
        >
            <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    style={{
                        width: 50,
                        height: 50,
                        marginRight: 20,
                        backgroundColor: '#502B79',
                    }}
                >
                    H
                </Avatar>
                <Typography variant="h5" component="h5">
                    Hello, Hack3er
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;
