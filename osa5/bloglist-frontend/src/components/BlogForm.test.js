import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlogMockHandler = jest.fn()

  const component = render(<BlogForm addBlog={createBlogMockHandler} />)

  const titleInput = component.container.querySelector('.titleInput')
  const authorInput = component.container.querySelector('.authorInput')
  const urlInput = component.container.querySelector('.urlInput')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'Go To Statement Considered Harmful' },
  })
  fireEvent.change(authorInput, {
    target: { value: 'Kakkonen' },
  })
  fireEvent.change(urlInput, {
    target: { value: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html' },
  })
  fireEvent.submit(form)

  expect(createBlogMockHandler.mock.calls).toHaveLength(1)
  expect(createBlogMockHandler.mock.calls[0][0].title).toBe('Go To Statement Considered Harmful')
  expect(createBlogMockHandler.mock.calls[0][0].author).toBe('Kakkonen' )
  expect(createBlogMockHandler.mock.calls[0][0].url).toBe('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
})