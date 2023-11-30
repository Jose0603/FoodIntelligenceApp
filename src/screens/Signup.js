import { View, Alert, Text, TouchableOpacity } from 'react-native'
import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES } from '../../constants'
import * as Animatable from 'react-native-animatable'
import Input from '../components/Input'
import Button from '../components/Button'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import { Registration } from '../Services/UserInfo'
const Signup = ({ navigation }) => {
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (error) {
            Alert.alert('Ocurrio un error!', error)
            setError(null)
        }
    }, [error])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
            <StatusBar hidden={true} />
            <View style={commonStyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={commonStyles.backIcon}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={commonStyles.headerTitle}>Registrate</Text>
                {/* <Text style={commonStyles.subHeaderTitle}>
                    Please sign up to get started
                </Text> */}
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
                <KeyboardAwareScrollView>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            phoneNumber: '',
                        }}
                        onSubmit={async (values) => {
                            try {
                                if (values.password != values.confirmPassword)
                                    return setError('Contraseña no coinciden.')
                                const res = await Registration(values)
                                if (res.status == 201)
                                    navigation.navigate('Login')
                            } catch (error) {
                                setError(
                                    'Error al guardar la nueva contraseña.' +
                                        ' Por seguridad se recomienda crear contraseñas que contengan caracteres en mayúsculas y minúsculas, números y símbolos'
                                )
                            }

                            return
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
                                    Nombres
                                </Text>
                                <Input
                                    id="firstName"
                                    value={values.firstName}
                                    onChangeText={handleChange('firstName')}
                                    placeholder=""
                                    placeholderTextColor={COLORS.black}
                                />
                                <Text style={commonStyles.inputHeader}>
                                    Apellidos
                                </Text>
                                <Input
                                    id="lastName"
                                    value={values.lastName}
                                    onChangeText={handleChange('lastName')}
                                    placeholder=""
                                    placeholderTextColor={COLORS.black}
                                />
                                <Text style={commonStyles.inputHeader}>
                                    Usuario
                                </Text>
                                <Input
                                    id="username"
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    placeholder=""
                                    placeholderTextColor={COLORS.black}
                                />
                                <Text style={commonStyles.inputHeader}>
                                    Email
                                </Text>
                                <Input
                                    id="email"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    placeholder=""
                                    placeholderTextColor={COLORS.black}
                                />

                                <Text style={commonStyles.inputHeader}>
                                    Numero de Telefono
                                </Text>
                                <Input
                                    id="phoneNumber"
                                    value={values.phoneNumber}
                                    onChangeText={handleChange('phoneNumber')}
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
                                    placeholder=""
                                    placeholderTextColor={COLORS.black}
                                    secureTextEntry={true}
                                />

                                <Text style={commonStyles.inputHeader}>
                                    Confirmar Contraseña
                                </Text>
                                <Input
                                    id="confirmPassword"
                                    value={values.confirmPassword}
                                    onChangeText={handleChange(
                                        'confirmPassword'
                                    )}
                                    placeholder=""
                                    placeholderTextColor={COLORS.black}
                                    secureTextEntry={true}
                                />

                                <Button
                                    onPress={handleSubmit}
                                    title="SIGN UP"
                                    isLoading={isLoading}
                                    filled
                                    style={commonStyles.btn1}
                                />
                            </View>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </Animatable.View>
        </SafeAreaView>
    )
}

export default Signup
