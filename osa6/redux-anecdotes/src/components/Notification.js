import { connect } from 'react-redux'
import React from 'react'


const NotificationList = (props) => {

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

  return (
    <div>
      {props.notification
        .map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
    </div>
  )
}


const mapStateToProps = (state) => {

  return {
    notification: state.notification
  }
}


export default connect(
  mapStateToProps,
)(NotificationList)