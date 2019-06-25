const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


// define routers
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const restrictRouter = require('./restricted/restricted-router');


// define express app as server
const server = express();

// mount the middleware
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(serverLogger);


// define actual endpoints for router objects
server.use('/api/register', authRouter);
server.use('/api/users', usersRouter);  // changed route to include /api/
server.use('/api/restricted', restrictRouter);


// define custom Middleware
function serverLogger(req, res, next) {
    console.log('>>> myLoggerServer called');

    console.log(
        ` >>> a ${req.method} method Requesteeee was made 
          >>> from url  ${req.url} 
          >>> at ${new Date().toISOString()}  from myLogger`);

    next();

}

// sanity check
server.get('/', (req, res) => {
    res.cookie('TestCookie', 'myTestCookie!!!!');
 //   res.status(201).json({message: `Sanity Check works!!!`});
    // OR
    res.send(`<h3> Sanity check HTML </h3>`);

});

// define exports obj as server
module.exports = server;