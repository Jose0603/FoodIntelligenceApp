import { useQuery } from 'react-query'
import { QueryKeys } from '../Helpers/QueryKeys'
import { getCurrentPedido } from '../Services/PedidosService'

export function usePedido() {
    const { data, isLoading, error, isFetching } = useQuery(
        [QueryKeys.COMIDAS],
        () => getCurrentPedido()
    )

    return {
        comidas: data?.result?.data ?? [],
        isLoadingComidas: isLoading,
        error,
        isFetchingComidas: isFetching,
    }
}
