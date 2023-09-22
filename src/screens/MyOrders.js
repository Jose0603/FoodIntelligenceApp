import {
    View,
    Text,
    TouchableOpacity,
    Image,
    useWindowDimensions,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { commonStyles } from '../styles/CommonStyles'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { FlatList } from 'react-native'
import { history, orders } from '../../data/utils'
import { StatusBar } from 'expo-status-bar'

const OngoingRoute = () => (
    <View style={{ flex: 1 }}>
        <FlatList
            data={orders}
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
                            {item.type}
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
                                source={item.image}
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
                                    {item.name}
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
                                        ${item.price}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'regular',
                                        }}
                                    >
                                        {' '}
                                        | {item.numberOfItems} Items
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
                            {item.receipt}
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
                                Track Order
                            </Text>
                        </TouchableOpacity>
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
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    </View>
)

const HistoryRoute = () => (
    <View style={{ flex: 1 }}>
        <FlatList
            data={history}
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
                            {item.type}
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'bold',
                                color:
                                    item.status == 'Completed'
                                        ? COLORS.green
                                        : COLORS.red,
                                marginLeft: 12,
                            }}
                        >
                            {item.status}
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
                                source={item.image}
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
                                    {item.name}
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
                                        ${item.price}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'regular',
                                            marginHorizontal: 2,
                                        }}
                                    >
                                        {' '}
                                        | {item.date}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontFamily: 'regular',
                                        }}
                                    >
                                        {' '}
                                        | {item.numberOfItems} Items
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
                            {item.receipt}
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
                                Rate
                            </Text>
                        </TouchableOpacity>
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
                                Re-Order
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    </View>
)

const renderScene = SceneMap({
    first: OngoingRoute,
    second: HistoryRoute,
})

const MyOrders = ({ navigation }) => {
    const layout = useWindowDimensions()

    const [index, setIndex] = React.useState(0)

    const [routes] = React.useState([
        { key: 'first', title: 'Ongoing' },
        { key: 'second', title: 'History' },
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
        const navigation = useNavigation()
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
                        My Orders
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

export default MyOrders
