/**
 * Formatea valores numericos a moneda peruana usando la API nativa Intl
 * @Param amount - El valor numerico a formatear enviando por NestJS
 * @returns String formateado (ej "S/ 125,000.00 ")
 */

export const formatSoles = (amount: number): string => {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 2,
    }).format(amount);
};