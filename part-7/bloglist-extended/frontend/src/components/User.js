const User = ({ user }) => {
  const blogs = user.blogs
  if (blogs) {
    console.log(blogs)
  }
  return (
    <div>
      <h2>Selected user</h2>
      {user.name}

      <h3>Blogs by user</h3>
      {blogs.length === 0 ? (
        <div>No blogs yet.</div>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default User
