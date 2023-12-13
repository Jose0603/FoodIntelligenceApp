import axios from 'axios'

export const BASE_URL = 'https://eb99-45-181-84-30.ngrok-free.app/api'
const API = axios.create({
    baseURL: BASE_URL,
})

export default API
