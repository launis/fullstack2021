import React, {  useEffect } from 'react'
import { useSelector  } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initialize } from '../reducers/userReducer'


// const [blogs, setBlogs] = useState([])
const ShowUsersForm = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect( () => {
    dispatch(initialize())
  },[dispatch])

  return (
    <ul>
      {users.map(user => {
        return (
          <li key={user.id}>
            {user.name} blogs {user.blogs.length}
          </li>
        )
      })}
    </ul>
  )
}
export default ShowUsersForm