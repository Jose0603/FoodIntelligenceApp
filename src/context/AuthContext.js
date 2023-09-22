import { useState, useEffect } from 'react'
import { createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BASE_URL } from '../config'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const login = (username, password) => {
        setIsLoading(true)
        axios
            .post(`${BASE_URL}/authentication/login`, {
                username,
                password,
            })
            .then((res) => {
                let userInfo = res.data
                setUserInfo(userInfo)
                setUserToken(userInfo.token)
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                AsyncStorage.setItem('userToken', userToken)
            })
            .catch((e) => {
                console.log(e)
            })
        setIsLoading(false)
    }

    const logout = () => {
        setIsLoading(true)
        setUserToken(null)
        setUserInfo(null)
        AsyncStorage.removeItem('userToken')
        AsyncStorage.removeItem('userInfo')
        setIsLoading(false)
    }
    const isLogin = async () => {
        try {
            setIsLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo')
            let userToken = await AsyncStorage.getItem('userToken')
            userInfo = JSON.parse(userInfo)
            if (userInfo) {
                setUserToken(userToken)
                setUserInfo(userInfo)
            }
            setUserToken(userToken)
        } catch (error) {
            console.log(
                '🚀 ~ file: AuthContext.js:28 ~ isLogin ~ error:',
                error
            )
        }
        setIsLoading(false)
    }
    useEffect(() => {
        isLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken }}>
            {children}
        </AuthContext.Provider>
    )
}
