const router = require('express').Router();
const Users = require('./users-model');

const myMW = require('../myMiddleware/myMW');

router.get('/', myMW.myLogger2, myMW.restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
       .catch(err => res.send(err)); 

})


module.exports = router;