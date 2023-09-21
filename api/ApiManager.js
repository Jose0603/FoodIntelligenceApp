import { Axios } from 'react-native-axios'

const ApiManager = Axios.create({
    baseURL: 'http://localhost:7047/api',
    responseType: 'json',
    withCredentials: true,
})

export default ApiManager
