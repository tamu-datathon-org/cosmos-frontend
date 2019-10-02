import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import google_logo from '../../assets/img/google_logo.png';

const styles = (theme) => ({
    buttonDiv: {
        cursor: 'pointer',
        backgroundColor: '#FFFFFF', // #4285F4
        width: '240px',
        height: '50px',
        margin: '5px 5px 5px 5px',
        border: '1px solid #666666'
    },
    buttonImg: {
        width: '30px',
        display: 'inline-block',
        margin: 'auto 10px auto 10px',
        verticalAlign: 'middle',
    },
    buttonTextSpan: {
        height: '100%',
        display: 'inline-block',
        color: '#666666',
        verticalAlign: 'middle',
        margin: 'auto auto auto 0.5vw',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: '1.1em',
        fontFamily: 'Roboto'
    }
});
const GoogleSignInButton = (props) => (
    <div onClick={props.onClick} className={props.classes.buttonDiv}>
        <img
            src={google_logo}
            alt="Sign In With Google"
            className={props.classes.buttonImg}
        />
        <span className={props.classes.buttonTextSpan}>
            <p className={props.classes.buttonText}>Sign In With Google</p>
        </span>
    </div>
);

export default withStyles(styles)(GoogleSignInButton);