import { useQuery } from 'react-query'
import { QueryKeys } from '../Helpers/QueryKeys'
import { GetCategoriasComida } from '../Services/CategoriasComida'

export function useCategoriasComida() {
    const { data, isLoading, error, isFetching } = useQuery<any[], Error>(
        [QueryKeys.CATEGORIASCOMIDA],
        () => GetCategoriasComida()
    )

    return {
        attentionTypes: data ?? [],
        isLoadingClinicAttentionTypes: isLoading,
        error,
        isFetchingAttentionTypes: isFetching,
    }
}
