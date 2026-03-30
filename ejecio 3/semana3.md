📊 Dashboard Financiero (Frontend)

Este proyecto es un dashboard financiero desarrollado con React y TypeScript. La idea principal es mostrar información básica de finanzas personales de forma clara: ingresos, gastos, balance y algunos datos en tiempo real.

📁 Estructura del proyecto

El proyecto está organizado de forma sencilla para separar responsabilidades:

src/
├── components/
│   ├── Dashboard.tsx
│   ├── ItemList.tsx
│   ├── RealTimeIndicator.tsx
│   └── StatsCard.tsx
├── types/
│   └── index.ts
└── utils/
    └── api.ts
components/ → Componentes principales de la interfaz
types/ → Definiciones de tipos en TypeScript
utils/ → Funciones auxiliares (como la simulación de API)
🧩 Componentes
🏠 Dashboard

Este es el componente principal. Básicamente es el que arma toda la vista del panel.

Incluye:

Un título
Un botón para recargar la página
Los componentes principales del sistema
export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <header>
        <h1>💰 Dashboard Financiero</h1>
        <button onClick={() => window.location.reload()}>
          🔄 Actualizar
        </button>
      </header>

      <main>
        <StatsCard />
        <RealTimeIndicator />
        <ItemList />
      </main>

      <footer>
        <p>Panel Financiero - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};
💳 Lista de transacciones (ItemList)

Este componente muestra las transacciones (ingresos y gastos).

Lo importante aquí es que:

Simula la carga desde una API
Maneja estados como loading y error
Formatea los valores en pesos colombianos
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  }).format(value);
};

Además:

Los ingresos se muestran en verde
Los gastos en rojo
📈 Indicador en tiempo real

Este componente simula datos que cambian constantemente.

Características:

Se actualiza cada 5 segundos
Usa setInterval para hacer polling
Muestra cuándo fue la última actualización
const POLLING_INTERVAL = 5000;

No es tiempo real real (porque no hay backend), pero sirve para simular ese comportamiento.

📊 Tarjeta de estadísticas (StatsCard)

Aquí se muestra un resumen general:

Balance total
Ingresos
Gastos
Porcentaje de ahorro
{formatCurrency(stats.totalBalance)}

Es básicamente un resumen rápido de la situación financiera.

🧠 Tipos (TypeScript)

Los tipos ayudan a mantener el código ordenado y evitar errores.

🧾 Transacciones
export interface Item {
  id: number;
  name: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}
📊 Estadísticas
export interface Stats {
  totalBalance: number;
  income: number;
  expenses: number;
  savingsPercentage: number;
}
⏱ Datos en tiempo real
export interface RealTimeData {
  value: number | string;
  label: string;
  lastUpdated: string;
}
🔄 Estado de peticiones
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

Este tipo es útil para manejar llamadas a la API.

🔍 Filtros de búsqueda
export interface SearchFilters {
  query: string;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
}
🔌 API simulada

No hay backend real, así que se usa una API mock dentro de api.ts.

📦 Datos de ejemplo
const MOCK_ITEMS: Item[] = [
  { name: 'Salario', amount: 2500000 },
  { name: 'Supermercado', amount: -150000 },
];
📥 Obtener transacciones
export const fetchItems = async (): Promise<Item[]> => {
  await delay(1000);
  return MOCK_ITEMS;
};

Simula una llamada con delay.

📊 Obtener estadísticas

Aquí se calculan automáticamente:

Ingresos
Gastos
Balance
Ahorro
const totalBalance = income + expenses;
⏱ Datos en tiempo real
const variation = Math.floor(Math.random() * 200000 - 100000);

Esto hace que los valores cambien cada vez.

🔍 Búsqueda

Permite filtrar por nombre o categoría:

item.name.toLowerCase().includes(query)
🚀 Qué tiene este proyecto
Uso de React con TypeScript
Componentes organizados
Simulación de backend
Manejo de estados (loading, error)
Actualización periódica de datos
Formato de moneda en COP
⚠️ Qué se podría mejorar
Conectar a un backend real (por ejemplo con FastAPI)
Agregar autenticación
Incluir gráficas
Mejorar el diseño (responsive)
Permitir crear, editar y eliminar transacciones

Si quieres, puedo ayudarte a:

💻 Dejar esto listo para producción
🔗 Conectarlo con tu backend
🎨 Hacer que se vea como una app profesional
🛠️ Arreglar lo de npm start que mencionaste antes