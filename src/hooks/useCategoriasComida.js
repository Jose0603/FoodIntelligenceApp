import { useQuery } from 'react-query'
import { QueryKeys } from '../Helpers/QueryKeys'
import { GetCategoriasComida } from '../Services/CategoriasComida'

export function useCategoriasComida() {
    const { data, isLoading, error, isFetching } = useQuery(
        [QueryKeys.CATEGORIASCOMIDA],
        () => GetCategoriasComida()
    )

    return {
        categoriaComida: data ?? [],
        isLoadingCategoriaComida: isLoading,
        error,
        isFetchingCategoriaComida: isFetching,
    }
}
