import express from 'express'
import cors from 'cors'
import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import mongoose from 'mongoose'
import blogRouter from  './controllers/blog.js'

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
logger.info('connecting to', config.MONGODB_URI)


mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


export default app