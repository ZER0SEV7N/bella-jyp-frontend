// hook para obtener el mes y año actual
import { useState } from 'react'
import { formatPeriodLabel } from '@/shared/utils/date/format-period'

export function useCurrentPeriod() {
  // inicializar el estado de fecha
  const [fecha] = useState(() => new Date()) // se evita crear un Date nuevo en cada render
  return formatPeriodLabel(fecha)
}
