import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  const style = notification.type === 'alert' ? 'danger' : 'success'

  return <Alert variant={style}>{notification.notification}</Alert>
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)
