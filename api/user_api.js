import ApiManager from './ApiManager'

export const user_login = async (data) => {
    try {
        // const result = await ApiManager('Authentication/login', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json',
        //     },
        //     data: data,
        // })
        return null
    } catch (error) {
        return error.response.data
    }
}
