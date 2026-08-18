import { useReducer } from 'react'

export type CrudFeedback = { message: string; type: 'error' | 'success' }
type CrudModal = 'form' | 'status' | null
type CrudState<T> = {
  feedback: CrudFeedback | null
  modal: CrudModal
  selectedItem: T | null
}
type CrudAction<T> =
  | { type: 'CLOSE_MODAL' }
  | { type: 'OPEN_CREATE' }
  | { type: 'OPEN_EDIT'; item: T }
  | { type: 'OPEN_STATUS'; item: T }
  | { type: 'SET_FEEDBACK'; feedback: CrudFeedback }
  | { type: 'SUCCEED'; feedback: CrudFeedback }

export const initialCrudState: CrudState<never> = {
  feedback: null,
  modal: null,
  selectedItem: null,
}

export function crudPageReducer<T>(
  state: CrudState<T>,
  action: CrudAction<T>,
): CrudState<T> {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return { ...state, modal: null }
    case 'OPEN_CREATE':
      return { ...state, feedback: null, modal: 'form', selectedItem: null }
    case 'OPEN_EDIT':
      return {
        ...state,
        feedback: null,
        modal: 'form',
        selectedItem: action.item,
      }
    case 'OPEN_STATUS':
      return {
        ...state,
        feedback: null,
        modal: 'status',
        selectedItem: action.item,
      }
    case 'SET_FEEDBACK':
      return { ...state, feedback: action.feedback }
    case 'SUCCEED':
      return { ...state, feedback: action.feedback, modal: null }
  }
}

/** Gestiona el estado visual compartido de una página CRUD. */
export function useCrudPageState<T>() {
  const [state, dispatch] = useReducer(
    crudPageReducer<T>,
    initialCrudState as CrudState<T>,
  )
  function closeModal(isOpen: boolean) {
    if (!isOpen) dispatch({ type: 'CLOSE_MODAL' })
  }
  function openCreate() {
    dispatch({ type: 'OPEN_CREATE' })
  }
  function openEdit(item: T) {
    dispatch({ type: 'OPEN_EDIT', item })
  }
  function openStatus(item: T) {
    dispatch({ type: 'OPEN_STATUS', item })
  }
  function setFeedback(feedback: CrudFeedback) {
    dispatch({ type: 'SET_FEEDBACK', feedback })
  }
  function succeed(feedback: CrudFeedback) {
    dispatch({ type: 'SUCCEED', feedback })
  }
  return {
    state,
    actions: {
      closeModal,
      openCreate,
      openEdit,
      openStatus,
      setFeedback,
      succeed,
    },
  }
}
