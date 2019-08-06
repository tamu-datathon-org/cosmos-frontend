//Based on Template - https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/page-layout-examples/album

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import { Link as RouterLink } from 'react-router-dom';

const styles = (theme) => ({
    avatar: {
        marginBottom: 20,
        width: 160,
        height: 160,
    },
    header: {
        backgroundImage: 'url(https://revsearch-assets.s3.amazonaws.com/images/SpaceBackground.png)',
        marginTop: -20,
        minHeight: '100%',
    },
    content: {
        backgroundColor: '#1b1464',
        paddingTop: 100,
        paddingBottom: 100,
    },
    typography: {
        color: 'white',
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
});


class Splashpage extends Component {
    render() {
        return (
            <>
                <div className={this.props.classes.header}>
                    <Container>
                        {/* Hero unit */}
                        <div className={this.props.classes.heroContent}>
                            <Container maxWidth="md">
                                <Typography className={this.props.classes.typography} component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
                                    Cosmos
                            </Typography>
                                <Typography className={this.props.classes.typography} variant="h3" align="center" color="textSecondary" paragraph>
                                    Fuel Your Learning Voyage
                            </Typography>
                                <div className={this.props.classes.heroButtons}>
                                    <Grid container spacing={2} justify="center">
                                        <Grid item>
                                            <Button variant="contained" color="primary" tag={Link} to="/signup" component={RouterLink}>
                                                Sign Up
                                        </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" color="primary" tag={Link} to="/login" component={RouterLink}>
                                                Sign In
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Container>
                        </div>
                    </Container>
                </div>
                <div className={this.props.classes.content}>
                    <Container>
                        <Typography className={this.props.classes.typography} align="center" paragraph>
                            Cosmos is for helping you deeply engage in your data science learning journey through gamification.
                            </Typography>
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt="Planet" src="https://revsearch-assets.s3.amazonaws.com/images/planet1.png" className={this.props.classes.avatar} />
                        </Grid>
                        <Typography className={this.props.classes.typography} align="center" paragraph>
                            Attempt challenges in whatever coding language you want and submit your answers to Cosmos.
                    </Typography>
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt="Planet" src="https://revsearch-assets.s3.amazonaws.com/images/planet1.png" className={this.props.classes.avatar} />
                        </Grid>
                        <Typography className={this.props.classes.typography} align="center" paragraph>
                            Our judging engine automatically grades your submissions based on various metrics.
                    </Typography>
                        <Grid container justify="center" alignItems="center">
                            <Avatar alt="Planet" src="https://revsearch-assets.s3.amazonaws.com/images/planet1.png" className={this.props.classes.avatar} />
                        </Grid>
                        <Typography className={this.props.classes.typography} align="center" paragraph>
                            Track your progress through the Cosmos gamified dashboard and redeem real-life prizes like stickers and a t-shirt for your accomplishments.
                        </Typography>
                    </Container></div>
            </>
        );
    }
}
export default withStyles(styles)(Splashpage);
