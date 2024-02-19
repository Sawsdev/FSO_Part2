import { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Search from './components/Search'


function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showFiltered, setShowFiltered] = useState(false)

  const getCountries = () => {
    
      countryService
        .getAllCountries()
        .then( initialCountries => {
          setCountries(prevCountries => prevCountries.concat(initialCountries))
        })

    
  }

  useEffect(getCountries,[])

  const filteredCountries = showFiltered 
  ? countryService.filterCountries(filter.toLowerCase(), countries)
  : countries
  const handleFilter = (event) => {
    const text = event.target.value
    setFilter(text)
    text === "" 
    ? setShowFiltered(false)
    : setShowFiltered(true)

  }

  const handleClick = (event) => {

    /**
     * Change the input to have the country name
     * and show the single country
     */
    setFilter(event.target.dataset.name)
  }

  return (
    <div>
        <Search handleFilter={handleFilter} filter={filter}/>
        <Countries countries={filteredCountries} handleClick={handleClick} />
    </div>
  )
}

export default App
