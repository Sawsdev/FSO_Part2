const Person = ({person}) => {
    return (
        <p>
            {person.name} {person.number}
        </p>
    )
}

const Persons = ({persons}) => {
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
            {persons.map((person) => <Person key={person.id} person={person} />)}
        </div>
    )
}


export default Persons