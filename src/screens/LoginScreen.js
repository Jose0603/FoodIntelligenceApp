import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
} from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES } from '../../constants'
import Checkbox from 'expo-checkbox'
import * as Animatable from 'react-native-animatable'
import Input from '../components/Input'
import Button from '../components/Button'
import icons from '../../constants/icons'
import { validateInput } from '../utils/actions/formActions'
import { reducer } from '../utils/reducers/formReducers'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Formik } from 'formik'

const isTestMode = true

const initialState = {
    inputValues: {
        fullName: isTestMode ? 'Jose0603' : '',
        password: isTestMode ? 'Test1234*' : '',
    },
    inputValidities: {
        fullName: false,
        password: false,
    },
    formIsValid: false,
}

const LoginScreen = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false)
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const { login } = useContext(AuthContext)

    const inputChangedHandler = useCallback(
        (inputId, inputValue) => {
            const result = validateInput(inputId, inputValue)

            dispatchFormState({ inputId, validationResult: result, inputValue })
        },
        [dispatchFormState]
    )

    useEffect(() => {
        if (error) {
            Alert.alert('An error occured', error)
        }
    }, [error])

    // implementing facebook authentication
    const facebookAuthHandler = () => {
        return null
    }

    // implementing twitter authentication
    const twitterAuthHandler = () => {
        return null
    }

    // implementing apple authentication
    const appleAuthHandler = () => {
        return null
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
            <StatusBar style="light" />
            <View style={commonStyles.header}>
                <Text style={commonStyles.headerTitle}>Log In</Text>
                <Text style={commonStyles.subHeaderTitle}>
                    Please sign in to your existing account
                </Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
                <Formik
                    initialValues={{
                        fullName: isTestMode ? 'Jose0603' : '',
                        password: isTestMode ? 'Test1234*' : '',
                    }}
                    onSubmit={(values) =>
                        login(values.fullName, values.password)
                    }
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <Text style={commonStyles.inputHeader}>
                                Usuario
                            </Text>
                            <Input
                                id="fullName"
                                value={values.fullName}
                                onChangeText={handleChange('fullName')}
                                placeholder=""
                                placeholderTextColor={COLORS.black}
                            />

                            <Text style={commonStyles.inputHeader}>
                                Contraseña
                            </Text>
                            <Input
                                id="password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                errorText={
                                    formState.inputValidities['password']
                                }
                                autoCapitalize="none"
                                placeholder=""
                                placeholderTextColor={COLORS.black}
                                secureTextEntry={true}
                            />
                            <View style={commonStyles.checkBoxContainer}>
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate('ForgotPassword')
                                    }
                                >
                                    <Text
                                        style={{
                                            ...FONTS.body4,
                                            color: COLORS.primary,
                                        }}
                                    >
                                        Olvido su contraseña?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Button
                                title="LOG IN"
                                isLoading={isLoading}
                                filled
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>

                <View style={commonStyles.center}>
                    <Text style={{ ...FONTS.body4, color: COLORS.black }}>
                        No tienes cuenta?{' '}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={{ ...FONTS.body4, color: COLORS.primary }}>
                            Registrate
                        </Text>
                    </TouchableOpacity>
                </View>
                {/* <Text
                    style={{
                        ...FONTS.body4,
                        color: COLORS.black,
                        textAlign: 'center',
                    }}
                >
                    Or
                </Text> */}

                {/* <View style={commonStyles.socialContainer}>
                    <TouchableOpacity
                        onPress={facebookAuthHandler}
                        style={commonStyles.socialIconContainer}
                    >
                        <Image
                            source={icons.facebook}
                            resizeMode="contain"
                            style={commonStyles.socialLogo}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={twitterAuthHandler}
                        style={commonStyles.socialIconContainer}
                    >
                        <Image
                            source={icons.twitter}
                            resizeMode="contain"
                            style={commonStyles.socialLogo}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={appleAuthHandler}
                        style={commonStyles.socialIconContainer}
                    >
                        <Image
                            source={icons.apple}
                            resizeMode="contain"
                            style={commonStyles.socialLogo}
                        />
                    </TouchableOpacity>
                </View> */}
            </Animatable.View>
        </SafeAreaView>
    )
}

export default LoginScreen
