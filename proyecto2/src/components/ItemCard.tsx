import { Item } from '../types';

/**
 * PROPS: ItemCard
 * 
 * Tarjeta para mostrar un registro financiero (cuenta, cliente o transacción)
 */
interface ItemCardProps {
  item: Item;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemCard
 *
 * Tarjeta individual para mostrar información financiera.
 */
const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onEdit }) => {
  // ============================================
  // HANDLER: CONFIRMAR ELIMINACIÓN
  // ============================================

  const handleDelete = () => {
    // TODO: Agregar confirmación antes de eliminar
    // if (window.confirm(`¿Eliminar "${item.name}"?`)) {
    //   onDelete(item.id);
    // }
    onDelete(item.id);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="item-card">
      {/* Información principal */}
      <div className="item-card__header">
        <h3 className="item-card__title">{item.name}</h3>

        {/* Badge según estado financiero */}
        {/* Ejemplos:
            - Cuenta bancaria: <span className={`badge badge--${item.active ? 'success' : 'danger'}`}>{item.active ? 'Activa' : 'Inactiva'}</span>
            - Préstamo: <span className={`badge badge--${item.paid ? 'success' : 'warning'}`}>{item.paid ? 'Pagado' : 'Pendiente'}</span>
            - Cliente VIP: <span className="badge badge--info">{item.vip ? 'VIP' : 'Regular'}</span>
        */}
      </div>

      {/* Información detallada */}
      <div className="item-card__body">
        {/* TODO: Mostrar propiedades financieras */}
        {/* Ejemplos:
            - Cuenta bancaria:
              <p><strong>Número de cuenta:</strong> {item.accountNumber}</p>
              <p><strong>Saldo:</strong> ${item.balance.toFixed(2)}</p>
              <p><strong>Tipo:</strong> {item.type}</p>

            - Préstamo:
              <p><strong>Monto:</strong> ${item.amount.toFixed(2)}</p>
              <p><strong>Interés:</strong> {item.interestRate}%</p>
              <p><strong>Fecha de vencimiento:</strong> {item.dueDate}</p>

            - Cliente:
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Teléfono:</strong> {item.phone}</p>
              <p><strong>Estado:</strong> {item.active ? 'Activo' : 'Inactivo'}</p>
        */}
        <p className="item-card__placeholder">
          TODO: Agregar propiedades financieras aquí
        </p>
      </div>

      {/* Acciones */}
      <div className="item-card__actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(item.id)}
          aria-label={`Editar ${item.name}`}
        >
          ✏️ Editar
        </button>

        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Eliminar ${item.name}`}
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
