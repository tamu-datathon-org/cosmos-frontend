export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: 's-east-1',
        BUCKET: 'cosmos-uploads',
    },
    apiGateway: {
        REGION: 'us-east-1',
        URL: 'https://a5re5c2ld4.execute-api.us-east-1.amazonaws.com/prod',
    },
    cognito: {
        REGION: 'us-east-1',
        USER_POOL_ID: 'us-east-1_o4eIId9fl',
        APP_CLIENT_ID: '1jdbifq8c6i1v4pn916j25rk3e',
        IDENTITY_POOL_ID: 'us-east-1:01b5649c-73fc-45e5-84c1-1fc0cf06ec47',
    },
};
