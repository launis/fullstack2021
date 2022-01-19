import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {

  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {

  const [country, setCountry] = useState(null)
  const [error, setError] = useState(null)
  const baseURL = `https://restcountries.com/v3.1/name/${name}?fullText=true`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL)
        setCountry(response.data)
      }
      catch(error){
        setError(error)
      }
    }
    fetchData()
  }, [baseURL])
  return country 
}

const Country = ({ country }) => {

  if (!country) {
    return null
  }
  
  return (
    <div>
      <h3>{country[0].name.common} </h3>
      <div>capital {country[0].capital} </div>
      <div>population {country[0].population}</div> 
      <img src={country[0].flags.png} height='100' alt={`flag of ${country[0].name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  const country = useCountry(name)

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App