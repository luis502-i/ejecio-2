import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';

// ============================================
// COMPONENTE: Dashboard Financiero
// Contenedor principal que integra todos los componentes
// ============================================

// NOTA PARA EL APRENDIZ:
// Este componente debe:
// 1. Renderizar los 3 componentes principales
// 2. Crear un layout responsivo
// 3. Personalizar título según tu dominio financiero
// 4. (Opcional) Agregar navegación o controles globales

export const Dashboard: React.FC = () => {
  // TODO: (Opcional) Agregar estado global si necesitas
  // Por ejemplo: tema, configuración, filtros globales
  // const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div className="dashboard">
      {/* Header personalizado para finanzas */}
      <header className="dashboard-header">
        <h1>Dashboard Financiero</h1>
        {/* Ejemplos de títulos financieros:
          - "Panel de Control - Inversiones"
          - "Dashboard Bancario"
          - "Gestión de Portafolio"
        */}

        {/* Controles globales opcionales */}
        {/* <button onClick={() => window.location.reload()}>
          🔄 Refrescar Datos
        </button> */}
      </header>

      {/* Layout principal con componentes financieros */}
      <main className="dashboard-main">
        {/* Sección de estadísticas financieras */}
        <section className="dashboard-section">
          {/* Renderizar estadísticas de finanzas */}
          {/* <StatsCard /> */}
        </section>

        {/* Sección de indicadores en tiempo real */}
        <section className="dashboard-section">
          {/* Renderizar indicadores de mercado */}
          {/* <RealTimeIndicator /> */}
        </section>

        {/* Sección de lista de transacciones o activos */}
        <section className="dashboard-section dashboard-list">
          {/* Renderizar lista de activos o movimientos */}
          {/* <ItemList /> */}
        </section>
      </main>

      {/* Footer financiero opcional */}
      {/* <footer className="dashboard-footer">
        <p>Dashboard Financiero - {new Date().getFullYear()}</p>
      </footer> */}
    </div>
  );
};
