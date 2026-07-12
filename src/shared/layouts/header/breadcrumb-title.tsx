import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb'
import { getBreadcrumbMatch } from '@/shared/utils/header/breadcrumb-match'
import { contadorSidebar } from '@/shared/data/sidebar'

type BreadcrumbProps = {
  pathname: string
}
export default function BreadcrumbTitle({ pathname }: BreadcrumbProps) {
  const breadcrumbMatch = getBreadcrumbMatch(pathname, contadorSidebar)

  if (!breadcrumbMatch) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbMatch.groupTitle && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-muted-foreground font-medium">
                {breadcrumbMatch.groupTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-primary-blue font-medium">
            {breadcrumbMatch.title}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
