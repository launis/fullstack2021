import mongoose from 'mongoose'
import supertest from 'supertest'
import helper from './test_helper'
import app from '../app'
import bcrypt from 'bcrypt'
import User from '../models/user.js'


const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const user = {
    username: 'root',
    name: 'Superuser',
    password: 'password',
  }
  await api
    .post('/api/users')
    .send(user)
})

describe('user', () => {
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(user.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const user = {
      username: 'root',
      name: 'Superuser',
      password: 'password',
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
}
)

afterAll(() => {
  mongoose.connection.close()
})