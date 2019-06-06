import React from 'react'
import Grid from '@material-ui/core/Grid'
import lessons from './lessons.json';
import LessonCard from './LessonCard';

export default () => (
    <div>
        <Grid container spacing={2} style={{padding: 24}}>
            { lessons.map(lesson => (
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <LessonCard lesson={lesson} />
                </Grid>
            ))}
        </Grid>
    </div>
);
