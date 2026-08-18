import type { ActualizarCargoDto, CrearCargoDto } from '@jyp/shared-contracts'

/** Representa un cargo y el área incluida por el endpoint de RRHH. */
export type Cargo = {
  id: string
  id_area: string
  nombre: string
  descripcion: string | null
  activo: boolean
  deleted_at: string | null
  area: { nombre: string }
}

/** Área mínima requerida para poblar los selectores de cargos. */
export type CargoAreaOption = { id: string; nombre: string }

/** Parámetros soportados por el listado paginado de cargos. */
export type CargoQuery = {
  page: number
  limit: number
  activo?: boolean
  id_area?: string
}

export type CargoStatusFilter = 'all' | 'active' | 'inactive'
export type CargoPageLimit = 10 | 25 | 50 | 100
export type CargoFormValues = CrearCargoDto
export type UpdateCargoPayload = ActualizarCargoDto

export type CargoListMeta = {
  total: number
  page: number
  limit: number
  totalPages: number
}

export type CargoListResponse = { data: Cargo[]; meta: CargoListMeta }
export type CargoMutationResponse = { data: Cargo }
