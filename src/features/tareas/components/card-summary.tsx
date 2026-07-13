import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { formatSoles } from "@/shared/utils/format";
import { 
  Wallet, 
  AlertTriangle, 
  ClipboardCheck, 
  RefreshCw 
} from "lucide-react";

// 1. EL CONTRATO (Mock DTO)
type DashboardMetricsDTO = {
  totalNomina: number;
  incrementoNomina: number;
  incidenciasPendientes: number;
  tareasPorAprobar: number;
  estadoPeriodo: "En Proceso" | "Cerrado" | "Auditoría";
};

// 2. LA SIMULACIÓN ASÍNCRONA
async function fetchMetrics(): Promise<DashboardMetricsDTO> {
  await new Promise((resolve) => setTimeout(resolve, 1500)); 
  return {
    totalNomina: 125000,
    incrementoNomina: 2.4,
    incidenciasPendientes: 12,
    tareasPorAprobar: 5,
    estadoPeriodo: "En Proceso",
  };
}

// 3. EL COMPONENTE (Server Component con UI Avanzada)
export default async function CardSummary() {
  const metrics = await fetchMetrics();

  // Clase base para las tarjetas: Aceleración por hardware, sombra suave, y elevación en Hover
  const cardStyles = "group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-muted/40";
  // Clase base para los contenedores de íconos
  const iconBoxStyles = "p-2.5 rounded-xl transition-colors duration-300";

  return (
    <>
      {/* Tarjeta 1: Costo Total */}
      <Card className={cardStyles}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`${iconBoxStyles} bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white`}>
              <Wallet className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-emerald-600 flex items-center">
              <span className="text-emerald-500 mr-1">↗</span> +{metrics.incrementoNomina}%
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Costo Total de Planilla
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              {formatSoles(metrics.totalNomina)}
            </h3>
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta 2: Incidencias */}
      <Card className={cardStyles}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`${iconBoxStyles} bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-xs font-medium text-muted-foreground">
              Pendientes
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Incidencias Pendientes
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              {metrics.incidenciasPendientes}
            </h3>
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta 3: Tareas */}
      <Card className={cardStyles}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`${iconBoxStyles} bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white`}>
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <div className="text-xs font-medium text-muted-foreground">
              Por aprobar
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Tareas por Aprobar
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              {metrics.tareasPorAprobar}
            </h3>
          </div>
        </CardContent>
      </Card>

      {/* Tarjeta 4: Estado */}
      <Card className={cardStyles}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className={`${iconBoxStyles} bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white`}>
              <RefreshCw className="w-5 h-5" />
            </div>
            <div className="text-xs font-medium text-muted-foreground">
              Estado
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Estado del Periodo
            </p>
            <div className="pt-1">
              <Badge 
                variant="outline" 
                className="bg-emerald-50 text-emerald-700 border-emerald-200/50 hover:bg-emerald-100 px-3 py-1 font-semibold"
              >
                {metrics.estadoPeriodo}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}