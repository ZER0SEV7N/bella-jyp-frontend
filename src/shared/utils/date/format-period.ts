// util para formatear la fecha en (mes) y (año)
export function formatPeriodLabel(date: Date, locale = 'es-ES') {
  const month = date.toLocaleDateString(locale, { month: 'long' }) // Obtener mes formateado
  // Poner en mayuscula el primer caracter del mes
  const monthUpper = month.charAt(0).toUpperCase() + month.slice(1)
  const year = date.getFullYear() // Obtener el año completo
  return `${monthUpper} ${year}`
}
