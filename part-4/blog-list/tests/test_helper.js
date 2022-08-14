const Blog = require('../models/blogentry')
const User = require('../models/user')

const initialBlogentries = [
  {
    title: 'Bad luck follows me around',
    author: 'Kalle Anka',
    url: 'https://www.kalle-anka.kvaak/bad-luck',
    likes: 0
  },
  {
    title: 'No such thing as luck',
    author: 'Alexander Lukas',
    url: 'https://www.lycksam-lukas.kvaak/no-such-thing',
    likes: 0
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'Deleted within this test',
      author: 'Anonymous',
      url: 'https://www.anonymous-blog.org/',
      likes: 0
    }
  )
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogentries,
  nonExistingId,
  blogsInDb,
  usersInDb
}