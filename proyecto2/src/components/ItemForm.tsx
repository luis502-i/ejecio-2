import { useState, useEffect } from 'react';
import { Item } from '../types';

/**
 * PROPS: ItemForm
 *
 * Formulario para agregar o editar registros financieros
 * (clientes, cuentas, transacciones, préstamos)
 */
interface ItemFormProps {
  onAdd: (item: Omit<Item, 'id'>) => void;
  onUpdate: (id: number, updates: Partial<Item>) => void;
  editingItem?: Item;
  onCancelEdit: () => void;
}

/**
 * COMPONENTE: ItemForm
 *
 * Formulario adaptable según si se está agregando o editando un registro financiero.
 */
const ItemForm: React.FC<ItemFormProps> = ({
  onAdd,
  onUpdate,
  editingItem,
  onCancelEdit,
}) => {
  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================

  const initialState = {
    name: '', // Nombre del cliente, cuenta o producto financiero
    // TODO: Agregar campos financieros
    // Ejemplos:
    // accountNumber: '', balance: 0, type: 'corriente', active: true
    // amount: 0, interestRate: 0, dueDate: ''
    // email: '', phone: '', vip: false
  };

  const [formData, setFormData] = useState(initialState);

  // ============================================
  // EFECTO: PRE-LLENAR FORMULARIO AL EDITAR
  // ============================================

  useEffect(() => {
    if (editingItem) {
      const { id, ...rest } = editingItem;
      setFormData(rest);
    } else {
      setFormData(initialState);
    }
  }, [editingItem]);

  // ============================================
  // HANDLERS
  // ============================================

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const validate = (): boolean => {
    if (!formData.name.trim()) {
      alert('El nombre es requerido');
      return false;
    }
    // TODO: Agregar validaciones financieras
    // Ejemplos: saldos positivos, emails válidos, fechas correctas
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingItem) {
      onUpdate(editingItem.id, formData);
      onCancelEdit();
    } else {
      onAdd(formData);
    }

    setFormData(initialState);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="form-container">
      <h2>{editingItem ? '✏️ Editar Registro Financiero' : '➕ Agregar Registro Financiero'}</h2>

      <form onSubmit={handleSubmit} className="item-form">
        {/* Campo: Nombre */}
        <div className="form-group">
          <label htmlFor="name">Nombre *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingresa nombre del cliente o cuenta"
            required
          />
        </div>

        {/* TODO: Agregar más campos financieros */}
        {/* Ejemplos:
            <div className="form-group">
              <label htmlFor="accountNumber">Número de Cuenta *</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="balance">Saldo</label>
              <input
                type="number"
                id="balance"
                name="balance"
                value={formData.balance}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleCheckboxChange}
                />
                Activa
              </label>
            </div>
        */}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingItem ? 'Actualizar' : 'Agregar'}
          </button>

          {editingItem && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onCancelEdit();
                setFormData(initialState);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
