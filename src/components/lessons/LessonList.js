import React from 'react';
import Grid from '@material-ui/core/Grid';
import lessons from './lessons.json';
import LessonCard from './LessonCard';
import Grow from '@material-ui/core/Grow';

export default () => (
    <div>
        <Grid container spacing={4}>
            {lessons.map((lesson) => (
                <Grow in={true} key={lesson.id.toString()}>
                    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                        <LessonCard lesson={lesson} />
                    </Grid>
                </Grow>
            ))}
        </Grid>
    </div>
);
