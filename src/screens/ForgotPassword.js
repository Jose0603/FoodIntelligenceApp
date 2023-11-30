import { Alert, View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../constants'
import * as Animatable from 'react-native-animatable'
import Input from '../components/Input'
import Button from '../components/Button'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import { SendVerificationCode } from '../Services/UserInfo'

const ForgotPassword = ({ navigation }) => {
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
            <StatusBar style="light" />
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
                <Text style={commonStyles.headerTitle}>
                    Olvide mi contraseña
                </Text>
                <Text style={commonStyles.subHeaderTitle}>
                    Ingrese el correo asociado.
                </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
                <Formik
                    initialValues={{
                        email: '',
                    }}
                    onSubmit={async (values) => {
                        try {
                            const res = await SendVerificationCode(values)
                            if (res.status == 200)
                                navigation.navigate('Verification', {
                                    values: values,
                                })
                        } catch (error) {
                            setError('Correo no encontrado.')
                        }

                        return
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <Text style={commonStyles.inputHeader}>Correo</Text>
                            <Input
                                id="email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                placeholder=""
                                placeholderTextColor={COLORS.black}
                            />
                            <Button
                                title="Enviar Código"
                                isLoading={isLoading}
                                filled
                                style={commonStyles.btn1}
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </Animatable.View>
        </SafeAreaView>
    )
}

export default ForgotPassword
