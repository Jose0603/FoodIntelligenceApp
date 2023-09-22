import { View, Text, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../constants'
import { HomeV1, Profile, Search, Card, Notifications, Menu, MyOrders } from '../screens'
import { Ionicons, SimpleLineIcons} from '@expo/vector-icons'
import DrawerNavigation from './DrawerNavigation'

const Tab = createBottomTabNavigator()

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: COLORS.white,
    },
}

const BottomTabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={DrawerNavigation}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <SimpleLineIcons name="home" size={24} color={
                                focused
                                    ? COLORS.primary
                                    : COLORS.black
                            } />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons 
                            name="list-sharp" 
                            size={24} 
                            color={
                                focused
                                    ? COLORS.primary
                                    : COLORS.black
                            }
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: () => {
                        return (
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.primary,
                                    height: Platform.OS == 'ios' ? 50 : 60,
                                    width: Platform.OS == 'ios' ? 50 : 60,
                                    top: Platform.OS == 'ios' ? -10 : -20,
                                    borderRadius:
                                        Platform.OS == 'ios' ? 25 : 30,
                                    borderWidth: 2,
                                    borderColor: COLORS.white,
                                }}
                            >
                               <Ionicons name="md-search-outline" size={24} color={COLORS.white} />
                            </View>
                        )
                    },
                }}
            />

            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons 
                            name="notifications-outline" 
                            size={24} 
                            color={
                                focused ? COLORS.primary : COLORS.black
                            }
                            />
                        )
                    },
                }}
            />

            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                            name="ios-person-outline"
                            size={24}
                            color={
                                focused ? COLORS.primary : COLORS.black
                            }
                        />
                        )
                    },
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigation