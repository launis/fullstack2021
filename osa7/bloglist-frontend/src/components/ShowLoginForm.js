// import React, { useState, useEffect } from 'react'
import React from 'react'
import LoginForm from './LoginForm'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from '../components/Togglable'
import loginService from '../services/login'

const notfication_wait = 3


const ShowLoginForm = () => {

  const dispatch = useDispatch()
  const NewLogin = async (credentials) => {
    try {
      const user = await loginService.login({ credentials })
      window.localStorage
        .setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
    }
    catch (exception) {
      dispatch(setNotification({ text: exception.message, type: 'ERROR' }, notfication_wait))
    }
  }


  return (
    <>
      <Togglable buttonLabel='log in'>
        <LoginForm NewLogin={NewLogin} />
      </Togglable>
    </>
  )
}

export default ShowLoginForm