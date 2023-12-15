import API from '../config'

// export const GetRestaurantesServices = async () => {
//     const { data } = await API.get(`/Pedidos`)

//     return data
// }
export const addItem = async (values) => {
    return await API.post(`/Pedidos`, values)
}

export const getCurrentPedido = async () => {
    const { data } = await API.get(`/Pedidos/GetCurrentPedido`)

    return data
}

export const getAllPedidos = async () => {
    const { data } = await API.get(`/Pedidos`)

    return data
}

export const deleteDetallePedido = async (id) => {
    return await API.put(`/DetallesPedidos?id=${id}`)
}
