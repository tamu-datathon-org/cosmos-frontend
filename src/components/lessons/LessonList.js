import React from 'react';
import Grid from '@material-ui/core/Grid';
import LessonCard from './LessonCard';
import Grow from '@material-ui/core/Grow';

const renderLessons = (lessons) => (
    <Grid container spacing={4}>
        {lessons.map((lesson) => (
            <Grow in={true} key={lesson.lessonId.toString()}>
                <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                    <LessonCard lesson={lesson} />
                </Grid>
            </Grow>
        ))}
    </Grid>
);

export default ({ lessons }) =>
    lessons.length === 0 ? <h3>Loading...</h3> : renderLessons(lessons);
