const knex = require('knex')
const dbConfiguration = require('../../knexfile')

const connection = knex(dbConfiguration.development)

module.exports = connection