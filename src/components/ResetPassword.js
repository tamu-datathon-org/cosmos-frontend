//Source: https://serverless-stack.com/chapters/handle-forgot-and-reset-password.html

import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import LoaderButton from '../elements/LoadingButton';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

const styles = () => ({
});

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: "",
            email: "",
            password: "",
            codeSent: false,
            confirmed: false,
            confirmPassword: "",
            isConfirming: false,
            isSendingCode: false
        };
    }

    validateCodeForm() {
        return this.state.email.length > 0;
    }

    validateResetForm() {
        return (
            this.state.code.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSendCodeClick = async (event) => {
        event.preventDefault();

        this.setState({ isSendingCode: true });

        try {
            await Auth.forgotPassword(this.state.email);
            this.setState({ codeSent: true });
        } catch (e) {
            alert(e.message);
            this.setState({ isSendingCode: false });
        }
    };

    handleConfirmClick = async (event) => {
        event.preventDefault();

        this.setState({ isConfirming: true });

        try {
            await Auth.forgotPasswordSubmit(
                this.state.email,
                this.state.code,
                this.state.password
            );
            this.setState({ confirmed: true });
        } catch (e) {
            alert(e.message);
            this.setState({ isConfirming: false });
        }
    };

    renderRequestCodeForm() {
        return (
            <form onSubmit={this.handleSendCodeClick}>
                <TextField
                    value={this.state.email}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoFocus
                    onChange={this.handleChange}
                />
                <LoaderButton
                    type="submit"
                    loadingTitle="Sending…"
                    title="Send Confirmation"
                    loading={this.state.isSendingCode}
                    disabled={!this.validateCodeForm()}
                />
            </form>
        );
    }

    renderConfirmationForm() {
        return (
            <form onSubmit={this.handleConfirmClick}>
                <TextField
                    value={this.state.code}
                    variant="outlined"
                    required
                    fullWidth
                    id="code"
                    label="Confirmation Code"
                    autoFocus
                    onChange={this.handleChange}
                />
                <Typography>Please check your email ({this.state.email}) for the confirmation code.</Typography>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                />
                <LoaderButton
                    type="submit"
                    title="Confirm"
                    loadingTitle="Confirm…"
                    loading={this.state.isConfirming}
                    disabled={!this.validateResetForm()}
                />
            </form>
        );
    }

    renderSuccessMessage() {
        return (
            <div className="success">
                <CheckCircleOutline />
                <p>Your password has been reset.</p>
                <Link to="/login" component={RouterLink} variant="body2">
                    Click here to login with your new credentials.
                    </Link>
            </div>
        );
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <div className="ResetPassword">
                    {!this.state.codeSent
                        ? this.renderRequestCodeForm()
                        : !this.state.confirmed
                            ? this.renderConfirmationForm()
                            : this.renderSuccessMessage()}
                </div>
            </Container>
        );
    }
}
export default withStyles(styles)(ResetPassword);