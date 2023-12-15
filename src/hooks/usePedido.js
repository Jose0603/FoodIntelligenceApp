import { useQuery } from 'react-query'
import { QueryKeys } from '../Helpers/QueryKeys'
import { getCurrentPedido, getAllPedidos } from '../Services/PedidosService'

export function usePedido() {
    const { data, isLoading, error, isFetching, refetch } = useQuery(
        [QueryKeys.PEDIDO],
        () => getCurrentPedido()
    )

    return {
        pedidos: data?.result?.data ?? [],
        isLoadingPedidoss: isLoading,
        error,
        isFetchingPedidos: isFetching,
        refetchPedidos: refetch,
    }
}
export function useAllPedidos() {
    const { data, isLoading, error, isFetching, refetch } = useQuery(
        [QueryKeys.PEDIDOS],
        () => getAllPedidos()
    )

    return {
        allPedidos: data?.result?.data ?? [],
        isLoadingAllPedidoss: isLoading,
        error,
        isFetchingAllPedidos: isFetching,
        refetchAllPedidos: refetch,
    }
}
