import React, { useState, useEffect } from 'react';
import type { Stats } from '../types';
import { fetchStats } from '../utils/api';

// ============================================
// COMPONENTE: StatsCard Financiero
// Muestra estadísticas clave del portafolio o mercado
// ============================================

export const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar estadísticas financieras
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        console.error('Error loading financial stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="stats-card">
        <h2>Cargando estadísticas financieras...</h2>
      </div>
    );
  }

  return (
    <div className="stats-card">
      <h2>Estadísticas del Portafolio</h2>

      <div className="stats-grid">
        {/* Total de activos */}
        <div className="stat">
          <div className="stat-value">
            {stats?.totalAssets.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </div>
          <div className="stat-label">Total de Activos</div>
        </div>

        {/* Activos líquidos */}
        <div className="stat">
          <div className="stat-value">
            {stats?.liquidAssets.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </div>
          <div className="stat-label">Activos Líquidos</div>
        </div>

        {/* Rendimiento porcentual */}
        <div className="stat">
          <div className="stat-value">{stats?.performance.toFixed(2)}%</div>
          <div className="stat-label">Rendimiento</div>
        </div>

        {/* Ejemplo opcional de métricas adicionales:
          - Ganancias/Pérdidas del Día
          - Número de inversiones activas
        */}
      </div>
    </div>
  );
};

// ============================================
// ESTILOS SUGERIDOS (igual que antes, sin cambios)
// ============================================
