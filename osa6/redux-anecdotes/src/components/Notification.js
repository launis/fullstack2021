import { useSelector } from 'react-redux'
import React from 'react'

const Data = ({ data }) => {

  const style = {
    border: '2px solid red',
    padding: 10,
    marginBottom: '10px',
  }

  return (
    <div style={style}>
      <div>
        {data.text} {data.type}
      </div>
    </div>
  )
}

const Notification = () => {

  const notifications = useSelector(state => state.notification)
  return(
    <ul>
      {notifications.map(notification =>
        <Data
          key={notification.id}
          data={notification}
        />
      )}
    </ul>
  )
}

export default Notification