import React from 'react'

const Person = ({ person, delPerson }) => {
    const label = 'Delete'

    return (
      <li>
        {person.name}
        {person.number}
        <button onClick={delPerson}>{label}</button>
      </li>
    )
  }


const Persons = ({ persons, newSearch, delPerson })  => {

    return (
        <ul>
            {persons.filter(person => person.name.startsWith(newSearch)).map(person => (
                <Person key={person.id} 
                        person={person} 
                        delPerson={() => delPerson(person={person})}
                />))}
        </ul>
        )
    }

  export default Persons