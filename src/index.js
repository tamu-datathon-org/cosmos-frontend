import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
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
        }, secondary: {
            main: blue,
        }, error: {
            main: green,
        },
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
