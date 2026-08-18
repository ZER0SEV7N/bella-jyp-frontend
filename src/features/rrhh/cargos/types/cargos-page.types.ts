import type { Cargo, CargoPageLimit, CargoStatusFilter } from './cargo.types'

/** Diálogo visible en la pantalla de cargos. */
export type CargoModal = 'form' | 'status' | null
export type CargoFeedback = { message: string; type: 'error' | 'success' }

/** Estado serializado en la URL de la página. */
export type CargosSearchParamsState = {
  limit: CargoPageLimit
  page: number
  status: CargoStatusFilter
  areaId?: string
}

/** Estado efímero de la interfaz que no pertenece a la URL. */
export type CargosPageState = {
  feedback: CargoFeedback | null
  modal: CargoModal
  selectedCargo: Cargo | null
}

export type CargosPageAction =
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_CREATE' }
  | { type: 'OPEN_EDIT'; cargo: Cargo }
  | { type: 'OPEN_STATUS'; cargo: Cargo }
  | { type: 'SET_FEEDBACK'; feedback: CargoFeedback }
  | { type: 'SUCCEED'; feedback: CargoFeedback }
