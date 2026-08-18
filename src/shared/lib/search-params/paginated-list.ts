export type StatusFilter = 'all' | 'active' | 'inactive'
type ReadableSearchParams = Pick<URLSearchParams, 'get'>

export function readPage(value: string | null) {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

export function readPageSize<T extends number>(
  value: string | null,
  options: readonly T[],
  defaultPageSize: T,
): T {
  const pageSize = Number(value)
  return options.includes(pageSize as T) ? (pageSize as T) : defaultPageSize
}

export function readStatusFilter(value: string | null): StatusFilter {
  if (value === 'true') return 'active'
  if (value === 'false') return 'inactive'
  return 'all'
}

export function readPaginatedListParams<T extends number>(
  searchParams: ReadableSearchParams,
  pageSizeOptions: readonly T[],
  defaultPageSize: T,
) {
  return {
    limit: readPageSize(
      searchParams.get('limit'),
      pageSizeOptions,
      defaultPageSize,
    ),
    page: readPage(searchParams.get('page')),
    status: readStatusFilter(searchParams.get('active')),
  }
}

export function writePaginatedListParams(
  currentSearchParams: string,
  state: { limit: number; page: number; status: StatusFilter },
) {
  const params = new URLSearchParams(currentSearchParams)
  const active =
    state.status === 'all'
      ? 'all'
      : state.status === 'active'
        ? 'true'
        : 'false'
  params.set('page', String(state.page))
  params.set('limit', String(state.limit))
  params.set('active', active)
  return params
}
