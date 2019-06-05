import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default ({ lesson }) => (
    <div>
        <Card style={{ height: '450px' }}>
            <CardMedia
                style={{ height: 0, paddingTop: '56.25%' }}
                image={`${lesson.image}`}
                title={lesson.title}
            />
            <CardContent style={{ height: '120px' }}>
                <Typography gutterBottom variant="headline" component="h2">
                    {lesson.title}
                </Typography>
                <Typography component="p">{lesson.description}</Typography>
            </CardContent>
            <CardActions>
                {lesson.link && (
                    <Button
                        size="small"
                        color="primary"
                        href={lesson.link}
                        target="_blank"
                    >
                        {lesson.linkText}
                    </Button>
                )}
            </CardActions>
        </Card>
    </div>
);
