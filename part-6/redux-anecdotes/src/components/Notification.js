import { connect } from 'react-redux'

const Notification = (props) => {
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (props.visible) {
    return (
      <div style={style}>
        {props.message}
      </div>
    )
  }

  return (
    <div></div>
  )
  
}

const mapStateToProps = (state) => {
  if (state.notification.visible) {
    return {
      message: state.notification.message,
      visible: true
    }
  }
  return {
    visible: false
  }
}

export default connect(
  mapStateToProps
)(Notification)