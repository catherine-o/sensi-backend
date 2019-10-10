
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', t => {
        t.increments('id')
        t.string('content')
        t.string('polarity')
        t.string('polarity_confidence')
        t.integer('user_id').references('id').inTable('users').onDelete('SET NULL')
        t.timestamp('created_at').defaultTo(knex.fn.now())
        t.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('posts')
};
