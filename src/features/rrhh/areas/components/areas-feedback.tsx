import type { AreaFeedback } from '../types/areas-page.types'

type AreasFeedbackProps = {
  feedback: AreaFeedback | null
  loadError: string | null
}

/**
 * Presenta feedback de operaciones y errores de carga de la pagina.
 *
 * Mantiene roles accesibles diferentes para mensajes informativos y errores.
 */
export function AreasFeedback({
  feedback,
  loadError,
}: AreasFeedbackProps) {
  return (
    <>
      {feedback && (
        <div
          className={
            feedback.type === 'success'
              ? 'rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
              : 'rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive'
          }
          role={feedback.type === 'error' ? 'alert' : 'status'}
        >
          {feedback.message}
        </div>
      )}

      {loadError && (
        <div
          className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {loadError}
        </div>
      )}
    </>
  )
}
