import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

const LogoutForm = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
    navigate('/')
    window.location.reload()
  }

  return (
    <button onClick={handleLogout}>
        sure to logout
    </button>
  )
}

export default LogoutForm