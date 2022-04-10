import { useEffect, useState } from 'react'
// import axios from 'axios'
import personService from './services/persons'

const Filter = (props) => {
  const {name, handleFilterPerson} = props
  return (
    <div>
      filter shown with <input value={name} onChange={handleFilterPerson} />
    </div>
  )
}

const NewPerson = (props) => {
  const {addPerson, newName, handlePersonChange, newNumber, handleNumberChange} = props
  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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

const Person = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} {person.number} 
      <button onClick={() => { if (window.confirm(`Delete ${person.name}?`)) { removePerson(person.id)}}}>delete</button>
    </li>
  )
}

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [filterPersons, setFilterPersons] = useState(persons)
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
        setFilterPersons(initialPersons)
      })

      // axios
      // .get('http://localhost:3001/persons')
      // .then(response => {
      //   setPersons(response.data)
      //   setFilterPersons(response.data)
      // })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    console.log('personObject', personObject)

    if (persons.filter(p => p.name.toLowerCase() === newName.toLowerCase()).length > 0) {
      // window.alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one`)) {
        const person = persons.find(p => p.name === newName)
        const id = person.id
        const changedPerson = {...person, number: newNumber}

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setFilterPersons(filterPersons.map(person => person.id !== id ? person : returnedPerson))
          })
        
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          const copy = [...persons]
          setFilterPersons(copy.concat(returnedPerson))
        })

      // setPersons(persons.concat(personObject))

      // const copy = [...persons]
      // setFilterPersons(copy.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    setFilterName('')
  }

  const removePerson = (id) => {
    // const rmPerson = persons.filter(person => person.id === id)[0]
    personService
      .remove(id)
      .then(() => {
        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
            setFilterPersons(initialPersons)
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
      <Filter name={filterName} handleFilterPerson={handleFilterPerson} />
      <NewPerson 
        addPerson={addPerson} 
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {/* {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      {filterPersons.map(person => 
        <Person key={person.name} person={person} deletePerson={deletePerson(person.id)} />
      )} */}


      <Persons filterPersons={filterPersons} removePerson={removePerson} />
    </div>
  )

}

export default App;
