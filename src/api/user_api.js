import { async } from 'validate.js'
import ApiManager from './ApiManager'

export const user_login = async (data) => {
    try {
        const result = await ApiManager('/authentication/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            data: data,
        })
        return result
    } catch (error) {
        return error.response
    }
}
