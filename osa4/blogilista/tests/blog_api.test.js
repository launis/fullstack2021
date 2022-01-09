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

const set_headers = async (user) => {
  const result = await api
  .post('/api/login')
  .send(user)
  if (result.body.token)
    return {'Authorization': `bearer ${result.body.token}`}
}

beforeEach(async () => {
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send(user)
  
  const headers = await set_headers(user)

  await Blog.deleteMany({})

  for await (const element of helper.initialBlogs)
  {
    await api
      .post('/api/blogs')
      .send(element)
      .set(headers)
  }
})

describe('blogs found', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('id right formula', () => {
  test('id or _id', async () => {
    const blog = await helper.blogsInDb()
    expect(blog[0].id).toBeDefined()
    expect(blog[0]._id).toBe(undefined)
  })
})

describe('add', () => {

  test('add one blog', async () => {

    const headers = await set_headers(user)
    
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
      .expect(200)
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('add blog with no likes', async () => {
    const headers = await set_headers(user)

    const newBlog = {
      title: 'Abckiria',
      author: 'Mikael Agricola',
      url: 'https://fi.wikipedia.org/wiki/Abckiria',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(200)
    const blogs = await helper.blogsInDb()

    expect(blogs[helper.initialBlogs.length].likes).toBeDefined()
    expect(blogs[helper.initialBlogs.length].likes).toBe(0)
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('add blog with no url and no title ', async () => {
    const headers = await set_headers(user)

    const newBlog = {
      author: 'Mikael Agricola',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set(headers)
      .expect(400)
  })
  test('add one blog, wrong user', async () => {

    const wronguser = {
      username: 'proos',
      name: 'aknflkasj',
      password: 'passworasasd',
    }
    
    const headers = await set_headers(wronguser)

    const newBlog = {
      title: 'Abckiria',
      author: 'Mikael Agricola',
      url: 'https://fi.wikipedia.org/wiki/Abckiria',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
    expect(headers).toBe(undefined)
  })
})

afterAll( async () => {
  await Blog.deleteMany({})
  mongoose.connection.close()
})