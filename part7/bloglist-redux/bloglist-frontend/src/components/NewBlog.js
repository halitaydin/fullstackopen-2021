import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { open, hide } from '../reducers/toggleReducer'
import Toggle from './Toggle'
import { Button, Form, Row, Col } from 'react-bootstrap'

const NewBlog = () => {
  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const url = event.target.url.value
    const author = event.target.author.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    dispatch(createBlog({ title, url, author }))
    dispatch(hide(toggleId))
    setButtonDisplay('')
  }

  const toggleId = 'blogForm'
  const [buttonDisplay, setButtonDisplay] = useState('')

  return (
    <div style={{ width:'fit-content', margin:'5px 5px' }}>
      <Button variant="warning"
        style={{ display: buttonDisplay }}
        onClick={() => {
          dispatch(open(toggleId))
          setButtonDisplay('none')
        }}
      >
        create new blog
      </Button>
      <Toggle id={toggleId}>
        <h3>Create New Blog</h3>
        <Form onSubmit={addBlog}>
          <Row>
            <Col>
              <Form.Control name='title' type="text" placeholder='title' size='sm'/>
            </Col>
            <Col>
              <Form.Control name='author' type="text" placeholder='author' size='sm'/>
            </Col>
            <Col>
              <Form.Control name='url' type="text" placeholder='url' size='sm'/>
            </Col>
          </Row>
          <div style={{ marginTop:'5px' }}>
            <Button variant='success' type='submit' size='sm'>create</Button>{' '}
            <Button
              variant='danger'
              size='sm'
              onClick={() => {
                dispatch(hide(toggleId))
                setButtonDisplay('')
              }}
            >
          cancel
            </Button>
          </div>
        </Form>
      </Toggle>
    </div>
  )
}

export default NewBlog
