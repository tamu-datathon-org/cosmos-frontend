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
import Splashpage from './Splashpage';

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
        return API.get('cosmos', '/attempts');
    }

    renderAttemptsList(attempts) {
        return [{}].concat(attempts).map((attempt, i) =>
            i !== 0 ? (
                <ListItem key={uuid.v4()}>
                    <ListItemText
                        primary={`${attempt.project.trim()}: ${attempt.challenge.trim()}`}
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
        return (<Splashpage />);
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
            <>
                {this.props.isAuthenticated ? this.renderAttempts() : this.renderLander()}
            </>
        );
    }
}
