import mongoose from 'mongoose'
import supertest from 'supertest'
import helper from './test_helper'
import Blog from '../models/blog.js'
import app from '../app'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { request } from 'express'


const api = supertest(app)

const user = {
    username: 'root',
    name: 'Superuser',
    password: 'password',
}

beforeEach(async () => {
    await User.deleteMany({})


    await api   
        .post('/api/users')
        .send(user)

    const result = await api
        .post('/api/login')
        .send(user)
    const headers = {
        'Authorization': `bearer ${result.body.token}`}

    await Blog.deleteMany({})
    

    for await (const element of helper.initialBlogs)
    {
        await api
            .post('/api/blogs')
            .send(element)
            .set(headers)
    }
})

describe('add', () => {

    test('add one blog', async () => {

        const result = await api
            .post('/api/login')
            .send(user)

        const headers = {
            'Authorization': `bearer ${result.body.token}`}

        const newBlog = {   
            title: 'Abckiria',
            author: 'Mikael Agricola',
            url: 'https://fi.wikipedia.org/wiki/Abckiria',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    })

      
})

afterAll(() => {
    mongoose.connection.close()
})