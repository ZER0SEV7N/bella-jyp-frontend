import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { AlertCircle, ArrowRight, FileText, User } from "lucide-react";


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

// COMPONENTE DE SERVIDOR (RSC - ZERO JS  en el cliente)
export function PendingActionsWidget({ data }: PendingActionsWidgetProps){
    // functios utilitaria visual para renderizar el icono y color correcto segun el tipo

    const renderIcon = (tipo: string ) => {
        switch (tipo){
            case "documento":
                return <FileText className="h-4 w-4 text-primary" />;
            case "alerta":
                return <AlertCircle className="h-4 w-4 text-destructive" />;
            case "usuario":
                return <User className="h-4 w-4 text-indigo-500" />;
            default:
                return <FileText className="h-4 w-4 text-muted-foreground" />
            }
        };

        return (
            <Card className="col-span-1 h-full shadow-sm flex flex-col border-muted/40 transition-all duration-300 hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-muted/20">
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-bold tracking-tight">
                            Acciones Pendientes
                        </CardTitle>
                        <CardDescription className="text-xs font-medium">
                            Requieren tu aprobacion
                        </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary/80 ">
                        Ver todas
                    </Button>
                </CardHeader>
                <CardContent className="flex-1 pt-4 p-0">
                    {data.length === 0 ? (
                        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                            No hay operaciones pendientes.
                        </div>
                    ):(
                        <ul className="divide-y divide-muted/20">
                            {data.map((action) => (
                                <li
                                    key={action.id}
                                    className="flex items-center justify-between p-4 transition-colors hover:bg-muted/10 cursor-pointer group"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="p-2 bg-muted/30 rounded-full group-hover:bg-primary/10 transition-colors">
                                            {renderIcon(action.tipo)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-foreground leading-none ">
                                                {action.subtitulo}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {action.fecha}
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"/>
                                    </div>

                                </li>
                            ))}

                        </ul>
                    )}

                </CardContent>

            </Card>
        )
    }
