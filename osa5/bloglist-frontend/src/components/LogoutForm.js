import React from 'react'

const LogoutForm = ({NewLogout}) => {

  const handleLogout = async (event) => {
    event.preventDefault()
    NewLogout()
  }

  return (
    <button onClick={handleLogout}>
        sure to logout
    </button>
  )
}

export default LogoutForm