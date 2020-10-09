import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
/* import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MLink from '@material-ui/core/Link'; */
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import withHeaderAndFooter from '../../hoc/withHeaderAndFooter';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: '9em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [emailError, setEmailError] = useState({
        error: false,
        errorHelper: '',
    });
    const [passwordError, setPasswordError] = useState({
        error: false,
        errorHelper: '',
    });
    const [usernameError, setUsernameError] = useState({
        error: false,
        errorHelper: '',
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [passwordType, setPasswordType] = useState('password');

    const handlePasswordToggle = () => {
        setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
        setPasswordType((passwordType) =>
            passwordType === 'password' ? 'text' : 'password'
        );
    };

    const formSubmit = (data) => {
        if (!isEmail(data.email)) {
            setEmailError({
                error: true,
                errorHelper: 'Enter a valid email address',
            });
        } else {
            setEmailError({ error: false, errorHelper: '' });
        }
        if (isEmpty(data.password)) {
            setPasswordError({
                error: true,
                errorHelper: 'Password cannot be empty',
            });
        } else {
            setPasswordError({ error: false, errorHelper: '' });
        }
        if (isEmpty(data.username)) {
            setUsernameError({
                error: true,
                errorHelper: 'Username cannot be empty',
            });
        } else {
            setUsernameError({ error: false, errorHelper: '' });
        }
    };

    return (
        <Paper square elevation={0} style={{ flex: 1 }}>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={register}
                                    autoComplete="uname"
                                    name="username"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    error={usernameError.error}
                                    helperText={usernameError.errorHelper}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={register}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    error={emailError.error}
                                    helperText={emailError.errorHelper}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={register}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={passwordType}
                                    id="password"
                                    autoComplete="current-password"
                                    error={passwordError.error}
                                    helperText={passwordError.errorHelper}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handlePasswordToggle
                                                    }
                                                >
                                                    {isPasswordVisible ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            size="large"
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="center">
                            <Grid item>
                                <Link to="/login">
                                    <Typography color="primary" variant="body2">
                                        Already have an account? Sign in
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </Paper>
    );
};

export default withHeaderAndFooter(SignUp);
