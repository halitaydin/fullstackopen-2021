import React from 'react'

const Notification = ({ errorMessage, successMessage, newErrorMessage, newSuccessMessage }) => {
  if (successMessage !== null) {
    return (
      <div>
        <div className="success">{successMessage}</div>
      </div>
    )
  } else if (errorMessage !== null) {
    return (
      <div>
        <div className="error">{errorMessage}</div>
      </div>
    )
  } else if (newSuccessMessage !== null) {
    return (
      <div>
        <div className="success">{newSuccessMessage}</div>
      </div>
    )
  } else if (newErrorMessage !== null) {
    return (
      <div>
        <div className="error">{newErrorMessage}</div>
      </div>
    )
  } else {
    return null
  }
}

export default Notification
