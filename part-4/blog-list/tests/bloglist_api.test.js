const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blogentry')
const User = require('../models/user')

const helper = require('./test_helper')

const api = supertest(app)

let authToken = null
let users = null

beforeEach(async () => {
  await Blog.deleteMany({})

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({ username: 'potato', passwordHash })

  await user.save()
  //login
  const login = await api
    .post('/api/login')
    .send({ username: 'potato', password: 'salasana' })
    .expect(200)
    .expect('Content-Type', /application\/json/)

  authToken = `bearer ${login.body.token}`
  users = await helper.usersInDb()
  const userid = users[0].id
  const initialBlogentries = [
    {
      title: 'Bad luck follows me around',
      author: 'Kalle Anka',
      url: 'https://www.kalle-anka.kvaak/bad-luck',
      likes: 0,
      user: userid
    },
    {
      title: 'No such thing as luck',
      author: 'Alexander Lukas',
      url: 'https://www.lycksam-lukas.kvaak/no-such-thing',
      likes: 0,
      user: userid
    }
  ]
  await Blog.insertMany(initialBlogentries)
  const blogs = await helper.blogsInDb()
  console.log('initial blogs', blogs)
})


describe('when some blogs are initially saved', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog entries are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogentries.length)
  })

  test('a specified blog title is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
      'No such thing as luck'
    )
  })

  test('fetched blogs have a path id', async () => {
    const response = await helper.blogsInDb()
    expect(response[0].id).toBeDefined()
  })

  describe('updating an existing blogentry', () => {
    test('blogentry title changes when updated', async () => {
      const entries = await helper.blogsInDb()
      const id = entries[0].id

      const updatedpost = {
        title: 'Bad luck tends to follow me around',
        author: 'Kalle Anka',
        url: 'https://www.kalle-anka.kvaak/bad-luck',
        likes: 0
      }

      await api
        .put(`/api/blogs/${id}`)
        .send(updatedpost)
        .expect(204)

      const response = await helper.blogsInDb()
      expect(response[0].title).toBe('Bad luck tends to follow me around')
    })

  })

  describe('deleting a blogentry', () => {

    test('deleting a blogentry reduces numbers of blogs by one', async () => {
      const entries = await helper.blogsInDb()
      const id = entries[0].id

      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', authToken)
        .expect(204)

      const response = await helper.blogsInDb()
      expect(response).toHaveLength(helper.initialBlogentries.length - 1)
    })

    test('blogentry id is not found after entry has been deleted', async () => {
      const entries = await helper.blogsInDb()
      const id = entries[0].id

      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', authToken)
        .expect(204)

      const response = await api.get('/api/blogs')
      const ids = response.body.map(r => r.id)
      expect(ids).not.toContain(id)

    })
  })

  describe('adding a new blogentry', () => {


    test('a valid blogentry can be added ', async () => {
      const newBlogentry = {
        title: 'Computers are essential for smart business',
        author: 'Joakim von Anka',
        url: 'https://www.free-blog-platform.kvaak/computers-smart-business',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', authToken)
        .send(newBlogentry)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogentries.length + 1)
      const response = await api.get('/api/blogs')

      const contents = response.body.map(r => r.title)
      expect(contents).toContain(
        'Computers are essential for smart business'
      )
    })

    test('blogentry without author is not added', async () => {
      const newBlogentry = {
        title: 'Why charities are humbug',
        url: 'https://www.free-blog-platform.kvaak/humbug-charities',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', authToken)
        .send(newBlogentry)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogentries.length)
    })

    test('blogentry without title and url is not added', async () => {
      const newBlogentry = {
        author: 'Kalle Anka',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .set('Authorization', authToken)
        .send(newBlogentry)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogentries.length)
    })

    test('if value for likes is not given, likes are set to zero', async () => {
      await Blog.deleteMany({})

      const newBlogentry = {
        title: 'No likes to be given',
        author: 'Unliked',
        url: 'https://www.unliked.org',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', authToken)
        .send(newBlogentry)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await helper.blogsInDb()
      expect(response[0].likes).toBe(0)

    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})