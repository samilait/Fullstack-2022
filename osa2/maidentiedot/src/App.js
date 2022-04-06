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

const Countries = ({ countries, setFilterCountries, weather }) => {
  
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
        <Country country={countries[0]} weather={weather} />
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

const Country = ({ country, weather }) => {
  console.log(country.languages[0].name)
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      <img alt={country.name} src={country.flag} width="100" height="100" />
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather.current.temperature} Celcius</p>
      <img alt={country.name} src={weather.current.weather_icons} width="100" height="100" />
      <p>wind {weather.current.wind_speed} m/s</p>
    </div>
  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryName, setCountryName] = useState('')
  const [filterCountries, setFilterCountries] = useState([])
  const [capitals, setCapitals] = useState('Helsinki')
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get('http://api.weatherstack.com/current' ,{ params: { access_key: api_key, units:'m', query: capitals}})
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }, [capitals])

  const handleFilterCountry = (event) => {
    const countryName = event.target.value
    const filterCountries = countries.filter(country => country.name.toLowerCase().includes(countryName.toLowerCase()))
    console.log(filterCountries)
    setFilterCountries(filterCountries)
    setCountryName(countryName)

    const capitals = filterCountries.map(country => country.capital)
    setCapitals(capitals[0])
  }

  return (
    <div>
      <Filter name={countryName} handleFilter={handleFilterCountry} />
      <Countries countries={filterCountries} setFilterCountries={setFilterCountries} weather={weather} />
    </div>
  )
}

export default App
