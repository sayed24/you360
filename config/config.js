const path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        root: rootPath,
        app: {
            name: 'you360-api'
        },
        domain: 'http://localhost:3000',
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost:27017/you360',
        secret: '~!@#$%you360^&*()',
        sendgridApiKey: process.env.SEND_GRID,
        // Stripe API key
        stripeApiKey: process.env.STRIP,
        socialAuth: {
            facebook: {
                appID: '',
                appSecret: '',
                callbackURL: ''
            },
            twitter: {
                consumerKey: 'your-consumer-key-here',
                consumerSecret: 'your-client-secret-here',
                callbackURL: 'https://yalabenanotlob.herokuapp.com/auth/tw/callback'
            },
            google: {
                clientID: 'your-secret-clientID-here',
                clientSecret: 'your-client-secret-here',
                callbackURL: 'https://yalabenanotlob.herokuapp.com/auth/go/callback'
            }
        }
    },

    test: {
        root: rootPath,
        app: {
            name: 'you360'
        },
        port: process.env.PORT || 3001,
        db: process.env.MONGO || 'mongodb://salama:123456789@ds147920.mlab.com:47920/you360',
        secret: '~!@#$%you360^&*()',
        domain: 'http://localhost:' + process.env.PORT || 3001,
        sendgridApiKey: process.env.SEND_GRID,
        stripeApiKey: process.env.STRIP,
    },

    production: {
        root: rootPath,
        app: {
            name: 'yala-bena-api'
        },
        domain: 'http://localhost:3000',
        secret: '~!@#$%salama^&*()',
        port: process.env.PORT || 3000,
        db: process.env.MONGO_URI,
        sendgridApiKey: process.env.SEND_GRID,
        stripeApiKey: process.env.STRIP,
    }
};

module.exports = config[env];
