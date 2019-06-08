import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import React from 'react';
import LessonList from './LessonList';
import { Container } from '@material-ui/core';

export default () => (
    <div>
        <Container>
            <Grid style={{ paddingBottom: 24 }} item>
                <LinearProgress variant="determinate" color="secondary" value={70} />
            </Grid>
            <LessonList />
        </Container>
    </div>
);
