import FlipToFrontIcon from '@material-ui/icons/FlipToFront';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider'
import React from 'react';

const styles = () => ({
    card: {
        height: 450,
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    cardDescription: {
        overflowY: 'auto',
        maxHeight: '100%',
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
    },
});

const BackLessonCard = ({ lesson, handleClick, classes }) => (
    <div>
        <Card className={classes.card}>   {/* raised={true} */}
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5">
                    {lesson.title}
                </Typography>
                {/* Add fade out to items as they scroll out and vice-versa */}
                <Stepper className={classes.cardDescription} activeStep={-1} orientation="vertical">
                    {lesson.challenges.map((challenge, i) => (
                        <Step key={i}>
                            <StepLabel completed={challenge.passed}>{challenge.points} {challenge.title}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </CardContent>
            <Divider variant="middle" />
            <CardActions className={classes.cardActions}>
                <IconButton color="secondary" onClick={handleClick} aria-label="Show more">
                    <FlipToFrontIcon />
                </IconButton>
            </CardActions>
        </Card>
    </div>
);

export default withStyles(styles)(BackLessonCard);
