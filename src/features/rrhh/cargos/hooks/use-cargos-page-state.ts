import { useReducer } from 'react'
import {
  cargosPageReducer,
  initialCargosPageState,
} from '../state/cargos-page.reducer'
import type { Cargo } from '../types/cargo.types'
import type { CargoFeedback } from '../types/cargos-page.types'

/** Administra únicamente las transiciones visuales de la página de cargos. */
export function useCargosPageState() {
  const [state, dispatch] = useReducer(
    cargosPageReducer,
    initialCargosPageState,
  )
  function closeModal(open: boolean) {
    if (!open) dispatch({ type: 'CLOSE_MODAL' })
  }
  function openCreate() {
    dispatch({ type: 'OPEN_CREATE' })
  }
  function openEdit(cargo: Cargo) {
    dispatch({ type: 'OPEN_EDIT', cargo })
  }
  function openStatus(cargo: Cargo) {
    dispatch({ type: 'OPEN_STATUS', cargo })
  }
  function setFeedback(feedback: CargoFeedback) {
    dispatch({ type: 'SET_FEEDBACK', feedback })
  }
  function succeed(feedback: CargoFeedback) {
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
