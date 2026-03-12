// Componente que muestra un ítem individual de la carta con su nombre, descripción y precio
/**
 * DishItem Component
 * Renders a single dish card with a title, description, and price.
 * Optional admin controls for editing and deleting.
 */
const DishItem = ({ dish, showAdmin = false, onEdit, onDelete }) => {
  return (
    <div className="glass-card dish-card">
      {/* Contenedor de la información textual del plato */}
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
        {/* Etiqueta de precio formateada con el símbolo del euro (€) */}
        <span className="dish-price">{dish.precio}€</span>
        
        {/* Botones de control administrativo que solo se muestran si showAdmin es verdadero */}
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
