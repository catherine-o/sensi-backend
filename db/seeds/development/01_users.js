
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'cat', name: 'Cat', password: 'test'},
        {username: 'user2', name: 'name2', password: 'test'},
        {username: 'user3', name: 'name3',  password: 'test'}
      ]);
    });
};
