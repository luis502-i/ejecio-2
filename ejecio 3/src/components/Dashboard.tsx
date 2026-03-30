import React from 'react';
import { ItemList } from './ItemList';
import { StatsCard } from './StatsCard';
import { RealTimeIndicator } from './RealTimeIndicator';

// ============================================
// DASHBOARD FINANCIERO
// ============================================

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>💰 Dashboard Financiero</h1>

        <div>
          <button type="button" onClick={() => window.location.reload()}>
            🔄 Actualizar
          </button>
        </div>
      </header>

      {/* Contenido */}
      <main className="dashboard-main">
        {/* Estadísticas clave */}
        <section className="dashboard-section">
          <StatsCard />
        </section>

        {/* Indicador en tiempo real */}
        <section className="dashboard-section">
          <RealTimeIndicator />
        </section>

        {/* Lista de transacciones */}
        <section className="dashboard-section dashboard-list">
          <ItemList />
        </section>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Panel Financiero - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};
