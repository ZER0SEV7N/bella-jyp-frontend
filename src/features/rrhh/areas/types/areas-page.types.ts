import type {
  Area,
  AreaPageLimit,
  AreaStatusFilter,
} from './area.types'

/**
 * Identifica el dialogo controlado actualmente por la pagina.
 */
export type AreaModal = 'form' | 'status' | null

/**
 * Mensaje visual producido por una consulta o mutacion de areas.
 */
export type AreaFeedback = {
  message: string
  type: 'error' | 'success'
}

/**
 * Filtros y paginacion representados en la URL de la pagina.
 */
export type AreasSearchParamsState = {
  limit: AreaPageLimit
  page: number
  status: AreaStatusFilter
}

/**
 * Estado visual administrado por el reducer de la pagina de areas.
 */
export type AreasPageState = {
  feedback: AreaFeedback | null
  modal: AreaModal
  selectedArea: Area | null
}

/**
 * Eventos permitidos para cambiar el estado visual de la pagina.
 *
 * La union discriminada mantiene cada transicion tipada y evita enviar datos
 * que no correspondan con la accion seleccionada.
 */
export type AreasPageAction =
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_CREATE' }
  | { type: 'OPEN_EDIT'; area: Area }
  | { type: 'OPEN_STATUS'; area: Area }
  | { type: 'SET_FEEDBACK'; feedback: AreaFeedback }
  | { type: 'SUCCEED'; feedback: AreaFeedback }
