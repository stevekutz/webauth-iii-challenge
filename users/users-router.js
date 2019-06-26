const router = require('express').Router();
const Users = require('./users-model');

const myMW = require('../myMiddleware/myMW');

/*
router.get('/', myMW.myLogger2, myMW.restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
       .catch(err => res.send(err)); 

})


module.exports = router;
*/

// using anonymous function inside restrictedMiddleware
const restricted2 = require('../myMiddleware/restrictedMiddleware')
/*
router.get('/', restricted2, (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
       .catch(err => res.send(err)); 

})


// using PERMISSIONS - built from these creds
// {
// 	"username": "joeStudent",
//	"password": "joeStudent"
// }
*/

// Change ther input to HOC to restrict access
//     adding myMW.routeHOCcheck will give Resticted route message & NO users!
router.get('/', myMW.restrictedHOC('student'), (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  

// Change ther input to HOC to restrict access on /HOC endpoint
//   myMW.routeHOCcheck will log Restricted route and then show users
router.get('/HOC' , myMW.routeHOCcheck, myMW.restrictedHOC('student'), (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });  

module.exports = router;
