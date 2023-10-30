import { useToast } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'

import { ToastAlert } from '../components/ToastAlert'

export const useCustomToast = () => {
    const toast = useToast()

    const show = ({ title, description = '', status }) => {
        toast.show({
            render: ({ id }) => (
                <ToastAlert
                    id={id}
                    title={title}
                    variant={'left-accent'}
                    description={description}
                    status={status}
                />
            ),
        })
    }
    return show
}
