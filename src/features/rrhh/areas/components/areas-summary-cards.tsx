import { BriefcaseBusiness, Building2, CircleCheckBig } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import type { Area } from '../types/area.types'

type AreasSummaryCardsProps = {
  areas: Area[]
  total: number
}

const summaryItems = [
  {
    key: 'total',
    title: 'Áreas registradas',
    description: 'Total disponible',
    icon: Building2,
  },
  {
    key: 'active',
    title: 'Áreas activas',
    description: 'En la página actual',
    icon: CircleCheckBig,
  },
  {
    key: 'positions',
    title: 'Cargos asociados',
    description: 'En la página actual',
    icon: BriefcaseBusiness,
  },
] as const

/**
 * Resume el total registrado y las metricas visibles en la pagina actual.
 *
 * El total proviene de la API; las areas activas y cargos se calculan solo con
 * los registros recibidos para evitar presentar cifras globales incorrectas.
 */
export function AreasSummaryCards({ areas, total }: AreasSummaryCardsProps) {
  const values = {
    total,
    active: areas.filter((area) => area.activo).length,
    positions: areas.reduce((sum, area) => sum + (area._count?.cargo ?? 0), 0),
  }

  return (
    <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen de áreas">
      {summaryItems.map((item) => {
        const Icon = item.icon

        return (
          <Card key={item.key} className="border-brand-blue-100/70 bg-gradient-to-br from-card to-brand-blue-50/50 dark:border-brand-blue-900/50 dark:to-brand-blue-950/20">
            <CardHeader className="grid grid-cols-[1fr_auto] items-start">
              <div>
                <CardDescription>{item.title}</CardDescription>
                <CardTitle className="mt-1 text-2xl">{values[item.key]}</CardTitle>
              </div>
              <div className="grid size-9 place-items-center rounded-lg bg-brand-blue-100 text-brand-blue-800 dark:bg-brand-blue-900/60 dark:text-brand-blue-200">
                <Icon aria-hidden className="size-4" />
              </div>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              {item.description}
            </CardContent>
          </Card>
        )
      })}
    </section>
  )
}
