import React, { useState} from 'react'

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
            likes})
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
                onChange={({ target }) => newTitle(target.value)}
            />  
            author
            <input
                type="text"
                value={author}
                name='Author'
                onChange={({ target }) => newAuthor(target.value)}
            />
            url
            <input
                type="text"
                value={url}
                name='Url'
                onChange={({ target }) => newUrl(target.value)}
            />
            likes
            <input
                type="text"
                value={likes}
                name='Likes'
                onChange={({ target }) => newLikes(target.value)}
            />
            <button type="submit">save</button>
        </form>
    )
}
export default BlogForm