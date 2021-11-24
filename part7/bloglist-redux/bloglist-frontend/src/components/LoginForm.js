import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { open, hide } from '../reducers/toggleReducer'
import Toggle from './Toggle'
import { login } from '../reducers/loginReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username, password))
    dispatch(initializeBlogs())
    dispatch(hide(toggleId))
    setButtonDisplay('')
    navigate('/')
  }
  const toggleId = 'loginForm'
  const [buttonDisplay, setButtonDisplay] = useState('')
  return (
    <div>
      <Button variant='outline-primary'
        style={{ display: buttonDisplay }}
        onClick={() => {
          dispatch(open(toggleId))
          setButtonDisplay('none')
        }}
      >
        login
      </Button>
      <Toggle id={toggleId}>
        <h3 style={{ width:'275px' }}>login to application</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>username</Form.Label>
            <Form.Control name='username' type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>password</Form.Label>
            <Form.Control name='password' type="password" />
          </Form.Group>
          <Button variant='primary' type='submit' size='sm'>login</Button>{' '}
          <Button
            variant='secondary' size='sm'
            onClick={() => {
              dispatch(hide(toggleId))
              setButtonDisplay('')
            }}
          >
          cancel
          </Button>
        </Form>
      </Toggle>
    </div>
  )
}

export default LoginForm