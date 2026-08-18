import { describe, expect, it } from 'vitest'
import { crudPageReducer, initialCrudState } from '../use-crud-page-state'

type Record = { name: string }

describe('crudPageReducer', () => {
  it('selects the item when editing starts', () => {
    const item = { name: 'Analista' }
    const state = crudPageReducer<Record>(initialCrudState, { type: 'OPEN_EDIT', item })
    expect(state).toMatchObject({ modal: 'form', selectedItem: item })
  })

  it('closes the modal after a successful operation', () => {
    const state = crudPageReducer<Record>({ ...initialCrudState, modal: 'status', selectedItem: { name: 'Analista' } }, { type: 'SUCCEED', feedback: { message: 'Actualizado', type: 'success' } })
    expect(state.modal).toBeNull()
    expect(state.feedback).toEqual({ message: 'Actualizado', type: 'success' })
  })
})
