import axios from 'axios'

export const BASE_URL = 'https://87c6-45-181-84-21.ngrok.io/api'
const API = axios.create({
    baseURL: BASE_URL,
})

export default API
