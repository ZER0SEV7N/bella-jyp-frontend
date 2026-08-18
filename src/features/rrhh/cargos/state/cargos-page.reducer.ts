import type {
  CargosPageAction,
  CargosPageState,
} from '../types/cargos-page.types'

export const initialCargosPageState: CargosPageState = {
  feedback: null,
  modal: null,
  selectedCargo: null,
}

/** Centraliza selección, diálogos y feedback sin duplicar filtros de URL. */
export function cargosPageReducer(
  state: CargosPageState,
  action: CargosPageAction,
): CargosPageState {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return { ...state, modal: null }
    case 'OPEN_CREATE':
      return { ...state, feedback: null, modal: 'form', selectedCargo: null }
    case 'OPEN_EDIT':
      return {
        ...state,
        feedback: null,
        modal: 'form',
        selectedCargo: action.cargo,
      }
    case 'OPEN_STATUS':
      return {
        ...state,
        feedback: null,
        modal: 'status',
        selectedCargo: action.cargo,
      }
    case 'SET_FEEDBACK':
      return { ...state, feedback: action.feedback }
    case 'SUCCEED':
      return { ...state, feedback: action.feedback, modal: null }
  }
}
