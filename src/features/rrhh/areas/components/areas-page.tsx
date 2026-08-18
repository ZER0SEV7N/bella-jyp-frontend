'use client'

import { AreaFormDialog } from './area-form-dialog'
import { AreasHeader } from './areas-header'
import { AreasSummaryCards } from './areas-summary-cards'
import { AreasTable } from './areas-table'
import { AreasToolbar } from './areas-toolbar'
import { useAreasPage } from '../hooks/use-areas-page'
import { Card } from '@/shared/components/ui/card'
import { OperationFeedback } from '@/shared/components/rrhh/operation-feedback'
import { ServerPagination } from '@/shared/components/rrhh/server-pagination'
import { StatusChangeModal } from '@/shared/components/rrhh/status-change-modal'
import { AREA_PAGE_LIMIT_OPTIONS } from '../data/area-pagination'

/**
 * Compone la vista principal de administracion de areas.
 *
 * Consume el modelo de vista del hook coordinador y delega la presentacion en
 * componentes especializados sin implementar reglas de negocio locales.
 */
export function AreasPage() {
  const { actions, areas, filters, meta, state, status } = useAreasPage()

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <AreasHeader onCreate={actions.openCreate} />
      <AreasSummaryCards areas={areas} total={meta.total} />
      <OperationFeedback
        feedback={state.feedback}
        loadError={status.loadError}
      />

      <Card className="gap-0 py-0">
        <AreasToolbar
          isRefreshing={status.isRefreshing}
          onRefresh={actions.refresh}
          onStatusChange={actions.changeStatus}
          status={filters.status}
        />
        <AreasTable
          areas={areas}
          isLoading={status.isLoading}
          onEdit={actions.openEdit}
          onStatusChange={actions.openStatus}
        />
        <ServerPagination
          pageSize={filters.limit}
          pageSizeOptions={AREA_PAGE_LIMIT_OPTIONS}
          page={meta.page}
          total={meta.total}
          totalPages={meta.totalPages}
          singularLabel="área registrada"
          pluralLabel="áreas registradas"
          onPageSizeChange={(pageSize) =>
            actions.changeLimit(pageSize as typeof filters.limit)
          }
          onPageChange={actions.changePage}
        />
      </Card>

      <AreaFormDialog
        area={state.selectedArea}
        isSubmitting={status.isFormSubmitting}
        onOpenChange={actions.closeModal}
        onSubmit={actions.submitArea}
        open={status.formOpen}
      />
      {state.selectedArea && (
        <StatusChangeModal
          isOpen={status.statusDialogOpen}
          isActive={state.selectedArea.activo}
          isLoading={status.isStatusSubmitting}
          recordName={state.selectedArea.nombre}
          entityType="área"
          deactivationNote="No se puede desactivar si contiene cargos activos asignados."
          onOpenChange={actions.closeModal}
          onConfirm={actions.changeAreaStatus}
        />
      )}
    </main>
  )
}
