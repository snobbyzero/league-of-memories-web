import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import {Memory} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import {getFingerprint} from "../utils/fingerprintUtils";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        textTransform: "none",
        margin: theme.spacing(1, 0, 2),
    },
    alert: {
        width: "100%",
        margin: theme.spacing(2, 0, 1)
    },
    progress: {
        margin: theme.spacing(3)
    }
}));

// TODO if tokens are saved then show that user is already logged in
export default function SignIn() {
    const classes = useStyles();

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin()
    }

    const signin = async () => {

        setEmailError("");
        setPasswordError("");
        setError("");
        if (email === "") {
            setEmailError("Input your email");
            return;
        } else if (password === "") {
            setPasswordError("Input your password");
            return;
        }
        setLoading(true);
        axios.post(
            `${process.env.REACT_APP_AUTH_URL}/auth/base/signin`,
            {
                rememberMe: rememberMe,
                user: {
                    email: email,
                    password: password
                }
            },
            {
                withCredentials: true,
                headers: {
                    fingerprint: await getFingerprint()
                }
            })
            .then((response => {
                setLoading(false);
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                // TODO check if user has summoners
                history.replace('/user/summoners');
            }))
            .catch((err) => {
                setLoading(false);
                let errMessage;
                if (err.response) {
                    errMessage = err.response.data;
                }
                console.log(err);
                switch (errMessage) {
                    case 'INCORRECT_PASSWORD':
                        setPasswordError("Incorrect password");
                        break;
                    default:
                        setError(errMessage);
                }
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Memory/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError !== ""}
                        helperText={emailError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError !== ""}
                        helperText={passwordError}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={rememberMe}
                                color="primary"
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                        }
                        label={
                            <Typography>
                                Remember me
                            </Typography>
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        size="large"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {loading ? <CircularProgress size={24} color="inherit"/> : "Sign In"}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" color="secondary">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2" color="secondary">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    {
                        error &&
                        <Alert className={classes.alert} severity="error">
                            {error}
                        </Alert>
                    }
                </form>
            </div>
        </Container>
    );
}
