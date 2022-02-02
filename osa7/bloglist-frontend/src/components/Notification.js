import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const NotificationList = () => {

  const Notification = ( { notification } ) => {
    return(
      <div className="container">
        {
          <Alert variant="success">
            {notification.text} {notification.type}
          </Alert>
        }
      </div>
    )
  }

  const notifications = useSelector(state => state.notification)

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