import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '555-236232'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber ] = useState('')

  /***
   * Handlers
   */
  
  const handleNameChange = (event) => {
  
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    console.log("Got the form", event.target);
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if ( !personExists(newPerson) )
    {
      setPersons(persons.concat(newPerson))
      setNewName('')
      
    }
    else {
      alert(`${newPerson.name} already exists in the phonebook`)
    }
  }

  /**
   * Validation functions
   */
  const personExists = (person) => {
     const foundPerson = persons.find((p) => person.name.toLowerCase() === p.name.toLowerCase())
     
     return foundPerson
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
          number: <input 
            value={newNumber} 
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <Persons persons={persons} />
    </div>
  )
}

export default App