const blogentryRouter = require('express').Router()
const Blogentry = require('../models/blogentry')

blogentryRouter.get('/', (request, response) => {
  Blogentry
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogentryRouter.post('/', (request, response) => {
  const blog = new Blogentry(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogentryRouter