import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Select from 'react-select'

import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

  
const SetBirthyear = () => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const options=result.data.allAuthors.map(option => ({value: option.name, label: option.name}))


  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  const submit = async (event) => {
    event.preventDefault()
    editAuthor({variables: { name: name.value, setBornTo: parseInt(born)},})
    setName(null)
    setBorn('')
  }

  return (
    <div>
      <h2>change year</h2>

      <form onSubmit={submit}>
        <div>
        <Select
            defaultValue={name}
            onChange={setName}
            options={options}
        />
        </div>
        <div>
          Birth year <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>change year</button>
      </form>
    </div>
  )
}


export default SetBirthyear