// NEED this for verification
const secrets = require('../config/secrets'); // ADDED in to hide 'secret'

// need jwt.verify function inside 'restricted'
const jwt = require('jsonwebtoken'); 



function myLogger2(req, res, next){
    
  console.log('>>> myLogger called');

  console.log(
      ` >>> a ${req.method} method Requesteeee was made 
        >>> from url  ${req.url} 
        >>> at ${new Date().toISOString()}  from myLogger`);

  next();
};


const restricted = (req, res, next) => {
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

module.exports = {
  myLogger2,
  restricted,

}

