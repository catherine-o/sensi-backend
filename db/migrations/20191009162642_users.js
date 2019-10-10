
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', t => {
        t.increments('id')
        t.string('username', 80)
        t.string('name', 80)
        t.string('password', 60)
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
  };