// ============================================
// TIPOS Y INTERFACES - PROYECTO FINANCIERO
// ============================================

/**
 * Transacción financiera
 * (antes: Item)
 */
export interface Item {
  id: number;
  name: string; // Ej: "Salario", "Supermercado"
  description: string;
  amount: number; // + ingreso / - gasto
  date: string; // ISO string (ej: "2026-03-26")
  category: string; // Ej: "Comida", "Transporte", "Salario"
}

/**
 * Estadísticas financieras del dashboard
 */
export interface Stats {
  totalBalance: number;     // dinero total disponible
  income: number;           // ingresos totales
  expenses: number;         // gastos totales
  savingsPercentage: number; // % de ahorro
}

/**
 * Datos en tiempo real financieros
 */
export interface RealTimeData {
  value: number | string; // puede ser dinero o texto
  label: string;          // Ej: "Balance actual", "Último gasto"
  lastUpdated: string;    // timestamp
}

/**
 * Estado genérico para async (no cambiar)
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Filtros de búsqueda para transacciones
 */
export interface SearchFilters {
  query: string;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
}
