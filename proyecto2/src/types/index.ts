// ============================================
// TYPES: INTERFACES FINANCIERAS
// ============================================

/**
 * Registro financiero general (Item)
 * Cada registro puede representar un cliente, cuenta o transacción
 */
export interface Item {
  id: number;
  name: string; // Nombre del cliente o descripción
  type: 'Cliente' | 'Cuenta' | 'Transacción'; // Tipo de registro
  balance?: number;        // Saldo (para cuentas)
  email?: string;          // Email del cliente
  accountNumber?: string;  // Número de cuenta
  status?: 'Activo' | 'Inactivo' | 'Pendiente' | 'Pagado'; // Estado financiero
  date?: string;           // Fecha relevante (apertura, transacción)
  notes?: string;          // Observaciones o descripción
}

/**
 * Datos para formulario (sin id)
 */
export interface FormData {
  name: string;
  type: 'Cliente' | 'Cuenta' | 'Transacción';
  balance?: number;
  email?: string;
  accountNumber?: string;
  status?: 'Activo' | 'Inactivo' | 'Pendiente' | 'Pagado';
  date?: string;
  notes?: string;
}
