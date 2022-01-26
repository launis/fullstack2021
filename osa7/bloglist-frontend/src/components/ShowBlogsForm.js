import React, {  useEffect, useRef } from 'react'
import { useSelector  } from 'react-redux'
import { useDispatch } from 'react-redux'
import BlogForm from '../components/BlogForm'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'
import { update } from '../reducers/blogReducer'
import { create, del } from '../reducers/blogReducer'
import { initialize } from '../reducers/blogReducer'


// const [blogs, setBlogs] = useState([])
const ShowBlogsForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const blogs = useSelector((state) => state.blogs)
  
  useEffect( () => {
    dispatch(initialize())
  },[dispatch])

  const addBlog = async (blogObject) => {
    dispatch(create(blogObject))
  }

  const updateBlog = async (blogId, blogObject) => {
    dispatch(update(blogId, blogObject))
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
      blog={blog}
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