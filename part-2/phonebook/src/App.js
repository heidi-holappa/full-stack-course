import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import ErrorNotification from './components/ErrorNotification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setNewSearch] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => { 
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
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
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
      setStatusMessage(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
    } else {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the old number with this new one?`)) {
        const person = persons.find(p => p.name === newName)
        const updatedPerson = {...person, number: newNumber}
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person: returnedPerson))
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${updatedPerson.name} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
        setStatusMessage(
          `Updated phonenumber for ${personObject.name}`
        )
        setTimeout(() => {
          setStatusMessage(null)
        }, 5000)
      }
    }
  }

  const deleteNumber = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personService
      .deletePerson(person.id)
      setStatusMessage(
        `Deleted phonenumber for ${person.name}`
      )
      setTimeout(() => {
        setStatusMessage(null)
      }, 5000)
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
      <Notification message={statusMessage} />
      <ErrorNotification message={errorMessage} />
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
        deleteNumber={deleteNumber}
      />

    </div>
  )
}

export default App
 