import { describe, expect, it } from 'vitest'
import {
  buildCargosSearchParams,
  parseCargosSearchParams,
} from '../cargos-search-params'

describe('cargosSearchParams', () => {
  it('usa valores predeterminados cuando faltan parámetros', () => {
    expect(parseCargosSearchParams(new URLSearchParams())).toEqual({
      limit: 10,
      page: 1,
      status: 'all',
      areaId: undefined,
    })
  })

  it('interpreta filtros, paginación y área desde la URL', () => {
    expect(
      parseCargosSearchParams(
        new URLSearchParams('page=3&limit=50&active=false&area=area-1'),
      ),
    ).toEqual({ limit: 50, page: 3, status: 'inactive', areaId: 'area-1' })
  })

  it('conserva parámetros ajenos y elimina un área no seleccionada', () => {
    const params = new URLSearchParams(
      buildCargosSearchParams('tab=organization&area=old', {
        limit: 25,
        page: 2,
        status: 'active',
      }),
    )
    expect(Object.fromEntries(params)).toEqual({
      tab: 'organization',
      page: '2',
      limit: '25',
      active: 'true',
    })
  })
})
