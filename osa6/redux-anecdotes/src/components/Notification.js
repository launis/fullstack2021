import { connect } from 'react-redux'
import React from 'react'

const Notification = (props) => {
  console.log('notification',props.notification)
  const style = {
    border: '2px solid red',
    padding: 10,
    marginBottom: '10px'
  }

  return(
    <div style={style}>{props.notification.text} {props.notification.type}</div>
  )
}

const mapStateToProps = (state) => {

  return {
    notification: state.notification
  }
}


export default connect(
  mapStateToProps,
)(Notification)