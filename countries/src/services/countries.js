import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'


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




export default {
    getAllCountries,
    filterCountries
}