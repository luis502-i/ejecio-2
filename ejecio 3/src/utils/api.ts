import type { Item, Stats, RealTimeData } from '../types';

// ============================================
// CONFIGURACIÓN
// ============================================

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ============================================
// DATOS MOCK FINANCIEROS
// ============================================

const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    name: 'Salario',
    description: 'Pago mensual',
    amount: 2500000,
    date: '2026-03-01',
    category: 'Ingreso',
  },
  {
    id: 2,
    name: 'Supermercado',
    description: 'Compra de alimentos',
    amount: -150000,
    date: '2026-03-05',
    category: 'Comida',
  },
  {
    id: 3,
    name: 'Transporte',
    description: 'Pago de transporte',
    amount: -80000,
    date: '2026-03-06',
    category: 'Transporte',
  },
  {
    id: 4,
    name: 'Freelance',
    description: 'Proyecto adicional',
    amount: 600000,
    date: '2026-03-10',
    category: 'Ingreso',
  },
  {
    id: 5,
    name: 'Netflix',
    description: 'Suscripción mensual',
    amount: -38000,
    date: '2026-03-12',
    category: 'Entretenimiento',
  },
  {
    id: 6,
    name: 'Restaurante',
    description: 'Cena fin de semana',
    amount: -90000,
    date: '2026-03-15',
    category: 'Comida',
  },
];

// ============================================
// FETCH ITEMS
// ============================================

export const fetchItems = async (signal?: AbortSignal): Promise<Item[]> => {
  await delay(1000);

  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  return MOCK_ITEMS;
};

// ============================================
// FETCH STATS (CALCULADAS)
// ============================================

export const fetchStats = async (): Promise<Stats> => {
  await delay(800);

  const income = MOCK_ITEMS
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const expenses = MOCK_ITEMS
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const totalBalance = income + expenses;

  const savingsPercentage =
    income > 0 ? Math.round((totalBalance / income) * 100) : 0;

  return {
    totalBalance,
    income,
    expenses,
    savingsPercentage,
  };
};

// ============================================
// FETCH REAL TIME DATA
// ============================================

export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(500);

  // Simula variación del balance
  const baseBalance = 3000000;
  const variation = Math.floor(Math.random() * 200000 - 100000);

  return {
    value: baseBalance + variation,
    label: 'Balance actualizado',
    lastUpdated: new Date().toISOString(),
  };
};

// ============================================
// BÚSQUEDA
// ============================================

export const searchItems = async (query: string): Promise<Item[]> => {
  await delay(500);

  if (!query.trim()) return MOCK_ITEMS;

  return MOCK_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );
};
