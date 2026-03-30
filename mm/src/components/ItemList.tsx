import React, { useState, useEffect } from 'react';
import type { Item } from '../types';
import { fetchItems } from '../utils/api';

// ============================================
// COMPONENTE: Lista de Transacciones Financieras
// ============================================

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchItems(controller.signal);
        setItems(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Error al cargar transacciones');
        }
      } finally {
        setLoading(false);
      }
    };

    loadItems();

    return () => {
      controller.abort();
    };
  }, []);

  // ============================
  // FORMATO MONEDA (COP)
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
      <div className="item-list">
        <h2>⏳ Cargando transacciones...</h2>
      </div>
    );
  }

  // ============================
  // ERROR
  // ============================
  if (error) {
    return (
      <div className="item-list error">
        <h2>❌ Error al cargar datos</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  // ============================
  // UI PRINCIPAL
  // ============================
  return (
    <div className="item-list">
      <h2>💳 Transacciones Recientes</h2>

      <p className="item-count">
        Total: {items.length} movimientos
      </p>

      <ul className="items">
        {items.map((item) => (
          <li key={item.id} className="item-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>

            {/* Ejemplo financiero */}
            <p
              style={{
                color: item.amount > 0 ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {item.amount > 0 ? '+' : ''}
              {formatCurrency(item.amount)}
            </p>

            <small>{item.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};
