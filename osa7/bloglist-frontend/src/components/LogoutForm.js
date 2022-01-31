import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
// import { useSelector  } from 'react-redux'

const LogoutForm = () => {

  const dispatch = useDispatch()
  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <button onClick={handleLogout}>
        sure to logout
    </button>
  )
}

export default LogoutForm