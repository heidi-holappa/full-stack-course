import { Table, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const User = ({ user }) => {
  const blogs = user.blogs
  const navigator = useNavigate()

  // const linkButtonStyle = {
  //   cursor: 'pointer',
  //   color: 'white',
  //   textAlign: 'center',
  //   textDecoration: 'none',
  //   padding: '4px',
  // }

  const handleClick = () => {
    navigator('/users')
  }

  return (
    <div>
      <h2>Viewing blogs by {user.name}</h2>

      <Table striped>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                  <br />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleClick}>
        Back
      </Button>
    </div>
  )
}

export default User
