import React from 'react'
import PropTypes from 'prop-types'


const SignupForm = ({
  handleNewSubmit,
  handleNewUsernameChange,
  handleNewPasswordChange,
  newusername,
  newpassword,
}) => {
  return (
    <form onSubmit={handleNewSubmit}>
      <h2>signup to application</h2>
      <div>
          username
        <input
          type="text"
          value={newusername}
          name="Username"
          onChange={handleNewUsernameChange}
        />
      </div>
      <div>
          password
        <input
          type="password"
          value={newpassword}
          name="Password"
          onChange={handleNewPasswordChange}
        />
      </div>
      <button type="submit">signup</button>
    </form>
  )
}

SignupForm.propTypes = {
  handleNewSubmit: PropTypes.func.isRequired,
  handleNewUsernameChange: PropTypes.func.isRequired,
  handleNewPasswordChange: PropTypes.func.isRequired,
  newusername: PropTypes.string.isRequired,
  newpassword: PropTypes.string.isRequired
}

export default SignupForm
