import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = () => ({
    card: {
        textAlign: 'center',
    },
    image: {
        height: 150,
        objectFit: 'contain',
        filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.2))',
        paddingTop: 20,
    },
    imageGrayed: {
        height: 150,
        objectFit: 'contain',
        paddingTop: 20,
        opacity: 0.2,
        filter: "grayscale(100%)",
    }
});

const LessonCard = ({ lesson, classes }) => (
    <div>
        <Card className={classes.card}>
            {/* Sticker effect - http://one-stop-creative-cafe.blogspot.com/2008/10/creating-sticker-effect-in-photoshop.html */}
            <CardMedia
                className={lesson.completed ? classes.image : classes.imageGrayed }
                component="img"
                image={lesson.image}
                title={lesson.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {lesson.title}
                </Typography>
                <Typography color="textSecondary" variant="body2">{lesson.description}</Typography>
            </CardContent>
            <Divider variant="middle" />
            <CardActions>
                {lesson.link && (
                    <Button
                        color="primary"
                        href={lesson.link}
                        target="_blank"
                    >
                        {lesson.linkText}
                    </Button>
                )}
                {/* <Fab color="primary">
                    <MoreVert />
                </Fab> */}
            </CardActions>
        </Card>
    </div>
);

export default withStyles(styles)(LessonCard);