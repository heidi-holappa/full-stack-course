import { useState } from 'react'

const Blog = ({blog}) => {
  const [expanded, setExpanded] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  if (expanded) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleExpanded}>view</button><br></br>
        {blog.url} <br></br>
        likes 0 <button>like</button> <br></br>
        {blog.user.name}
      </div>
    )
  }


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleExpanded}>view</button>
    </div>  
  )

}
export default Blog