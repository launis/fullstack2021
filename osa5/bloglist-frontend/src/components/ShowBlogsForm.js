import React, { useState, useEffect, useRef  } from 'react'
import Notification from '../components/Notification'
import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'

const ShowBlogsForm = ({user}) => {
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
            const newBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(newBlog))
            setErrorMessage({
                text: `New ${newBlog.title}`,
                type: 'success'})
        }
        catch (exception) { 
            setErrorMessage({
                text: `${exception}`,
                type: 'error'})
            setTimeout(() => {
                setErrorMessage(null)}, 50000)}
    }

    const deleteBlog = async (blogId) => {
        try {
            await blogService.del(blogId)
            setBlogs(blogs.filter((b) => b.id !== blogId))
            setErrorMessage({
                text: `Deleted ${blogId}`,
                type: 'success'})
        }
        catch (exception) { 
            setErrorMessage({
                text: `${exception}`,
                type: 'error'})
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