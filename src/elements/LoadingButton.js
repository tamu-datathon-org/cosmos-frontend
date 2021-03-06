import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

const LoadingButton = ({ title, loadingTitle, loading, classes, ...rest }) => (
    <div>
        <div className={classes.wrapper}>
            <Button
                variant="contained"
                color="primary"
                disabled={loading}
                {...rest}
            >
                {loading ? loadingTitle : title}
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
    </div>
);

export default withStyles(styles)(LoadingButton);
