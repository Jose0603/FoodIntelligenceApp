import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS } from '../../constants'
import * as Animatable from 'react-native-animatable'
import Button from '../components/Button'
import { commonStyles } from '../styles/CommonStyles'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import Input from '../components/Input'
import { VerifyCode } from '../Services/UserInfo'

const Verification = ({ route, navigation }) => {
    const { values } = route.params
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const otpInput = useRef(null)

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
                <Text style={commonStyles.headerTitle}>Verificación</Text>
                <Text style={commonStyles.subHeaderTitle}>
                    Hemos enviado un codigo a tu correo.
                </Text>
                {/* <Text style={commonStyles.subHeaderTitleBold}>
                    example@gmail.com
                </Text> */}
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={commonStyles.footer}
            >
                {/* <View style={styles.center}>
                    <Text style={commonStyles.inputHeader}>Code</Text>
                    <TouchableOpacity onPress={() => console.log('Resend')}>
                        <Text style={{ textDecorationLine: 'underline' }}>
                            Resend
                        </Text>
                    </TouchableOpacity>
                </View> */}
                {/* <OTPTextInput
                    textInputStyle={commonStyles.OTPStyle}
                    inputCount={4}
                    tintColor={COLORS.primary}
                /> */}

                <Formik
                    initialValues={{
                        codigo: '',
                    }}
                    onSubmit={async (values1) => {
                        try {
                            const res = await VerifyCode(values1)
                            if (res.status == 200) {
                                navigation.navigate('ResetPassword', {
                                    email: values.email,
                                })
                            }
                        } catch (error) {
                            setError('Codigo no encontrado o expirado.')
                        }

                        return
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View>
                            <Text style={commonStyles.inputHeader}>Codigo</Text>
                            <Input
                                id="codigo"
                                value={values.codigo}
                                onChangeText={handleChange('codigo')}
                                placeholder=""
                                placeholderTextColor={COLORS.black}
                            />
                            {/* <OTPTextInput
                                textInputStyle={commonStyles.OTPStyle}
                                inputCount={4}
                                tintColor={COLORS.primary}
                                onChangeText={handleChange('codigo')}
                                value={values.codigo}
                            /> */}
                            <Button
                                title="Verificar Código"
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

const styles = StyleSheet.create({
    center: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default Verification
