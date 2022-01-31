import React, { useEffect, useRef } from 'react'
import { useSelector  } from 'react-redux'
import { useDispatch } from 'react-redux'
import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'
import { authorizateUser } from '../reducers/loginReducer'
import { addLike, create, del } from '../reducers/blogReducer'
import { initializeBlogs } from '../reducers/blogReducer'

const ShowBlogsForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blogs)


  useEffect( () => {
    console.log('uE auth')
    dispatch(authorizateUser())
  },[dispatch])

  useEffect( () => {
    console.log('uE blogs')
    dispatch(initializeBlogs())
  },[dispatch])

  const addBlog = async (blogObject) => {
    dispatch(create(blogObject))
  }

  const likeBlog = async (blogId) => {
    dispatch(addLike(blogId))
  }

  const deleteBlog = async (blogId) => {
    dispatch(del(blogId))
  }

  const addForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  const blogForm = (blog) => (
    <Blog
      key={blog.id}
      user={user}
      blog={blog}
      addLike={likeBlog}
      deleteBlog={deleteBlog}
    />
  )


  return (
    <div>
      {addForm()}
      <div>
        {blogs
          .sort((a, b) => (a.likes > b.likes ? -1 : 1))
          .map((blog) => (
            blogForm(blog)
          ))}
      </div>
    </div>
  )
}

export default ShowBlogsForm