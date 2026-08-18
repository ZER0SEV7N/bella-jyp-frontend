import type { Area } from '../types/area.types'
import { useCrudPageState } from '@/shared/hooks/use-crud-page-state'

/**
 * Administra las transiciones de estado visual de la pagina de areas.
 *
 * Centraliza seleccion, modales y feedback mediante un reducer. La paginacion
 * y los filtros pertenecen a la URL y no se duplican en este estado.
 *
 * @returns Estado actual y acciones para modificarlo.
 */
export function useAreasPageState() {
  const { state, actions } = useCrudPageState<Area>()

  return {
    state: {
      feedback: state.feedback,
      modal: state.modal,
      selectedArea: state.selectedItem,
    },
    actions: {
      ...actions,
    },
  }
}
