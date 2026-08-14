import { Building2, Plus } from 'lucide-react'

import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'

type AreasHeaderProps = {
  onCreate: () => void
}

export function AreasHeader({ onCreate }: AreasHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-2">
        <Badge className="bg-brand-blue-50 text-brand-blue-800 dark:bg-brand-blue-900/40 dark:text-brand-blue-200">
          <Building2 aria-hidden data-icon="inline-start" />
          Organización
        </Badge>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Áreas de trabajo
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Organiza los equipos y controla los cargos asociados a cada área.
          </p>
        </div>
      </div>

      <Button className="h-10 px-4" onClick={onCreate}>
        <Plus aria-hidden data-icon="inline-start" />
        Nueva área
      </Button>
    </header>
  )
}
