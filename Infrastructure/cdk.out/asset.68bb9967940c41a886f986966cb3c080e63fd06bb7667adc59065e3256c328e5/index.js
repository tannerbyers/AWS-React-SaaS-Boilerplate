// lambda.js
const serverless = require('serverless-http');
const expressServer = require('./expressServer')
exports.handler = serverless(expressServer);
