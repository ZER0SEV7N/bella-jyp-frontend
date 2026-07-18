"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/shared/components/ui/chart";
import { formatSoles } from "@/shared/utils/format";
import { Area, AreaChart,CartesianGrid, XAxis, Tooltip, ResponsiveContainer,  } from "recharts";





export type PayrollEvolutionDTO = {
    mes: string;
    sueldoNeto: number;
    aportes: number; // EsSalud, etc

};

interface PayrollEvolutionChartProps{
    data: PayrollEvolutionDTO[];
}

// 2. CONFIGURACION DEL TEMA
const chartConfig = {
    sueldoNeto: {
        label: "Sueldo Neto",
        color: "hsl(var(--primary))",
    },
    aportes: {
        label: "Aportes Patronales",
        color: "hsl(var(--primary)/0.4)",
    },
};


export function PayrollEvolutionChart({data}: PayrollEvolutionChartProps){

    if (!data || data.length === 0) {
        return (
            <Card className="col-span-1 md:col-span-4 h-full shadow-sm border-muted/40">
                <CardHeader>
                    <CardTitle className="text-lg tracking-tight">
                        Evolucion de nomina
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-70 text-muted-foreground">
                    No hay datos historicos suficientes para proyetar la evolucion.
                </CardContent>

            </Card>
        );
    } 
    return (
        <Card className="col-span-1 md:col-span-4 h-full shadow-sm group transition-all duration-300 hover:shadow-md border-muted/40">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold tracking-tight">
                    Evolucion de Nomina
                </CardTitle>
                <CardDescription className="text-xs font-medium">
                    Historico de sueldos netos vs aportes patronales (Ultimos 6 meses)
                </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
                    <ChartContainer config={chartConfig} className="h-75 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, left: 0 , right: 0, bottom:0 }}>
                            <defs>
                                <linearGradient id="fillSueldo" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-sueldoNeto)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-sueldoNeto)" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fillAportes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-aportes)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-aportes)" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))">
                                <XAxis 
                                    dataKey="mes"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={12}
                                    className="text-xs font-medium fill-muted-foreground"
                                />

                               <Tooltip 
                                    cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    formatter={(value) => formatSoles(value as number)}
                                    content={
                                    <ChartTooltipContent 
                                        indicator="dot"
                                    />
                                    } 
                                />

                                <Area 
                                    type="monotone"
                                    dataKey="aportes"
                                    stackId="1"
                                    stroke="var(--color-aportes)"
                                    strokeWidth={2}
                                    fill="url(#fillAportes)"
                                    animationDuration={1500}
                                />

                                <Area 
                                    type="monotone"
                                    dataKey="sueldoNeto"
                                    stackId="1"
                                    stroke="var(--color-sueldoNeto)"
                                    strokeWidth={3}
                                    fill="url(#fillSueldo)"
                                    animationDuration={1500}
                                />

                            </CartesianGrid>

                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>

            </CardContent>
        </Card>
    )
}


