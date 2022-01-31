import service from '../services/login'
import { emptyBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
const notfication_wait = 3

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await service.login( username, password )
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        data : user
      })
      dispatch(setNotification({ text: `Logged on ${user.name}`, type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: 'Wrong user name', type: 'ERROR' }, notfication_wait))
    }
  }
}

export const authorizateUser = () => {
  return async (dispatch) => {
    try {
      window.localStorage.getItem('loggedBlogappUser')
      const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      blogService.setToken(user.token)
      dispatch({
        type: 'AUTHORIZATE',
        data : user
      })
      dispatch(setNotification({ text: `Authorizated ${user.name}`, type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: 'Not logged in', type: 'ERROR' }, notfication_wait))
    }
  }
}


export const logout = () => {
  return async (dispatch) => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      dispatch(emptyBlogs())
      dispatch({
        type: 'LOGOUT',
        data: null
      })
      dispatch(setNotification({ text: 'Logout', type:'DATA' }, notfication_wait))
    }
    catch (exception) {
      dispatch(setNotification({ text: 'Not logged in', type: 'ERROR' }, notfication_wait))
    }
  }
}


const reducer = (state = null, action) => {

  switch(action.type) {
  case 'LOGIN':
    return action.data
  case 'AUTHORIZATE':
    return action.data
  case 'LOGOUT':
    return action.data
  default:
    return state
  }
}

export default reducer