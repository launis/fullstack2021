import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
    const [title, newTitle] = useState('')
    const [author, newAuthor] = useState('')
    const [url, newUrl] = useState('')
    const [likes, newLikes] = useState(0)

    const [errorMessage, setErrorMessage] = useState(null)

    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        blogService.getAll().then(blogs => setBlogs( blogs ))  
    }, [])
        
    useEffect(() => {
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }, [errorMessage])

    useEffect(() => {
        const loggedUserJSON = window.localStorage
            .getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage
                .setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')}
        catch (exception) {
            setErrorMessage({ 
                text: 'wrong credentials',
                type: 'error'})
            setTimeout(() => {
                setErrorMessage(null)}, 50000)}
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        try {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
            setUsername('') 
            setPassword('')}
        catch (exception) {
            setErrorMessage('not logged in')
            setTimeout(() => {
                setErrorMessage(null)}, 50000)}
    }

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            const blogObject = {
                title: title,
                author: author,
                url: url,
                likes: likes}
            const newBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(newBlog))
            setErrorMessage({
                text: `New ${newBlog.title}`,
                type: 'success'})
            newTitle('')
            newAuthor('')
            newUrl('')
            newLikes(0)
        }
        catch (exception) {
            setErrorMessage({
                text: 'Not created',
                type: 'error'})
            setTimeout(() => {
                setErrorMessage(null)}, 50000)}
    }

    const blogForm = () => (
        <form onSubmit={addBlog}>
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

    const logoutButon = () => ( 
        <button onClick={handleLogout}>
            logout
        </button>
    )

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
            username
                <input
                    type="text"
                    value={username}
                    name="Username" 
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
            password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    return (
        <>
            <div>
                <h1>Blogs</h1>
                <Notification message={errorMessage} />
            </div>
            <div>
                <h2>Login</h2>
                {user === null ?
                    loginForm() :
                    <div>
                        <p>{user.name} logged in</p>
                        {logoutButon()}
                        {blogForm()}
                    </div>}
                <div>
                    <h2>blogs</h2>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
                </div>
            </div>
        </>
    )
}
export default App