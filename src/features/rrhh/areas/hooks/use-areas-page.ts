import { useAreaMutations } from './use-area-mutations'
import { useAreasPageState } from './use-areas-page-state'
import { useAreasQuery } from './use-areas-query'
import { useAreasSearchParams } from './use-areas-search-params'
import type {
  Area,
  AreaFormValues,
  AreaListMeta,
  AreaQuery,
} from '../types/area.types'
import { getApiErrorMessage } from '@/shared/api/get-api-error-message'

const EMPTY_AREAS: Area[] = []

/**
 * Coordina los datos y las acciones requeridas por la pagina de areas.
 *
 * Combina parametros de URL, estado visual, consulta paginada y mutaciones.
 * Tambien transforma filtros, decide entre crear o actualizar y normaliza los
 * errores antes de exponer una interfaz simple al componente de pagina.
 *
 * @returns Modelo de vista con areas, metadatos, estado, indicadores y acciones.
 */
export function useAreasPage() {
  const {
    state,
    actions: {
      closeModal,
      openCreate,
      openEdit,
      openStatus,
      setFeedback,
      succeed,
    },
  } = useAreasPageState()
  const {
    filters,
    actions: { changeLimit, changePage, changeStatus },
  } = useAreasSearchParams()

  //Convierte el filtro visual al formato esperado por el endpoint.
  const activo =
    filters.status === 'all' ? undefined : filters.status === 'active'
  const query: AreaQuery = {
    page: filters.page,
    limit: filters.limit,
    activo,
  }

  const {
    data: response,
    error: queryError,
    isError,
    isFetching,
    isLoading,
    refetch,
  } = useAreasQuery(query)
  const {
    createArea,
    deactivateArea,
    reactivateArea,
    updateArea,
  } = useAreaMutations()

  const areas = response?.data ?? EMPTY_AREAS
  const meta: AreaListMeta = response?.meta ?? {
    total: 0,
    page: filters.page,
    limit: filters.limit,
    totalPages: 0,
  }

  async function submitArea(values: AreaFormValues) {
    try {
      //El area seleccionada determina si el formulario crea o actualiza.
      if (state.selectedArea) {
        await updateArea.mutateAsync({
          id: state.selectedArea.id,
          payload: values,
        })
      } else {
        await createArea.mutateAsync(values)
      }

      succeed({
        message: state.selectedArea
          ? 'El área se actualizó correctamente.'
          : 'El área se creó correctamente.',
        type: 'success',
      })
    } catch (error) {
      setFeedback({
        message: getApiErrorMessage(
          error,
          'No fue posible guardar el área. Intenta nuevamente.',
        ),
        type: 'error',
      })
    }
  }

  async function changeAreaStatus() {
    if (!state.selectedArea) return

    try {
      //La misma confirmacion atiende la desactivacion y la reactivacion.
      if (state.selectedArea.activo) {
        await deactivateArea.mutateAsync(state.selectedArea.id)
      } else {
        await reactivateArea.mutateAsync(state.selectedArea.id)
      }

      succeed({
        message: state.selectedArea.activo
          ? 'El área se desactivó correctamente.'
          : 'El área se reactivó correctamente.',
        type: 'success',
      })
    } catch (error) {
      setFeedback({
        message: getApiErrorMessage(
          error,
          'No fue posible cambiar el estado del área.',
        ),
        type: 'error',
      })
    }
  }

  function refresh() {
    void refetch()
  }

  return {
    areas,
    filters,
    meta,
    state,
    status: {
      formOpen: state.modal === 'form',
      isFormSubmitting: createArea.isPending || updateArea.isPending,
      isLoading,
      isRefreshing: isFetching,
      isStatusSubmitting:
        deactivateArea.isPending || reactivateArea.isPending,
      loadError: isError
        ? getApiErrorMessage(
            queryError,
            'No fue posible cargar las áreas. Verifica la conexión con el servidor.',
          )
        : null,
      statusDialogOpen: state.modal === 'status',
    },
    actions: {
      changeAreaStatus,
      changeLimit,
      changePage,
      changeStatus,
      closeModal,
      openCreate,
      openEdit,
      openStatus,
      refresh,
      submitArea,
    },
  }
}
