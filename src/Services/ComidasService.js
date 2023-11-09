import API from '../config'

export const GetComidasServices = async (idRestaurante) => {
    const { data } = await API.get(`/comidas?idRestaurante=` + idRestaurante)

    return data
}
