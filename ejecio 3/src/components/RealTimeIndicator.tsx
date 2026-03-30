import React, { useState, useEffect } from 'react';
import type { RealTimeData } from '../types';
import { fetchRealTimeData } from '../utils/api';

const POLLING_INTERVAL = 5000; // 5 segundos

export const RealTimeIndicator: React.FC = () => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsUpdating(true);

        const newData = await fetchRealTimeData();
        setData(newData);
        setLoading(false);
      } catch (err) {
        console.error('Error loading real-time data:', err);
      } finally {
        setIsUpdating(false);
      }
    };

    // Carga inicial
    loadData();

    // Polling
    const intervalId = setInterval(() => {
      console.log('🔄 Actualizando datos financieros...');
      loadData();
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(intervalId);
      console.log('🧹 Polling detenido');
    };
  }, []);

  // ============================
  // FORMATO
  // ============================
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    }).format(value);
  };

  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  // ============================
  // LOADING
  // ============================
  if (loading) {
    return (
      <div className="realtime-indicator">
        <h2>⏳ Cargando datos financieros...</h2>
      </div>
    );
  }

  if (!data) return null;

  // ============================
  // UI
  // ============================
  return (
    <div className="realtime-indicator">
      <div className="realtime-header">
        <h2>📈 Indicador Financiero</h2>

        {isUpdating && (
          <span className="updating-badge">Actualizando...</span>
        )}
      </div>

      <div className="realtime-content">
        {/* Valor principal */}
        <div className="realtime-value">
          {typeof data.value === 'number'
            ? formatCurrency(data.value)
            : data.value}
        </div>

        {/* Descripción */}
        <div className="realtime-label">
          {data.label}
        </div>

        {/* Última actualización */}
        <div className="realtime-timestamp">
          Última actualización: {formatTimestamp(data.lastUpdated)}
        </div>

        {/* Próxima actualización */}
        <div className="next-update">
          Próxima actualización en {POLLING_INTERVAL / 1000}s
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            animation: `progress ${POLLING_INTERVAL}ms linear infinite`,
          }}
        />
      </div>
    </div>
  );
};
