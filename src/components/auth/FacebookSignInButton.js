import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import facebook_white from '../../assets/img/facebook_white.png';

const styles = (theme) => ({
    buttonDiv: {
        cursor: 'pointer',
        backgroundColor: '#4267b2',
        width: '240px',
        height: '50px',
        margin: '15px 5px 15px 5px',
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
        color: 'white',
        verticalAlign: 'middle',
        margin: 'auto auto auto 0.5vw',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: '1.1em',
        fontFamily: 'Roboto'
    }
});

const FacebookSignInButton = (props) => (
    <div onClick={props.onClick} className={props.classes.buttonDiv}>
        <img
            src={facebook_white}
            alt="Sign In With Facebook"
            className={props.classes.buttonImg}
        />
        <span className={props.classes.buttonTextSpan}>
            <p className={props.classes.buttonText}>Sign In With Facebook</p>
        </span>
    </div>
);

export default withStyles(styles)(FacebookSignInButton);