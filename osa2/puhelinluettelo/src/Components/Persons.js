import React from 'react'

const Person = ({ person, toggleDel }) => {
    const label = 'Delete'
  
    console.log('person',person)
    return (
      <li>
        {person.name}
        {person.number}
        <button onClick={toggleDel}>{label}</button>
      </li>
    )
  }


const Persons = ({ persons, newSearch, toggleDel })  => {

    return (
        <ul>
            {persons.filter(person => person.name.startsWith(newSearch)).map(person => (
                <Person key={person.id} 
                        person={person} 
                        toggleDel={() => toggleDel(person={person})}
                />))}
        </ul>
        )
    }

  export default Persons