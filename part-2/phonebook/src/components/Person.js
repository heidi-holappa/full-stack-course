const Person = ({id, person, deleteNumber}) => {

    return (
      <div key={id}>
        <p>
        {person.name} {person.number} <button onClick={() => deleteNumber(person)}>delete</button>
        </p>
      </div>
    )
  }


export default Person
