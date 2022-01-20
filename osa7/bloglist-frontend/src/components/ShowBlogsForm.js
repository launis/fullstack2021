/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef  } from 'react'
import Notification from '../components/Notification'
import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'

const ShowBlogsForm = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect(() => {
    const AllBlogs = async () => {
      const returnedblogs = await blogService.getAll()
      setBlogs(returnedblogs.sort((a, b) => b.likes - a.likes))
    }
    AllBlogs()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }, [errorMessage])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      if (!blogObject.title || !blogObject.author || !blogObject.url) {
        setErrorMessage({
          text: 'All fields needed',
          type: 'error' })
        setTimeout(() => {
          setErrorMessage(null)}, 50000)
        return}

      const newBlog = await blogService.create(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))

      setErrorMessage({
        text: `New ${newBlog.title}`,
        type: 'success' })
    }
    catch (exception) {
      setErrorMessage({
        text: `${exception}`,
        type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)}, 50000)}
  }

  const updateBlog = async (blogId, blogObject) => {
    try {
      await blogService.update(blogId, blogObject)
      const updatedBlog = { ...blogObject, blogId }
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)))

      setErrorMessage({
        text: `Updated ${blogId}`,
        type: 'success' })
    }
    catch (exception) {
      setErrorMessage({
        text: `${exception}`,
        type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)}, 50000)}
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.del(blogId)
      setBlogs(blogs.filter((b) => b.id !== blogId))
      setErrorMessage({
        text: `Deleted ${blogId}`,
        type: 'success' })
    }
    catch (exception) {
      setErrorMessage({
        text: `${exception}`,
        type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)}, 50000)}
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
      <Notification message={errorMessage} />
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