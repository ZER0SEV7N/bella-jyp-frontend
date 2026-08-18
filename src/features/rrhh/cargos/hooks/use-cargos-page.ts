import { useCargoAreasQuery } from './use-cargo-areas-query'
import { useCargoMutations } from './use-cargo-mutations'
import { useCargosPageState } from './use-cargos-page-state'
import { useCargosQuery } from './use-cargos-query'
import { useCargosSearchParams } from './use-cargos-search-params'
import type {
  Cargo,
  CargoFormValues,
  CargoListMeta,
  CargoQuery,
} from '../types/cargo.types'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'

const EMPTY_CARGOS: Cargo[] = []

/** Coordina consultas, mutaciones, URL y estado visual de la página de cargos. */
export function useCargosPage() {
  const { state, actions: stateActions } = useCargosPageState()
  const { filters, actions: searchActions } = useCargosSearchParams()
  const query: CargoQuery = {
    page: filters.page,
    limit: filters.limit,
    activo: filters.status === 'all' ? undefined : filters.status === 'active',
    id_area: filters.areaId,
  }
  const cargosQuery = useCargosQuery(query)
  const areasQuery = useCargoAreasQuery()
  const mutations = useCargoMutations()
  const cargos = cargosQuery.data?.data ?? EMPTY_CARGOS
  const meta: CargoListMeta = cargosQuery.data?.meta ?? {
    total: 0,
    page: filters.page,
    limit: filters.limit,
    totalPages: 0,
  }

  async function submitCargo(values: CargoFormValues) {
    try {
      if (state.selectedCargo)
        await mutations.updateCargo.mutateAsync({
          id: state.selectedCargo.id,
          payload: values,
        })
      else await mutations.createCargo.mutateAsync(values)
      stateActions.succeed({
        type: 'success',
        message: state.selectedCargo
          ? 'El cargo se actualizó correctamente.'
          : 'El cargo se creó correctamente.',
      })
    } catch (error) {
      stateActions.setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'No fue posible guardar el cargo. Intenta nuevamente.',
        ),
      })
    }
  }

  async function changeCargoStatus() {
    if (!state.selectedCargo) return
    try {
      if (state.selectedCargo.activo)
        await mutations.deactivateCargo.mutateAsync(state.selectedCargo.id)
      else await mutations.reactivateCargo.mutateAsync(state.selectedCargo.id)
      stateActions.succeed({
        type: 'success',
        message: state.selectedCargo.activo
          ? 'El cargo se desactivó correctamente.'
          : 'El cargo se reactivó correctamente.',
      })
    } catch (error) {
      stateActions.setFeedback({
        type: 'error',
        message: getApiErrorMessage(
          error,
          'No fue posible cambiar el estado del cargo.',
        ),
      })
    }
  }

  function refresh() {
    void cargosQuery.refetch()
  }
  return {
    cargos,
    areas: areasQuery.data ?? [],
    filters,
    meta,
    state,
    status: {
      formOpen: state.modal === 'form',
      statusDialogOpen: state.modal === 'status',
      isLoading: cargosQuery.isLoading,
      isRefreshing: cargosQuery.isFetching,
      isFormSubmitting:
        mutations.createCargo.isPending || mutations.updateCargo.isPending,
      isStatusSubmitting:
        mutations.deactivateCargo.isPending ||
        mutations.reactivateCargo.isPending,
      loadError: cargosQuery.isError
        ? getApiErrorMessage(
            cargosQuery.error,
            'No fue posible cargar los cargos.',
          )
        : null,
    },
    actions: {
      ...searchActions,
      ...stateActions,
      changeCargoStatus,
      refresh,
      submitCargo,
    },
  }
}
