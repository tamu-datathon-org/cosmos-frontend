import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import React from 'react';
import LessonList from './LessonList';
import { Container } from '@material-ui/core';

export default () => (
    <div>
        <Grid container spacing={2} style={{ padding: 24, margin: 0, width: '100%' }}>
            <Grid item xs={12}>
                <LinearProgress variant="determinate" color="secondary" value={70} />
            </Grid>
        </Grid>
        <Container>
            <LessonList />
        </Container>
    </div>
);
