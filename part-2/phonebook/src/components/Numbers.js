import Person from "./Person"

const Numbers = ({ persons, searchTerm, deleteNumber }) => {
    const result = persons
      .filter(function(person){
        return person.name.toLowerCase().includes(searchTerm.toLowerCase())
      })
      .map(person =>
      <Person key={person.id} person={person} deleteNumber={deleteNumber} />
      )
    return (result)
  }

export default Numbers