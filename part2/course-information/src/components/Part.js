import React from 'react'

const Part = ({course}) => course.parts.map((part) => {
    return <p key={part.id}>{part.name} : {part.exercises}</p>})

export default Part
