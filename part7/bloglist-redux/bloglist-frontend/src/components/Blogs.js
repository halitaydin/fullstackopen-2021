import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import Loader from './Loader/Loader'

const Blog = ({ blog }) => {
  return (
    <ListGroup>
      <ListGroup.Item style={{ marginBottom:'5px' }} variant='primary'>
        <Link style={{ color:'#1d3557' }} to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
      </ ListGroup.Item>
    </ListGroup>
  )
}

const Blogs = () => {
  const blogs = useSelector(({ blog }) => blog)
  const loading = useSelector(({ loading }) => loading)
  return (
    <div >
      {loading.showLoading
        ? <Loader />
        : <div><h2 style={{ textAlign:'center' }}>Blogs</h2>
          <div style={{ top:'auto', left:'50%', position:'absolute', transform: 'translate(-50%, 0%)', textAlign:'center', width:'fit-content', overflow:'auto' }}>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                />
              ))}
          </div>
        </div>
      }
    </div>
  )
}

export default Blogs
