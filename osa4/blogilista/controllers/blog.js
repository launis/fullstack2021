import express from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

const validateToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    else return (decodedToken.id)
  } 
  catch (exception) {
    throw { 
      status: 401,
      message: 'Token missing or invalid',
      name: 'TokenExpiredError' }
    }
}


router.get('/info', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.send(`Amount of blogs: ${blogs.length}<br><br>${Date()}`)
  } catch (exception) {
    next(exception)
  }
})

router.get('/', async (request, response, next) => {
  try {
    validateToken(request.token)
    const blogs = await Blog.find({}).populate('user')

    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

router.get('/:id', async (request, response, next) => {
  try {
    validateToken(request.token)
    const blog = await Blog.findById(request.params.id).populate('user')
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})


router.post('/', async (request, response, next) => {
  try {
    const userid = validateToken(request.token)
    const body = request.body
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: userid
    })

    const savedBlog = await blog.save()
    await User.findByIdAndUpdate(request.user,
      { '$push': { 'blogs': savedBlog._id } },
      { 'new': true, 'upsert': true },
    )
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

router.delete('/:id', async (request, response, next) => 
{
  try {
    validateToken(request.token)
    const id = request.params.id
    const userid = request.user
    const blog = await Blog.findById(id)
    const user = await User.findById(userid)
    const blogs = []
    for await (const [key, value] of Object.entries(user.blogs)) {
      if (value.toString() !== id)
        {blogs.push(value)}}
    const body = { blogs : blogs }
    if ( blog.user.toString() === userid )
    {
      await Blog.findByIdAndRemove(id)
      await User.findByIdAndUpdate(userid, body, { new: true })
      response.status(204).end()}
    else {
      return response.status(401).json({
        error: 'Unauthorized to access the blog',
      })
    }
  } catch (exception) {
    next(exception)
  }
})

router.put('/:id', async (request, response, next) => {
  try {
    validateToken(request.token)
    const id = request.params.id
    const body = request.body
    if (body.user) {
      const user = await User.findById(body.user)
      if (!user) {
        return response.status(401).json({ error: 'invalid user' })
      }
    }
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

export default router