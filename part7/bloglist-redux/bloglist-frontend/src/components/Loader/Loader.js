import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div>
      <div style={{ textAlign:'center' }}>
        <div className='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
