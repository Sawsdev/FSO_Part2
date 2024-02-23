import { useState, useEffect } from "react"
import countryService from '../services/countries.js'
import Weather from "./Weather"

const Country = ({country}) => {

    const [currentWeather, setCurrentWeather] = useState({})
    const getCountryWeater = () => {
        countryService
        . getCountryCapitalWeather(country.latlng[0], country.latlng[1])
        .then(weather => {
            setCurrentWeather(weather)
        })
    }

    useEffect(getCountryWeater,[])

    const {name, area, capital, flags} = country
    const languages = Object.values(country.languages)
    return (
        <div>
            <h2>{name.common}</h2>
            <br />
            <p><strong>Capital</strong> {capital[0]}</p>
            <p><strong>Area</strong> {area}</p>
            <br />
            <br />
            <h3><strong>Languagues:</strong></h3>
            <br />
            <ul>
                {
                    languages.map( language => 
                        <li key={language}>{language}</li>
                        )
                }
            </ul>
            <br />
            <img src={flags.png} alt={`Country ${country.name.common} flag`} />
            <Weather weather={currentWeather} capital={capital} />
        </div>
    )


}


export default Country




