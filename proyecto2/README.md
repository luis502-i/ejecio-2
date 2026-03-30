🎯 Proyecto Semanal: Sistema de Gestión CRUD – Banco
📋 Dominio Asignado

Dominio: Banco – Gestión de Cuentas

Cada cuenta tiene: número de cuenta, titular, saldo, tipo (Ahorro / Corriente) y estado (activa/inactiva).
CRUD completo: agregar, editar, eliminar, listar cuentas.
🎯 Objetivos del Proyecto

Construir una aplicación React + TypeScript que demuestre:

Componentes funcionales tipados
Estado con useState
Formularios controlados
Renderizado condicional
Operaciones CRUD
Composición de componentes
Inmutabilidad en operaciones de estado
🏗️ Estructura de Componentes
App (componente principal con estado)
├── Header (título y descripción)
├── AccountForm (formulario agregar/editar)
├── AccountList (lista de cuentas)
│   └── AccountCard × N (tarjeta individual)
ItemForm → AccountForm
ItemList → AccountList
ItemCard → AccountCard
📚 Tipos (TypeScript)
// src/types/index.ts
export interface Account {
  id: number;
  holder: string;           // Titular de la cuenta
  number: string;           // Número de cuenta
  balance: number;          // Saldo actual
  type: 'Ahorro' | 'Corriente';
  active: boolean;          // Activa / Inactiva
}
⚡ App Principal
// src/App.tsx
import { useState } from 'react';
import { Account } from './types';
import Header from './components/Header';
import AccountForm from './components/AccountForm';
import AccountList from './components/AccountList';

const App = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // CRUD
  const addAccount = (account: Omit<Account, 'id'>) => {
    setAccounts([...accounts, { ...account, id: Date.now() }]);
  };

  const updateAccount = (id: number, updates: Partial<Account>) => {
    setAccounts(accounts.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAccount = (id: number) => {
    setAccounts(accounts.filter(a => a.id !== id));
  };

  const startEdit = (id: number) => setEditingId(id);
  const cancelEdit = () => setEditingId(null);

  const accountToEdit = editingId ? accounts.find(a => a.id === editingId) : undefined;

  return (
    <div className="app">
      <Header />
      <div className="container">
        <AccountForm
          onAdd={addAccount}
          onUpdate={updateAccount}
          editingAccount={accountToEdit}
          onCancelEdit={cancelEdit}
        />
        <AccountList
          accounts={accounts}
          onDelete={deleteAccount}
          onEdit={startEdit}
        />
      </div>
    </div>
  );
};

export default App;
📝 Formulario Controlado
// src/components/AccountForm.tsx
import { useState, useEffect } from 'react';
import { Account } from '../types';

interface Props {
  onAdd: (account: Omit<Account, 'id'>) => void;
  onUpdate: (id: number, updates: Partial<Account>) => void;
  editingAccount?: Account;
  onCancelEdit: () => void;
}

const AccountForm: React.FC<Props> = ({ onAdd, onUpdate, editingAccount, onCancelEdit }) => {
  const [formData, setFormData] = useState<Omit<Account, 'id'>>({
    holder: '',
    number: '',
    balance: 0,
    type: 'Ahorro',
    active: true,
  });

  useEffect(() => {
    if (editingAccount) {
      const { id, ...rest } = editingAccount;
      setFormData(rest);
    }
  }, [editingAccount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.holder.trim() || !formData.number.trim()) {
      alert('Campos requeridos');
      return;
    }
    editingAccount ? onUpdate(editingAccount.id, formData) : onAdd(formData);
    setFormData({ holder: '', number: '', balance: 0, type: 'Ahorro', active: true });
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="account-form">
      <input name="holder" value={formData.holder} onChange={handleChange} placeholder="Titular" />
      <input name="number" value={formData.number} onChange={handleChange} placeholder="Número de cuenta" />
      <input name="balance" type="number" value={formData.balance} onChange={handleChange} placeholder="Saldo" />
      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="Ahorro">Ahorro</option>
        <option value="Corriente">Corriente</option>
      </select>
      <label>
        Activa
        <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} />
      </label>
      <button type="submit">{editingAccount ? 'Actualizar' : 'Agregar'}</button>
      {editingAccount && <button type="button" onClick={onCancelEdit}>Cancelar</button>}
    </form>
  );
};

export default AccountForm;
📃 Lista y Tarjeta de Cuenta
// src/components/AccountList.tsx
import AccountCard from './AccountCard';
import { Account } from '../types';

interface Props {
  accounts: Account[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const AccountList: React.FC<Props> = ({ accounts, onDelete, onEdit }) => {
  if (!accounts.length) return <p>No hay cuentas registradas.</p>;

  return (
    <div className="account-list">
      {accounts.map(account => (
        <AccountCard key={account.id} account={account} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default AccountList;
// src/components/AccountCard.tsx
import { Account } from '../types';

interface Props {
  account: Account;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const AccountCard: React.FC<Props> = ({ account, onDelete, onEdit }) => (
  <div className={`account-card ${account.active ? 'active' : 'inactive'}`}>
    <h3>{account.holder}</h3>
    <p>Cuenta: {account.number}</p>
    <p>Saldo: ${account.balance}</p>
    <p>Tipo: {account.type}</p>
    <p>Estado: {account.active ? 'Activa' : 'Inactiva'}</p>
    <button onClick={() => onEdit(account.id)}>Editar</button>
    <button onClick={() => onDelete(account.id)}>Eliminar</button>
  </div>
);

export default AccountCard;
🖌️ Header
// src/components/Header.tsx
const Header: React.FC = () => (
  <header className="header">
    <h1>Banco XYZ - Gestión de Cuentas</h1>
    <p>Agrega, edita o elimina cuentas bancarias de manera sencilla.</p>
  </header>
);

export default Header;
🔹 main.tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/App.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
✅ Funcionalidades Incluidas
Agregar cuentas
Editar cuentas existentes
Eliminar cuentas
Renderizado de lista
Formulario controlado con validación básica
Estado activo/inactivo
Inmutabilidad y tipado TypeScript
