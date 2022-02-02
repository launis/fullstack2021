import React, { useEffect, useRef } from 'react'
import { useSelector  } from 'react-redux'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { authorizateUser } from '../reducers/loginReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import LoginUser from '../components/LoginUser'

const ShowBlogsForm = () => {

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect( () => {
    dispatch(authorizateUser())
  },[dispatch])

  useEffect( () => {
    dispatch(initializeBlogs())
  },[dispatch])

  const blogs = useSelector((state) => state.blogs)
  const login = useSelector((state) => state.login)
  if (!login) return null

  return (
    <div>
      <LoginUser />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm/>
      </Togglable>
      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 1))
        .map((blog) => {
          return (
            <li key={blog.id}>
              <NavLink to={`/blogs/${blog.id}`}>
                {blog.title} {blog.likes}
              </NavLink>
            </li>
          )
        })}
    </div>
  )
}

export default ShowBlogsForm