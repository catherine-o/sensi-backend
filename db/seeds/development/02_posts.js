
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, content: 'good day', polarity: 'positive', polarity_confidence: '0.82', user_id: 1},
        {id: 2, content: 'not feeling too great', polarity: 'negative', polarity_confidence: '0.78', user_id: 1},
        {id: 3, content: 'had an awesome day', polarity: 'positive', polarity_confidence: '0.98', user_id: 2}
      ]);
    });
};
