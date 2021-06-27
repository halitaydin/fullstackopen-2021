import React, { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Togglable from './components/Togglable'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogLists from './components/BlogLists'

const App = () => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newErrorMessage, setNewErrorMessage] = useState(null)
  const [newSuccessMessage, setNewSuccessMessage] = useState(null)
  const [newusername, setNewUsername] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newuser, setNewUser] = useState(null)
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [update, setUpdate] = useState(null)
  const blogFormRef = useRef()
  const signupFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setSuccessMessage(
        `a new blog ${blogObject.title} by ${user.username} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      setUpdate()
    })
  }

  const handleSignup = async (event) => {
    event.preventDefault()
    console.log('user created with', newusername, newpassword)

    try {
      const user = await userService.users({
        newusername,
        newpassword,
      })
      JSON.stringify(user)
      setNewUser(newuser)
      setNewUsername('')
      setNewPassword('')
      setNewSuccessMessage('New User has Joined')
      setTimeout(() => {
        setNewSuccessMessage(null)
      }, 5000)
      signupFormRef.current.toggleVisibility()
    } catch (error) {
      if (newpassword.length < 3) {
        setNewErrorMessage('password must be at least 3 characters long')
        setNewPassword('')
        setTimeout(() => {
          setNewErrorMessage(null)
        }, 5000)
      }
      setNewErrorMessage(error.message)
      setTimeout(() => {
        setNewErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`${user.username} logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.clear()
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    await blogService.update(blog.id, {
      likes: blog.likes,
    })

    const newBlogs = blogs.map((currentBlog) =>
      currentBlog.id === blog.id
        ? { ...currentBlog, likes: currentBlog.likes + 1 }
        : currentBlog
    )
    setBlogs(newBlogs)
  }

  const deleteBlog = async (blog) => {
    await blogService.remove(blog.id)
    const newBlogs = blogs.filter((currentBlog) => currentBlog.id !== blog.id)
    setBlogs(newBlogs)
    setSuccessMessage(`${blog.title} blog deleted`)
  }

  const blogLists = () => <BlogLists blogs={blogs} user={user.username} updateBlog={updateBlog} deleteBlog={deleteBlog} />

  const userForm = () => (
    <div>
      <h1>Sign-Up Panel</h1>
      <Togglable
        buttonLabelOn="signup"
        buttonLabelOff="cancel"
        ref={signupFormRef}
      >
        <SignupForm
          newusername={newusername}
          newpassword={newpassword}
          handleNewUsernameChange={({ target }) => setNewUsername(target.value)}
          handleNewPasswordChange={({ target }) => setNewPassword(target.value)}
          handleNewSubmit={handleSignup}
        />
      </Togglable>
    </div>
  )

  const loginForm = () => (
    <div>
      <h1>Log-in Panel</h1>
      <Togglable buttonLabelOn="login" buttonLabelOff="cancel">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    </div>
  )

  const blogForm = () => (
    <Togglable
      buttonLabelOn="create new blog"
      buttonLabelOff="cancel"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
        newSuccessMessage={newSuccessMessage}
        newErrorMessage={newErrorMessage}
      />
      {user === null ? (
        <div>
          {userForm()}
          {loginForm()}
        </div>
      ) : (
        <div>
          <p>
            {user.username} logged in
            <button onClick={handleLogOut}>log out</button>
          </p>
          <div>
            {blogForm()}
            <div id='blogLists'>{blogLists()}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
