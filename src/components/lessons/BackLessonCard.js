import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import Fab from '@material-ui/core/Fab';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = () => ({
    card: {
        textAlign: 'center',
    },
    list: {
        textAlign: 'left',
        'list-style-type': 'none',
    },
});

const BackLessonCard = ({ lesson, handleClick, classes }) => (
    <div>
        <Card className={classes.card}>
            <Typography gutterBottom variant="h5">
                {lesson.title}
            </Typography>
            <ul className={classes.list}>
                {lesson.challenges.map((challenge) => (
                    <li>
                        ({challenge.points}) {challenge.title}
                    </li>
                ))}
            </ul>
            <CardActions>
                <Fab color="primary" aria-label="Add" onClick={handleClick}>
                    <FlipToFrontIcon />
                </Fab>
            </CardActions>
        </Card>
    </div>
);

export default withStyles(styles)(BackLessonCard);
