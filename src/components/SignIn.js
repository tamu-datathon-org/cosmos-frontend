//Based on Template - https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/sign-in

import React, { Component } from 'react';
import LoadingButton from '../elements/LoadingButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { Auth, API } from 'aws-amplify';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import config from '../config';
import FacebookButton from './auth/FacebookButton';
import { withFederated, Authenticator } from 'aws-amplify-react';
import GoogleButton from 'react-google-button';
import { FacebookLoginButton } from "react-social-login-buttons";

const federatedConfig = {
    google_client_id: '605413637977-jr6t4m4mnti1smifgpedr4i471sc7vum.apps.googleusercontent.com',
    facebook_app_id: '494271277792385'
}

const buttonStyle = {
    width: '300px',
    fontSize: '20px',
    'text-align': 'center'
}

const socialSignInButtons = (props) => (
    <div>
        <GoogleButton
            style={buttonStyle}
            onClick={props.googleSignIn}
        />
        <FacebookLoginButton
            style={buttonStyle}
            onClick={props.facebookSignIn}
        />
    </div>
)

const SocialButtons = withFederated(socialSignInButtons);


const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    signInSection: {
        sectionBody: {
            display: 'none'
        },
        sectionFooter: {
            display: 'none'
        },
        strike: {
            display: 'none'
        }
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
        } catch (e) { }
    }

    async handleAuthStateChange(state) {
        if (state === 'signedIn') {
            const user = await Auth.currentAuthenticatedUser();
            console.log(user);
            try {
                const userExistsCheck = await API.get('cosmos', `/users/?email=${user.email}`);
            } catch (e) {
                console.log(e.response.status);
            }
        }
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <div className={this.props.classes.paper}>
                    {//<SocialButtons federated={federatedConfig} onStateChange={(authState) => this.handleAuthStateChange(authState)}/>
                    }
                    <Authenticator
                        federated={federatedConfig}
                        theme={{
                            sectionBody: {
                                display: 'none'
                            },
                            sectionFooter: {
                                display: 'none'
                            },
                            strike: {
                                display: 'none'
                            }
                        }}
                    />
                </div>
                <style>
                    {'form: {display: none}'}
                </style>
            </Container>
        );
    }
}
export default withStyles(styles)(CosmosSignIn);
