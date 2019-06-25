const db = require('../data/dbConfig.js');

module.exports = {
  add,      // used in auth-router
 // find,
  findBy,   // used in auth-router
  findById, // used in auth-router
};

/*
function find() {
  return db('users').select('id', 'username', 'password');
}
*/

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}


function findById(id) {
  return db('users')
    .where({ id })
    .first();
}
