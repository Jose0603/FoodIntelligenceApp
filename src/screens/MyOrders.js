import {
    Text,
    TouchableOpacity,
    Image,
    useWindowDimensions,
    View,
    Modal,
    StyleSheet,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images, icons } from '../../constants'
import { Ionicons } from '@expo/vector-icons'
import { commonStyles } from '../styles/CommonStyles'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useAllPedidos } from '../hooks/usePedido'
import Button from '../components/Button'
import { updateRatingPedido } from '../Services/PedidosService'
import { Octicons, AntDesign } from '@expo/vector-icons'

const OngoingRoute = () => {
    const { allPedidos } = useAllPedidos()
    const ongoingOrders = allPedidos.filter(
        (order) => order.estadoPedido === 'Preparación'
    )
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={ongoingOrders}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'column' }}>
                        <View
                            style={{
                                borderBottomColor: COLORS.gray,
                                borderBottomWidth: 1,
                                marginVertical: 12,
                                paddingBottom: 4,
                            }}
                        >
                            <Text style={{ fontSize: 14, fontFamily: 'bold' }}>
                                Orden
                            </Text>
                        </View>
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
                                <Image
                                    src={`data:image/jpeg;base64,${item.restauranteImagen}`}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 8,
                                    }}
                                />
                                <View style={{ marginLeft: 12 }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {item.restauranteName}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 4,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'bold',
                                            }}
                                        >
                                            L. {item.montoTotal}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontFamily: 'regular',
                                                marginHorizontal: 2,
                                            }}
                                        >
                                            {' '}
                                            |{' '}
                                            {new Date(
                                                item.fechaHoraPedido
                                            ).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 4,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontFamily: 'regular',
                                            }}
                                        >
                                            {item.cantidadTotal} Artículos
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    textDecorationLine: 'underline',
                                    textDecorationColor: COLORS.gray5,
                                    fontFamily: 'regular',
                                }}
                            >
                                #{item.id}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 18,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: 38,
                                    width: 140,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.primary,
                                    borderRadius: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontSize: 14,
                                        fontFamily: 'regular',
                                    }}
                                >
                                    Ver Detalles
                                </Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                style={{
                                    height: 38,
                                    width: 140,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.white,
                                    borderColor: COLORS.primary,
                                    borderWidth: 1,
                                    borderRadius: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.primary,
                                        fontSize: 14,
                                        fontFamily: 'regular',
                                    }}
                                >
                                    Track Order
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const HistoryRoute = () => {
    const { allPedidos, isLoadingAllPedidoss, refetchAllPedidos } =
        useAllPedidos()
    const restOrder = allPedidos.filter(
        (order) => order.estadoPedido != 'Preparación'
    )
    const [modalVisible, setModalVisible] = useState(false)
    const [pedidoId, setPedidoId] = useState(0)

    const renderSearchModal = () => {
        const [isStarSelected, setIsStarSelected] = useState(0)
        const updateCurrentPedido = async () => {
            await updateRatingPedido({
                id: pedidoId,
                rating: isStarSelected,
            })
            refetchAllPedidos()
        }
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableOpacity
                    onPressOut={() => setModalVisible(false)}
                    activeOpacity={0.1}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        height: SIZES.height,
                        width: SIZES.width,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <View
                            style={{
                                height: 'auto',
                                width: SIZES.width * 0.9,
                                borderRadius: 12,
                                backgroundColor: COLORS.white,
                                paddingHorizontal: 12,
                            }}
                        >
                            <View
                                style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingVertical: 12,
                                }}
                            >
                                <Text
                                    style={{ fontSize: 17, fontFamily: 'bold' }}
                                >
                                    Calificanos
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={commonStyles.header3Icon}
                                >
                                    <Image
                                        source={icons.close}
                                        style={{
                                            height: 24,
                                            width: 24,
                                            tintColor: COLORS.black,
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginVertical: 13,
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles.starContainer}
                                        onPress={() => setIsStarSelected(1)}
                                    >
                                        <Ionicons
                                            name="md-star-sharp"
                                            size={24}
                                            color={
                                                isStarSelected >= 1
                                                    ? COLORS.primary
                                                    : COLORS.gray
                                            }
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.starContainer}
                                        onPress={() => setIsStarSelected(2)}
                                    >
                                        <Ionicons
                                            name="md-star-sharp"
                                            size={24}
                                            color={
                                                isStarSelected >= 2
                                                    ? COLORS.primary
                                                    : COLORS.gray
                                            }
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.starContainer}
                                        onPress={() => setIsStarSelected(3)}
                                    >
                                        <Ionicons
                                            name="md-star-sharp"
                                            size={24}
                                            color={
                                                isStarSelected >= 3
                                                    ? COLORS.primary
                                                    : COLORS.gray
                                            }
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.starContainer}
                                        onPress={() => setIsStarSelected(4)}
                                    >
                                        <Ionicons
                                            name="md-star-sharp"
                                            size={24}
                                            color={
                                                isStarSelected >= 4
                                                    ? COLORS.primary
                                                    : COLORS.gray
                                            }
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.starContainer}
                                        onPress={() => setIsStarSelected(5)}
                                    >
                                        <Ionicons
                                            name="md-star-sharp"
                                            size={24}
                                            color={
                                                isStarSelected >= 5
                                                    ? COLORS.primary
                                                    : COLORS.gray
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Button
                                title="Calificar"
                                filled
                                onPress={() => {
                                    updateCurrentPedido()
                                    setModalVisible(false)
                                }}
                                style={{
                                    marginBottom: 12,
                                }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={restOrder}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'column' }}>
                        <View
                            style={{
                                borderBottomColor: COLORS.gray,
                                borderBottomWidth: 1,
                                marginVertical: 12,
                                flexDirection: 'row',
                                paddingBottom: 4,
                            }}
                        >
                            <Text style={{ fontSize: 14, fontFamily: 'bold' }}>
                                Orden
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    fontFamily: 'bold',
                                    color:
                                        item.estadoPedido == 'Completado'
                                            ? COLORS.green
                                            : item.estadoPedido == 'Cancelado'
                                            ? COLORS.red
                                            : COLORS.yellow,
                                    marginLeft: 12,
                                }}
                            >
                                {item.estadoPedido}
                            </Text>
                        </View>
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
                                <Image
                                    src={`data:image/jpeg;base64,${item.restauranteImagen}`}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: 8,
                                    }}
                                />
                                <View style={{ marginLeft: 12 }}>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {item.restauranteName}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 4,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontFamily: 'bold',
                                            }}
                                        >
                                            L. {item.montoTotal}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontFamily: 'regular',
                                                marginHorizontal: 2,
                                            }}
                                        >
                                            {' '}
                                            |{' '}
                                            {new Date(
                                                item.fechaHoraPedido
                                            ).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                            })}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 4,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontFamily: 'regular',
                                            }}
                                        >
                                            {item.cantidadTotal} Artículos
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: 4,
                                        }}
                                    >
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
                                                {item.rating}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    textDecorationLine: 'underline',
                                    textDecorationColor: COLORS.gray5,
                                    fontFamily: 'regular',
                                }}
                            >
                                #{item.id}
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 18,
                            }}
                        >
                            {item.estadoPedido != 'Cancelado' &&
                                item.isRated != true && (
                                    <TouchableOpacity
                                        style={{
                                            height: 38,
                                            width: 140,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: COLORS.white,
                                            borderColor: COLORS.primary,
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        onPressOut={() => {
                                            setModalVisible(true)
                                            setPedidoId(item.id)
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: COLORS.primary,
                                                fontSize: 14,
                                                fontFamily: 'regular',
                                            }}
                                        >
                                            Calificanos
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            <TouchableOpacity
                                style={{
                                    height: 38,
                                    width: 140,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: COLORS.primary,
                                    borderRadius: 8,
                                }}
                            >
                                <Text
                                    style={{
                                        color: COLORS.white,
                                        fontSize: 14,
                                        fontFamily: 'regular',
                                    }}
                                >
                                    Detalles
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            {renderSearchModal()}
        </View>
    )
}

const renderScene = SceneMap({
    first: OngoingRoute,
    second: HistoryRoute,
})

const MyOrders = ({ navigation }) => {
    const layout = useWindowDimensions()

    const [index, setIndex] = React.useState(0)

    const [routes] = React.useState([
        { key: 'first', title: 'En Preparación' },
        { key: 'second', title: 'Historial' },
    ])

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: COLORS.primary,
            }}
            style={{
                backgroundColor: '#fff',
            }}
            renderLabel={({ route, focused, color }) => (
                <Text style={[{ color: focused ? COLORS.black : 'gray' }]}>
                    {route.title}
                </Text>
            )}
        />
    )

    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    marginHorizontal: 16,
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
                        Mis Ordenes
                    </Text>
                </View>
                {/* <TouchableOpacity
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
                </TouchableOpacity> */}
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar hidden={true} />
            <View style={{ flex: 1 }}>
                {renderHeader()}
                <View
                    style={{
                        flex: 1,
                        marginHorizontal: 22,
                    }}
                >
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={{ width: layout.width }}
                        renderTabBar={renderTabBar}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    checkboxContainer: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: COLORS.gray6,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        marginBottom: 12,
    },
    roundedCheckBoxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        width: 48,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: COLORS.gray,
        backgroundColor: COLORS.gray,
        marginRight: 12,
    },
    selectedCheckbox: {
        backgroundColor: COLORS.primary,
    },
    checkboxText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'regular',
    },
    starContainer: {
        height: 48,
        width: 48,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: COLORS.secondaryGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6,
    },
})
export default MyOrders
