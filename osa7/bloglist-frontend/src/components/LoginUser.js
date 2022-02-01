import React from 'react'
import { useSelector } from 'react-redux'

const UserName = () => {

  const login = useSelector((state) => state.login)
  return (
    <>
      {login === null ?
        <p>No login</p> :
        <p>{login.name} logged in</p>
      }
    </>
  )
}

export default UserName