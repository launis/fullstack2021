import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {

  const notification = useSelector(state => state.notification)
  const style = {
    border: '2px solid red',
    padding: 10,
    marginBottom: '10px'
  }

  return(
    <div style={style}>{notification.text} {notification.type}</div>
  )
}

export default Notification