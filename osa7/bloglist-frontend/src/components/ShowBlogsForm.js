import React, { useState, useEffect, useRef  } from 'react'
import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'

import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const notfication_wait = 3


const ShowBlogsForm = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const AllBlogs = async () => {
      const returnedblogs = await blogService.getAll()
      setBlogs(returnedblogs.sort((a, b) => b.likes - a.likes))
    }
    AllBlogs()
  }, [])

  const addBlog = async (blogObject) => {

    try {
      blogFormRef.current.toggleVisibility()
      if (!blogObject.title || !blogObject.author || !blogObject.url) {
        dispatch(setNotification({ text: 'All fields needed', type: 'ERROR' }, notfication_wait))
      }

      const newBlog = await blogService.create(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      dispatch(setNotification({ text: `New ${newBlog.title}`, type: 'SUCCESS' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }

  const updateBlog = async (blogId, blogObject) => {
    try {
      await blogService.update(blogId, blogObject)
      const updatedBlog = { ...blogObject, blogId }
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)))
      dispatch(setNotification({ text: `Updated ${blogId}`, type: 'SUCCESS' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.del(blogId)
      setBlogs(blogs.filter((b) => b.id !== blogId))
      dispatch(setNotification({ text: `Deleted ${blogId}`, type: 'SUCCESS' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }


  const addForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  const blogForm = (blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
      updateBlog={updateBlog}
      deleteBlog={deleteBlog}
    />
  )

  return (
    <div>
      {addForm()}
      <div>
        {blogs.map((blog) => (
          blogForm(blog)
        ))}
      </div>
    </div>
  )
}

export default ShowBlogsForm