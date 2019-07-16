//Based on Template - https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/sign-in

import React, { Component } from 'react';
import LoadingButton from '../elements/LoadingButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
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
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <div className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={this.handleSubmit} className={this.props.classes.form} noValidate>
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
                            value={this.state.email}
                            onChange={this.handleChange}
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
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <LoadingButton
                            type="submit"
                            fullWidth={true}
                            variant="contained"
                            className={this.props.classes.submit}
                            loading={this.state.isLoading}
                            disabled={!this.validateForm()}
                            title="Sign In"
                            loadingTitle="Logging In"
                        />
                        <Grid container>
                            <Grid item xs>
                                <Link to="/login/reset" component={RouterLink} variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" component={RouterLink} variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}
export default withStyles(styles)(Login);
