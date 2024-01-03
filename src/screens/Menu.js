import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { COLORS, FONTS, SIZES, icons, images } from '../../constants'
import { commonStyles } from '../styles/CommonStyles'
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Menu = () => {
    const { logout } = useContext(AuthContext)
    const renderHeader = () => {
        const navigation = useNavigation()
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={commonStyles.header1Icon}
                    >
                        <Image
                            resizeMode="contain"
                            source={icons.arrowLeft}
                            style={{
                                height: 24,
                                width: 24,
                                tintColor: COLORS.black,
                            }}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            marginLeft: 12,
                            fontSize: 17,
                            fontFamily: 'regular',
                        }}
                    >
                        Perfil
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => console.log('Pressed')}
                    style={commonStyles.header1Icon}
                >
                    <Image
                        resizeMode="contain"
                        source={icons.more}
                        style={{
                            height: 24,
                            width: 24,
                            tintColor: COLORS.black,
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderUserProfile = () => {
        const [userFirstName, setUserFirstName] = useState(null)
        const getUserInfo = async () => {
            try {
                let userInfo = await AsyncStorage.getItem('userInfo')
                userInfo = JSON.parse(userInfo)
                if (userInfo) {
                    setUserFirstName(userInfo.fullName)
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
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 16,
                }}
            >
                {/* <Image
                    source={images.avatar2}
                    resizeMode="contain"
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 50,
                    }}
                /> */}
                <View style={{ marginLeft: 12 }}>
                    <Text style={{ ...FONTS.h4 }}>{userFirstName}</Text>
                    {/* <Text
                        style={{
                            fontSize: 12,
                            fontFamily: 'regular',
                            color: COLORS.gray5,
                            marginVertical: 6,
                        }}
                    >
                        I love fast food
                    </Text> */}
                </View>
            </View>
        )
    }

    const renderSettings = () => {
        const navigation = useNavigation()

        return (
            <View style={{ flexDirection: 'column' }}>
                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PersonalProfile')}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather
                                    name="user"
                                    size={24}
                                    color={COLORS.primary}
                                />
                            </View>
                            <Text style={styles.textBody}>
                                Información Personal
                            </Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate('Address')}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather name="map" size={24} color="#413DFB" />
                            </View>
                            <Text style={styles.textBody}>Addresses</Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity> */}
                </View>

                <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Cart')}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather
                                    name="shopping-bag"
                                    size={24}
                                    color="#369BFF"
                                />
                            </View>
                            <Text style={styles.textBody}>Carrito</Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => navigation.navigate('Cart')}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather
                                    name="heart"
                                    size={24}
                                    color="#B33DFB"
                                />
                            </View>
                            <Text style={styles.textBody}>Favourite</Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity>
                <TouchableOpacity
                        onPress={() => navigation.navigate('Notifications')}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={24}
                                    color={COLORS.primary}
                                />
                            </View>
                            <Text style={styles.textBody}>Notifications</Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => categoriaComida}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather
                                    name="credit-card"
                                    size={24}
                                    color="#369BFF"
                                />
                            </View>
                            <Text style={styles.textBody}>Payment Method</Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity>*/}
                </View>

                {/* <View style={styles.container}>
                    <TouchableOpacity
                        onPress={() => console.log('FAQS')}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather
                                    name="info"
                                    size={24}
                                    color={COLORS.primary}
                                />
                            </View>
                            <Text style={styles.textBody}>FAQs</Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('User reviews')}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather
                                    name="copy"
                                    size={24}
                                    color="#2AE1E1"
                                />
                            </View>
                            <Text style={styles.textBody}>User Reviews</Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('Settings')}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <Feather
                                    name="settings"
                                    size={24}
                                    color="#413DFB"
                                />
                            </View>
                            <Text style={styles.textBody}>Settings</Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity>
                </View> */}

                <View style={[styles.container, { marginBottom: 100 }]}>
                    <TouchableOpacity
                        onPress={() => logout()}
                        style={styles.subContainer}
                    >
                        <View style={styles.subLeftContainer}>
                            <View style={styles.rounded}>
                                <MaterialIcons
                                    name="logout"
                                    size={24}
                                    color="#FB4A59"
                                />
                            </View>
                            <Text style={styles.textBody}>Cerrar Sesión</Text>
                        </View>
                        <View>
                            <Image
                                source={icons.arrowRight}
                                style={styles.iconRight}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar hidden={true} />
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 16,
                }}
            >
                {renderHeader()}
                <ScrollView>
                    {renderUserProfile()}
                    {renderSettings()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.gray7,
        borderRadius: 16,
        width: SIZES.width - 32,
        paddingVertical: 8,
        marginBottom: 12,
    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.gray7,
        marginVertical: 8,
    },
    subLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rounded: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
    },
    textBody: {
        fontSize: 16,
        fontFamily: 'regular',
        color: '#32343E',
    },
    iconRight: {
        height: 16,
        width: 16,
        marginRight: 8,
        tintColor: '#747783',
    },
})
export default Menu
