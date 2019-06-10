import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { API } from 'aws-amplify';
import { Link as RouterLink } from 'react-router-dom';
import uuid from 'uuid';

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            attempts: [],
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const attempts = await this.attempts();
            this.setState({ attempts });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    attempts() {
        return API.get('cosmos', '/events');
    }

    renderAttemptsList(attempts) {
        return [{}].concat(attempts).map((attempt, i) =>
            i !== 0 ? (
                <ListItem key={uuid.v4()}>
                    <ListItemText
                        primary={attempt.content.trim().split('\n')[0]}
                        secondary={
                            'Submitted: ' + new Date(attempt.createdAt).toLocaleString()
                        }
                    />
                </ListItem>
            ) : (
                <Button variant="contained" key="new">
                    <Link to="/attempts/new" component={RouterLink}>
                        <ListItem>
                            <ListItemText primary="Submit a new attempt" />
                        </ListItem>
                    </Link>
                </Button>
            )
        );
    }

    renderLander() {
        return (
            <>
                <Grid item>
                    <Typography variant="h2">Cosmos</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h5">
                        A Progress Tracker for Learning Anything
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined">
                        <Link to="/login" component={RouterLink}>
                            Login
                        </Link>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="outlined">
                        <Link to="/signup" component={RouterLink}>
                            Signup
                        </Link>
                    </Button>
                </Grid>
            </>
        );
    }

    renderAttempts() {
        return (
            <>
                <Grid item>
                    <Typography variant="h4">Your Attempts</Typography>
                </Grid>
                <Grid item>
                    <List>
                        {!this.state.isLoading &&
                            this.renderAttemptsList(this.state.attempts)}
                    </List>
                </Grid>
            </>
        );
    }

    render() {
        return (
            <Grid container direction="column" alignItems="center" spacing={4}>
                {this.props.isAuthenticated ? this.renderAttempts() : this.renderLander()}
            </Grid>
        );
    }
}
