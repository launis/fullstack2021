/* eslint-disable semi */
import logger from './logger.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: 'unknown endpoint' })
    next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({error: 'invalid token'})
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({error: 'token expired'})
    }
    next(error)
}

const tokenExtractor = async (request, response, next) => {
    const authorization = await request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken || !decodedToken.id) 
        {request.token = null}
    }
    else {request.token = null}
    next()
}
const userExtractor = async (request, response, next) => {  
    if (request.token) {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        if (user)
        {request.user = user.id}
        else {request.user = null}
    } else {request.user = null}
    next()
}

const exportedObject = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
  
export default exportedObject