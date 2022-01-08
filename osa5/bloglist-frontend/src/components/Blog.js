import React, { useState, useEffect, } from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'

const Blog = ({ blog, user, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const sameuser = user.username === blog.user.username

  const [values, setValues] = useState({
    likes: 0
  })

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }, [errorMessage])

  const addLikes = () => {
    try {
      blog.likes = blog.likes + 1
      useEffect(() => {
        blogService.update(blog.id, { likes: blog.likes })
          .then(setValues({ ...values, likes: blog.likes }))
      }, [])
    }
    catch (exception) {
      setErrorMessage({
        text: `${exception}`,
        type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)}, 50000)}
  }

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title}?`)) {
      deleteBlog(blog.id)
    }
  }

  const blogForm = () => (
    <>
      <p>{blog.title}</p>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <div className="like">
        <p>{blog.likes}
          <button id="like-button"
            onClick={addLikes}>
                like
          </button>
        </p>
      </div>
      <p>{blog.user.name}</p>
      {sameuser &&
                <button onClick={handleDelete}>
                    delete
                </button>}
    </>
  )

  return (
    <div
      className="blog"
      style={blogStyle}>
      <Notification message={errorMessage} />
      <div className="title">
        {blog.title}
      </div>
      <button id="view-button"
        onClick={() => setView(!view)} className='rows'>
        {view
          ? 'hide'
          : 'view'}
      </button>

      <div
        className="content"
        style={{ display: view
          ? ''
          : 'none' }}>
        {blogForm()}
      </div>
    </div>
  )
}

export default Blog