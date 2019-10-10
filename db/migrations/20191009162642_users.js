
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', t => {
        t.increments('id')
        t.string('username', 80).notNullable()
        t.string('name', 80).notNullable()
        t.string('password', 60).notNullable()
        t.timestamps()
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
  };