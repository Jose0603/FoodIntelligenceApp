import { useQuery } from 'react-query'
import { QueryKeys } from '../Helpers/QueryKeys'
import { GetRestaurantesServices } from '../Services/RestaurantesService'

export function useRestaurantes() {
    const { data, isLoading, error, isFetching } = useQuery(
        [QueryKeys.RESTAURANTES],
        () => GetRestaurantesServices()
    )

    return {
        restaurantes: data?.result?.data ?? [],
        isLoadingRestaurantes: isLoading,
        error,
        isFetchingRestaurantes: isFetching,
    }
}
