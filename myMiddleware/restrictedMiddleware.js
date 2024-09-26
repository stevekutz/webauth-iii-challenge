// NEED this for verification
const secrets = require('../config/secrets'); // ADDED in to hide 'secret'

// need jwt.verify function inside 'restricted'
const jwt = require('jsonwebtoken'); 



module.exports = (req, res, next) => {
    const token = req.headers.authorization;
  
    console.log('@@@ token is \n', token);
  
    if(token) {
      jwt.verify(token, secrets.jwt, (err, payload) => {
        if(err) {
          res.status(403).json({
            message: `JWT Restricted MW says: UNAUTHORIZED`
          })
        } else {
          req.userId = payload.userId;
          next();
        }
  
      })
    } else {
      res.status(400).json({ message: 'No credentials provided' });
    }
  
  };