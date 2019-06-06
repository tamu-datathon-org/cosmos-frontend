import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import React from 'react';
import LessonList from './LessonList';

export default () => (
    <div>
        <Grid container spacing={2} style={{ padding: 24 }}>
            <Grid item xs={12}>
                <LinearProgress value={70} variant="buffer" thickness={10} dashed />
            </Grid>
        </Grid>
        <LessonList />
    </div>
);
