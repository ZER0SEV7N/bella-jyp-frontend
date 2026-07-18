"use client";

import { useOptimistic, useTransition } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

// Contrato estricto de Tipos
export type Incidencia = {
    id: string;
    empleado: string;
    tipo: string;
    estado: "pendiente" | "aprobado" | "rechazado";
};

interface PendingActionListProps {
    initialData: Incidencia[];
    // Firma estricta: La Server Action debe devolver una promesa
    onApprove: (id: string) => Promise<{ success: boolean }>; 
}

export default function PendingActionList({ initialData, onApprove }: PendingActionListProps) {
    // Estado Optimista: Mutación síncrona en memoria antes de la resolución de red
    const [optimisticIncidencias, setOptimisticIncidencia] = useOptimistic<
        Incidencia[],
        string
    >(initialData, (state, idToApprove) =>
        state.map((incidencia) => incidencia.id === idToApprove ? { ...incidencia, estado: "aprobado" } : incidencia
    )
);

  // Transición concurrente para aislar el bloqueo I/O de React
    const [isPending, startTransition] = useTransition();

    const handleApprove = (id: string) => {
        startTransition(async () => {
        // 1. Ejecución UI Zero-Latency
        setOptimisticIncidencia(id);

        try {
            // 2. Delegación asíncrona al backend (Server Action)
            await onApprove(id);
        } catch (error) {
            // 3. Rollback automático de useOptimistic ante falla. 
            // Acoplamiento futuro: Interceptor RFC 7807 para Toast de error.
            console.error("Falla de integridad al aprobar incidencia:", error);
        }
    });
};

    if (optimisticIncidencias.length === 0) {
        return (
        <p className="text-sm font-medium text-muted-foreground">
            No hay incidencias pendientes de revisión.
        </p>
        );
    }

    return (
        <div className="w-full max-w-2xl space-y-4">
        {optimisticIncidencias.map((incidencia) => (
            <Card 
            key={incidencia.id} 
            className={`border-l-4 transition-all duration-200 ${
                incidencia.estado === "aprobado" 
                ? "border-l-primary bg-primary/5" 
                : "border-l-transparent"
            }`}
            >
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-lg">
                <span className="font-semibold text-foreground">
                    {incidencia.empleado}
                </span>
                <Badge
                    variant={incidencia.estado === "aprobado" ? "default" : "secondary"}
                >
                    Estado: {incidencia.estado}
                </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                {incidencia.tipo}
                </p>
                <Button
                onClick={() => handleApprove(incidencia.id)}
                disabled={isPending || incidencia.estado === "aprobado"}
                aria-label={`Aprobar incidencia de ${incidencia.empleado}`}
                className="transition-opacity"
                >
                {incidencia.estado === "aprobado" ? "Aprobado" : "Aprobar"}
                </Button>
            </CardContent>
            </Card>
        ))}
        </div>
    );
}