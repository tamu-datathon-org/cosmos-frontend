import React, { Component } from 'react';
import LoadingButton from '../elements/LoadingButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
            this.props.history.push('/lessons');
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                <Grid item xs={3}>
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
                        <LoadingButton
                            loading={this.state.isLoading}
                            className={this.props.classes.submitButton}
                            variant="outlined"
                            disabled={!this.validateForm()}
                            type="submit"
                            title="Login"
                            loadingTitle="Logging In"
                        />
                    </form>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(Login);
