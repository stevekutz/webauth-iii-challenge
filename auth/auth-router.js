const router = require('express').Router();
const Auth = require('./auth-model');
const bcrypt = require('bcryptjs');

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





module.exports = router;