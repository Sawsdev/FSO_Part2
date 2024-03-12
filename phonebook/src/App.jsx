import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 

  const [filteredPerson, setFilteredPerson] = useState('')
  const [showAllPersons, setShowAllPersons] = useState(true) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [notification, setNotification ] = useState({
    message: null,
    type: null
  })
  
  const getPersons = () => {

    personService
      .getAllPersons()
      .then(initialPersons => {
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
          setNotification({
            message: `Added ${createdPerson.name}!`,
            type: 'info'
          })
          setTimeout(() => {
            setNotification(
              {
                message: null,
                type: null
              }
            )
          },3000)
          
        })
        .catch(error => {
          console.log(error.response.data.error);
          setNotification({
            message: error.response.data.error,
            type: 'error'
          })
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
            alert(`${personToDelete.name} has been removed`)
            getPersons()
          })
          .catch(error => {
            console.log(`The person is already removed or is missing`, error);
            setNotification({
              message: `The person is already removed or is missing`,
              type: 'error'
            })
            setTimeout(() => {
              setNotification(
                {
                  message: null,
                  type: null
                }
              )
            }, 5000)
            getPersons()
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
      <Notification message={notification.message} type={notification.type} />
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