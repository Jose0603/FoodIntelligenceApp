import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { reducer } from '../utils/reducers/formReducers'
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import {
    Feather,
    Ionicons,
    MaterialIcons,
    Octicons,
    MaterialCommunityIcons,
    Fontisto,
} from '@expo/vector-icons'
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'
import { categories } from '../../data/categories'
import { restaurants } from '../../data/restaurants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRestaurantes } from '../hooks/useRestaurantes'
import { usePedido } from '../hooks/usePedido'
import { ActivityIndicator } from 'react-native'
// import CustomModal from '../components/CustomModal'
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import { commonStyles } from '../styles/CommonStyles'
import Input from '../components/Input'

const HomeV2 = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const { pedidos, isLoadingPedidoss } = usePedido()
    const { restaurantes, isLoadingRestaurantes } = useRestaurantes()

    // const [modalVisible, setModalVisible] = useState(true)

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
    // const handlePressGotIt = () => {
    //     // Handle the logic when the "GOT IT" button is pressed
    //     // For example, you can close the modal or perform any other action
    //     setModalVisible(false)
    // }

    const handleSearch = (text) => {
        setSearchQuery(text)
    }

    const renderFoodCategories = () => {
        return (
            <View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 8,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ ...FONTS.body2 }}>All Categories</Text>
                    <TouchableOpacity
                        onPress={() => console.log('See all category')}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={{ fontSize: 16, fontFamily: 'regular' }}>
                            See All
                        </Text>
                        <View>
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                size={24}
                                color={COLORS.gray4}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <FlatList
                    horizontal={true}
                    data={categories}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            style={{
                                height: 172,
                                paddingHorizontal: 8,
                                marginHorizontal: 10,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                shadowColor: '#F1F1F1',
                                shadowOffset: {
                                    width: 12,
                                    height: 12,
                                },
                                shadowOpacity: 0.15,
                                shadowRadius: 10,
                                elevation: 0.1,
                                borderRadius: 24,
                                borderColor: COLORS.tertiaryGray,
                                borderWidth: 1,
                            }}
                        >
                            <Image
                                source={item.image}
                                resizeMode="contain"
                                style={{
                                    height: 104,
                                    width: 122,
                                    borderRadius: 15,
                                    marginTop: 10,
                                }}
                            />
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontFamily: 'bold',
                                    marginVertical: 4,
                                }}
                            >
                                {item.name}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 4,
                                    marginBottom: 4,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'regular',
                                    }}
                                >
                                    Starting
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontFamily: 'regular',
                                    }}
                                >
                                    ${item.startingPrice}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
    const renderSearchBar = () => {
        return (
            <View
                style={{
                    width: SIZES.width - 32,
                    height: 62,
                    borderRadius: 1,
                    backgroundColor: COLORS.tertiaryGray,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
            >
                <View
                    style={{
                        marginHorizontal: SIZES.padding,
                    }}
                >
                    <Ionicons name="search" size={24} color={COLORS.gray4} />
                </View>
                {/* <Formik
                    initialValues={{
                        firstName: '',
                    }}
                    onSubmit={(values) => {
                        return submit({ id, ...values }, navigation)
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <TextInput
                                onChangeText={handleSearch}
                                placeholderTextColor={COLORS.gray5}
                            />
                            <Input
                                placeholder="Search restaurants"
                                id="firstName"
                                value={values.firstName}
                                onChangeText={handleChange('firstName')}
                            />
                        </View>
                    )}
                </Formik> */}
            </View>
        )
    }

    const renderRestaurants = () => {
        const navigation = useNavigation()
        return (
            <View style={{ height: 'auto' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 8,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ ...FONTS.body2 }}>Restaurantes</Text>
                    {/* <TouchableOpacity
                        onPress={() => console.log('')}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={{ fontSize: 16, fontFamily: 'regular' }}>
                            See All
                        </Text>
                        <View>
                            <MaterialIcons
                                name="keyboard-arrow-right"
                                size={24}
                                color={COLORS.gray4}
                            />
                        </View> 
                    </TouchableOpacity> */}
                </View>
                {!isLoadingRestaurantes &&
                    restaurantes != undefined &&
                    restaurantes != null && (
                        <FlatList
                            nestedScrollEnabled
                            data={restaurantes}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (
                                <View
                                    style={{
                                        width: SIZES.width - 32,
                                        borderColor: COLORS.tertiaryGray,
                                        borderWidth: 1,
                                        paddingBottom: 2,
                                        marginBottom: 12,
                                        borderRadius: 15,
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                'RestaurantView',
                                                {
                                                    item: item,
                                                }
                                            )
                                        }
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Image
                                            src={`data:image/jpeg;base64,${item.logoRestaurante}`}
                                            style={{
                                                width: SIZES.width - 32,
                                                height: 136,
                                                borderRadius: 15,
                                            }}
                                        />
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row' }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Octicons
                                                name="star"
                                                size={24}
                                                color={COLORS.primary}
                                            />
                                            <Text style={{ marginLeft: 8 }}>
                                                {item.rating}{' '}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 18,
                                                fontFamily: 'regular',
                                                marginVertical: 6,
                                            }}
                                        >
                                            {item.nombreRestaurante}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                    )}
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.area}>
            {!isLoadingPedidoss && !isLoadingRestaurantes ? (
                <View style={{ flex: 1, marginHorizontal: 16 }}>
                    <StatusBar hidden={true} />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.openDrawer()}
                                style={{
                                    height: 45,
                                    width: 45,
                                    borderRadius: 22.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.secondaryGray,
                                }}
                            >
                                <Image
                                    source={icons.menu}
                                    style={{
                                        height: 24,
                                        width: 24,
                                    }}
                                />
                            </TouchableOpacity>
                            {/* <View
                            style={{
                                flexDirection: 'column',
                                marginLeft: 12,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: COLORS.primary,
                                }}
                            >
                                DELIVER TO3
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 'regular',
                                    }}
                                >
                                    Halab lab office
                                </Text>
                                <Image
                                    source={icons.arrowDown2}
                                    style={{
                                        height: 12,
                                        width: 12,
                                        marginLeft: 4,
                                    }}
                                />
                            </View>
                        </View> */}
                        </View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Cart')}
                        >
                            <View
                                style={{
                                    height: 45,
                                    width: 45,
                                    borderRadius: 22.5,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.tertiaryBlack,
                                }}
                            >
                                <View>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            top: -16,
                                            left: 12,
                                            backgroundColor: COLORS.primary,
                                            height: 25,
                                            width: 25,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 12.5,
                                            zIndex: 999,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: COLORS.white,
                                            }}
                                        >
                                            {pedidos.cantidadTotal}
                                        </Text>
                                    </View>
                                    <Feather
                                        name="shopping-bag"
                                        size={24}
                                        color={COLORS.white}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 16,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontFamily: 'regular' }}>
                            Hola {fullName},
                        </Text>
                        <Text style={{ fontSize: 16, fontFamily: 'bold' }}>
                            Buen Provecho!
                        </Text>
                    </View>
                    <ScrollView>
                        {renderSearchBar()}
                        {/* {renderFoodCategories()} */}
                        {renderRestaurants()}
                    </ScrollView>
                </View>
            ) : (
                <View>
                    <ActivityIndicator size={'large'}></ActivityIndicator>
                </View>
            )}

            {/* <CustomModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                onPressGotIt={handlePressGotIt}
                code="#1243CD2"
            /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
})

export default HomeV2
