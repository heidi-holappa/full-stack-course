const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length === 0 ? 1 : 1
}

const totalLikes = (blogs) => {
  const likesSum = blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
  return likesSum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const maxLikes = blogs.reduce((max, blog) =>
    max.likes > blog.likes ? max : blog
  )
  const result = [
    {
      title: maxLikes.title,
      author: maxLikes.author,
      likes: maxLikes.likes,
    },
  ]
  return result
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const groupedBlogs = _.chain(blogs)
    .groupBy('author')
    .map((entries, author) => ({ entries, author }))
    .value()
  const maxBlogs = groupedBlogs.reduce((max, author) =>
    max.entries.length > author.entries.length ? max : author
  )
  const result = [
    {
      author: maxBlogs.author,
      blogs: maxBlogs.entries.length,
    },
  ]
  return result
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const groupedBlogs = _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author,
      likes: _.sumBy(blogs, function (o) {
        return o.likes
      }),
    }))
    .value()
  const maxBlogs = groupedBlogs.reduce((max, author) =>
    max.likes > author.likes ? max : author
  )
  const result = [
    {
      author: maxBlogs.author,
      likes: maxBlogs.likes,
    },
  ]
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
