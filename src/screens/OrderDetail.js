import {
    Alert,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../../constants'
import * as Animatable from 'react-native-animatable'
import { cartStyles } from '../styles/CartStyles'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { usePedidoWithId } from '../hooks/usePedido'

const OrderDetail = ({ route, navigation }) => {
    const { findPedidoId } = route.params
    const [error, setError] = useState()

    const initialDate = new Date()
    initialDate.setHours(10, 0, 0, 0)
    if (initialDate.getHours() < 10) {
        initialDate.setHours(10, 0, 0, 0)
    } else if (initialDate.getHours() >= 22) {
        initialDate.setHours(22, 0, 0, 0)
    }
    const [showDate, setShowDate] = useState(initialDate)
    const { pedidoSelected, isLoadingPedidoSelected } =
        usePedidoWithId(findPedidoId)
    useEffect(() => {
        if (error) {
            Alert.alert('Ocurrio un error!', error)
            setError(null)
        }
    }, [error])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
            <StatusBar hidden={true} />
            <View style={cartStyles.header}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
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
                                color: COLORS.white,
                            }}
                        >
                            Carrito de Compra de{' '}
                            {pedidoSelected.restauranteName}
                        </Text>
                    </View>
                </View>

                <FlatList
                    data={pedidoSelected.detallesPedido}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                key={index}
                                style={cartStyles.cartItemContainer}
                            >
                                <View
                                    style={{
                                        marginRight: 2,
                                        width: 120,
                                    }}
                                >
                                    <Image
                                        src={`data:image/jpeg;base64,${item.idcomidaNavigationImagenComida}`}
                                        resizeMode="contain"
                                        style={{
                                            height: 120,
                                            width: 120,
                                            borderRadius: 30,
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        height: '100%',
                                        width: SIZES.width - 152,
                                        paddingLeft: 10,
                                        paddingRight: 6,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 13,
                                                color: COLORS.white,
                                                fontFamily: 'regular',
                                                textTransform: 'capitalize',
                                                marginRight: 20,
                                            }}
                                        >
                                            {item.idcomidaNavigationNombre}
                                        </Text>
                                    </View>

                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontFamily: 'bold',
                                            color: COLORS.white,
                                            marginVertical: 6,
                                        }}
                                    >
                                        L. {item.precioUnitario}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    fontFamily: 'regular',
                                                    color: COLORS.white,
                                                    marginHorizontal: 12,
                                                }}
                                            >
                                                {item.cantidad}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
            <Animatable.View animation="fadeInUpBig" style={cartStyles.footer}>
                <TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={cartStyles.body3}>Hora de entrega:</Text>
                        <Text
                            style={{
                                fontSize: 24,
                                fontFamily: 'bold',
                                color: COLORS.black,
                                marginLeft: 12,
                            }}
                        >
                            {new Date(
                                pedidoSelected.fechaHoraPedido
                            ).toLocaleString('en-US', {
                                hour12: true,
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </Text>
                    </View>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 16,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={cartStyles.body3}>Total:</Text>
                        <Text
                            style={{
                                fontSize: 24,
                                fontFamily: 'bold',
                                color: COLORS.black,
                                marginLeft: 12,
                            }}
                        >
                            L. {pedidoSelected.montoTotal}
                        </Text>
                    </View>
                </View>
            </Animatable.View>
        </SafeAreaView>
    )
}

export default OrderDetail
