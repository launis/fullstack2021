import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector  } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { addLike, del } from '../reducers/blogReducer'
import Togglable from '../components/Togglable'
import CommentForm from '../components/CommentForm'
import LoginUser from '../components/LoginUser'

import { authorizateUser } from '../reducers/loginReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const OneBlogForm = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(authorizateUser())
  },[dispatch])

  useEffect( () => {
    dispatch(initializeBlogs())
  },[dispatch])


  const handleLike = async () => {
    dispatch(addLike(blog.id))
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete blog ${blog.title}?`)) {
      dispatch(del(blog.id))
    }
  }

  const newComment = () => (
    <Togglable buttonLabel='new comment' >
      <CommentForm
        id={blog.id} />
    </Togglable>
  )

  const blogs = useSelector((state) => state.blogs)
  const login = useSelector((state) => state.login)

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find((blog) => blog.id === match.params.id)
    : null

  if (!blog) return null
  if (!login) return null

  const sameuser = login.username === blog.user.username

  return (
    <div>
      <LoginUser />
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


      <h2 >Added comments</h2>
      {blog.comments.length === 0
        ?
        (
          <>
            <p>Add first comment</p>
            {newComment()}
          </>
        )
        :
        (
          <ul>
            {newComment()}
            {blog.comments.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default OneBlogForm