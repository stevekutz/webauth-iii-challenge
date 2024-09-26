const router = require('express').Router();
const Auth = require('./auth-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');   // ADDED IN after installing dependency


// REGISTER
// Creates the Account Login - we MUST hash the password, adds to user table
//  username: groot      // add numbers to this to keep testing simple
//  password: iamgroot   // add numbers to this to keep testing simple
router.post('/register', (req,res) => {
    let user = req.body;

    /*
    // Make sure no blank info provided
    if( !user.username || !user.password) {
        return res.status(500).json({
           message: "Provide a username and password"
        })
      }
   
     // We can add other kinds of password checks up here before proceeding such as
     if(user.password.length < 8) {
       return res.status(400).json({
         message: `Password must be at least 8 chars`
       });
     }
    */ 
    // Main Code needed 
    const hash =bcrypt.hashSync(user.password, 14); // 2^14
    user.password = hash;


     // Main Code needed
    Auth.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(err);
        })

})

// LOGIN - we send back a JWT token
router.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Auth.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          // ADD out JWT token, exp & iat are autimatically added
          jwt.sign({
            userId: user.id,
          }, 'super secret', (err, token) => {   // secret added here & callback
            if(err) {
              res.status(401).json({message: `Could not generate token`});
            } else {
              res.status(200).json({
                message: `Welcome ${user.username}!`,
                authToken: token,   // pass actual token back
              });
            }
          })  
          /*  MOVE THIS to inside jwt sign for successful login
          res.status(200).json({
            message: `Welcome ${user.username}!`,
          });
          */
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
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
    }, 'super secret',   // secret
      { expiresIn: '1h'},   // added expiration in 1 hour
    )  

}

module.exports = router;