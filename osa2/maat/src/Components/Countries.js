import React, { useState, useEffect } from 'react'
import axios from "axios"

const {REACT_APP_API_KEY} = process.env
const api_key = REACT_APP_API_KEY

const Countries = ({ country }) => {
  return (
    <li>{country.name.common}</li>
  )
}

const WeatherItem = ({ city }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${city}`)
          .then((response) => {setWeather(response.data)})
    }, [city]);

    if (weather)
      return (
      <div>
        <p><strong>Temperature:</strong> {weather.current.temperature} Celsius</p>
        <img src={weather.current.weather_icons[0]} alt="weather" />
        <p>
          <strong>Wind:</strong> {weather.current.wind_speed} km/h direction{" "}
          {weather.current.wind_dir}
        </p>
      </div>
    )
     else {
      return null;
    }
  }


const Country = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      <>{Object.values(country.languages).map((value, index) =>
          <li key={index}> {value}</li>)}</>
      <img src={Object.values(country.flags)[0]} alt="No flag found" height="250" width="350" />
      <h1>Weather in {country.capital[0]}</h1>

      <WeatherItem city={country.capital[0]}/>

    </>
  )
}

const Filtered = ({ countries }) => {
  return (
    <>
      {countries.length >= 10 &&
        <p>too many matches, specify another filter</p>}

      {countries.length < 10 && countries.length > 1 &&
        <>{countries.map(country =>
          <Countries key={country.name.common} country={country} />)}</>}

      {countries.length === 1 &&
        <Country country={countries[0]} />}
    </>
  )
}

export default Filtered