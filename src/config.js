export default {
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