import { useState } from 'react';
import { Transaction } from './types';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

/**
 * COMPONENTE PRINCIPAL: App
 *
 * Este componente gestiona el estado global de la aplicación financiera
 * y coordina la comunicación entre componentes hijos.
 */
const App = () => {
  // ============================================
  // ESTADO PRINCIPAL
  // ============================================

  // Estado para la lista de transacciones
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Estado para edición (id de la transacción siendo editada)
  const [editingId, setEditingId] = useState<number | null>(null);

  // ============================================
  // FUNCIONES CRUD
  // ============================================

  /**
   * Agregar nueva transacción
   * @param transaction - Datos de la nueva transacción (sin id)
   */
  const addTransaction = (transaction: Omit<Transaction, 'id'>): void => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now(), // Genera ID único basado en timestamp
    };

    setTransactions([...transactions, newTransaction]);
  };

  /**
   * Actualizar transacción existente
   * @param id - ID de la transacción a actualizar
   * @param updates - Propiedades a actualizar
   */
  const updateTransaction = (id: number, updates: Partial<Transaction>): void => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updates } : transaction
      )
    );
  };

  /**
   * Eliminar transacción
   * @param id - ID de la transacción a eliminar
   */
  const deleteTransaction = (id: number): void => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  /**
   * Preparar transacción para edición
   * @param id - ID de la transacción a editar
   */
  const startEdit = (id: number): void => {
    setEditingId(id);
  };

  /**
   * Cancelar edición
   */
  const cancelEdit = (): void => {
    setEditingId(null);
  };

  // ============================================
  // TRANSACCIÓN SIENDO EDITADA
  // ============================================

  const transactionToEdit = editingId
    ? transactions.find((transaction) => transaction.id === editingId)
    : undefined;

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="app">
      {/* Header con título y descripción */}
      <Header />

      <div className="container">
        {/* Formulario para agregar/editar transacciones */}
        <TransactionForm
          onAdd={addTransaction}
          onUpdate={updateTransaction}
          editingTransaction={transactionToEdit}
          onCancelEdit={cancelEdit}
        />

        {/* Lista de transacciones */}
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
          onEdit={startEdit}
        />
      </div>
    </div>
  );
};

export default App;
