import axios from "axios"
import React, { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import Filtered from './Components/Countries'

const baseURL = "https://restcountries.com/v3.1/all"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredcountries, setNewfilteredcountries] = useState([])
  const [filter, setNewfilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSearchChange = (event) => {
    const selected =
      countries.filter(country => country.name.common.toLowerCase().startsWith(event.target.value.toLowerCase()))
    setNewfilteredcountries(selected)
    setNewfilter(event.target.value)
    }

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(baseURL)
      .then((response) => {setCountries(response.data)})
    setIsLoading(false)
    },[])
  
  return (
    <>
      {isLoading && 
        <isloading/>} 
      <Filter
        onChange={handleSearchChange}
        newSearch={filter}
      />
      
      {filter !== '' &&
        <Filtered
          countries={filteredcountries}
        />} 
    </>
  )
}

export default App