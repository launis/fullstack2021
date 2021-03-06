import React, { useState, useEffect  } from 'react'

import './index.css'
import Header from "./Components/Header"
import PersonForm from "./Components/PersonForm"
import Filter from "./Components/Filter"
import Persons from "./Components/Persons"
import Notification from "./Components/ErrorMessage"
import personService from "./Services/PersonsServices"

const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  
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
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) 
    { const del_name = person.name
      personService
        .del(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter((p) => p.id !== person.id))
          setErrorMessage({
            text: `Delete ${del_name}`,
            type: "success",
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error.response.data)
          setErrorMessage({
            text: error.response.data,
            type: "error"
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
      })
    }
  }

  const addPerson = (event) => {

    event.preventDefault()


    const person = persons.find((person) => person.name === newName)
    const personObject = {name: newName, number: newNumber}
    if (person) 
    {
      if (window.confirm(`${newName} is already added to phonebook, replase with new number?`)) 
        {
        const updatedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person))
              setErrorMessage({
              text: `Edited ${returnedPerson.name}`,
              type: "success",
            })
          })
          .catch(error => {
            setErrorMessage({
              text: error.response.data.error,
              type: "error"
            })
          })

      }
    } 
    else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage({
            text: `Added ${returnedPerson.name}`,
            type: "success",
          })
        })
        .catch(error => {
          setErrorMessage({
            text: error.response.data.error,
            type: "error"
          })
        })

    }
    setTimeout(() => {
    setErrorMessage(null)
    }, 3000)
    setNewName('')
    setNewNumber('')
  }


return (
    <>
      <Notification message={errorMessage} />
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