const Person = ({person, remove}) => {
    return (
        <p>
            {person.name} {person.number} <button onClick={remove}>delete</button>
        </p>
    )
}

const Persons = ({persons, removePerson}) => {
    if (persons.length < 1 )
    {
        return <div>
            <h2>Numbers</h2>
            <h3>No person found in the ponebook</h3>
        </div>
    }
    return(
        <div>
            <h2>Numbers</h2>
            {persons.map((person) => <Person key={person.id} person={person} remove={() => removePerson(person.id)}/>)}
        </div>
    )
}


export default Persons