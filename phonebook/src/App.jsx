import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [filteredPerson, setFilteredPerson] = useState('')
  const [showAllPersons, setShowAllPersons] = useState(true) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  
  const getPersons = () => {

    personService
      .getAllPersons()
      .then(initialPersons => {
        console.log("Promise fullfiled");
        setPersons(initialPersons)
      })
  }
  useEffect(getPersons, [])
  
  
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
    
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    if ( !personExists(newPerson) )
    {
      personService
        .createPerson(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setNewName('')
          setNewNumber('')
          
        })
      
      
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
      <h3>Add a new</h3>
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