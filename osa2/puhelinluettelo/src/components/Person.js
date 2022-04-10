const Person = ({ person, removePerson }) => {
  return (
    <li>
      {person.name} {person.number} 
      <button onClick={() => { if (window.confirm(`Delete ${person.name}?`)) { removePerson(person.id)}}}>delete</button>
    </li>
  )
}

export default Person
  