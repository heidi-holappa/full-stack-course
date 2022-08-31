import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog-entries', () => {

  const mockHandlerForLikes = jest.fn()
  const mockHandlerForRemoveBlog = jest.fn()

  beforeEach(() => {
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
        handleRemoveBlog={mockHandlerForRemoveBlog}
        handleAddLike={mockHandlerForLikes}
      />
    )
  })

  test('Title and author are rendered', () => {
    screen.getByText('\'This should be found\' by Harry Acsor')
  })

  test('Default blog-entry does not show url', () => {
    const element = screen.queryByText('https://www.harry.com')
    expect(element).toBeNull()
  })

  test('Default blog-entry does not show likes', () => {
    const element = screen.queryByText('0')
    expect(element).toBeNull()
  })

  test('When button is pressed, url is shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.findByText('https://www.harry.com'))
  })

  test('When button is pressed, likes are shown', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.findByText('0'))
  })

  test('When like-button is pressed twice, eventHandler is called two times', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandlerForLikes.mock.calls).toHaveLength(2)
  })
})