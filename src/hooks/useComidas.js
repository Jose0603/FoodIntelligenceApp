import { useQuery } from 'react-query'
import { QueryKeys } from '../Helpers/QueryKeys'
import { GetComidasServices } from '../Services/ComidasService'

export function useComidas(idRestaurante) {
    const { data, isLoading, error, isFetching } = useQuery(
        [QueryKeys.COMIDAS, idRestaurante],
        () => GetComidasServices(idRestaurante)
    )

    return {
        comidas: data?.result?.data ?? [],
        isLoadingComidas: isLoading,
        error,
        isFetchingComidas: isFetching,
    }
}
