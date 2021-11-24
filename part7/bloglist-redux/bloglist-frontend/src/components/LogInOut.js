import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { Button } from 'react-bootstrap'

const LogInOut = () => {
  const user = useSelector(({ login }) => login)
  const dispatch = useDispatch()
  return (
    <span style={{ color:'#a8dadc' }}>
      {user.username} logged in {' '}
      <Button variant='outline-warning' size='sm' onClick={() => {
        dispatch(logout())
        dispatch(notify(`${user.username} logged out`, 5000))
      }}>log out</Button>
    </span>
  )
}

export default LogInOut
