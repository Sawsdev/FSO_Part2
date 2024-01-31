import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
  
    setNewName(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log("Got the form", event.target);
    const newPerson = {
      name: newName
    }
    personExists(newPerson)
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const personExists = (person) => {
     const foundPerson = persons.find((p) => person.name === p.name)
    console.log('found', foundPerson);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <Person key={person.name} person={person} />)}
    </div>
  )
}

export default App