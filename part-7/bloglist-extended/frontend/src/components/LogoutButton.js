const LogoutButton = () => {
  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }
  return (
    <div>
      <button onClick={handleClick}>logout</button>
    </div>
  )
}

export default LogoutButton
