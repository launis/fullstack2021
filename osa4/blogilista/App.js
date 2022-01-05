import express from 'express'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const expressasyncerrors = require('express-async-errors')

import cors from 'cors'
import config from './utils/config.js'
import logger from './utils/logger.js'
import middleware from './utils/middleware.js'
import mongoose from 'mongoose'
import blogsRouter from  './controllers/blog.js'
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'
import testingRouter from './controllers/testing.js'


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

// app.use(tokenExtractor);
app.use(middleware.requestLogger)
app.use(middleware.errorHandler)
// app.use(userExtractor);

app.use('/api/login', middleware.tokenExtractor, loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


export default app