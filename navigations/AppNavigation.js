import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import { Onboarding1, 
    Onboarding2, 
    Onboarding3, 
    Signup, 
    Verification,
    Login, 
    StartUpScreen, 
    ForgotPassword, 
    ResetPassword, 
    Onboarding4 ,
    LocationAccess,
    HomeV1,
    FoodDetailsV1,
    FoodDetailsV2,
    RestaurantView1,
    RestaurantView2,
    FoodByKeywords,
    Cart,
    EditCart,
    PaymentMethod,
    PaymentMethodNoCard,
    AddPaymentCard,
    PaymentSuccess,
    TrackingOrderV1,
    Message,
    Menu,
    PersonalProfile,
    EditProfile,
    Address,
    AddNewAddress,
    Call,
    TrackingOrderV2
} from '../screens'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigation from './BottomTabNavigation'
import DrawerNavigation from './DrawerNavigation'

const Stack = createNativeStackNavigator()

const AppNavigation = () => {
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkIfFirstLaunch = async () => {
            try {
                const value = await AsyncStorage.getItem('alreadyLaunched')
                if (value === null) {
                    await AsyncStorage.setItem('alreadyLaunched', 'true')
                    setIsFirstLaunch(true)
                } else {
                    setIsFirstLaunch(false)
                }
            } catch (error) {
                setIsFirstLaunch(false)
            }
            setIsLoading(false) // Set loading state to false once the check is complete
        }

        checkIfFirstLaunch()
    }, [])

    if (isLoading) {
        return null // Render a loader or any other loading state component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={
                    isFirstLaunch ? 'Onboarding1' : 'Login'
                }
            >
                <Stack.Screen
                    name="Onboarding1"
                    component={Onboarding1}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Onboarding2"
                    component={Onboarding2}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Onboarding3"
                    component={Onboarding3}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                  name="Onboarding4"
                  component={Onboarding4}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="StartUpScreen"
                    component={StartUpScreen}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                  name="Verification"
                  component={Verification}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="LocationAccess"
                  component={LocationAccess}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="HomeV1"
                  component={HomeV1}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="Main"
                  component={BottomTabNavigation}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="DrawerNavigation"
                  component={DrawerNavigation}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="FoodByKeywords"
                  component={FoodByKeywords}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="FoodDetails"
                  component={FoodDetailsV1}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="RestaurantView"
                  component={RestaurantView1}
                  options={{
                    headerShown: false
                  }}
                />

                <Stack.Screen
                  name="Cart"
                  component={Cart}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="EditCart"
                  component={EditCart}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="PaymentMethod"
                  component={PaymentMethod}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="PaymentMethodNoCard"
                  component={PaymentMethodNoCard}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="AddPaymentCard"
                  component={AddPaymentCard}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="PaymentSuccess"
                  component={PaymentSuccess}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="TrackingOrders"
                  component={TrackingOrderV2}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                 name="Call"
                 component={Call}
                 options={{
                  headerShown: false
                 }}
                />
                <Stack.Screen
                  name="Message"
                  component={Message}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="Menu"
                  component={Menu}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="PersonalProfile"
                  component={PersonalProfile}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfile}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="Address"
                  component={Address}
                  options={{
                    headerShown: false
                  }}
                />
                <Stack.Screen
                  name="AddNewAddress"
                  component={AddNewAddress}
                  options={{
                    headerShown: false
                  }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation