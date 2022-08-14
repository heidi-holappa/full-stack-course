const blogentryRouter = require('express').Router()
const { response } = require('../app')
const Blogentry = require('../models/blogentry')
const User = require('../models/user')

blogentryRouter.get('/', async (request, response) => {
  const blogs = await Blogentry.find({})
  response.json(blogs)
})

blogentryRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

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

blogentryRouter.delete('/:id', async (request, response) => {
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