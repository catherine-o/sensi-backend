
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', t => {
        t.increments('id')
        t.string('content').notNullable()
        t.string('polarity').notNullable()
        t.string('polarity_confidence').notNullable()
        t.integer('user_id').references('id').inTable('users').onDelete('SET NULL')
        t.timestamps()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('posts')
};
