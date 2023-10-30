import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useReducer, useEffect } from 'react'
import { COLORS, SIZES, icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonStyles } from '../styles/CommonStyles'
import Input from '../components/Input'
import Button from '../components/Button'
import { reducer } from '../utils/reducers/formReducers'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik } from 'formik'
import { UpdateUserInfo } from '../Services/UserInfo'
import { useCustomToast } from '../hooks/useCustomToast'

const initialState = {
    inputValues: {
        fullName: '',
        email: '',
        phoneNumber: '',
        bio: '',
    },
    inputValidities: {
        fullName: false,
        email: false,
        phoneNumber: false,
        bio: false,
    },
    formIsValid: false,
}

const EditProfile = () => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [id, setId] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userInfoLoaded, setUserInfoLoaded] = useState(false)
    const showToast = useCustomToast()

    const getUserInfo = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo')
            userInfo = JSON.parse(userInfo)
            if (userInfo) {
                setFirstName(userInfo.firstName)
                setLastName(userInfo.lastName)
                setId(userInfo.id)
                setEmail(userInfo.email)
                setPhoneNumber(userInfo.phoneNumber)
            }
            setUserInfoLoaded(true)
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
    const submit = async (values, navigation) => {
        try {
            const res = await UpdateUserInfo(values)
            if (res.success) {
                showToast({
                    title: 'Código enviado',
                    status: 'success',
                    description: res.message,
                })
                navigation.goBack()
            }
            //else {
            //     showToast({
            //         title: 'Código no enviado',
            //         status: 'warning',
            //         description: res.message,
            //     })
            // }
        } catch (error) {
            console.error(error)
            showToast({
                title: 'Ocurrio un error',
                status: 'warning',
                description:
                    'Ocurrio un error al realizar la solicitud de cambio de contraseña',
            })
        }
    }
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
                        Edit Profile
                    </Text>
                </View>
            </View>
        )
    }

    const renderEditProfileForm = () => {
        const navigation = useNavigation()
        return (
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                {/* <View style={{ marginVertical: 12 }}>
                    <Image
                        source={image === null ? images.avatar2 : image}
                        resizeMode="contain"
                        style={{
                            height: 130,
                            width: 130,
                            borderRadius: 65,
                        }}
                    />
                    <TouchableOpacity
                        onPress={pickImage}
                        style={{
                            height: 42,
                            width: 42,
                            borderRadius: 21,
                            backgroundColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                        }}
                    >
                        <MaterialCommunityIcons
                            name="pencil-outline"
                            size={24}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                </View> */}
                <View
                    style={{
                        width: SIZES.width - 32,
                    }}
                >
                    <Formik
                        initialValues={{
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            phoneNumber: phoneNumber,
                        }}
                        onSubmit={(values) => {
                            return submit({ id, ...values }, navigation)
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                        }) => (
                            <View>
                                <Text style={commonStyles.inputHeader}>
                                    Primer Nombre
                                </Text>
                                <Input
                                    id="firstName"
                                    value={values.firstName}
                                    onChangeText={handleChange('firstName')}
                                    errorText={
                                        formState.inputValidities['firstName']
                                    }
                                />
                                <Text style={commonStyles.inputHeader}>
                                    Primer Apellido
                                </Text>
                                <Input
                                    id="lastName"
                                    value={values.lastName}
                                    onChangeText={handleChange('lastName')}
                                    errorText={
                                        formState.inputValidities['lastName']
                                    }
                                />
                                <Text style={commonStyles.inputHeader}>
                                    Email
                                </Text>
                                <Input
                                    id="email"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    errorText={
                                        formState.inputValidities['email']
                                    }
                                    placeholderTextColor={COLORS.black}
                                    keyboardType="email-address"
                                />
                                <Text style={commonStyles.inputHeader}>
                                    Phone Number
                                </Text>
                                <Input
                                    value={values.phoneNumber}
                                    onChangeText={handleChange('phoneNumber')}
                                    id="phoneNumber"
                                    errorText={
                                        formState.inputValidities['phoneNumber']
                                    }
                                    placeholder="111-111-111-222"
                                    placeholderTextColor={COLORS.black}
                                    keyboardType="numeric"
                                />
                                <Button
                                    title="SAVE"
                                    filled
                                    onPress={handleSubmit}
                                    style={{
                                        marginTop: 12,
                                    }}
                                />
                            </View>
                        )}
                    </Formik>

                    {/* <Text style={commonStyles.inputHeader}>Bio</Text>
                    <Input
                        id="bio"
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities['bio']}
                        placeholder="I love fast food"
                        placeholderTextColor={COLORS.black}
                    /> */}
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
                {userInfoLoaded ? renderEditProfileForm() : <View />}
            </View>
        </SafeAreaView>
    )
}

export default EditProfile
