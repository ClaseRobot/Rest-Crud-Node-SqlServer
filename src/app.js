import express from 'express'
import config from './config.js'

import productsRoutes from './routes/products.routes.js'

const app = express()

//settings
app.set('port', config.port)

//middlawares
app.use(express.json()) // manda los datos en json a la BD
app.use(express.urlencoded({extended: false})) //reciba datos de formularios

app.use(productsRoutes)

export default app