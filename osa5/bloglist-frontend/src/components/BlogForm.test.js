import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()
  const component = render(<BlogForm addBlog={addBlog} />)

  fireEvent.change(component.container.querySelector('#Title'), {
    target: { value: 'Go To Statement Considered Harmful' }, })
  fireEvent.change(component.container.querySelector('#Author'), {
    target: { value: 'Kakkonen' }, })
  fireEvent.change(component.container.querySelector('#Url'), {
    target: { value: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html' }, })
  fireEvent.submit(component.container.querySelector('#Save'))

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Go To Statement Considered Harmful')
  expect(addBlog.mock.calls[0][0].author).toBe('Kakkonen' )
  expect(addBlog.mock.calls[0][0].url).toBe('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
  // test initial value
  expect(addBlog.mock.calls[0][0].likes).toBe(0)
})