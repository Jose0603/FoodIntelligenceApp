import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { useCallback } from 'react'
import { FONTS } from '../../constants/fonts'
import AppNavigation from '../../navigations/AppNavigation'
import AuthStack from './AuthStack'
import { ActivityIndicator } from 'react-native'
import { View } from 'react-native-animatable'
import API from '../config'

const AppNav = () => {
    const { isLoading, userToken } = useContext(AuthContext)
    const [fontsLoaded] = useFonts(FONTS)

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null
    }
    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size={'large'}></ActivityIndicator>
            </View>
        )
    }
    ;(function () {
        if (userToken) {
            API.defaults.headers.common['Authorization'] = 'Bearer ' + userToken
        } else {
            API.defaults.headers.common['Authorization'] = ''
        }
        API.interceptors.response.use((response) => response)
    })()

    return (
        <SafeAreaProvider onLayout={onLayoutRootView}>
            {userToken !== null && userToken !== undefined ? (
                <AppNavigation />
            ) : (
                <AuthStack />
            )}
        </SafeAreaProvider>
    )
}

export default AppNav
