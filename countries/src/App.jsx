import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showFiltered, setShowFiltered] = useState(false)

  const getCountries = () => {
    console.log("fetching countries data...");
    
      countryService
        .getAllCountries()
        .then( initialCountries => {
          console.log("fetched", initialCountries);
          setCountries(prevCountries => prevCountries.concat(initialCountries))
        })

    
  }

  useEffect(getCountries,[])

  const filteredCountries = showFiltered 
  ? countryService.filterCountries(filter, countries)
  : countries
  const handleFilter = (event) => {
    const text = event.target.value.toLowerCase()
    setFilter(text)
    console.log('entered text', text);
    console.log("countries", countries);
    text === "" 
    ? setShowFiltered(false)
    : setShowFiltered(true)

  }

  return (
    <div>
        <div>
          Find countries <input type="text" onChange={handleFilter} value={filter}/>
        </div>
        <Countries countries={filteredCountries} />
      
    </div>
  )
}

export default App
