import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const IndividualUI = () => {
  const users = useSelector(({ user }) => user)
  const id = useParams().id
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }
  return (
    <div style={{ top:'100px', left:'50%', position:'absolute', transform: 'translate(-50%, 0%)', textAlign:'center', width:'auto', overflow:'auto' }}>
      <h2 style={{ color:'#1d3557' }}>User: {user.username}</h2>
      <h3 style={{ color:'#457b9d', marginBottom:'15px' }}>Added Blogs</h3>
      {user.blogs.map((blog) => (
        <ListGroup key={blog.id}>
          <ListGroup.Item style={{ borderRadius:'0', borderColor:'#a8dadc', margin:'1px', borderStyle:'none none solid none', color:'#e63946' }}>
            {blog.title}
          </ListGroup.Item>
        </ListGroup>
      ))}
    </div>
  )
}

export default IndividualUI
