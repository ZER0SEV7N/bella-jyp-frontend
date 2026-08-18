import { describe, expect, it } from 'vitest'
import { cargosPageReducer, initialCargosPageState } from '../cargos-page.reducer'
import type { Cargo } from '../../types/cargo.types'

const cargo: Cargo = { id: 'cargo-1', id_area: 'area-1', nombre: 'Analista', descripcion: null, activo: true, deleted_at: null, area: { nombre: 'RRHH' } }

describe('cargosPageReducer', () => {
  it('abre el formulario de edición con el cargo seleccionado', () => {
    const state = cargosPageReducer(initialCargosPageState, { type: 'OPEN_EDIT', cargo })
    expect(state).toMatchObject({ modal: 'form', selectedCargo: cargo, feedback: null })
  })

  it('cierra el diálogo al completar una operación', () => {
    const state = cargosPageReducer({ ...initialCargosPageState, modal: 'status', selectedCargo: cargo }, { type: 'SUCCEED', feedback: { type: 'success', message: 'Actualizado' } })
    expect(state.modal).toBeNull()
    expect(state.feedback?.type).toBe('success')
  })
})
