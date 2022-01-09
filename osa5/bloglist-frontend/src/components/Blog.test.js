import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'



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
  let component

  beforeEach(() => {
    component = render(<Blog
      key={blog.id}
      blog={blog}
      user={user}
      updateBlog={jest.fn()}
      deleteBlog={jest.fn()} />)
  })

  test('blog by default should render title and author only', () => {

    expect(component.container).toHaveTextContent(`${blog.title}`)
    expect(component.container).toHaveTextContent(`${blog.author}`)
  })

  test('clicking the view button displays url and number of likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
    expect(component.container).toHaveTextContent('7')
  })

  test('if the like button is clicked twice, the event handler should be called twice', async () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')

    await waitFor(() => {
      fireEvent.click(likeButton)
      fireEvent.click(likeButton)
    })

    expect(component.container).toHaveTextContent('9')
  })
})