import React, { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [buttonText, setButtonText] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    visible ? setButtonText('view') : setButtonText('hide')
  }

  const likeCounter = async () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      deleteBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div id="blog" style={blogStyle}>
      <span className="blogTitle">{blog.title}</span>{' '}
      <span className="blogAuthor">{blog.author}</span>{' '}
      <button onClick={toggleVisibility}>{buttonText}</button>
      { visible && ( <div style={showWhenVisible} className="blogUrlLikes">
        <span className="url">{blog.url}</span> <br />
        likes: <span className="likes">{blog.likes}</span> <button onClick={likeCounter}>like</button> <br />
        {blog.user.username} <br />
        {blog.user.username === user ? <button onClick={remove}>remove</button> : <></>}
      </div>
      )}
    </div>
  )
}

export default Blog
