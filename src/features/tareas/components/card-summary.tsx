import { Card,CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { formatSoles } from "@/shared/utils/format";
import { Wallet, AlertTriangle, ClipboardCheck, Activity } from "lucide-react";

// 1. El contrato(Mock DTO): Mas adelante esto  vendra de shared contracts
type DashboardMetricsDTO = {
    totalNomina: number;
    incrementoNomina: number;
    incidenciasPendientes: number;
    tareasPorAprobar: number;
    estadoPeriodo: "En Proceso" | "Cerrado" | "Auditoria";

};

// 2. LA SIMULACION: Limitamos el tiempo de respuesta en NestKS/n8n
async function fetchMetrics(): Promise<DashboardMetricsDTO> {
    //Pausamos la ekecucion 1.5 segundos para simular la latencia de red
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return{
        totalNomina: 125000,
        incrementoNomina: 2.4,
        incidenciasPendientes: 12,
        tareasPorAprobar: 5,
        estadoPeriodo: "En Proceso",
    };
}

// 3. EL COMPONENTE (Server Component: se ejecuta 100% en el servidor)
export default async function CardSummary() {
    // Solicitamos los datos. Al ser un server component, podemos usar 'await' directamente
    const metrics = await fetchMetrics();

    return(
        <>
            <Card className="border-t-4 border-t-primary shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                        Costo Total de Planilla
                    </CardTitle>
                    <Wallet className="w-4 h-4 text-primary"/>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-foreground">
                        {formatSoles(metrics.totalNomina)}
                    </div>
                    <p className="text-xs font-medium text-emerald-600 mt-1">
                        +{metrics.incrementoNomina}% respecto al mes anterior
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                        Incidencias Pendientes
                    </CardTitle>
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-foreground">
                        {metrics.incidenciasPendientes}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        requieren revision urgente
                    </p>
                </CardContent>
            </Card>

            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                        Tareas Por Aprobar
                    </CardTitle>
                    <ClipboardCheck className="w-4 h-4 text-amber-500"/>
                </CardHeader>
                <CardContent >
                    <div className="text-3xl font-bold text-foreground">
                        {metrics.tareasPorAprobar}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Asignadas por Asistentes
                    </p>

                </CardContent>
            </Card>
            <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                    <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                        Estado del Periodo
                    </CardTitle>
                    <Activity className="w-4 h-4 text-primary" />
                </CardHeader>
                <CardContent className="flex flex-col items-start justify-center pt-2">
                    <Badge 
                        variant="default" 
                        className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none px-3 py-1"
                    >
                        {metrics.estadoPeriodo}
                    </Badge>
                </CardContent>
            </Card>
            </>
    )

}
