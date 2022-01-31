import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector  } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogReducer'
import { authorizateUser } from '../reducers/loginReducer'
import { addLike, del } from '../reducers/blogReducer'


const OneBlogForm = () => {
  const dispatch = useDispatch()

  const handleLike = async () => {
    dispatch(addLike(blog.id))
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete blog ${blog.title}?`)) {
      dispatch(del(blog.id))
    }
  }

  useEffect( () => {
    dispatch(authorizateUser())
  },[dispatch])

  useEffect( () => {
    dispatch(initializeBlogs())
  },[dispatch])

  const blogs = useSelector((state) => state.blogs)
  const login = useSelector((state) => state.login)

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null

  if (!blog) {
    return null
  }
  const sameuser = login.username === blog.user.username

  return (
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
}

export default OneBlogForm