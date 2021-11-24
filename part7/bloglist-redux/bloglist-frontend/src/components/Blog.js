import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { like, removeBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { useParams, Link } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ login }) => login)
  const blogs = useSelector(({ blog }) => blog)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)
  if (!blog) {
    return null
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog.id, e.target.comment.value))
    e.target.comment.value = ''
  }

  return (
    <div>
      <h2>Blog App</h2>
      <h3>{blog.username} {blog.author}</h3>
      <div>
        <a href={`http://${blog.url}`}>{blog.url}</a> <br />
        <div>
            likes: {blog.likes}
          <button onClick={() => {
            dispatch(like(blog.id))
            dispatch(notify(`"${blog.title}" liked`, 5000))
          }}>like</button>
        </div>
        added by {blog.user.username} <br />
        <Link to="/blogs">
          {blog.user.username === user.username ? <button onClick={() => {
            if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
              dispatch(removeBlog(blog.id))
              dispatch(notify(`${blog.title} blog deleted`, 5000))
            }
          }}>remove</button> : <></>}
        </Link>
      </div>
      <div className="comments">
        <h3>comments</h3>
        <form onSubmit={handleAddComment}>
          <input type="text" name="comment" />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
