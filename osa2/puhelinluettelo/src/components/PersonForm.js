const PersonForm = (props) => {
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

export default PersonForm