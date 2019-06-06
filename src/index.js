import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { BrowserRouter } from 'react-router-dom';

const THEME = createMuiTheme({
    palette: {
        primary: {
            dark: "#04bea8",
            main: "#88cfc3",
            light: "#cbe9e2"
        },
        secondary: {
            dark: "#4286F3",
            main: "#4FC2F8"
        }
    },
});

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider theme={THEME}>
            <App />
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

registerServiceWorker();
