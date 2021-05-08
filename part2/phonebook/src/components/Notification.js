import React from "react";

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage !== null) {
    return (
      <div>
        <div className="success">{successMessage}</div>
      </div>
    );
  } else if (errorMessage !== null) {
    return (
      <div>
        <div className="error">{errorMessage}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
