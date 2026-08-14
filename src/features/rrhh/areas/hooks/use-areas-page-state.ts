import { useReducer } from 'react'

import {
  areasPageReducer,
  initialAreasPageState,
} from '../state/areas-page.reducer'
import type { Area } from '../types/area.types'
import type { AreaFeedback } from '../types/areas-page.types'

/**
 * Administra las transiciones de estado visual de la pagina de areas.
 *
 * Centraliza seleccion, modales y feedback mediante un reducer. La paginacion
 * y los filtros pertenecen a la URL y no se duplican en este estado.
 *
 * @returns Estado actual y acciones para modificarlo.
 */
export function useAreasPageState() {
  const [state, dispatch] = useReducer(
    areasPageReducer,
    initialAreasPageState,
  )

  function closeModal(open: boolean) {
    if (!open) dispatch({ type: 'CLOSE_MODAL' })
  }

  function openCreate() {
    dispatch({ type: 'OPEN_CREATE' })
  }

  function openEdit(area: Area) {
    dispatch({ type: 'OPEN_EDIT', area })
  }

  function openStatus(area: Area) {
    dispatch({ type: 'OPEN_STATUS', area })
  }

  function setFeedback(feedback: AreaFeedback) {
    dispatch({ type: 'SET_FEEDBACK', feedback })
  }

  function succeed(feedback: AreaFeedback) {
    dispatch({ type: 'SUCCEED', feedback })
  }

  return {
    state,
    actions: {
      closeModal,
      openCreate,
      openEdit,
      openStatus,
      setFeedback,
      succeed,
    },
  }
}
