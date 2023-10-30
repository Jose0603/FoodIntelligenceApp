import axios from 'axios'

export const BASE_URL = 'https://aefd-45-181-84-19.ngrok-free.app/api'
const API = axios.create({
    baseURL: BASE_URL,
})

export default API
