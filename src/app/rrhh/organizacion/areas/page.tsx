import { Suspense } from 'react'

import { AreasPage } from '@/features/rrhh/areas/components/areas-page'
import { Skeleton } from '@/shared/components/ui/skeleton'

function AreasPageFallback() {
  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <Skeleton className="h-20 w-full" />
      <div className="grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <Skeleton className="h-96 w-full" />
    </main>
  )
}

export default function RrhhAreasPage() {
  return (
    <Suspense fallback={<AreasPageFallback />}>
      <AreasPage />
    </Suspense>
  )
}
