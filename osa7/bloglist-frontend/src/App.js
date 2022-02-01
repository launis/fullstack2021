import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import AllBlogsForm from './components/AllBlogsForm'
import ShowLoginForm from './components/ShowLoginForm'
import ShowUsersForm from './components/ShowUsersForm'
import UserForm from './components/UsersForm'
import OneBlogForm from './components/OneBlogForm'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'


const App = () => {

  const Navigation = () => {

    return (
      <nav>
        <Link to="/login">login </Link>
        <Link to="/users">users </Link>
        <Link to="/blogs">blogs </Link>
        <Link to="/logout">logout</Link>
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