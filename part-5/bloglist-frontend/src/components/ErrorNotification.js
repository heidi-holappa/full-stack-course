const ErrorNotification = ({ message }) => {
  const messageStyle = {
    color: 'red',
    background: 'lightgray',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null) {
    return null
  }

  return (
    <div className="error" style={messageStyle}>
      {message}
    </div>
  )
}

export default ErrorNotification