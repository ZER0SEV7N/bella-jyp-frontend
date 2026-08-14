import { describe, expect, it } from 'vitest'

import {
  buildAreasSearchParams,
  parseAreasSearchParams,
} from '../areas-search-params'

describe('areasSearchParams', () => {
  it('usa valores predeterminados cuando faltan parametros', () => {
    const result = parseAreasSearchParams(new URLSearchParams())

    expect(result).toEqual({ limit: 10, page: 1, status: 'all' })
  })

  it('interpreta pagina, limite y filtro activo desde la URL', () => {
    const result = parseAreasSearchParams(
      new URLSearchParams('page=3&active=true&limit=50'),
    )

    expect(result).toEqual({ limit: 50, page: 3, status: 'active' })
  })

  it('interpreta active=false como el filtro de areas inactivas', () => {
    const result = parseAreasSearchParams(
      new URLSearchParams('page=2&active=false&limit=25'),
    )

    expect(result).toEqual({ limit: 25, page: 2, status: 'inactive' })
  })

  it('normaliza valores invalidos', () => {
    const result = parseAreasSearchParams(
      new URLSearchParams('page=-2&active=unknown&limit=30'),
    )

    expect(result).toEqual({ limit: 10, page: 1, status: 'all' })
  })

  it('construye los parametros canonicos y conserva valores ajenos', () => {
    const result = buildAreasSearchParams('section=organization', {
      limit: 100,
      page: 4,
      status: 'inactive',
    })
    const params = new URLSearchParams(result)

    expect(Object.fromEntries(params)).toEqual({
      section: 'organization',
      page: '4',
      active: 'false',
      limit: '100',
    })
  })
})
