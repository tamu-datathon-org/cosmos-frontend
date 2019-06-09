import React, { Component } from 'react';
import LoaderButton from '../elements/LoadingButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Auth } from 'aws-amplify';

const styles = (theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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
                {/* <FormControlLabel>Confirmation Code</FormControlLabel> */}
                <TextField
                    id="confirmationCode"
                    label="code"
                    value={this.state.confirmationCode}
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <Typography>Please check your email for the code.</Typography>
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
            <form onSubmit={this.handleSubmit}>
                <TextField
                    id="email"
                    label="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <br />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    margin="normal"
                    value={this.state.password}
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    variant="outlined"
                />
                <br />
                <TextField
                    id="confirmPassword"
                    label="Confirm"
                    type="password"
                    margin="normal"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    className={this.props.classes.textField}
                    variant="outlined"
                />
                <br />
                <LoaderButton
                    disabled={!this.validateForm()}
                    type="submit"
                    loading={this.state.isLoading}
                    title="Signup"
                    loadingTitle="Signing up…"
                />
            </form>
        );
    }

    render() {
        return (
            <Grid container direction="column" alignItems="center">
                <Grid item xs={3}>
                    <div className="Signup">
                        {this.state.newUser === null
                            ? this.renderForm()
                            : this.renderConfirmationForm()}
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(Signup);
