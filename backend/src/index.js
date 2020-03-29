const express = require('express')
const cors = require('cors')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3333

/* ------ CORS ------ */
app.use(cors())

// In production
/*

app.use(cors({
    origin: http://myapp.com
}))

*/

/* ------ Informando corpo de requisições no formato JSON ------ */
app.use(express.json())

/* ------ Utilizando módulo de roteamento ------ */
app.use(routes)

/**
 * Tipos de parâmetros:
 * 
 * Query params: Parâmetros nomeados enviados na rota, após o '?' (Filtros, Paginação)
 * Obs: Se acessa através de: request.query
 * 
 * Route params: Parâmetros utilizados para identificar recursos (.../:id)
 * Obs: Se acessa através de: request.params
 * 
 * Request body: Utilizado para criar ou alterar recursos
 * Obs: Se acessa através de: request.body
 * 
 */

/**
 * Driver: SELECT * FROM users
 * Query Builder: table('users').select('*').where()
 * 
 */

app.listen(port, () => console.info(`Server started on localhost:${port}`))