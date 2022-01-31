import React  from 'react'
import LoginForm from './LoginForm'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const ShowLoginForm = () => {
  const dispatch = useDispatch()
  const NewLogin = async (username, password) => {
    dispatch(login(username, password))
  }

  return (
    <>
      <LoginForm NewLogin={NewLogin} />
    </>
  )
}

export default ShowLoginForm