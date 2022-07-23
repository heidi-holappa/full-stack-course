import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ( { countries } ) => {
  const result = countries
    .map(country =>
      <div key={Object.entries(country.latlng)}>{country.name.common}</div>)
  return result
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

  const [restUrl, setRestUrl] = useState('https://restcountries.com/v3.1/all')

  useEffect(() => {
    axios
      .get(restUrl)
      .then(response => {
        setCountries(response.data)
      })
    })
  
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    console.log('https://restcountries.com/v3.1/name/' + event.target.value)
    setRestUrl('https://restcountries.com/v3.1/name/' + event.target.value)
  }
  
  return(
    <div>
      <Filter 
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <Countries countries={countries} />
    </div>
  )
    
}

export default App

/* {countries.map(country => <div>{country.name.common}</div>)} */