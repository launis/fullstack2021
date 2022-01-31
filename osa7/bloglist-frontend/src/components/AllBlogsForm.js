import React, { useEffect, useRef } from 'react'
import { useSelector  } from 'react-redux'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import { authorizateUser } from '../reducers/loginReducer'
import { create } from '../reducers/blogReducer'
import { initializeBlogs } from '../reducers/blogReducer'



const ShowBlogsForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()


  useEffect( () => {
    console.log('uE auth')
    dispatch(authorizateUser())
  },[dispatch])

  useEffect( () => {
    console.log('uE blogs')
    dispatch(initializeBlogs())
  },[dispatch])

  const blogs = useSelector((state) => state.blogs)

  const addBlog = async (blogObject) => {
    dispatch(create(blogObject))
  }

  const addForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {addForm()}
      <div>
        <ul>
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
        </ul>
      </div>
    </div>
  )
}

export default ShowBlogsForm