import { useQuery } from 'react-query'
import { QueryKeys } from '../Helpers/QueryKeys'
import {
    getCurrentPedido,
    getAllPedidos,
    getPedidoWithId,
} from '../Services/PedidosService'

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
export function usePedidoWithId(id) {
    const { data, isLoading, error, isFetching, refetch } = useQuery(
        [QueryKeys.PEDIDO, id],
        () => getPedidoWithId(id)
    )

    return {
        pedidoSelected: data?.result?.data ?? [],
        isLoadingPedidoSelected: isLoading,
        error,
        isFetchingPedidoSelected: isFetching,
        refetchPedidoSelected: refetch,
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
