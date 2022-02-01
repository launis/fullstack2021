import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector  } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'
import { authorizateUser } from '../reducers/loginReducer'

const UserForm = () => {
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(authorizateUser())
  },[dispatch])

  const login = useSelector((state) => state.login)
  if (!login) return null

  useEffect( () => {
    dispatch(initializeUsers())
  },[dispatch])

  const users = useSelector((state) => state.users)
  const match = useMatch('/users/:id')
  const user = match
    ? users.find((user) => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <>
      <h1 >{user.name}</h1>
      <h2 >Added blogs</h2>
      {user.blogs.length === 0
        ?
        (
          <p>No blogs</p>
        )
        :
        (
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>
                {blog.title}
              </li>
            ))}
          </ul>
        )
      }
    </>
  )
}

export default UserForm