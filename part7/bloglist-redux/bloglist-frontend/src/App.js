import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import Notifications from './components/Notifications'
import NewBlog from './components/NewBlog'
import Blogs from './components/Blogs'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducers'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import LogInOut from './components/LogInOut'
import { Routes, Route, NavLink } from 'react-router-dom'
import Users from './components/Users'
import IndividualUI from './components/IndividualUI'
import Blog from './components/Blog'
import { Row, Col, Container, Nav, Navbar } from 'react-bootstrap'


const Register = () => {
  return (
    <div style={{ position:'fixed', top:'50%', left:'50%', transform: 'translate(-50%, -50%)', width:'auto' }}>
      <Container>
        <Row>
          <Col><SignupForm /></Col>
          <Col><LoginForm /></Col>
        </Row>
      </Container>
    </div>
  )
}

const NavLinks = () => {
  const user = useSelector(({ login }) => login)
  const padding = {
    margin: 5
  }
  return (
    <div>
      <Navbar size='lg' bg="primary" variant="dark">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/blogs">Blog</Nav.Link>
          <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          {user ? <em style={padding}><LogInOut /></em>  : <Nav.Link as={NavLink} to="/login">login</Nav.Link>}
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

const User = () => {
  return (
    <div>
      <Users />
    </div>
  )
}

const AllBlogs = () => {
  return (
    <div>
      <NewBlog />
      <Blogs />
    </div>
  )
}

const IndividualBlog = () => {
  return (
    <div>
      <Blog />
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ login }) => login)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      {user ? <NavLinks /> : null}
      <Routes>
        <Route path="/users" element={user ? <User /> : <Register />} />
        <Route path="/users/:id" element={user ? <IndividualUI /> : <Register />} />
        <Route path="/login" element={user ? <AllBlogs /> : <Register />} />
        <Route path="/blogs" element={user ? <AllBlogs /> : <Register />} />
        <Route path="/blogs/:id" element={user ? <IndividualBlog /> : <Register />} />
        <Route path="/" element={user ? <AllBlogs /> : <Register />} />
      </Routes>
      <Notifications />
    </div>
  )
}

export default App
