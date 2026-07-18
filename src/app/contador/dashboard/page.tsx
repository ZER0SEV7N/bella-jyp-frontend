import { Suspense } from "react";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import CardSummary from "@/features/tareas/components/card-summary";
import { PayrollEvolutionChart } from "@/features/dashboard/components/payroll-evolution-char";
import { RetentionsChart } from "@/features/dashboard/components/retentions-chart";

// ====================================================================
//  SIMULACION DE DATOS DEL BACKEND (NestJS)
//  mas adelante, esto sera un fetch() a nuestra API con ZodValidation
// ====================================================================
async function fetchChartsData() {
  // Simulamos un query pesado de base de datos (1.8 segundos)
  await new Promise((resolve) => setTimeout(resolve,1800))
  
  return {
    payroll: [
      {mes: "Ene", sueldoNeto: 95000, aportes: 14250},
      {mes: "Feb", sueldoNeto: 88000, aportes: 14700},
      {mes: "Mar", sueldoNeto: 105000, aportes: 15750},
      {mes: "Abr", sueldoNeto: 110000, aportes: 15300},
      {mes: "May", sueldoNeto: 110000, aportes: 16500},
      {mes: "Jun", sueldoNeto: 125000, aportes: 18750},

    ],
    retentions: [
      {mes: "Ene", sunat: 8500, afp: 10450, essalud: 8550},
      {mes: "Feb", sunat: 8800, afp: 10780, essalud: 8820},
      {mes: "Mar", sunat: 9400, afp: 11550, essalud: 9450},
      {mes: "Abr", sunat: 9100, afp: 12100, essalud: 9900},
      {mes: "May", sunat: 9900, afp: 12100, essalud: 9900},
      {mes: "Jun", sunat: 11250, afp: 13750, essalud: 11250},
    ]
  }
}

// ====================================================================
// COMPONENTES ASINCRONOS Y FALLBACKS (Straming SSR)
// ====================================================================

function CardsSkeletonFallback(){
  return(
    <>
      {[1,2,3,4].map((i) => (
        <Skeleton key={i} className="h-45 w-full rounded-xl bg-muted/50"/>
      ))}
    </>
  );
}

function ChartsSkeletonFallback() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
      <Skeleton className="col-span-1 md:col-span-4 h-125 w-full rounded-xl bg-muted/50"/>
      <Skeleton className="col-span-1 md:col-span-3 h-125 w-full rounded-xl bg-muted/50"/>
    </div>
  );
  
}

// Sub-orquestador: Aisla la peticion de los graficos para no bloquear las tarjetas 
async function DashboardCharts() {
  const data = await fetchChartsData();

  return(
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
      {/* Pasamos estrictamente los DTOs que los Cliente Components exigen*/ }
      <PayrollEvolutionChart data={data.payroll}/>
      <RetentionsChart data={data.retentions} />

      

    </div>
  )
  
}



// 2. EL ORQUESTADOR (server component)
export default function DashboardContadorPage(){
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      
      {/* Header Interactivo */}
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Resumen General
          </h2>
          <p className="text-muted-foreground mt-1">
            Estado actual de la nómina y métricas clave del periodo.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Este botón heredará automáticamente nuestro #150AB4 corporativo */}
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm hover:shadow">
            <Plus className="mr-2 h-4 w-4" /> Nueva Acción
          </Button>
        </div>
      </div>

      {/* Grid 1: Tarjetas Superiores (Cargan en ~1.5s) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeletonFallback />}>
          <CardSummary />
        </Suspense>
      </div>

      {/* Grid 2: Gráficos Dinámicos (Cargan en ~1.8s, sin bloquear las tarjetas) */}
      <Suspense fallback={<ChartsSkeletonFallback />}>
        <DashboardCharts />
      </Suspense>

      {/* Grid 3: Tabla (Próxima Iteración) */}
      <div className="mt-8 h-[300px] w-full rounded-xl border border-dashed border-muted-foreground/20 bg-card text-muted-foreground flex items-center justify-center font-medium shadow-sm">
        Espacio reservado: Estado Detallado de Colaboradores (Tabla Paginada)
      </div>

    </div>
  );
}