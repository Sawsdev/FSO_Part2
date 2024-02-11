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
    const existingPerson = personExists(newPerson)
    if ( !existingPerson)
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
      if(window.confirm(`${newPerson.name} already exists in the phonebook, replace the old number with a new one? `)){
        const personToUpdate = {...existingPerson, number: newPerson.number}
        
        personService
          .updatePerson(existingPerson.id, personToUpdate)
          .then(updatedPerson => {
            alert(
              `${updatedPerson.name} has updated!`
            )
            getPersons()
          })
      }
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (personToDelete) {
      if(window.confirm(`Delete ${personToDelete.name}`)){

        personService
          .removePerson(id)
          .then(removedPerson => {
            alert(`${removedPerson.name} has been removed`)
            getPersons()
          })
          .catch(error => {
            console.log(`The person is already removed or is missing`, error);
          })
      }
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
      <Persons persons={personsToShow} removePerson={deletePerson}/>
    </div>
  )
}

export default App