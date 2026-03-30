import React, { useState, useEffect } from 'react';
import type { RealTimeData } from '../types';
import { fetchRealTimeData } from '../utils/api';

// ============================================
// COMPONENTE: RealTimeIndicator Financiero
// Muestra datos financieros que se actualizan automáticamente
// ============================================

const POLLING_INTERVAL = 5000; // 5 segundos

export const RealTimeIndicator: React.FC = () => {
  const [data, setData] = useState<RealTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Polling de datos financieros en tiempo real
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

    loadData();

    const intervalId = setInterval(() => {
      console.log('🔄 Actualizando datos financieros en tiempo real...');
      loadData();
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(intervalId);
      console.log('🧹 Polling detenido');
    };
  }, []);

  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="realtime-indicator">
        <h2>Cargando métricas financieras...</h2>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="realtime-indicator">
      <div className="realtime-header">
        <h2>Métricas en Tiempo Real</h2>
        {isUpdating && <span className="updating-badge">Actualizando...</span>}
      </div>

      <div className="realtime-content">
        {/* Valor financiero principal */}
        <div className="realtime-value">
          {data.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </div>

        {/* Label descriptivo */}
        <div className="realtime-label">{data.label}</div>

        {/* Timestamp de última actualización */}
        <div className="realtime-timestamp">
          Última actualización: {formatTimestamp(data.lastUpdated)}
        </div>

        {/* Próxima actualización */}
        <div className="next-update">
          Próxima actualización en {POLLING_INTERVAL / 1000} segundos
        </div>
      </div>

      {/* (Opcional) Barra de progreso */}
      {/* <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ animation: `progress ${POLLING_INTERVAL}ms linear infinite` }}
        ></div>
      </div> */}
    </div>
  );
};