import React, { Component } from 'react';
import { Card, CardContent, CardActions, Typography, Button, CardActionArea } from '@material-ui/core';

class StickerCard extends Component {
    render() {
        return (
            <Card>
                <CardActionArea>
                    {/* <CardMedia
                        component="img"
                        alt="Galaxy"
                        height="140"
                        image="../../Images/Cards/galaxy.jpg"
                        title="Galaxy"
                    /> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Sticker
                </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            This is a sticker. Complete the challenges to earn a prize! This is a sticker. Complete the challenges to earn a prize!
                </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        More
                    </Button>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default StickerCard;