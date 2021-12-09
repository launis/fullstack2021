import React, { useState, useEffect  } from 'react'

import Header from "./Components/Header"
import PersonForm from "./Components/PersonForm"
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import personService from "./Services/PersonsServices"


const App = () => {
  const [persons, setPersons] = useState([])
  
  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const [newSearch, setNewSearch] = useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  
  const handleSearchChange = (event) => {setNewSearch(event.target.value)}
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}

  const delPerson = ({ person }) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      personService
        .del(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter((p) => p.id !== person.id))
        })}
  }


  const addPerson = event => {
    event.preventDefault()

    const personObject = {name: newName, number: newNumber}
    if (persons.some((p) => p.name === newName)) 
      {
      const person = persons.filter((p) => p.name === newName)[0]
      if (window.confirm(`${newName} is already added to phonebook, replase with new number?`)) 
        {
          const updatedPerson = { ...person, number: newNumber }
          personService
            .update(person.id, updatedPerson)
            .then((returnedPerson) => {
              setPersons(persons.filter((p) => p.id !== person.id).concat(returnedPerson))
              setNewName('')
              setNewNumber('')
            })}
      }
    else
    {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })}
  }

return (
    <>
      <Header header={'Phonebook'} />

      <Filter
        onChange={handleSearchChange}
        newSearch={newSearch}
      />
      
      <Header header={'Add new'} />

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <Header header={'Numbers'} />

      <Persons
        persons={persons} 
        newSearch={newSearch}
        delPerson={delPerson}
      />


    </>
  )
}

export default App
