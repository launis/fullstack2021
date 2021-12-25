import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import logger from '../utils/logger.js'

const router = express.Router()

router.post('/', async (request, response, next) => {

    try {
        const body = request.body
        if (body.password.length <4) {
            return response.status(400).json({ error: 'too short password' })}
        logger.info('body', body)
        const passwordHash = await bcrypt.hash(body.password, 10)
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
        logger.info('user', user)
        const savedUser = await user.save()
        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

router.get('/', async (request, response, next) => {
    try {
        const users = await User
            .find({}).populate('blogs')
        response.json(users.map(u => u.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

export default router