import type { Cargo } from '../types/cargo.types'
import { useCrudPageState } from '@/shared/hooks/use-crud-page-state'

/** Administra únicamente las transiciones visuales de la página de cargos. */
export function useCargosPageState() {
  const { state, actions } = useCrudPageState<Cargo>()

  return {
    state: {
      feedback: state.feedback,
      modal: state.modal,
      selectedCargo: state.selectedItem,
    },
    actions: {
      ...actions,
    },
  }
}
