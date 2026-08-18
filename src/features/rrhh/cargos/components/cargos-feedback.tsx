import type { CargoFeedback } from '../types/cargos-page.types'

type CargosFeedbackProps = {
  feedback: CargoFeedback | null
  loadError: string | null
}

/** Muestra mensajes de mutaciones y errores de carga de cargos. */
export function CargosFeedback({ feedback, loadError }: CargosFeedbackProps) {
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
