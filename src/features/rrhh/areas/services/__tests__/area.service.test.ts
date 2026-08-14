import { beforeEach, describe, expect, it, vi } from 'vitest'

import { areaService } from '../area.service'

const mocks = vi.hoisted(() => ({
  delete: vi.fn(),
  get: vi.fn(),
  patch: vi.fn(),
  post: vi.fn(),
}))

vi.mock('@/shared/api/protected-http-client', () => ({
  protectedHttpClient: mocks,
}))

describe('areaService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lista áreas usando paginación y filtros', async () => {
    const response = {
      statusCode: 200,
      data: [],
      meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        message: 'Operación exitosa',
        path: '/api/rrhh/area',
        timestamp: '2026-08-11T00:00:00.000Z',
      },
    }
    mocks.get.mockResolvedValue({ data: response })

    await expect(
      areaService.list({ page: 1, limit: 10, activo: true }),
    ).resolves.toEqual(response)
    expect(mocks.get).toHaveBeenCalledWith('/rrhh/area', {
      params: { page: 1, limit: 10, activo: true },
    })
  })

  it('envía el payload para crear un área', async () => {
    const payload = { nombre: 'Operaciones', descripcion: 'Equipo operativo' }
    mocks.post.mockResolvedValue({ data: { data: payload } })

    await areaService.create(payload)

    expect(mocks.post).toHaveBeenCalledWith('/rrhh/area/crear', payload)
  })

  it('usa las rutas de actualización y cambio de estado', async () => {
    mocks.patch.mockResolvedValue({ data: {} })
    mocks.delete.mockResolvedValue({ data: {} })

    await areaService.update('area-1', { nombre: 'Finanzas' })
    await areaService.deactivate('area-1')
    await areaService.reactivate('area-1')

    expect(mocks.patch).toHaveBeenCalledWith(
      '/rrhh/area/area-1/actualizar',
      { nombre: 'Finanzas' },
    )
    expect(mocks.delete).toHaveBeenCalledWith(
      '/rrhh/area/area-1/desactive',
    )
    expect(mocks.patch).toHaveBeenCalledWith('/rrhh/area/area-1/reactive')
  })
})
