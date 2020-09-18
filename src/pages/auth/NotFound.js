import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Container, Typography, Button } from '@material-ui/core';

import not_found from '../../assets/images/not_found.svg';

const NotFound = () => {
    return (
        <Paper elevation={0} square style={{ flex: 1, paddingTop: '9em' }}>
            <Container
                maxWidth="sm"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h3">Resource Not Found</Typography>
                <div>
                    <img
                        src={not_found}
                        alt="resource not found"
                        style={{ maxWidth: '100%', marginTop: '2em' }}
                    />
                </div>
                <Link to="/">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ marginTop: 50 }}
                    >
                        Home
                    </Button>
                </Link>
            </Container>
        </Paper>
    );
};

export default NotFound;
