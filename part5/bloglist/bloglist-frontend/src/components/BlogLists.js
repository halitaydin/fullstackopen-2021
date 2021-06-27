import React from 'react'
import Blog from './Blog'

const BlogLists = ({ blogs, user, updateBlog, deleteBlog }) => {
  return (
    <div>
      <h2>blogs</h2>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
        ))}
    </div>
  )
}

export default BlogLists
