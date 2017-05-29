
const config = require('../config/config');

process.env.NODE_ENV = "test";
process.env.MONGO_URL = config.db;

exports.URI = '127.0.0.1';
