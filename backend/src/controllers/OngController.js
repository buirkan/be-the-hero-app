const connection = require('../db/connection')
const crypto = require('crypto')

const index =  async (request, response) => {
    const ongs = await connection('ong').select('*')

    return response.json({ ongs })
}

const create = async (request, response) => {
    const id = crypto.randomBytes(4).toString('HEX')
    const { name, email, whatsapp, city, uf } = request.body

    /* ---- Connection with database ---- */
    await connection('ong').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    })

    return response.json({ id })
}

module.exports = { index, create }