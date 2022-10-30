import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  console.log(`notification: ${notification}`)

  const style = notification.type === 'alert' ? 'danger' : 'success'

  // const messageStyle = {
  //   color: notification.type === 'alert' ? 'red' : 'green',
  //   background: 'lightgrey',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // }

  return <Alert variant={style}>{notification.notification}</Alert>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
