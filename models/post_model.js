const { Model } = require('objection')
const knex = require('../db/knex')

Model.knex(knex)

class Post extends Model {
    static get tableName() {
        return 'posts'
    }

    static get relationMappings() {
        const User = require('./user_model')
        return {
            writer: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'posts.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

module.exports = Post