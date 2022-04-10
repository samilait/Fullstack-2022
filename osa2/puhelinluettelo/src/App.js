import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const Filter = (props) => {
  const {name, handleFilterPerson} = props
  return (
    <div>
      filter shown with <input value={name} onChange={handleFilterPerson} />
    </div>
  )
}

const Persons = ({filterPersons, removePerson}) => {
  return (
    <div>
      {filterPersons.map(person => <Person key={person.id} person={person} removePerson={removePerson} />)}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [filterPersons, setFilterPersons] = useState(persons)
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
        setFilterPersons(initialPersons)
      })

  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    console.log('personObject', personObject)

    if (persons.filter(p => p.name.toLowerCase() === newName.toLowerCase()).length > 0) {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one`)) {
        const person = persons.find(p => p.name === newName)
        const id = person.id
        const changedPerson = {...person, number: newNumber}

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setFilterPersons(filterPersons.map(person => person.id !== id ? person : returnedPerson))
            setMessage(`Updated ${returnedPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
  
          })
          .catch(error => {
            setMessage(`Information of '${person.name}' has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setPersons(persons.filter(p => p.id !== id))
            setFilterPersons(filterPersons.filter(p => p.id !== id))    
          })
        
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          const copy = [...persons]
          setFilterPersons(copy.concat(returnedPerson))
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })

    }
    setNewName('')
    setNewNumber('')
    setFilterName('')
  }

  const removePerson = (id) => {
    const rmPerson = persons.filter(person => person.id === id)[0]
    personService
      .remove(id)
      .then(() => {
        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
            setFilterPersons(initialPersons)
            setMessage(`Removed ${rmPerson.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)  
          })      
      })
  }


  const handlePersonChange = (event) => {
    console.log(event.target.value)
    console.log('persons', persons)
    setNewName(event.target.value)
    setFilterName('')
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterPerson = (event) => {
    const filterName = event.target.value
    const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    console.log('filter', filterPersons)    
    setFilterPersons(filterPersons)
    setFilterName(filterName)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter name={filterName} handleFilterPerson={handleFilterPerson} />
      <PersonForm
     
        addPerson={addPerson} 
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} removePerson={removePerson} />
    </div>
  )

}

export default App;
