import React from 'react'

const Total = ({course}) => {
  const sum = course.parts.reduce((total, num) => {
    return total + num.exercises;
  }, 0)
  return (
    <i>Total of {sum} exercises</i>
  )
}

export default Total
