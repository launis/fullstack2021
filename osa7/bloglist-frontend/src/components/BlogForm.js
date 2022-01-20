import React, { useState } from 'react'
import PropTypes from 'prop-types'


const BlogForm = ({ addBlog }) => {
  const [title, newTitle] = useState('')
  const [author, newAuthor] = useState('')
  const [url, newUrl] = useState('')
  const [likes, newLikes] = useState(0)


  const HandleAddBlog = (event) => {
    event.preventDefault()
    addBlog ( {
      title,
      author,
      url,
      likes })
    newTitle('')
    newAuthor('')
    newUrl('')
    newLikes(0)}

  return (
    <form onSubmit={HandleAddBlog}>
            title
      <input
        type="text"
        value={title}
        name='Title'
        id="Title"
        onChange={({ target }) => newTitle(target.value)}
      />
            author
      <input
        type="text"
        value={author}
        name='Author'
        id="Author"
        onChange={({ target }) => newAuthor(target.value)}
      />
            url
      <input
        type="text"
        value={url}
        name='Url'
        id="Url"
        onChange={({ target }) => newUrl(target.value)}
      />
            likes
      <input
        type="text"
        value={likes}
        name='Likes'
        id="Likes"
        onChange={({ target }) => newLikes(target.value)}
      />
      <button id='Save' type="submit">save</button>
    </form>
  )
}
export default BlogForm

BlogForm.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }),
}