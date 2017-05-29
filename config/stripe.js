const config = require('./config');
const stripe = require('stripe')(config.stripeApiKey);

stripe.setTimeout(20000);
