import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
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
    };

    return (
        <Paper square elevation={0} style={{ flex: 1 }}>
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={handleSubmit((data) => formSubmit(data))}
                    >
                        <TextField
                            inputRef={register}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={emailError.error}
                            helperText={emailError.errorHelper}
                        />
                        <TextField
                            inputRef={register}
                            variant="outlined"
                            margin="normal"
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
                                            onClick={handlePasswordToggle}
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
                        <FormControlLabel
                            control={
                                <Checkbox
                                    inputRef={register}
                                    defaultValue={false}
                                    name="remember"
                                    color="primary"
                                />
                            }
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            size="large"
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Typography color="primary" variant="body2">
                                    Forgot password?
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Link to="/register">
                                    <Typography color="primary" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}></Box>
            </Container>
        </Paper>
    );
}