import React, { useState } from 'react'

import Header from "./Components/Header"
import PersonForm from "./Components/PersonForm"
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [newSearch, setNewSearch] = useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  
  const handleSearchChange = (event) => {setNewSearch(event.target.value)}

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}

  const addPerson = event => {
    event.preventDefault()

    const personObject = {name: newName, number: newNumber}

    if (persons.some((p) => p.name === newName)) 
      {window.alert(`${newName} is already added to phonebook`)}
    else {
      
      setPersons(persons.concat(personObject))}
      axios
      .post('http://localhost:3001/notes', personObject)
      .then(response => {
        setNewName(persons.concat(response.data))
        setNewNote('')
      })
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

      <Persons persons={persons} newSearch={newSearch} />

    </>
  )
}

export default App
