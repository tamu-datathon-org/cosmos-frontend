import React from 'react';
import Grid from '@material-ui/core/Grid';
import lessons from './lessons.json';
import LessonCard from './LessonCard';
import Grow from '@material-ui/core/Grow';

export default () => (
    <div>
        <Grid container spacing={2} style={{ padding: 24 }}>
            {lessons.map((lesson, i) => (
                <Grow in="true" timeout={1000 * (i + 1)}>
                    <Grid item xs={12} sm={6} lg={4} xl={3}>
                        <LessonCard lesson={lesson} />
                    </Grid>
                </Grow>
            ))}
        </Grid>
    </div>
);
