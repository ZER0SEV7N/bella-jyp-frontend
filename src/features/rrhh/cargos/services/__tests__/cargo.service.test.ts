import { beforeEach, describe, expect, it, vi } from 'vitest'
import { cargoService } from '../cargo.service'

const mocks = vi.hoisted(() => ({ delete: vi.fn(), get: vi.fn(), patch: vi.fn(), post: vi.fn(), put: vi.fn() }))
vi.mock('@/shared/api/protected-http-client', () => ({ protectedHttpClient: mocks }))

describe('cargoService', () => {
  beforeEach(() => vi.clearAllMocks())

  it('lista cargos con sus filtros de servidor', async () => {
    mocks.get.mockResolvedValue({ data: { data: [], meta: {} } })
    await cargoService.list({ page: 1, limit: 10, activo: true, id_area: 'area-1' })
    expect(mocks.get).toHaveBeenCalledWith('/rrhh/cargo', { params: { page: 1, limit: 10, activo: true, id_area: 'area-1' } })
  })

  it('usa las rutas correctas para las mutaciones', async () => {
    mocks.post.mockResolvedValue({ data: {} }); mocks.put.mockResolvedValue({ data: {} }); mocks.delete.mockResolvedValue({ data: {} }); mocks.patch.mockResolvedValue({ data: {} })
    await cargoService.create({ id_area: 'area-1', nombre: 'Analista', descripcion: null })
    await cargoService.update('cargo-1', { nombre: 'Senior' })
    await cargoService.deactivate('cargo-1')
    await cargoService.reactivate('cargo-1')
    expect(mocks.post).toHaveBeenCalledWith('/rrhh/cargo/crear', { id_area: 'area-1', nombre: 'Analista', descripcion: null })
    expect(mocks.put).toHaveBeenCalledWith('/rrhh/cargo/cargo-1/actualizar', { nombre: 'Senior' })
    expect(mocks.delete).toHaveBeenCalledWith('/rrhh/cargo/cargo-1/desactive')
    expect(mocks.patch).toHaveBeenCalledWith('/rrhh/cargo/cargo-1/reactive')
  })
})
