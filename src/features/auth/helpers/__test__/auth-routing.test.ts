import { describe, expect, it } from 'vitest'

import { getRoleDashboardPath } from '../auth-routing'

describe('getRoleDashboardPath', () => {
  it('dirige cada rol disponible a su dashboard', () => {
    expect(getRoleDashboardPath('CONTADOR')).toBe('/contador/dashboard')
    expect(getRoleDashboardPath('RRHH')).toBe('/rrhh/dashboard')
  })

  it('envia los roles sin modulo a la pantalla sin acceso', () => {
    expect(getRoleDashboardPath('EMPLEADO')).toBe('/unauthorized')
  })
})
