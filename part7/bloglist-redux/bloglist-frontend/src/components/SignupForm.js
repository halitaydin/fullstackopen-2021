import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { open, hide } from '../reducers/toggleReducer'
import Toggle from './Toggle'
import { signup } from '../reducers/signupReducer'
import { Button, Form } from 'react-bootstrap'

const SignupForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newusername = event.target.username.value
    const newpassword = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(signup(newusername, newpassword))
    dispatch(hide(toggleId))
    setButtonDisplay('')
  }
  const toggleId = 'signupForm'
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
        signup
      </Button>
      <Toggle id={toggleId}>
        <h3 style={{ width:'275px' }}>signup to application</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>username</Form.Label>
            <Form.Control name='username' type="text" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>password</Form.Label>
            <Form.Control name='password' type="password" />
          </Form.Group>
          <Button variant='primary' type='submit' size='sm'>signup</Button>{' '}
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

export default SignupForm