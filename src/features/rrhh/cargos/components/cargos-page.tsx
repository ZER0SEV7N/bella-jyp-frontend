'use client'

import { CargoFormDialog } from './cargo-form-dialog'
import { CargoStatusDialog } from './cargo-status-dialog'
import { CargosFeedback } from './cargos-feedback'
import { CargosHeader } from './cargos-header'
import { CargosPagination } from './cargos-pagination'
import { CargosTable } from './cargos-table'
import { CargosToolbar } from './cargos-toolbar'
import { useCargosPage } from '../hooks/use-cargos-page'
import { Card } from '@/shared/components/ui/card'

/** Compone la vista de cargos delegando datos y reglas al hook coordinador. */
export function CargosPage() {
  const { actions, areas, cargos, filters, meta, state, status } =
    useCargosPage()
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <CargosHeader onCreate={actions.openCreate} />
      <CargosFeedback feedback={state.feedback} loadError={status.loadError} />
      <Card className="gap-0 py-0">
        <CargosToolbar
          areas={areas}
          areaId={filters.areaId}
          isRefreshing={status.isRefreshing}
          onAreaChange={actions.changeArea}
          onRefresh={actions.refresh}
          onStatusChange={actions.changeStatus}
          status={filters.status}
        />
        <CargosTable
          cargos={cargos}
          isLoading={status.isLoading}
          onEdit={actions.openEdit}
          onStatusChange={actions.openStatus}
        />
        <CargosPagination
          limit={filters.limit}
          onLimitChange={actions.changeLimit}
          onPageChange={actions.changePage}
          page={meta.page}
          total={meta.total}
          totalPages={meta.totalPages}
        />
      </Card>
      <CargoFormDialog
        areas={areas}
        cargo={state.selectedCargo}
        isSubmitting={status.isFormSubmitting}
        onOpenChange={actions.closeModal}
        onSubmit={actions.submitCargo}
        open={status.formOpen}
      />
      <CargoStatusDialog
        cargo={state.selectedCargo}
        isSubmitting={status.isStatusSubmitting}
        onConfirm={actions.changeCargoStatus}
        onOpenChange={actions.closeModal}
        open={status.statusDialogOpen}
      />
    </main>
  )
}
