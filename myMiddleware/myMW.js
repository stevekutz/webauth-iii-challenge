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

const restrictedHOC = (role) => {
  return(req, res, next) => {
    const token = req.headers.authorization;
  
    console.log('@@@ token is \n', token);
  
    if(token) {
      jwt.verify(token, secrets.jwt, (err, payload) => {
        if(err) {
          res.status(403).json({
            message: `JWT Restricted MW says: UNAUTHORIZED`
          })
        } else 
          if(role !== payload.userRole) {
            res.status(403).json({
              message: `You DO NOT have Permission`
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

}

function routePrefixCheck (req, res, next) {
  console.log('++++ baseURL is', req.baseUrl);

  if(req.baseUrl === '/api/users/HOC'){
      console.log('%%% resticted route !!!!!\n');
      next();
  } else {
      res.status(451).json({
          message: `You cannot get here CAUSE its restricted !!`
      })
  }
  
}


module.exports = {
  myLogger2,
  restricted,
  restrictedHOC,
  routePrefixCheck
}

