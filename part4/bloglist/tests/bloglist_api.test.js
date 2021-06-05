const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

beforeAll(async () => {
  await User.deleteMany({})

  for (let user of helper.initialUsers) {
    await api
      .post('/api/users')
      .send(user)
  }
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const userId = await helper.firstUserId()
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  for (let blog of blogObjects) {
    blog.user = userId
  }
  const promiseBlogArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseBlogArray)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verify id property name', async () => {
  const response = await api.get('/api/blogs')
  response.body.map((item) => expect(item.id).toBeDefined())
})

test('a valid note can be added', async () => {
  const newBlog = {
    title: 'Test',
    author: 'Halit Aydin',
    url: 'www.halit.io',
    likes: 500,
    userId: await helper.firstUserId()
  }
  const token = await helper.firstUserToken()
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('token is not provided', async () => {
  const newBlog = {
    title: 'Test',
    author: 'Halit Aydin',
    url: 'www.halit.io',
    likes: 500,
    userId: await helper.firstUserId()
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

test('likes property is missing, default to the value 0', async () => {
  const newBlog = {
    title: 'Test 2',
    author: 'Halit Aydin',
    url: 'www.halitaydin.io',
    userId: await helper.firstUserId()
  }

  const token = await helper.firstUserToken()
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body[helper.initialBlogs.length].likes).toBe(0)
})

test('Bad Request', async () => {
  const newBlog = {
    author: 'Yasemin',
    likes: 10
  }

  const token = await helper.firstUserToken()
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtBeginning = await helper.blogsInDb()
    const token = await helper.firstUserToken()

    await api
      .delete(`/api/blogs/${blogsAtBeginning[0].id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      blogsAtBeginning.length - 1)
  })
})

describe('updating the information of an individual blog post', () => {
  test('update the likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newLike = {
      likes: 999,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newLike)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(999)
  })
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Kylo Ren',
      name: 'Mertcan Aydin',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('when there is initially one user in db', () => {
  // ...

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
