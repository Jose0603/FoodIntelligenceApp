import 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import { COLORS } from '../../constants'
import { Notifications, MyOrders, HomeV2, Search } from '../screens'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'

const Drawer = createDrawerNavigator()
const DrawerNavigation = () => {
    const [fullName, setFullName] = useState(null)
    const getUserInfo = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)
            if (userInfo) {
                setFullName(userInfo.fullName)
            }
        } catch (error) {
            console.log(
                '🚀 ~ file: AuthContext.js:28 ~ isLogin ~ error:',
                error
            )
        }
    }
    useEffect(() => {
        getUserInfo()
    }, [])
    return (
        <Drawer.Navigator
            drawerContent={(props) => {
                return (
                    <SafeAreaView>
                        <View
                            style={{
                                height: 200,
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    marginVertical: 6,
                                    fontFamily: 'bold',
                                    color: COLORS.black,
                                }}
                            >
                                {fullName}
                            </Text>
                        </View>
                        <DrawerItemList {...props} />
                    </SafeAreaView>
                )
            }}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: COLORS.white,
                    width: 250,
                },
                headerStyle: {
                    backgroundColor: COLORS.white,
                },
                headerShown: false,
                headerTintColor: COLORS.black,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                drawerLabelStyle: {
                    color: COLORS.black,
                    fontFamily: 'regular',
                    fontSize: 14,
                    marginLeft: -10,
                },
            }}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                    headerShadowVisible: false,
                    drawerIcon: () => (
                        <Ionicons
                            name="md-home-outline"
                            size={24}
                            color={COLORS.black}
                        />
                    ),
                }}
                component={HomeV2}
            />
            <Drawer.Screen
                name="Orders"
                options={{
                    drawerLabel: 'Orders',
                    title: 'Orders',
                    drawerIcon: () => (
                        <Ionicons
                            name="gift-outline"
                            size={24}
                            color={COLORS.black}
                        />
                    ),
                }}
                component={MyOrders}
            />
            <Drawer.Screen
                name="Search"
                options={{
                    drawerLabel: 'Search',
                    title: 'Search',
                    drawerIcon: () => (
                        <Ionicons
                            name="search-outline"
                            size={24}
                            color={COLORS.black}
                        />
                    ),
                }}
                component={Search}
            />

            <Drawer.Screen
                name="Notifications"
                options={{
                    drawerLabel: 'Notifications',
                    title: 'Notifications',
                    drawerIcon: () => (
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color={COLORS.black}
                        />
                    ),
                }}
                component={Notifications}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
