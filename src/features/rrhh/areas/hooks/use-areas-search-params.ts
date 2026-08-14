'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import {
  buildAreasSearchParams,
  parseAreasSearchParams,
} from '../helpers/areas-search-params'
import type { AreaPageLimit, AreaStatusFilter } from '../types/area.types'
import type { AreasSearchParamsState } from '../types/areas-page.types'

/**
 * Usa la URL como fuente de verdad para filtros y paginacion de areas.
 *
 * Normaliza parametros ausentes o invalidos y conserva cualquier query param
 * que pertenezca a otra responsabilidad de la ruta.
 *
 * @returns Estado derivado de la URL y acciones para navegar entre variantes.
 */
export function useAreasSearchParams() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSearchParams = searchParams.toString()
  const filters = parseAreasSearchParams(searchParams)
  const canonicalSearchParams = buildAreasSearchParams(
    currentSearchParams,
    filters,
  )

  //Completa valores ausentes y reemplaza parametros invalidos en la URL.
  useEffect(() => {
    if (currentSearchParams === canonicalSearchParams) return

    router.replace(`${pathname}?${canonicalSearchParams}`, { scroll: false })
  }, [canonicalSearchParams, currentSearchParams, pathname, router])

  function navigate(nextFilters: AreasSearchParamsState) {
    const nextSearchParams = buildAreasSearchParams(
      currentSearchParams,
      nextFilters,
    )

    router.push(`${pathname}?${nextSearchParams}`, { scroll: false })
  }

  function changePage(page: number) {
    navigate({ ...filters, page })
  }

  function changeStatus(status: AreaStatusFilter) {
    navigate({ ...filters, page: 1, status })
  }

  function changeLimit(limit: AreaPageLimit) {
    navigate({ ...filters, limit, page: 1 })
  }

  return {
    filters,
    actions: {
      changeLimit,
      changePage,
      changeStatus,
    },
  }
}
