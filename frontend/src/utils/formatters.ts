/**
 * Formatting utilities
 */

export function formatCurrency(value: number, currency: string = "BRL"): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  }).format(value);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR");
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString("pt-BR");
}

export function getMonthName(month: number): string {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return months[month - 1];
}
