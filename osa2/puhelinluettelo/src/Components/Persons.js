import React from 'react'

const Persons = ({ persons, newSearch })  => {

    return (
        <ul>
            {persons.filter(person => person.name.startsWith(newSearch)).map(person => (
            <li key={person.name}> {person.name}  {person.number} </li> ))}
        </ul> 
  
    ) 
  }
  
  export default Persons