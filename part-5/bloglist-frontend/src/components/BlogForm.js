import { useState } from 'react'

const BlogForm = ({
    handleSubmit,
    title,
    author,
    url,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
}) => (
    <form onSubmit={handleSubmit}>
      title: <input
        value={title}
        onChange={handleTitleChange}
      /> <br></br>
      author: <input
        value={author}
        onChange={handleAuthorChange}
      /><br></br>
      url: <input
        value={url}
        onChange={handleUrlChange}
      /><br></br>
      <button type="submit">save</button>
    </form> 

  )

export default BlogForm