'use client'

import { useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  buildCargosSearchParams,
  parseCargosSearchParams,
} from '../helpers/cargos-search-params'
import type { CargoPageLimit, CargoStatusFilter } from '../types/cargo.types'
import type { CargosSearchParamsState } from '../types/cargos-page.types'

/** Usa la URL como fuente de verdad de filtros y paginación de cargos. */
export function useCargosSearchParams() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSearchParams = searchParams.toString()
  const filters = parseCargosSearchParams(searchParams)
  const canonicalSearchParams = buildCargosSearchParams(
    currentSearchParams,
    filters,
  )

  useEffect(() => {
    if (currentSearchParams !== canonicalSearchParams)
      router.replace(`${pathname}?${canonicalSearchParams}`, { scroll: false })
  }, [canonicalSearchParams, currentSearchParams, pathname, router])

  function navigate(nextFilters: CargosSearchParamsState) {
    router.push(
      `${pathname}?${buildCargosSearchParams(currentSearchParams, nextFilters)}`,
      { scroll: false },
    )
  }
  function changePage(page: number) {
    navigate({ ...filters, page })
  }
  function changeStatus(status: CargoStatusFilter) {
    navigate({ ...filters, page: 1, status })
  }
  function changeLimit(limit: CargoPageLimit) {
    navigate({ ...filters, limit, page: 1 })
  }
  function changeArea(areaId?: string) {
    navigate({ ...filters, areaId, page: 1 })
  }
  return {
    filters,
    actions: { changeArea, changeLimit, changePage, changeStatus },
  }
}
