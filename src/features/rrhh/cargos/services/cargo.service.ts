import type { AreaListResponse } from '../../areas/types/area.types'
import type {
  CargoFormValues,
  CargoListResponse,
  CargoMutationResponse,
  CargoQuery,
  UpdateCargoPayload,
} from '../types/cargo.types'
import { protectedHttpClient } from '@/shared/api/protected-http-client'

/** Operaciones HTTP aisladas para la administración de cargos. */
async function list(query: CargoQuery) {
  return (
    await protectedHttpClient.get<CargoListResponse>('/rrhh/cargo', {
      params: query,
    })
  ).data
}

async function listActiveAreas() {
  const response = await protectedHttpClient.get<AreaListResponse>(
    '/rrhh/area',
    { params: { activo: true, limit: 100, page: 1 } },
  )
  return response.data.data
}

async function create(payload: CargoFormValues) {
  return (
    await protectedHttpClient.post<CargoMutationResponse>(
      '/rrhh/cargo/crear',
      payload,
    )
  ).data
}

async function update(id: string, payload: UpdateCargoPayload) {
  return (
    await protectedHttpClient.put<CargoMutationResponse>(
      `/rrhh/cargo/${id}/actualizar`,
      payload,
    )
  ).data
}

async function deactivate(id: string) {
  return (
    await protectedHttpClient.delete<CargoMutationResponse>(
      `/rrhh/cargo/${id}/desactive`,
    )
  ).data
}

async function reactivate(id: string) {
  return (
    await protectedHttpClient.patch<CargoMutationResponse>(
      `/rrhh/cargo/${id}/reactive`,
    )
  ).data
}

export const cargoService = {
  create,
  deactivate,
  list,
  listActiveAreas,
  reactivate,
  update,
}
