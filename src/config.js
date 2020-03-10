const cyan = '#49c6b2';
const blue = '#499cc6';
const green = '#49c672';

export const themeConfig = {
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
};

export const AWSConfig = {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: 'us-east-1',
        BUCKET: 'cosmos-uploads',
    },
    apiGateway: {
        REGION: 'us-east-1',
        URL: 'https://521krbkm78.execute-api.us-east-1.amazonaws.com/prod',
    },
    cognito: {
        REGION: 'us-east-1',
        USER_POOL_ID: 'us-east-1_VFK1qqip0',
        APP_CLIENT_ID: '3ir7gu6mff9pddmkgm0qa1jkvf',
        IDENTITY_POOL_ID: 'us-east-1:95d2c9cd-b186-4b33-acd0-cfe18fb37e43',
    },
};