const moment = require('moment');

const logger = (req, res, next) => {
    // console.log('Hello from the middleware, in the terminal');
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next();
    // console after postman send: ' http://localhost:5000/api/members: 2021-04-02T01:39:44+00:00 '
}



module.exports = logger;