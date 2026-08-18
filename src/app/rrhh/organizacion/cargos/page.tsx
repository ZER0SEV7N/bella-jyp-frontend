import { Suspense } from 'react'
import { CargosPage } from '@/features/rrhh/cargos/components/cargos-page'

function CargosPageFallback() {
  return <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8"><div className="h-10 w-56 animate-pulse rounded-md bg-muted" /><div className="mt-6 h-96 animate-pulse rounded-xl bg-muted" /></main>
}

/** Ruta de administración de cargos; Suspense habilita la lectura de la URL. */
export default function RrhhCargosPage() {
  return <Suspense fallback={<CargosPageFallback />}><CargosPage /></Suspense>
}
