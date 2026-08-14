import type {
  ActualizarAreaDto,
  CrearAreaDto,
} from '@jyp/shared-contracts'

/**
 * Representa un area entregada por la API de RRHH.
 *
 * El conteo de cargos es opcional porque depende de la consulta ejecutada por
 * el backend.
 */
export type Area = {
  id: string
  nombre: string
  descripcion: string | null
  activo: boolean
  deleted_at: string | null
  _count?: {
    cargo: number
  }
}

/**
 * Define los query params soportados por el listado paginado de areas.
 */
export type AreaQuery = {
  page: number
  limit: number
  activo?: boolean
}

/**
 * Representa las opciones disponibles en el filtro visual de estado.
 */
export type AreaStatusFilter = 'all' | 'active' | 'inactive'

/**
 * Cantidades de registros permitidas por pagina desde la interfaz.
 */
export type AreaPageLimit = 10 | 25 | 50 | 100

/**
 * Valores validados por el contrato compartido para crear un area.
 */
export type AreaFormValues = CrearAreaDto

/**
 * Valores parciales validados para actualizar un area existente.
 */
export type UpdateAreaPayload = ActualizarAreaDto

/**
 * Metadatos de paginacion y trazabilidad devueltos por el listado.
 */
export type AreaListMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
  message?: string
  path?: string
  timestamp?: string
}

/**
 * Respuesta normalizada del endpoint de listado de areas.
 */
export type AreaListResponse = {
  statusCode: number
  data: Area[]
  meta: AreaListMeta
}

/**
 * Respuesta normalizada de una operacion que modifica un area.
 */
export type AreaMutationResponse = {
  statusCode: number
  data: Area
  meta: {
    message: string
    path: string
    timestamp: string
  }
}
