import type {
  AreaFormValues,
  AreaListResponse,
  AreaMutationResponse,
  AreaQuery,
  UpdateAreaPayload,
} from '../types/area.types'
import { protectedHttpClient } from '@/shared/api/protected-http-client'

/**
 * Obtiene una pagina de areas aplicando paginacion y filtros en la API.
 *
 * @param query - Query params enviados al endpoint de listado.
 * @returns Areas encontradas y metadatos de paginacion.
 */
async function list(query: AreaQuery) {
  const response = await protectedHttpClient.get<AreaListResponse>(
    '/rrhh/area',
    { params: query },
  )

  return response.data
}

/**
 * Registra un area con valores validados por el contrato compartido.
 *
 * @param payload - Nombre y descripcion del area.
 * @returns Area creada y metadatos de la operacion.
 */
async function create(payload: AreaFormValues) {
  const response = await protectedHttpClient.post<AreaMutationResponse>(
    '/rrhh/area/crear',
    payload,
  )

  return response.data
}

/**
 * Actualiza los campos permitidos de un area existente.
 *
 * @param id - Identificador del area.
 * @param payload - Campos que deben actualizarse.
 * @returns Area actualizada y metadatos de la operacion.
 */
async function update(id: string, payload: UpdateAreaPayload) {
  const response = await protectedHttpClient.patch<AreaMutationResponse>(
    `/rrhh/area/${id}/actualizar`,
    payload,
  )

  return response.data
}

/**
 * Solicita la desactivacion logica de un area.
 *
 * @param id - Identificador del area activa.
 * @returns Area desactivada y metadatos de la operacion.
 */
async function deactivate(id: string) {
  const response = await protectedHttpClient.delete<AreaMutationResponse>(
    `/rrhh/area/${id}/desactive`,
  )

  return response.data
}

/**
 * Restaura un area previamente desactivada.
 *
 * @param id - Identificador del area inactiva.
 * @returns Area reactivada y metadatos de la operacion.
 */
async function reactivate(id: string) {
  const response = await protectedHttpClient.patch<AreaMutationResponse>(
    `/rrhh/area/${id}/reactive`,
  )

  return response.data
}

/**
 * Expone las operaciones HTTP disponibles para administrar areas.
 */
export const areaService = {
  list,
  create,
  update,
  deactivate,
  reactivate,
}
