import { Item } from '../types';
import ItemCard from './ItemCard';

/**
 * PROPS: ItemList
 *
 * Renderiza la lista de registros financieros (clientes, cuentas, transacciones, préstamos)
 */
interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemList
 *
 * Renderiza la lista de elementos financieros usando .map()
 */
const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onEdit }) => {
  // Manejar estado vacío
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 No hay registros financieros para mostrar</p>
        <p className="empty-state__hint">
          Agrega tu primer registro usando el formulario de arriba
        </p>
      </div>
    );
  }

  // ============================================
  // RENDER: LISTA DE ELEMENTOS FINANCIEROS
  // ============================================

  return (
    <div className="item-list">
      {items.map((item) => (
        <ItemCard
          key={item.id} // Clave única obligatoria
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default ItemList;
