import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ShowBlogsForm from './components/ShowBlogsForm'
import ShowLoginForm from './components/ShowLoginForm'
import ShowUsersForm from './components/ShowUsersForm'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
const notfication_wait = 3
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const App = () => {

  const dispatch = useDispatch()
  let navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [storage, setStorage] = useState(null)

  useEffect(() => {
    setStorage(window.localStorage.getItem('loggedBlogappUser'))
    if (storage) {
      const user = JSON.parse(storage)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [storage])

  const NewLogout = () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      useEffect(() => {
        setStorage(null)
      }, [])
      return null
    }
    catch (exception)  {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }


  const About = () => (

    <div>
      <h2>About</h2>
    </div>
  )

  return (
    <>
      <h1>Blogs</h1>
      <Notification />

      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem'
        }}
      >
        {user === null
          ?
          <>
            <Link to="/login">Login</Link>
          </>
          :
          <>
            <Link to="/users">Users</Link> | {' '}
            <Link to="/blogs">Blogs</Link> | {' '}
            <Link to="/logout">Logout</Link> | {' '}
            <em>{user.name} logged in</em>
          </>}
      </nav>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="login" element={<ShowLoginForm />} />
        <Route path="users" element={<ShowUsersForm />} />
        <Route path="blogs" element={<ShowBlogsForm />} />
        <Route path="logout" element={<NewLogout />} />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  )

}

export default App