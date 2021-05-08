import React from 'react'
import Header from './Header'
import Content from './Content'
import Part from './Part'
import Total from './Total'

const Course = ({course}) => {
    return(
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Part course={course} />
            <Total course={course}/>
        </div>
    )
}

export default Course
