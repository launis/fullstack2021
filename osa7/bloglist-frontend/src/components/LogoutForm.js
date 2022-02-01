import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'
import LoginUser from '../components/LoginUser'

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
    <div>
      <LoginUser />
      <button onClick={handleLogout}>
        sure to logout
      </button>
    </div>
  )
}

export default LogoutForm