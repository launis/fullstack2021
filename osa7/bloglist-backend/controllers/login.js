import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user.js'
import logger from '../utils/logger.js'

const router = express.Router()

router.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    // token expires in 60*60 seconds, that is, in one hour
    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      { expiresIn: 60*60 }
    )

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  } catch (exception) {
    next(exception)
  }
})

export default router