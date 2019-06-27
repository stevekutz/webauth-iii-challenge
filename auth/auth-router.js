const router = require('express').Router();
const Auth = require('./auth-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');   // ADDED IN after installing dependency

const secrets = require('../config/secrets'); // ADDED to hide secret

// REGISTER   ENDPOINT  /api
// Creates the Account Login - we MUST hash the password, adds to user table
//  username: groot      // add numbers to this to keep testing simple
//  password: iamgroot   // add numbers to this to keep testing simple
// REGISTER new user
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
  
    Auth.add(user)
      .then(saved => {
        const token = generateToken(saved);
  
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

// LOGIN - we send back a JWT token
router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Auth.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
  
          res.status(200).json({
            message: `Welcome ${user.username}!`,
            authToken: token,   // pass actual token back
            more: 'something',
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials, YOU SHALL NOT PASS !!! (hacker) ' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

// create helper function for generating JWT token, synchronously
function generateToken (user) {
    // ADD our JWT token, exp & iat are autimatically added
    return jwt.sign({
      userId: user.id,
      name: user.username,
      userRole: 'student',
 //   }, 'super secret',   // secret  CAN"T KEEP this in CODE, MUST move to .env
    }, secrets.jwt,
      { expiresIn: '1h'},   // added expiration in 1 hour
    )  

}

module.exports = router;