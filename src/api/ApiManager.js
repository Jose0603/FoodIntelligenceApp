import axios from 'axios'

const ApiManager = axios.create({
    baseURL: 'https://localhost:7047/api',
    responseType: 'json',
    withCredentials: true,
})

export default ApiManager
