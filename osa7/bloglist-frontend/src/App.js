// import React, { useEffect } from 'react'
import React from 'react'

import { Routes, Route, NavLink } from 'react-router-dom'
import AllBlogsForm from './components/AllBlogsForm'
import ShowLoginForm from './components/ShowLoginForm'
import ShowUsersForm from './components/ShowUsersForm'
import UserForm from './components/UsersForm'
import OneBlogForm from './components/OneBlogForm'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import { useSelector  } from 'react-redux'


const App = () => {

  const user = useSelector((state) => state.login)

  const Navigation = () => {

    return (
      <nav>
        <NavLink to="/login">login </NavLink>
        <NavLink to="/users">users </NavLink>
        <NavLink to="/blogs">blogs </NavLink>
        <NavLink to="/logout">logout</NavLink>
      </nav>)
  }


  const NoMatch = () => {
    return <p>Nothing here</p>
  }

  return (
    <>
      <h1>Blogs</h1>
      <Notification />
      <Navigation />
      {user === null ?
        <p>No login</p> :
        <p>{user.name} logged in</p>
      }
      <Routes>
        <Route index element={<ShowLoginForm />} />
        <Route path="/users/:id" element={<UserForm /> } />
        <Route path="/blogs/:id" element={<OneBlogForm /> } />
        <Route path="login" element={<ShowLoginForm />} />
        <Route path="users" element={<ShowUsersForm />} />
        <Route path="blogs" element={<AllBlogsForm />} />
        <Route path="logout" element={<LogoutForm />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>

    </>
  )
}

export default App