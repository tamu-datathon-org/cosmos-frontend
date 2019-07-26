//Based on Template - https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/sign-up

import React, { Component } from 'react';
import LoaderButton from '../elements/LoadingButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';

const styles = (theme) => ({
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
            newUser: null,
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password,
            });
            this.setState({
                newUser,
            });
        } catch (e) {
            alert(e.message);
        }

        this.setState({ isLoading: false });
    };

    handleConfirmationSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email, this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push('/');
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    };

    renderConfirmationForm() {
        return (
            <form onSubmit={this.handleConfirmationSubmit}>
                <Typography>Please check your email for the code.</Typography>
                <TextField
                    id="confirmationCode"
                    label="code"
                    value={this.state.confirmationCode}
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <LoaderButton
                    disabled={!this.validateConfirmationForm()}
                    type="submit"
                    loading={this.state.isLoading}
                    title="Verify"
                    loadingTitle="Verifying…"
                />
            </form>
        );
    }

    renderForm() {
        return (
            <div className={this.props.classes.paper}>
                <Avatar className={this.props.classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={this.props.classes.form} noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <LoaderButton
                        disabled={!this.validateForm()}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={this.props.classes.submit}
                        loading={this.state.isLoading}
                        title="Sign Up"
                        loadingTitle="Signing Up…"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" component={RouterLink} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        );
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <div className="Signup">
                    {this.state.newUser === null
                        ? this.renderForm()
                        : this.renderConfirmationForm()}
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(Signup);
