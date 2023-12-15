import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, icons } from '../../constants'
import * as Animatable from 'react-native-animatable'
import { cartStyles } from '../styles/CartStyles'
import { commonStyles } from '../styles/CommonStyles'
import Input from '../components/Input'
import Button from '../components/Button'
import { cartData } from '../../data/utils'
import { StatusBar } from 'expo-status-bar'
import { usePedido } from '../hooks/usePedido'
import { ActivityIndicator } from 'react-native'
import { deleteDetallePedido, addItem } from '../Services/PedidosService'

const Cart = ({ navigation }) => {
    const [quantity, setQuantity] = useState(1)
    const { pedidos, isLoadingPedidoss, refetchPedidos } = usePedido()
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

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
                            Carrito
                        </Text>
                    </View>
                    {/* <TouchableOpacity onPress={() => console.log('Edit Items')}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'bold',
                                textTransform: 'uppercase',
                                color: COLORS.green,
                            }}
                        >
                            Done
                        </Text>
                    </TouchableOpacity> */}
                </View>

                <FlatList
                    data={pedidos.detallesPedido}
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
                                        <TouchableOpacity
                                            onPress={async () => {
                                                const response =
                                                    await deleteDetallePedido(
                                                        item.id
                                                    )
                                                if (response.status == 200)
                                                    refetchPedidos()
                                            }}
                                            style={{
                                                height: 26,
                                                width: 26,
                                                borderRadius: 13,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: COLORS.red,
                                                marginTop: 2,
                                            }}
                                        >
                                            <Image
                                                source={icons.close}
                                                resizeMode="contain"
                                                style={{
                                                    width: 12,
                                                    width: 12,
                                                    tintColor: COLORS.white,
                                                }}
                                            />
                                        </TouchableOpacity>
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
                                        {/* <Text
                                            style={{
                                                fontSize: 16,
                                                color: COLORS.white,
                                                fontFamily: 'regular',
                                            }}
                                        >
                                            {item.size}"
                                        </Text> */}
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    let cantidad = item.cantidad
                                                    cantidad = cantidad - 1
                                                    const response =
                                                        await addItem({
                                                            ...item,
                                                            cantidad,
                                                        })

                                                    if (response.status == 200)
                                                        refetchPedidos()
                                                }}
                                                style={cartStyles.roundedBtn}
                                            >
                                                <Text style={cartStyles.body2}>
                                                    -
                                                </Text>
                                            </TouchableOpacity>
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
                                            <TouchableOpacity
                                                onPress={async () => {
                                                    let cantidad = item.cantidad
                                                    cantidad = cantidad + 1
                                                    const response =
                                                        await addItem({
                                                            ...item,
                                                            cantidad,
                                                        })

                                                    if (response.status == 200)
                                                        refetchPedidos()
                                                }}
                                                style={cartStyles.roundedBtn}
                                            >
                                                <Text style={cartStyles.body2}>
                                                    +
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
            <Animatable.View animation="fadeInUpBig" style={cartStyles.footer}>
                {/* <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 10,
                    }}
                >
                    <Text style={cartStyles.body3}>Delivery Address</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditCart')}
                    >
                        <Text style={cartStyles.body3Color}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <Input
                    id="Address"
                    placeholder="2118 Thornridge Cir. Syracuse"
                    placeholderTextColor={COLORS.gray4}
                    editable={false}
                /> */}

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
                            L. {pedidos.montoTotal}
                        </Text>
                    </View>
                    {/* <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <Text style={cartStyles.body3Color}>Breakdown</Text>
                        <View style={{ marginLeft: 2 }}>
                            <Image
                                source={icons.arrowRight}
                                style={{
                                    height: 18,
                                    width: 18,
                                    tintColor: COLORS.black,
                                }}
                            />
                        </View>
                    </View> */}
                </View>

                <Button
                    filled
                    title="Completar Orden"
                    onPress={() => navigation.navigate('PaymentMethod')}
                    style={{ marginVertical: 2 }}
                />
            </Animatable.View>
        </SafeAreaView>
    )
}

export default Cart
