import React from 'react'
import { useSelector } from 'react-redux'

const NotificationList = () => {

  const Notification = ( { notification } ) => {
    const style = {
      border: '2px solid red',
      padding: 10,
      marginBottom: '10px'
    }

    return(
      <div style={style}>{notification.text} {notification.type}</div>

    )
  }

  const notifications = useSelector(state => state.notification)
  console.log('notifications:', notifications)

  return (
    <div>
      {notifications
        .map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
    </div>
  )
}

export default NotificationList