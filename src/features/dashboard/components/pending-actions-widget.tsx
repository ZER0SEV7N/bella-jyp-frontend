import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { FileText, AlertCircle, Users, ArrowRight } from "lucide-react";

// 1. EL CONTRATO DTO
export type PendingActionDTO = {
  id: string;
  titulo: string;
  subtitulo: string;
  fecha: string;
  tipo: "documento" | "alerta" | "usuario";
};

interface PendingActionsWidgetProps {
  data: PendingActionDTO[];
}

// 2. COMPONENTE DE SERVIDOR (RSC - Zero JS en el cliente)
export function PendingActionsWidget({ data }: PendingActionsWidgetProps) {
  
  // Función utilitaria visual para renderizar el icono correcto
  const renderIcon = (tipo: string) => {
    switch (tipo) {
      case "documento":
        return <FileText className="h-4 w-4 text-primary" />; // Azul corporativo
      case "alerta":
        return <AlertCircle className="h-4 w-4 text-destructive" />; // Rojo peligro
      case "usuario":
        return <Users className="h-4 w-4 text-amber-500" />; // Ambar
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="col-span-1 h-full shadow-sm flex flex-col border-muted/40 transition-all duration-300 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-muted/10">
        <div className="space-y-1">
          <CardTitle className="text-lg font-bold tracking-tight">Acciones Pendientes</CardTitle>
          <CardDescription className="text-xs font-medium">
            Requieren tu aprobación
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 hover:bg-primary/5">
          Ver todas
        </Button>
      </CardHeader>
      
      <CardContent className="flex-1 pt-4 p-0">
        {data.length === 0 ? (
          <div className="flex h-full min-h-[200px] items-center justify-center text-sm text-muted-foreground">
            No hay operaciones pendientes.
          </div>
        ) : (
          <ul className="divide-y divide-muted/10">
            {data.map((action) => (
              <li 
                key={action.id} 
                className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30 cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted/30 rounded-full group-hover:bg-primary/10 transition-colors">
                    {renderIcon(action.tipo)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-none">
                      {action.titulo}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {action.subtitulo}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    {action.fecha}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}