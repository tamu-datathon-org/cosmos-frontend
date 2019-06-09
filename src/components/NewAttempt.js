import React, { Component } from 'react';
import LoadingButton from '../elements/LoadingButton';
import TextField from '@material-ui/core/TextField';
import { API } from 'aws-amplify';
import Grid from '@material-ui/core/Grid';
import config from '../config';

export default class NewAttempt extends Component {
    state = {
        file: null,
        isLoading: null,
        content: '',
    };

    validateForm() {
        return this.state.content.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    handleFileChange = (event) => {
        this.file = event.target.files[0];
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                    1000000} MB.`
            );
            return;
        }

        this.setState({ isLoading: true });

        try {
            await this.createNote({
                content: this.state.content,
            });
            this.props.history.push('/lessons');
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    };

    createNote(note) {
        return API.post('cosmos', '/events', {
            body: note,
        });
    }

    render() {
        return (
            <Grid container direction="column" alignItems="center">
                <Grid item xs={3}>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="content"
                            onChange={this.handleChange}
                            value={this.state.content}
                            type="textarea"
                        />
                        <br />
                        <br />
                        <LoadingButton
                            disabled={!this.validateForm()}
                            type="submit"
                            loading={this.state.isLoading}
                            title="Create"
                            loadingTitle="Creating…"
                        />
                    </form>
                </Grid>
            </Grid>
        );
    }
}
