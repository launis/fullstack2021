import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'The Go To Statement Considered Harmful',
  author: 'Kakkonen',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 7,
  user: {
    username: 'superuser',
    name: 'root',
  },
}

const user = {
  username: 'superuser',
  name: 'root' }


describe('Blog component rendering', () => {

  test('blog by default should render title and author only', () => {

    const deleteBlog = jest.fn()
    const component = render(
      <Blog
        blog={blog}
        user={user}
        deleteBlog={deleteBlog}
      />
    )

    expect(component.container).toHaveTextContent(`${blog.title}`)
    expect(component.container).toHaveTextContent(`${blog.author}`)
  })

  test('clicking the view button displays url and number of likes', () => {
    const component = render(
      <Blog
        blog={blog}
        user={user}
      />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
    expect(component.container).toHaveTextContent('7')
  })

  test('clicking like button adds number of likes', () => {

    const component = render(
      <Blog
        blog={blog}
        user={user}
      />
    )

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('9')
  })
})