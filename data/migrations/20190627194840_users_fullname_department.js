
exports.up = async knex => {
    await knex.schema.table('users', tbl => {
        tbl
            .string('fullname', 128);
    /*    // CANNOT add a column with a non-constant default 
        tbl
            .timestamp('signup_at')
            .defaultTo(knex.fn.now());
    */
            tbl
            .string('department', 128)
            .defaultTo('noob');
    })
  
};

exports.down = async knex => {
    await knex.schema.table('users', tbl => {
        tbl.dropColumn('fullname');
        tbl.dropColumn('signup_at');
        tbl.dropColumn('department');
    })
};
