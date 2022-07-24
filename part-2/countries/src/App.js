import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './components/Weather'

const Countries = ( { countries, searchTerm, setNewSearch } ) => {
  const filtered = countries
  .filter(function(country){
    return country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  })

  if (filtered.length === 1) {
    const country = filtered[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>
          Capital: {country.capital}<br />
          Area:  {country.area}
        </p>
        <strong>Languages</strong><br />
        <ul>
          {Object.entries(country.languages).map(language =>
            <li key={language[0]}>{language[1]}</li>
          )}
        </ul>
        <img src={country.flags.svg} width="200"></img>
        <Weather capital={country.capital} />
      </div>
    )

  } else if (filtered.length > 10) {
    return (
    <div>Too many matches, specify another filter.</div>
    )
  } else {
    const handleClick = (event) => {
      setNewSearch(event.target.value)
    }
    const result = filtered.map(country =>
      <div key={Object.entries(country.cca3)}>{country.name.common} <button onClick={handleClick} value={country.name.common}>show</button></div>)
    return result
  }
}

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      find countries
      <input 
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
    }, [])
  
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }
  
  return(
    <div>
      <Filter 
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <Countries 
        countries={countries} 
        searchTerm={searchTerm}
        setNewSearch={setNewSearch}
      />
    </div>
  )
    
}

export default App
