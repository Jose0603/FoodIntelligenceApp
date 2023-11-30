import API from '../config'
export const Registration = async (values) => {
    return await API.post(`/Authentication/Registration`, values)
}
export const ResetPasswordService = async (values) => {
    return await API.post(`/Authentication/ResetPassword`, values)
}
export const SendVerificationCode = async (values) => {
    return await API.post(
        `/Authentication/sendVerificationCode?email=` + values?.email
    )
}
export const VerifyCode = async (values) => {
    return await API.post(`/Authentication/VerifyCode?code=` + values?.codigo)
}
export const UpdateUserInfo = async (values) => {
    const { data } = await API.put(`/UserInfo`, values)
    return data
}
