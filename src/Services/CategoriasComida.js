import API from '../config'

export const GetCategoriasComida = async () => {
    const { data } = await API.get(`/userlist`)

    return data
}
