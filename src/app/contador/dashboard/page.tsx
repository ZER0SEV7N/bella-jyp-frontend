import { Suspense } from "react";

import { Skeleton } from "@/shared/components/ui/skeleton";
import { Button } from "@/shared/components/ui/button";
import { Plus } from "lucide-react";
import CardSummary from "@/features/tareas/components/card-summary";
import { PayrollEvolutionChart } from "@/features/dashboard/components/payroll-evolution-char";
import { RetentionsChart } from "@/features/dashboard/components/retentions-chart";
import { PendingActionsWidget } from "@/features/dashboard/components/pending-actions-widget";

/// ============================================================================
// 1. SIMULACIÓN DE DATOS DEL BACKEND (NestJS)
// ============================================================================
async function fetchChartsData() {
  await new Promise((resolve) => setTimeout(resolve, 1800)); 
  
  return {
    payroll: [
      { mes: "Ene", sueldoNeto: 95000, aportes: 14250 },
      { mes: "Feb", sueldoNeto: 98000, aportes: 14700 },
      { mes: "Mar", sueldoNeto: 105000, aportes: 15750 },
      { mes: "Abr", sueldoNeto: 102000, aportes: 15300 },
      { mes: "May", sueldoNeto: 110000, aportes: 16500 },
      { mes: "Jun", sueldoNeto: 125000, aportes: 18750 },
    ],
    retentions: [
      { mes: "Ene", sunat: 8500, afp: 10450, essalud: 8550 },
      { mes: "Feb", sunat: 8800, afp: 10780, essalud: 8820 },
      { mes: "Mar", sunat: 9400, afp: 11550, essalud: 9450 },
      { mes: "Abr", sunat: 9100, afp: 11220, essalud: 9180 },
      { mes: "May", sunat: 9900, afp: 12100, essalud: 9900 },
      { mes: "Jun", sunat: 11250, afp: 13750, essalud: 11250 },
    ],
    // <-- NUEVOS DATOS MOCKEADOS
    pendingActions: [
      { id: "1", titulo: "Validar boletas de Mayo", subtitulo: "Nómina administrativa", fecha: "Hoy", tipo: "documento" as const },
      { id: "2", titulo: "Cierre legal AFP", subtitulo: "Configuración legal", fecha: "Ayer", tipo: "alerta" as const },
      { id: "3", titulo: "Aprobar 3 ingresos nuevos", subtitulo: "Asistente RRHH", fecha: "15 Jul", tipo: "usuario" as const },
      { id: "4", titulo: "Exportar PLAME", subtitulo: "Cumplimiento Tributario", fecha: "14 Jul", tipo: "documento" as const },
    ]
  };
}

// ============================================================================
// 2. COMPONENTES ASÍNCRONOS Y FALLBACKS
// ============================================================================

function CardsSkeletonFallback() {
  return (
    <>
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-35 w-full rounded-xl bg-muted/50" />
      ))}
    </>
  );
}

// <-- ACTUALIZADO: Ahora dibuja 3 esqueletos en pantallas grandes
function ChartsSkeletonFallback() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-8">
      <Skeleton className="col-span-1 h-95 w-full rounded-xl bg-muted/50" />
      <Skeleton className="col-span-1 h-95 w-full rounded-xl bg-muted/50" />
      <Skeleton className="col-span-1 h-95 w-full rounded-xl bg-muted/50" />
    </div>
  );
}

// <-- ACTUALIZADO: Inyectamos el widget y forzamos el grid de 3 columnas
async function DashboardCharts() {
  const data = await fetchChartsData();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mt-8">
      <PayrollEvolutionChart data={data.payroll} />
      <RetentionsChart data={data.retentions} />
      <PendingActionsWidget data={data.pendingActions} />
    </div>
  );
}

// ============================================================================
// 3. ORQUESTADOR PRINCIPAL DE LA PÁGINA
// ============================================================================
export default function DashboardContadorPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      
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
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm hover:shadow">
            <Plus className="mr-2 h-4 w-4" /> Nueva Acción
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeletonFallback />}>
          <CardSummary />
        </Suspense>
      </div>

      <Suspense fallback={<ChartsSkeletonFallback />}>
        <DashboardCharts />
      </Suspense>

      <div className="mt-8 h-75 w-full rounded-xl border border-dashed border-muted-foreground/20 bg-card text-muted-foreground flex items-center justify-center font-medium shadow-sm">
        Espacio reservado: Estado Detallado de Colaboradores (Tabla Paginada)
      </div>

    </div>
  );
}