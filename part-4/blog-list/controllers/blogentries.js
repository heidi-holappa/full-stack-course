const blogentryRouter = require('express').Router()
/* const { response } = require('../app') */
const Blogentry = require('../models/blogentry')
/* const User = require('../models/user') */
/* const jwt = require('jsonwebtoken') */
const { userExtractor } = require('../utils/middleware')

blogentryRouter.get('/', async (request, response) => {
  const blogs = await Blogentry
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogentryRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blogentry({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

blogentryRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogToBeRemoved = await Blogentry.findById(request.params.id)
  if (blogToBeRemoved.user.toString() !== request.user.id.toString()) {
    return response.status(401).json({ error: 'Can not delete post. Token missing or invalid. User-id mismatch.' })
  }
  await Blogentry.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogentryRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blogentry = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  await Blogentry.findByIdAndUpdate(request.params.id, blogentry, { new : true })
  response.status(204).end()
})

module.exports = blogentryRouter