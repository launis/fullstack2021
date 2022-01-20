import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import ShowBlogsForm from './components/ShowBlogsForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const [user, setUser] = useState(null)

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

  const NewLogin = async (credentials) => {
    try {
      const user = await loginService.login({ credentials })
      window.localStorage
        .setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)}
    catch (exception) {
      setErrorMessage({
        text: `${exception}`,
        type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)}, 50000)}
  }

  const NewLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)}
    catch (exception) {
      setErrorMessage({
        text: `${exception}`,
        type: 'error' })
      setTimeout(() => {
        setErrorMessage(null)}, 50000)}
  }

  const logoutForm = () => (
    <Togglable buttonLabel='logout'>
      <LogoutForm NewLogout={NewLogout} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <LoginForm NewLogin={NewLogin} />
    </Togglable>
  )

  const showBlogsForm = () => (
    <ShowBlogsForm
      user={user}
    />
  )

  return (
    <>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {user === null
        ? loginForm()
        :
        <>
          <p>{user.name} logged in</p>
          {logoutForm()}
          {showBlogsForm()}
        </>}
    </>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default App