"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/shared/components/ui/chart";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis } from "recharts";
import { formatSoles } from "@/shared/utils/format";

export type RetentionsDTO = {

    mes: string;
    sunat: number;
    afp: number;
    essalud: number;

};

interface RetentionsChartProps {
    data: RetentionsDTO[];
}

// 2. CONFIGURACION DEL TEMA (Shadcn)
const chartConfig = {
    sunar: {
        label: "SUNAT (Renta 5ta)",
        color: "hsl(var(--destructive))", // Rojo para impuestos
        
    },
    afp: {
        label: "AFP / ONP",
        color: "hsl(var(--chart-4, 43 74% 66%))",
    },
    essalud: {
        label: "EsSalud / EPS",
        color: "hsl(var(--primary))",

    },
};

// 3. EL COMPONENTE CLIENT
export function RetentionsChart({data}: RetentionsChartProps){
    if (!data || data.length === 0) {
        return(
            <Card className="col-span-1 md:col-span-3 h-full shadow-sm border-muted/40">
                <CardHeader>
                    <CardTitle className="text-lg tracking-tight">
                        Retenciones de Ley
                    </CardTitle>
                    <CardContent>
                        No hay proyecciones de retencion disponibles.
                    </CardContent>
                </CardHeader>

            </Card>
        )
        
    }

    return(
        <Card className="col-span-1 md:col-span-3 h-full shadow-sm group transition-all duration-300 hover:shadow-md border-muted/40">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold tracking-tight">
                    Retenciones de Ley
                </CardTitle>
                <CardDescription className="text-xs font-medium">
                    Proyeccion de pagos a terceros (SUNAT, AFP, EsSalud)
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                <ChartContainer config={chartConfig} className="h-100 w-full" >
                    <AreaChart data={data} margin={{top: 10 , left: 0, right: 0, bottom: 0}}>
                        <defs>
                            <linearGradient id="fillSunat" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-sunat)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-sunat)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillAfp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-afp)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-afp)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillEssalud" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-essalud)" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="var(--color-essalud)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />

                        <XAxis 
                            dataKey="mes" 
                            tickLine={false} 
                            axisLine={false} 
                            tickMargin={12}
                            className="text-xs font-medium fill-muted-foreground"
                        />
                        
                        {/* Aplicando tu corrección de arquitectura para el formateo */}
                        <Tooltip 
                            cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                            formatter={(value) => formatSoles(value as number)}
                            content={<ChartTooltipContent indicator="dot" />} 
                        />
                        
                        {/* Capas apiladas (stackId="a" fuerza la suma visual) */}
                        <Area
                            type="monotone"
                            dataKey="essalud"
                            stackId="a"
                            stroke="var(--color-essalud)"
                            strokeWidth={2}
                            fill="url(#fillEssalud)"
                            animationDuration={1500}
                        />
                        <Area
                            type="monotone"
                            dataKey="afp"
                            stackId="a"
                            stroke="var(--color-afp)"
                            strokeWidth={2}
                            fill="url(#fillAfp)"
                            animationDuration={1500}
                        />
                        <Area
                            type="monotone"
                            dataKey="sunat"
                            stackId="a"
                            stroke="var(--color-sunat)"
                            strokeWidth={2}
                            fill="url(#fillSunat)"
                            animationDuration={1500}
                        />
                    
                    </AreaChart>

                </ChartContainer>

            </CardContent>

        </Card>
    )

}