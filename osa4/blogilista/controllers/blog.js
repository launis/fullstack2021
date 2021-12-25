import express from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import logger from '../utils/logger.js'
import mongoose from 'mongoose'

const router = express.Router()


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
        const blogs = await Blog.find({}).populate('user')
        response.json(blogs.map(blog => blog.toJSON()))
    } catch (exception) {
        next(exception)
    }
})
    
router.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
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
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,  
            user: decodedToken.id
        })

        const savedBlog = await blog.save()

        User.findByIdAndUpdate(request.user,
            { '$push': {'blogs': savedBlog._id } },
            { 'new': true, 'upsert': true },
            function (error) {
                if (error) throw error
            }
        )



        response.json(savedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

router.delete('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        const user = await User.findById(request.user)

        const blogs = []
        for (const [key, value] of Object.entries(user.blogs)) {
            if (value != request.params.id)
            {blogs.push(value)}
        }
        if ( blog.user.toString() === request.user )
        {await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()}
        const userObj = {blogs : blogs}
        await User.findOneAndUpdate(request.params.id, 
            { $set: userObj }, { upsert: true, new: true })
    } catch (exception) {
        next(exception)
    }
})


router.put('/:id', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: body.user
        }

        const user = await User.findById(body.user)
        if (!user) {
            return response.status(401).json({ error: 'invalid user' })
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog.toJSON())
    } catch (exception) {
        next(exception)
    }
})

export default router