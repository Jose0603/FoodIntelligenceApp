import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { COLORS, FONTS, SIZES, icons } from '../../constants'
import { Feather, Octicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-virtualized-view'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRestaurantes } from '../hooks/useRestaurantes'
import { usePedido } from '../hooks/usePedido'
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const HomeV2 = ({ navigation }) => {
    const { pedidos, isLoadingPedidoss } = usePedido()
    const { restaurantes, isLoadingRestaurantes } = useRestaurantes()

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
                {restaurantes != undefined && (
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
                                        navigation.navigate('RestaurantView', {
                                            item: item,
                                        })
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
