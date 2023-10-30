import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // ✅ tiempo del cache por defecto a 60 segundos
            staleTime: 1000 * 1 * 4,
            retry: 2,
        },
    },
})
