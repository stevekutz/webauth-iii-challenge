
exports.up = async knex => {
  await knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl
        .string('username', 128)
        .notNullable()
        .unique();
    tbl
        .string('password', 128)
        .notNullable();
    
    tbl   
        .timestamp('created_at')
        .defaultTo(knex.fn.now());

  })
};

exports.down = async knex =>  {
    await knex.schema.dropTableIfExists('users');
};
