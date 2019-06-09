import FlipToBackIcon from '@material-ui/icons/FlipToBack';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

// Card alignment ex - https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/album
const styles = () => ({
    card: {
        height: 450,
        display: 'flex',
        flexDirection: 'column',
    },
    backgroundImage: {
        height: 150,
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
        flexDirection: 'column'
    },
    cardDescription: {
        overflowY: 'auto',
        maxHeight: '100%',
    },
    cardActions: {
        display: "flex",
        justifyContent: "space-between",
    },
});

const FrontLessonCard = ({ lesson, handleClick, classes }) => (
    <Card className={classes.card}>
        <CardMedia
            className={classes.backgroundImage}
            image="https://drive.google.com/uc?export=download&id=1GERwGehJmlhJkS-cEsV6tn715QuoVtRF"
        >
            <CardMedia
                className={lesson.completed ? classes.image : classes.imageGrayed}
                component="img"
                image={lesson.image}
                title={lesson.title}
            />
        </CardMedia>
        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5">
                {lesson.title}
            </Typography>
            <Typography className={classes.cardDescription} color="textSecondary">
                {lesson.description}
            </Typography>
        </CardContent>
        <Divider variant="middle" />
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
