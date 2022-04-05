import { useEffect, useState } from 'react'
import axios from 'axios'

const Filter = (props) => {
  const {name, handleFilter} = props
  return (
    <div>
      find countries <input value={name} onChange={handleFilter} />
    </div>
  )
}

const Countries = ({ countries, setFilterCountries }) => {
  
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    console.log('one')
    return (
      <div>
        <Country country={countries[0]} />
      </div>
    )
  } else {  
    return (
      <div>
        {countries.map(country => <li key={country.name}>{country.name} <button onClick={() => setFilterCountries([country])}>show</button></li>)}
      </div>
    )
  }
}

const Country = ({ country }) => {
  console.log(country.languages[0].name)
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      <img alt={country.name} src={country.flag} width="100" height="100" />
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  const [filterCountries, setFilterCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilterCountry = (event) => {
    const countryName = event.target.value
    const filterCountries = countries.filter(country => country.name.toLowerCase().includes(countryName.toLowerCase()))
    console.log(filterCountries)
    setFilterCountries(filterCountries)
    setCountryName(countryName)
  }

  return (
    <div>
      <Filter name={countryName} handleFilter={handleFilterCountry} />
      <Countries countries={filterCountries} setFilterCountries={setFilterCountries} />
    </div>
  )
}

export default App
