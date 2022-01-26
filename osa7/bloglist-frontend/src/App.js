import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Notification from './components/Notification'
import LogoutForm from './components/LogoutForm'
import ShowBlogsForm from './components/ShowBlogsForm'
import ShowLoginForm from './components/ShowLoginForm'
import ShowUsersForm from './components/ShowUsersForm'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'
import { setNotification } from './reducers/notificationReducer'
const notfication_wait = 3

const App = () => {

  const dispatch = useDispatch()
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

  const NewLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }
    catch (exception)  {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }

  if (user === null)
    return (
      <>
        <h1>Blogs</h1>
        <Notification />
        <ShowLoginForm />
      </>
    )
  else
    return(
      <>
        <h1>Blogs</h1>
        <Notification />
        <Togglable buttonLabel='logout'>
          <LogoutForm NewLogout={NewLogout} />
        </Togglable>
        <ShowBlogsForm/>
        <ShowUsersForm/>
      </>
    )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default App