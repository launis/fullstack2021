import mongoose from 'mongoose'
import supertest from 'supertest'
import helper from './test_helper'
import Blog from '../models/blog.js'
import app from '../app'


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


let initiallength = helper.initialBlogs.length

describe('number of blogs', () => {
    test('all blogs read', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initiallength)
    })
})

describe('id available', () => {
    test('id ok', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('add', () => {
    test('add one blog', async () => {
        const newBlog = {
            title: 'ABC kirja',
            author: "ruuneberi",
            url: "www.123.com",
            likes: 1
        }
        await api.post('/api/blogs').send(newBlog).expect(200)
        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(initiallength + 1)
    })

    test('add one blog w/o likes', async () => {
        const newBlog = {
            title: 'ABCf kirja',
            author: "ruuneberi 2",
            url: "www.12feef3.com",
        }
        await api
            .post("/api/blogs")
            .send(newBlog)
        const blogs = await helper.blogsInDb()
        expect(blogs[initiallength].likes).toBeDefined()
        expect(blogs[initiallength].likes).toBe(0)
    })      


    test('add one blog with error 400', async () => {
        const newBlog = {
            url: "www.12feef3.com",
        }
        const response = await api
            .post("/api/blogs")
            .send(newBlog)
        expect(response.status).toBe(400)
    })      
})

afterAll(() => {
    mongoose.connection.close()
})