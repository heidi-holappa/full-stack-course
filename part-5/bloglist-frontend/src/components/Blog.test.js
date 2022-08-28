import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {

  const mockHandler = jest.fn()

  const currentUser = {
    username: 'Kalle Anka',
    password: 'kvaakkvaak'
  }

  const blog = {
    author: 'Harry Acsor',
    title: 'This should be found',
    url: 'https://www.harry.com',
    likes: 0,
    user: currentUser
  }

  render(
    <Blog
      data-testid='testblog'
      blog={blog}
      currentUser={currentUser}
      handleRemoveBlog={mockHandler}
      handleAddLike={mockHandler}
    />
  )

  screen.getByText('\'This should be found\' by Harry Acsor')
})