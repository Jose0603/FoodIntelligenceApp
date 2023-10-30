import API from '../config'

export const UpdateUserInfo = async (values) => {
    const { data } = await API.put(`/UserInfo`, values)
    return data
}
