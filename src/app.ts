import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import * as middlewares from './middlewares'
import api from './api/test'
import * as swagger from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/api', api)

const specs = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Lavalink Tester',
          version: '1.0.0',
        },
      },
      apis: ['./src/api/documentation.ts'], // files containing annotations as above
    }
)

app.use('/', swagger.serve, swagger.setup(specs, {explorer: true})) // thonk

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

export default app
