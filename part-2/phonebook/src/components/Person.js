import personService from './../services/persons'
import App from './../App'

const Person = ({person}) => {
    const handleClick = (event) => {
      if (window.confirm(`Delete ${person.name}`)) {
        personService
        .deletePerson(person.id)
      }
    }

    return (<p>{person.name} {person.number} <button onClick={handleClick} value={person.id}>delete</button></p>)
  }


export default Person
