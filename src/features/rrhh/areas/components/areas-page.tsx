'use client'

import { AreaFormDialog } from './area-form-dialog'
import { AreaStatusDialog } from './area-status-dialog'
import { AreasFeedback } from './areas-feedback'
import { AreasHeader } from './areas-header'
import { AreasPagination } from './areas-pagination'
import { AreasSummaryCards } from './areas-summary-cards'
import { AreasTable } from './areas-table'
import { AreasToolbar } from './areas-toolbar'
import { useAreasPage } from '../hooks/use-areas-page'
import { Card } from '@/shared/components/ui/card'

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
      <AreasFeedback
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
        <AreasPagination
          limit={filters.limit}
          onLimitChange={actions.changeLimit}
          onPageChange={actions.changePage}
          page={meta.page}
          total={meta.total}
          totalPages={meta.totalPages}
        />
      </Card>

      <AreaFormDialog
        area={state.selectedArea}
        isSubmitting={status.isFormSubmitting}
        onOpenChange={actions.closeModal}
        onSubmit={actions.submitArea}
        open={status.formOpen}
      />
      <AreaStatusDialog
        area={state.selectedArea}
        isSubmitting={status.isStatusSubmitting}
        onConfirm={actions.changeAreaStatus}
        onOpenChange={actions.closeModal}
        open={status.statusDialogOpen}
      />
    </main>
  )
}
