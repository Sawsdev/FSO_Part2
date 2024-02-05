import { useState } from 'react'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [filter, setFilter] = useState()
  const [personsToShow, setPersonsToShow] = useState(persons) 
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
      number: newNumber,
      id: persons.length + 1
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

  const filterPersons = (event) =>{
    const filteredPersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setPersonsToShow(filteredPersons)

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
      <div>
        <p>
          filter shown with <input 
                                  type="text" 
                                  value={filter}
                                  onChange={filterPersons} 
                            />
        </p>
      </div>
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
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App