
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {content: 'good day', polarity: 'positive', polarity_confidence: '0.82', user_id: 1},
        {content: 'not feeling too great', polarity: 'negative', polarity_confidence: '0.78', user_id: 1},
        {content: 'had an awesome day', polarity: 'positive', polarity_confidence: '0.98', user_id: 2}
      ]);
    });
};
