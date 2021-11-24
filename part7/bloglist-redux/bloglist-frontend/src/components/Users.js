import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(({ user }) => user)
  return (
    <div style={{ top:'100px', left:'50%', position:'absolute', transform: 'translate(-50%, 0%)', textAlign:'center', width:'500px', overflow:'auto' }}>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <th>Users</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
