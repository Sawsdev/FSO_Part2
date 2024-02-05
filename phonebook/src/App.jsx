import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [filteredPerson, setFilteredPerson] = useState('')
  const [showAllPersons, setShowAllPersons] = useState(true) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const allPersons = [ ...persons]

  const personsToShow = showAllPersons ? allPersons : 
  allPersons.filter((person) => person.name.toLowerCase().includes(filteredPerson.toLocaleLowerCase()))



  /***
   * Handlers
   */
  
  const handleNameChange = (event) => {
  
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const value = event.target.value
    setFilteredPerson(value)

    value !== "" 
    ? setShowAllPersons(false)
    : setShowAllPersons(true)    
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
      setNewNumber('')
      
      
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
      <Filter filter={filteredPerson} handleFilter={handleFilterChange} />
      <PersonForm 
        name={newName}
        handleName={handleNameChange}
        number={newNumber}
        handleNumber={handleNumberChange}
        handleSubmit={addNewPerson}
        />
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App