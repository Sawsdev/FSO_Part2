import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/forecast'
const api_key = '9f37dcda455b1517af0f0f7986d84a2e'



const getAllCountries = () => {
    return axios
        .get(`${baseUrl}/all`)
        .then(response => {
            return response.data
        })
}

const filterCountries = (name, countries) => { 
    return countries
            .filter( country => country.name.common.toLowerCase().includes(name))
}

const getCountryCapitalWeather = (lat, lon) => {
    console.log(api_key);
    const url = `${weatherBaseUrl}?lat=${lat}&lon=${lon}&appid=${api_key}`
    return axios
        .get(url)
        .then( response => {
            console.log("received weather", response.data);
            return response.data
        })
}



export default {
    getAllCountries,
    filterCountries,
    getCountryCapitalWeather
}