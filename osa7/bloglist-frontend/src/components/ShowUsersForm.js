import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector  } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { NavLink } from 'react-router-dom'
import LoginUser from '../components/LoginUser'

const ShowUsersForm = () => {

  const dispatch = useDispatch()
  useEffect( () => {
    dispatch(initializeUsers())
  },[dispatch])

  const users = useSelector((state) => state.users)

  return (
    <div>
      <LoginUser />
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
    </div>
  )
}


export default ShowUsersForm