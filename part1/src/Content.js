import React from 'react'
import Part from './Part'

const Content = ({parts, exercises}) => {

  return (
    <>
    
      <Part part={parts[0]} exercises={exercises[0]}/>
      <Part part={parts[1]} exercises={exercises[1]}/>
      <Part part={parts[2]} exercises={exercises[2]}/>
    </>
  )
}

export default Content