import React, { useState, useEffect, } from 'react'
import Notification from '../components/Notification'
import PropTypes from 'prop-types'


const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
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
  const [values, setValues] = useState({})

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }, [errorMessage])

  const handleLike = async () => {
    blog.likes = blog.likes + 1
    await updateBlog(blog.id, { likes: blog.likes })
    setValues({ ...values, likes: blog.likes })
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
          <button id="like-button" onClick={handleLike}>
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

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
  user: PropTypes.shape({
    token: PropTypes.string,
    username: PropTypes.string,
    name: PropTypes.string,
  }),
}