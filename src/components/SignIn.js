//Based on Template - https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/sign-in

import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Auth, API } from 'aws-amplify';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { withFederated } from 'aws-amplify-react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import GoogleSignInButton from './auth/GoogleSignInButton';
import FacebookSignInButton from './auth/FacebookSignInButton';
import { ToastContainer, toast } from 'react-toastify';

const federatedConfig = {
    google_client_id: '605413637977-jr6t4m4mnti1smifgpedr4i471sc7vum.apps.googleusercontent.com',
    facebook_app_id: '494271277792385'
}

const socialButtons = (props) => (
    <div>
        <GoogleSignInButton onClick={props.googleSignIn} />
        <FacebookSignInButton onClick={props.facebookSignIn} />
    </div>
);

const SocialButtons = withFederated(socialButtons);

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    buttonsDiv: {
        margin: theme.spacing(2),
    }
});

class CosmosSignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoading: false,
        };

        this.handleAuthStateChange = this.handleAuthStateChange.bind(this);
    }

    async componentDidMount() {
        try {
            await Auth.currentAuthenticatedUser();
            this.props.userHasAuthenticated(true);
        } catch (e) { 
            toast.info(<span><b>Issues signing in? 🧐</b><hr/>Make sure to allow popups!</span>, {
                hideProgressBar: true
            });
        }
    }

    async cosmosUserCheckOrCreate() {
        const user = await Auth.currentAuthenticatedUser();
        try {
            // Check if user exists in cosmos
            await API.get('cosmos', `/users/?email=${user.email}`);
        } catch (e) {
            // User does not exist in cosmos, create it
            console.log(e.response.status)
            if (e.response.status === 404) {
                const firstName = user.name.split(" ")[0]
                const lastName = user.name.split(" ")[1]
                await API.post('cosmos', `/users`, {
                    body: {
                        email: user.email,
                        firstName: firstName,
                        lastName: lastName
                    }
                });
            }
        }
    }

    async handleAuthStateChange(state) {
        if (state === 'signedIn') {
            try {
                await this.cosmosUserCheckOrCreate();
                this.props.userHasAuthenticated(true);
            } catch (e) { }
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <div className={this.props.classes.paper}>
                    <Avatar className={this.props.classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In / Sign Up
                    </Typography>
                    <div className={this.props.classes.buttonsDiv}>
                        <SocialButtons federated={federatedConfig} onStateChange={(authState) => this.handleAuthStateChange(authState)} />
                    </div>
                </div>
                <style>
                    {'form: {display: none}'}
                </style>
            </Container>
        );
    }
}
export default withStyles(styles)(CosmosSignIn);
