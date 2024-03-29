const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list are calculated right', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    expect(result).toBe(36)
  })

})


describe('favorite blog', () => {
  test('of empty list is zero', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog, that blog is returned', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const comparison = [
      {
        title : 'Go To Statement Considered Harmful',
        author : 'Edsger W. Dijkstra',
        likes : 5
      }
    ]
    expect(result).toEqual(comparison)
  })

  test('when list has multiple blogs, one of the blogs with most votes is returned', () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    const comparison = [
      {
        title : 'Canonical string reduction',
        author : 'Edsger W. Dijkstra',
        likes : 12
      }
    ]
    expect(result).toEqual(comparison)
  })
})


describe('author with most blogs', () => {
  test('when a list has multiple blogs, return one of the authors with most blogs', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    const comparison = [
      {
        author : 'Robert C. Martin',
        blogs : 3
      }
    ]
    expect(result).toEqual(comparison)
  })

  test('when a list has one blog, return the author with a count of one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const comparison = [
      {
        author : 'Edsger W. Dijkstra',
        blogs : 1
      }
    ]
    expect(result).toEqual(comparison)
  })
})

describe('author with most likes', () => {
  test('when a list has multiple blogs, return author with most likes', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    const comparison = [
      {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }
    ]
    expect(result).toEqual(comparison)
  })

  test('when a list has just one entry, return likes of that entry', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const comparison = [
      {
        author : 'Edsger W. Dijkstra',
        likes : 5
      }
    ]
    expect(result).toEqual(comparison)
  })

  test('when a list has no entries, return 0', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toBe(0)
  })
})

const listWithMultipleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const emptyList = []