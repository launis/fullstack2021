import React from 'react'

console.log('personForm')
const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
        name:&nbsp;
        <input
            value={newName}
            onChange={handleNameChange} />
            
        &nbsp; number:&nbsp;
        <input
            value={newNumber}
            onChange={handleNumberChange} />
          
        <button type="submit"> add</button>
        </form> 
    ) 
  }
  
  export default PersonForm