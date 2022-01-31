import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector  } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { NavLink } from 'react-router-dom'


const ShowUsersForm = () => {
  const dispatch = useDispatch()
  useEffect( () => {
    dispatch(initializeUsers())
  },[dispatch])

  const users = useSelector((state) => state.users)

  return (
    <ul>
      {users.map(user => {
        return (
          <li key={user.id}>
            <NavLink to={`/users/${user.id}`}>
              {user.name} blogs {user.blogs.length}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}


export default ShowUsersForm