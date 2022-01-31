import React, { useState } from 'react'

const Blog = ({ user, blog, addLike, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (!user) return null
  const [view, setView] = useState(null)
  const sameuser = user.username === blog.user.username

  const handleLike = async () => {
    await addLike(blog.id)
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete blog ${blog.title}?`)) {
      await deleteBlog(blog.id)
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