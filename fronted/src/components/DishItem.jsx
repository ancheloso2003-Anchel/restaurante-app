/**
 * DishItem Component
 * Renders a single dish card with a title, description, and price.
 * Optional admin controls for editing and deleting.
 */
const DishItem = ({ dish, showAdmin = false, onEdit, onDelete }) => {
  return (
    <div className="glass-card dish-card">
      <div style={{ flex: 1, paddingRight: '2rem' }}>
        {/* Title & Description of the dish */}
        <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>{dish.plato}</h4>
        {dish.descripcion && (
          <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.9rem', color: '#94a3b8', lineHeight: '1.4' }}>
            {dish.descripcion}
          </p>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {/* Price Tag with Emerald Gradient (styled in CSS) */}
        <span className="dish-price">{dish.precio}€</span>
        
        {/* Admin Interface: Edit/Delete buttons visible only in admin panel */}
        {showAdmin && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
             <button 
                onClick={() => onEdit(dish)} 
                title="Editar plato"
                style={{ padding: '6px 12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '0.85rem' }}
             >
                Editar
             </button>
             <button 
                onClick={() => onDelete(dish.platoID)} 
                title="Eliminar plato"
                style={{ padding: '6px 12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', fontSize: '0.85rem' }}
             >
                Eliminar
             </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DishItem
