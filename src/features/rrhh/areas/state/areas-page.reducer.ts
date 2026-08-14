import type {
  AreasPageAction,
  AreasPageState,
} from '../types/areas-page.types'

/**
 * Estado inicial de seleccion, dialogos y feedback de la pagina.
 */
export const initialAreasPageState: AreasPageState = {
  feedback: null,
  modal: null,
  selectedArea: null,
}

/**
 * Aplica una transicion tipada sobre el estado visual de la pagina de areas.
 *
 * @param state - Estado anterior de la pagina.
 * @param action - Evento y datos requeridos por la transicion.
 * @returns Nuevo estado inmutable de la pagina.
 */
export function areasPageReducer(
  state: AreasPageState,
  action: AreasPageAction,
): AreasPageState {
  //Un solo modal activo evita estados incompatibles entre dialogos.
  switch (action.type) {
    case 'CLOSE_MODAL':
      return { ...state, modal: null }
    case 'OPEN_CREATE':
      return {
        ...state,
        feedback: null,
        modal: 'form',
        selectedArea: null,
      }
    case 'OPEN_EDIT':
      return {
        ...state,
        feedback: null,
        modal: 'form',
        selectedArea: action.area,
      }
    case 'OPEN_STATUS':
      return {
        ...state,
        feedback: null,
        modal: 'status',
        selectedArea: action.area,
      }
    case 'SET_FEEDBACK':
      return { ...state, feedback: action.feedback }
    case 'SUCCEED':
      return { ...state, feedback: action.feedback, modal: null }
  }
}
