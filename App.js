import * as SplashScreen from 'expo-splash-screen'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './src/QueryClient'
import { LogBox } from 'react-native'
import { AuthProvider } from './src/context/AuthContext'
import AppNav from './src/navigation/AppNav'

//Ignore all log notifications
LogBox.ignoreAllLogs()

SplashScreen.preventAutoHideAsync()

export default function App() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <AppNav />
            </QueryClientProvider>
        </AuthProvider>
    )
}
