import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import Amplify from 'aws-amplify';
import config from './config';
import './assets/scrollbar.css';

//CssBaseline - https://material-ui.com/components/css-baseline/
//Source Code - https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/CssBaseline/CssBaseline.js
import CssBaseline from '@material-ui/core/CssBaseline';

const cyan = '#49c6b2';
const blue = '#499cc6';
const green = '#49c672';

const THEME = createMuiTheme({
    palette: {
        //Palette Doc - https://material-ui.com/customization/palette/
        //Color Doc - https://material-ui.com/customization/color/
        //Color Picker Tool - https://material.io/inline-tools/color/
        // Main provided, Dark, Light, and Contrast Text will be auto generated
        primary: {
            main: cyan,
            contrastText: '#fff',
        },
        secondary: {
            main: blue,
        },
        error: {
            main: green,
        },
    },
    typography: {
        fontFamily: [
            "'Comfortaa', 'cursive'",
            "'Open Sans', 'sans-serif'",
        ].join(','),
    },
    props: {
        MuiTypography: {
            variantMapping: {
                h1: "'Comfortaa', 'cursive'",
                h2: "'Open Sans', 'sans-serif'",
                h3: 'h2',
                h4: 'h2',
                h5: 'h2',
                h6: 'h2',
                subtitle1: 'h2',
                subtitle2: 'h2',
                body1: 'span',
                body2: 'span',
            },
        },
    },
});

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
    },
    API: {
        endpoints: [
            {
                name: 'cosmos',
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION,
            },
        ],
    },
});

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={THEME}>
            <CssBaseline />
            <App />
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
