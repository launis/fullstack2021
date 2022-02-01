import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import LoginUser from '../components/LoginUser'

const LoginForm = ({ NewLogin }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    NewLogin({ username, password })
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <LoginUser />
      <h2>login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id='username'
            type='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id='password'
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" type="submit">
      login
          </Button>
        </Form.Group>
      </Form>
    </div>  )
}



export default LoginForm