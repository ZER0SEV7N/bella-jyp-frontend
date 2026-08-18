'use client'

import { CargoFormDialog } from './cargo-form-dialog'
import { CargosHeader } from './cargos-header'
import { CargosTable } from './cargos-table'
import { CargosToolbar } from './cargos-toolbar'
import { useCargosPage } from '../hooks/use-cargos-page'
import { Card } from '@/shared/components/ui/card'
import { OperationFeedback } from '@/shared/components/rrhh/operation-feedback'
import { ServerPagination } from '@/shared/components/rrhh/server-pagination'
import { StatusChangeModal } from '@/shared/components/rrhh/status-change-modal'
import { CARGO_PAGE_LIMIT_OPTIONS } from '../data/cargo-pagination'

/** Compone la vista de cargos delegando datos y reglas al hook coordinador. */
export function CargosPage() {
  const { actions, areas, cargos, filters, meta, state, status } =
    useCargosPage()
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <CargosHeader onCreate={actions.openCreate} />
      <OperationFeedback
        feedback={state.feedback}
        loadError={status.loadError}
      />
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
        <ServerPagination
          pageSize={filters.limit}
          pageSizeOptions={CARGO_PAGE_LIMIT_OPTIONS}
          page={meta.page}
          total={meta.total}
          totalPages={meta.totalPages}
          singularLabel="cargo registrado"
          pluralLabel="cargos registrados"
          onPageSizeChange={(pageSize) =>
            actions.changeLimit(pageSize as typeof filters.limit)
          }
          onPageChange={actions.changePage}
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
      {state.selectedCargo && (
        <StatusChangeModal
          isOpen={status.statusDialogOpen}
          isActive={state.selectedCargo.activo}
          isLoading={status.isStatusSubmitting}
          recordName={state.selectedCargo.nombre}
          entityType="cargo"
          deactivationNote="No se puede desactivar si tiene empleados activos asignados."
          onOpenChange={actions.closeModal}
          onConfirm={actions.changeCargoStatus}
        />
      )}
    </main>
  )
}
