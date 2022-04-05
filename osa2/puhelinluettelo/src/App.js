import { useEffect, useState } from 'react'
import axios from 'axios'

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

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
    </div>
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilterPersons(response.data)
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
      window.alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))

      const copy = [...persons]
      setFilterPersons(copy.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
    setFilterName('')
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
      <Persons persons={filterPersons} />
    </div>
  )

}

export default App;
