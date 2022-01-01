import React from 'react'

const Part = ({ part }) => {
    return (
      <div>{part.name} {part.exercises}</div>
    )
  }
  
const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
  }
  
const Total = ({ part }) => {
  
  const total = part.reduce((total, current) => total + current.exercises,0)
  
    return (
      <div><b>Total of {total} exercises</b></div>
    )
  }
  
const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
        <div>
          {course.parts.map(part => <Part key={part.id} part={part} /> )}
        </div>
        <Total part={course.parts} />
      </>
    )
  }
  
  const Courses = ({ courses }) => {
    return (
      <>
        {courses.map(course => <Course key={course.id} course={course} /> )}
      </>
    )
  }

  export default Courses