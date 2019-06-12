import React, { Component } from 'react';
import LoadingButton from '../elements/LoadingButton';
import TextField from '@material-ui/core/TextField';
import { API } from 'aws-amplify';
import Grid from '@material-ui/core/Grid';
import config from '../config';

export default class NewAttempt extends Component {
    state = {
        isLoading: null,
        project: '',
        lesson: '',
        challenge: '',
        answer: [],
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    validateForm = () => this.state.project && this.state.lesson && this.state.challenge;

    validatesubmission = ({ project, lesson, challenge, answer }) => {
        if (!(project && lesson && challenge)) {
            alert('Please enter a field for project, lesson and challenge.');
            return false;
        }
        if (!(answer[0] === '[' && answer[answer.length - 1] === ']')) {
            alert('Please enter the answer in the form of a list. i.e. [1, 2, 3]');
            return false;
        }
        answer = answer
            .slice(1, answer.length - 1)
            .split(',')
            .map((x) => parseInt(x));
        return { project, lesson, challenge, answer };
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const submission = this.validatesubmission(this.state);
        if (!submission) return;

        this.setState({ isLoading: true });

        try {
            await this.createAttempt(submission);
            this.props.history.push('/lessons');
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    };

    createAttempt(submission) {
        return API.post('cosmos', '/attempts', {
            body: submission,
        });
    }

    makeTextField = (name) => (
        <TextField
            id={name}
            onChange={this.handleChange}
            value={this.state[name]}
            type="textarea"
            label={name}
            multiline
            rowsMax={5}
            variant="outlined"
            margin="normal"
        />
    );

    render() {
        return (
            <Grid container direction="column" alignItems="center">
                <Grid item xs={12} md={4}>
                    <form onSubmit={this.handleSubmit}>
                        {this.makeTextField('project')}
                        <br />
                        {this.makeTextField('lesson')}
                        <br />
                        {this.makeTextField('challenge')}
                        <br />
                        {this.makeTextField('answer')}
                        <br />
                        <LoadingButton
                            disabled={!this.validateForm()}
                            type="submit"
                            loading={this.state.isLoading}
                            title="Submit"
                            loadingTitle="Submitting…"
                        />
                    </form>
                </Grid>
            </Grid>
        );
    }
}
