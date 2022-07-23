import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'


const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      filter shown with 
      <input 
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
    <div>
      name: 
      <input 
        value={props.newName} 
        onChange={props.handleNameChange}
      />
    </div>
    <div>
      number: 
      <input 
        value={props.newNumber}
        onChange={props.handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Numbers = ({ persons, searchTerm }) => {
  const result = persons
    .filter(function(person){
      return person.name.toLowerCase().includes(searchTerm)
    })
    .map(person =>
    <Person key={person.name} person={person} />
    )
  return (result)
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
          setPersons(response.data)
      })
  }
  )

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const found = persons.some(person => person.name === newName)
    if (!found) {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    } else {
      const message = `${newName} is already added to phonebook`
      alert(message)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Numbers 
        persons={persons} 
        searchTerm={searchTerm}
      />

    </div>
  )
}

export default App
