import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { like, removeBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'
import { Card, Button, Form, Row, Col, ListGroup } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
      <Card style={{ top:'75px', left:'50%', position:'absolute', transform: 'translate(-50%, 0%)', textAlign:'center', width:'fit-content' }}>
        <Card.Body>
          <Card.Title>Blog App</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{blog.title} - {blog.author}</Card.Subtitle>
          <Card.Text>
            <p><a href={`http://${blog.url}`}>{blog.url}</a></p>
            <p>
            likes: {blog.likes}{' '}
              <p>
                <Button style={{ borderRadius:'25px', width:'50px' }} variant='success' size='sm' onClick={() => {
                  dispatch(like(blog.id))
                  dispatch(notify(`"${blog.title}" liked`, 5000))
                }}>like</Button>
              </p>
            </p>
            <p>added by {blog.user.username}
              <p>
                {blog.user.username === user.username ? <Button style={{ borderRadius:'25px' }} variant='danger' size='sm' onClick={() => {
                  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                    dispatch(removeBlog(blog.id))
                    dispatch(notify(`${blog.title} blog deleted`, 5000))
                    navigate('/blogs')
                  }
                }}>remove</Button> : <></>}
              </p>
            </p>
          </Card.Text>
          <div className="comments">
            <Form onSubmit={handleAddComment}>
              <Row>
                <Col>
                  <Form.Control name='comment' type="text" placeholder='comments' size='sm'/>
                </Col>
                <Button style={{ width:'fit-content' }} size='sm' type="submit">add comment</Button>
              </Row>
            </Form>
            <p style={{ marginTop:'15px' }}>
              <h6>Comments</h6>
              {blog.comments.map((comment, index) => (
                <ListGroup key={index}>
                  <ListGroup.Item variant='light' style={{ margin:'1px', height:'fit-content' }}>
                    {comment}
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </p>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Blog
