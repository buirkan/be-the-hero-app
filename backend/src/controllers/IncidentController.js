const connection = require('../db/connection')

const index = async (request, response) => {
    const incidentsPerPage = 5
    const { page = 1 } = request.query

    /* ------ Returning the count of incidents ------ */
    const [count] = await connection('incidents')
        .count()

    /* ------ Pagination ------ */
    const incidents = await connection('incidents')
        .join('ong', 'ong.id', '=', 'incidents.ong_id')
        .limit(incidentsPerPage)
        .offset((page - 1) * incidentsPerPage)
        .select([
            'incidents.*',
            'ong.name',
            'ong.email',
            'ong.whatsapp',
            'ong.city',
            'ong.uf'
        ])

    response.header('X-Total-Count', count['count(*)'])
    return response.json({ incidents })
}

const create = async (request, response) => {
    const { title, description, value } = request.body
    const ong_id = request.headers.authorization

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id
    })

    return response.json({ id })
}

const deleteIncident = async (request, response) => {
    const { id } = request.params
    const ong_id = request.headers.authorization

    const incidentToDelete = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first()

    if (incidentToDelete.ong_id !== ong_id)
        return response.status(401).json({ error: 'Operation not permitted' })

    await connection('incidents')
        .where('id', id)
        .delete()

    return response.status(204).send()
}

module.exports = { index, create, delete: deleteIncident }