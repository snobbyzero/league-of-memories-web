import React, {useState} from "react";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Avatar from "@material-ui/core/Avatar";
import {Memory} from "@material-ui/icons";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert"
import Container from "@material-ui/core/Container";
import axios from "axios";
import {getFingerprint} from "../utils/fingerprintUtils";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useHistory} from "react-router-dom";

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
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        width: "100%",
        margin: theme.spacing(2, 0, 1)
    }
}));

export default function SignUp() {
    const classes = useStyles();

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup();
    }

    const signup = async () => {
        setEmailError("");
        setPasswordError("");
        setError("");
        if (email === "") {
            setEmailError("Input your email");
            return;
        } else if (password === "") {
            setPasswordError("Input your password");
            return;
        } else if (!acceptTerms) {
            setError("You must accept the Terms of Service and Privacy Policy");
            return;
        }
        setLoading(true);
        axios.post(
            `${process.env.REACT_APP_AUTH_URL}/auth/base/signup`,
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
                history.replace('/user/summoners');
            }))
            .catch((err) => {
                setLoading(false);
                let errMessage;
                if (err.response) {
                    errMessage = err.response.data;
                }
                switch (errMessage) {
                    case 'ALREADY_EXISTS':
                        setEmailError("This email is already taken");
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
                    Sign Up
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={acceptTerms}
                                onChange={() => setAcceptTerms(!acceptTerms)}
                                color="primary"
                            />
                        }
                        label={
                            <Typography>
                                {"I confirm that I am 18 years old and accept "}
                                <Link href="#">Terms of Service and Privacy Policy</Link>
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
                        {loading ? <CircularProgress size={24} color="inherit"/> : "Sign Up"}
                    </Button>
                </form>
                <Grid container>
                    <Grid item>
                        <Link href="/signin" variant="body2" color="secondary">
                            Already have an account? Sign In
                        </Link>
                    </Grid>
                </Grid>
                {
                    error &&
                        <Alert className={classes.alert} severity="error">
                            {error}
                        </Alert>
                }
            </div>
        </Container>
    );
}
