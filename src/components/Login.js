import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
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
    dense: {
        marginTop: theme.spacing(2),
    },
    submitButton: {
        width: '100%',
    },
});

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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

        try {
            await Auth.signIn(this.state.email, this.state.password);
            alert('Logged in');
        } catch (e) {
            alert(e.message);
        }
    };

    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '100vh' }}
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
                        <Button
                            className={this.props.classes.submitButton}
                            variant="outlined"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Login
                        </Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}
export default withStyles(styles)(Login);
