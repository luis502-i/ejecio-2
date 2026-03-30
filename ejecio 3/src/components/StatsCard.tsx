import React, { useState, useEffect } from 'react';
import type { Stats } from '../types';
import { fetchStats } from '../utils/api';

export const StatsCard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStats();
        setStats(data);
      } catch (err) {
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  // ============================
  // FORMATO MONEDA
  // ============================
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(value);
  };

  // ============================
  // LOADING
  // ============================
  if (loading) {
    return (
      <div className="stats-card">
        <h2>⏳ Cargando estadísticas...</h2>
      </div>
    );
  }

  if (!stats) return null;

  // ============================
  // UI
  // ============================
  return (
    <div className="stats-card">
      <h2>📊 Resumen Financiero</h2>

      <div className="stats-grid">
        {/* Balance total */}
        <div className="stat">
          <div className="stat-value">
            {formatCurrency(stats.totalBalance)}
          </div>
          <div className="stat-label">Balance Total</div>
        </div>

        {/* Ingresos */}
        <div className="stat">
          <div className="stat-value" style={{ color: 'green' }}>
            {formatCurrency(stats.income)}
          </div>
          <div className="stat-label">Ingresos</div>
        </div>

        {/* Gastos */}
        <div className="stat">
          <div className="stat-value" style={{ color: 'red' }}>
            {formatCurrency(stats.expenses)}
          </div>
          <div className="stat-label">Gastos</div>
        </div>

        {/* Ahorro (%) */}
        <div className="stat">
          <div className="stat-value">
            {stats.savingsPercentage}%
          </div>
          <div className="stat-label">Ahorro</div>
        </div>
      </div>
    </div>
  );
};
