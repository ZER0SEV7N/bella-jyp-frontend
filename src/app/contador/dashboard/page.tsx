import { Suspense } from "react";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import CardSummary from "@/features/tareas/components/card-summary";


// 1. EL FALLBACK: lo que el usuario vera durante los 1.5 segundos de latencia
function CardsSkeletonFallback() {
  return (
    <>
      {[1,2,3,4].map((i)=> (
        <Skeleton key={i} className="h-35 w-full rounded-xl bg-muted/50" />
      ))}
    </>
  );
}

// 2. EL ORQUESTADOR (server component)
export default function DashboardContadorPage(){
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Resumen General
          </h2>
          <p className="text-muted-foreground mt-1">
            Estado actual de la nomina y metricas clave del periodo. 
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 ">
            <Plus className="mr-2 h-4 w-4" /> Nueva Accion
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeletonFallback/>}>
          <CardSummary/>
        </Suspense>
      </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
      <div className="col-span-4 h-100 rounded-xl border border-dashed border-muted-foreground/20 bg-card flex items-center justify-center">
        <span className="text-muted-foreground text-sm font-medium">
          Espacio Reservado: Grafico de costos por area
        </span>
        <div className="col-span-3 h-100 rounded-xl border border-dashed border-muted-foreground/20 bg-card flex items-center justify-center">
          <span className="text-muted-foreground text-sm font-medium">
            Espacio reservado: Alertas Pendientes
          </span>

        </div>

      </div>

    </div>
    </div>

    
  )
}