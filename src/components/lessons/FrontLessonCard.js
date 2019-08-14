import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
// import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';

// Card alignment ex - https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/album
const styles = () => ({
  card: {
    height: 450,
    display: 'flex',
    flexDirection: 'column',
  },
  backgroundImage: {
    height: '45%',
    objectFit: 'cover',
    padding: 20,
  },
  image: {
    height: '100%',
    objectFit: 'contain',
    filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))',
  },
  imageGrayed: {
    height: '100%',
    objectFit: 'contain',
    opacity: 0.3,
    filter: 'grayscale(100%)',
  },
  cardContent: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  cardDescription: {
    overflowY: 'auto',
    maxHeight: '100%',
    //For Scroll Bar
    paddingRight: 5,
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const isCompleted = (lesson) => lesson.challenges.every((c) => c.passed);

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const pctComplete = (lesson) =>
  (sum(lesson.challenges.map((c) => c.points)) /
    sum(lesson.challenges.map((c) => c.challenge.points))) *
  100;

const FrontLessonCard = ({ lesson, handleClick, classes }) => (
  <Card className={classes.card}>
    <CardMedia
      className={classes.backgroundImage}
      image="https://drive.google.com/uc?export=download&id=1GERwGehJmlhJkS-cEsV6tn715QuoVtRF"
    >
      <CardMedia
        className={isCompleted(lesson) ? classes.image : classes.imageGrayed}
        component="img"
        image={lesson.image}
        title={lesson.name}
      />
    </CardMedia>
    <CardContent className={classes.cardContent}>
      <Typography gutterBottom variant="h5">
        {lesson.name}
      </Typography>
      <Typography className={classes.cardDescription} color="textSecondary">
        {lesson.description}
      </Typography>
    </CardContent>
    <LinearProgress variant="determinate" color="secondary" value={pctComplete(lesson)} />
    {/* <Divider variant="middle" /> */}
    <CardActions className={classes.cardActions}>
      {lesson.link && (
        <Button color="secondary" href={lesson.link} target="_blank">
          {lesson.linkText}
        </Button>
      )}
      <IconButton color="secondary" onClick={handleClick} aria-label="Show more">
        <FlipToBackIcon />
      </IconButton>
    </CardActions>
  </Card>
);

export default withStyles(styles)(FrontLessonCard);
