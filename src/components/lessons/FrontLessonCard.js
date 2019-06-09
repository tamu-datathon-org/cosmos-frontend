import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import React from 'react';
import clsx from 'clsx';

// Card Behaviour and Expansion - https://material.io/design/components/cards.html#behavior
// Card alignment ex - https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/page-layout-examples/album
// Referance - https://material-ui.com/components/cards/
const useStyles = makeStyles(theme => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
    },
    backgroundImage: {
        height: 250,
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
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

function FrontLessonCard({ lesson }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (
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
                <Typography component="h5" variant="h5">
                    {lesson.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    5/100
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                {lesson.link && (
                    <Button color="secondary" href={lesson.link} target="_blank">
                        {lesson.linkText}
                    </Button>
                )}
                <IconButton color="secondary" aria-label="Show more"
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}>
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Divider variant="fullWidth" />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {lesson.description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}

export default FrontLessonCard;
