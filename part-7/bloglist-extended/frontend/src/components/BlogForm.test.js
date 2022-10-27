import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { configure } from '@testing-library/dom'

configure({ testIdAttribute: 'id' })

describe('BlogForm', () => {
  test('When a new blog is posted, all required fields are included', async () => {
    const createBlog = jest.fn()

    const { container } = render(<BlogForm createBlog={createBlog} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const sendButton = screen.getByText('save')

    await userEvent.type(titleInput, 'This is a title')
    await userEvent.type(authorInput, 'Kalle Anka')
    await userEvent.type(urlInput, 'https://www.ankeborg.quack')
    await userEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('This is a title')
    expect(createBlog.mock.calls[0][0].author).toBe('Kalle Anka')
    expect(createBlog.mock.calls[0][0].url).toBe('https://www.ankeborg.quack')
  })
})
