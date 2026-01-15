import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-AO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + ' Kz';
}

export function formatCurrencyShort(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M Kz';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K Kz';
  }
  return formatCurrency(value);
}
