import React from 'react'
import './ScrollSeparate.css'

const ScrollSeparate = () => {
  return (
    <div className='main-scroll-separate bg-red-100 flex items-center justify-center'>
      <div className="middle-bar"></div>
      <div className="bar-group">
        <div className='bar1'></div>
        <div className='bar2'></div>
        <div className='bar3'></div>
        <div className='bar4'></div>
      </div>
    </div>
  )
}

export default ScrollSeparate