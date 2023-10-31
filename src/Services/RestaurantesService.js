import API from '../config'

export const GetRestaurantesServices = async () => {
    const { data } = await API.get(`/restaurantes`)

    return data
}
