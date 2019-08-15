import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import React, { Component } from 'react';
import LessonList from './LessonList';
import { Container } from '@material-ui/core';
import { API, Auth } from 'aws-amplify';

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const pctComplete = (lessons) =>
    (sum(lessons.map((l) => sum(l.challenges.map((c) => c.points)))) /
        sum(lessons.map((l) => sum(l.challenges.map((c) => c.challenge.points))))) *
    100;

export default class extends Component {
    state = {
        projectLoading: true,
        error: '',
        lessons: [],
        email: null,
    };

    componentDidMount() {
        Auth.currentAuthenticatedUser()
            .then((res) => res.attributes.email)
            .then((email) => this.setState({ email }));
        // project_id hard coded for now
        const project_id = 'tamu_datathon';
        this.getProject(project_id);
    }

    getProject = (id) =>
        this.getScoredProject(id)
            .then(this.joinLessonChallenges)
            .then(({ lessons }) => this.setState({ lessons }))
            .catch((err) => this.setState({ error: err.response.data.errors[0] }))
            .finally(() => this.setState({ projectLoading: false }));

    getScoredChallenge = (chal) =>
        API.get(
            'cosmos',
            `/score/challenge/${chal.challengeId}?projectId=${chal.projectId}&email=${
            this.state.email
            }`
        ).then(({ data }) => ({ ...chal, ...data }));

    getScoredProject = (id) =>
        API.get('cosmos', `/projects/${id}`).then(async ({ data }) => ({
            scoredChallenges: await Promise.all(data.challenges.map(this.getScoredChallenge)),
            ...data,
        }));

    joinLessonChallenges = ({ lessons, scoredChallenges, ...rest }) => ({
        lessons: lessons.map((lesson) => ({
            challenges: scoredChallenges.filter((chal) => chal.lessonId === lesson.lessonId),
            ...lesson,
        })),
        ...rest,
    });

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

    renderLessons = (lessons, percent) => (
        <div>
            <Container>
                <Grid style={{ paddingBottom: 24 }} item>
                    {/* <LinearProgress
                        variant="determinate"
                        color="secondary"
                        value={pctComplete(lessons)}
                    />
                    <Typography>
                        {percent}%
                    </Typography> */}
                    <Progress
                        percent={percent}
                    />
                </Grid>
                <LessonList lessons={lessons} />
            </Container>
        </div>
    );

    render() {
        const { projectLoading, error, lessons, email } = this.state;
        const percent = Math.round(pctComplete(lessons));
        return projectLoading && !email
            ? this.renderLoading()
            : error
                ? this.renderError(error)
                : this.renderLessons(lessons, percent);
    }
}
