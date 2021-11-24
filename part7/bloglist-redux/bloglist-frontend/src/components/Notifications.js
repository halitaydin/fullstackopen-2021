import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const enotification = useSelector(({ enotification }) => enotification)
  if (notification) {
    return <Alert style={{ width:'fit-content',float:'right' , marginRight:'15px' }} variant={'success'}>{notification}</Alert>
  } else if (enotification) {
    return <Alert style={{ width:'300px', float:'right' , marginRight:'15px' }} variant={'danger'}>{enotification}</Alert>
  }
  return null
}

export default Notification
