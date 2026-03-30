import type { Item, Stats, RealTimeData } from '../types';

// ============================================
// CONFIGURACIÓN
// ============================================

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// ============================================
// DATOS MOCK FINANCIEROS
// ============================================

const MOCK_ITEMS: Item[] = [
  {
    id: 1,
    name: 'Apple Inc.',
    description: 'Acción de tecnología',
    type: 'stock',
    value: 172.35,
    quantity: 10,
    date: '2023-03-01',
  },
  {
    id: 2,
    name: 'Tesla Inc.',
    description: 'Acción de transporte eléctrico',
    type: 'stock',
    value: 260.50,
    quantity: 5,
    date: '2023-02-15',
  },
  {
    id: 3,
    name: 'Bitcoin',
    description: 'Criptomoneda principal',
    type: 'crypto',
    value: 28000,
    quantity: 0.1,
    date: '2023-01-20',
  },
  {
    id: 4,
    name: 'Vanguard S&P 500 ETF',
    description: 'Fondo indexado',
    type: 'fund',
    value: 380,
    quantity: 20,
    date: '2023-02-05',
  },
  {
    id: 5,
    name: 'US Treasury Bond 10Y',
    description: 'Bono gubernamental',
    type: 'bond',
    value: 102.5,
    quantity: 50,
    date: '2023-01-10',
  },
];

// ============================================
// FUNCIONES DE FETCH
// ============================================

export const fetchItems = async (signal?: AbortSignal): Promise<Item[]> => {
  await delay(1000);
  return MOCK_ITEMS;
};

export const fetchStats = async (): Promise<Stats> => {
  await delay(800);

  const totalAssets = MOCK_ITEMS.reduce(
    (sum, item) => sum + item.value * item.quantity,
    0,
  );

  const liquidAssets = MOCK_ITEMS
    .filter((item) => item.type === 'stock' || item.type === 'crypto')
    .reduce((sum, item) => sum + item.value * item.quantity, 0);

  const performance = parseFloat(
    (Math.random() * 10 - 5).toFixed(2), // Simula % de rendimiento (-5% a +5%)
  );

  return {
    totalAssets,
    liquidAssets,
    performance,
  };
};

export const fetchRealTimeData = async (): Promise<RealTimeData> => {
  await delay(500);

  const randomItem = MOCK_ITEMS[Math.floor(Math.random() * MOCK_ITEMS.length)];
  const randomFluctuation = (Math.random() * 4 - 2).toFixed(2); // +/- 2 USD

  return {
    value: parseFloat((randomItem.value + parseFloat(randomFluctuation)).toFixed(2)),
    label: randomItem.name,
    unit: 'USD',
    lastUpdated: new Date().toISOString(),
  };
};

export const searchItems = async (query: string): Promise<Item[]> => {
  await delay(600);

  if (!query.trim()) return MOCK_ITEMS;

  return MOCK_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );
};