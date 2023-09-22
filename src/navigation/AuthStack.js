import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/LoginScreen'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name="Onboarding" component={OnboardingScreen} /> */}
                <Stack.Screen name="Login" component={LoginScreen} />
                {/* <Stack.Screen name="Register" component={RegisterScreen} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthStack
