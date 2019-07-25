import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import React, { Component } from 'react';
import LessonList from './LessonList';
import { Container } from '@material-ui/core';
import { API, Auth } from 'aws-amplify';

export default class extends Component {
    state = {
        loading: true,
        error: '',
        lessons: [],
    };

    getScoredChallenge = async (chal) => {
        const userEmail = (await Auth.currentAuthenticatedUser()).attributes.email;
        return API.get(
            'cosmos',
            `/score/challenge/${chal.challengeId}?projectId=${
                chal.projectId
            }&email=${userEmail}`
        ).then(({ data }) => ({ ...chal, ...data }));
    }

    getScoredProject = (id) =>
        API.get('cosmos', `/projects/${id}`).then(async ({ data }) => ({
            scoredChallenges: await Promise.all(
                data.challenges.map(this.getScoredChallenge)
            ),
            ...data,
        }));

    joinLessonChallenges = ({ lessons, scoredChallenges, ...rest }) => ({
        lessons: lessons.map((lesson) => ({
            challenges: scoredChallenges.filter(
                (chal) => chal.lessonId === lesson.lessonId
            ),
            ...lesson,
        })),
        ...rest,
    });

    getProject = (id) =>
        this.getScoredProject(id)
            .then(this.joinLessonChallenges)
            .then(({ lessons }) => this.setState({ lessons }))
            .catch((err) => this.setState({ error: err.response.data.errors[0] }))
            .finally(() => this.setState({ loading: false }));

    componentWillMount() {
        // hard coded for now
        const project_id = 'tamu_datathon';
        this.getProject(project_id);
    }

    renderLoading = () => (
        <div>
            <Container>
                <div>Loading...</div>
            </Container>
        </div>
    );

    renderError = (errorMsg) => (
        <div>
            <Container>
                <div>{errorMsg}</div>
            </Container>
        </div>
    );

    renderLessons = (lessons) => (
        <div>
            <Container>
                <Grid style={{ paddingBottom: 24 }} item>
                    <LinearProgress variant="determinate" color="secondary" value={70} />
                </Grid>
                <LessonList lessons={lessons} />
            </Container>
        </div>
    );

    render() {
        const { loading, error, lessons } = this.state;
        console.log(lessons);
        return loading
            ? this.renderLoading()
            : error
            ? this.renderError(error)
            : this.renderLessons(lessons);
    }
}
