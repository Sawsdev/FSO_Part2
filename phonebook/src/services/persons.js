import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAllPersons = () => {
   const request = axios.get(url)
    return request.then(response => response.data)
}

const createPerson = (person) => {
    const request = axios.post(url, person)
    return request.then(response => response.data)
}

const updatePerson = (id, person) => {
    const request = axios.put(
        `${url}/${id}`, person
    )
    return request.then(response => response.data)
}



export default {
    getAllPersons,
    createPerson,
    updatePerson
}