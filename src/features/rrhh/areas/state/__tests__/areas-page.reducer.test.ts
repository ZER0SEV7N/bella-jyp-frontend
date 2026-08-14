import { describe, expect, it } from 'vitest'

import {
  areasPageReducer,
  initialAreasPageState,
} from '../areas-page.reducer'
import type { Area } from '../../types/area.types'

const area: Area = {
  id: '018f4a7c-7777-7000-1111-000000000001',
  nombre: 'Recursos Humanos',
  descripcion: 'Gestion de personas',
  activo: true,
  deleted_at: null,
  _count: { cargo: 4 },
}

describe('areasPageReducer', () => {
  it('abre el formulario de edicion con el area seleccionada', () => {
    const state = areasPageReducer(initialAreasPageState, {
      type: 'OPEN_EDIT',
      area,
    })

    expect(state.modal).toBe('form')
    expect(state.selectedArea).toBe(area)
    expect(state.feedback).toBeNull()
  })

  it('abre la confirmacion de estado con el area seleccionada', () => {
    const state = areasPageReducer(initialAreasPageState, {
      type: 'OPEN_STATUS',
      area,
    })

    expect(state.modal).toBe('status')
    expect(state.selectedArea).toBe(area)
  })

  it('cierra el modal y conserva el feedback de una operacion exitosa', () => {
    const editingState = {
      ...initialAreasPageState,
      modal: 'status' as const,
      selectedArea: area,
    }
    const feedback = { message: 'Area actualizada', type: 'success' as const }
    const state = areasPageReducer(editingState, {
      type: 'SUCCEED',
      feedback,
    })

    expect(state.modal).toBeNull()
    expect(state.feedback).toEqual(feedback)
  })
})
