import { Link, useLocation } from 'react-router-dom'
import { UtensilsCrossed, LayoutDashboard, Sparkles, Home, ShoppingBag } from 'lucide-react'

/**
 * Navbar Component
 * Fixed-top navigation bar with branding and links.
 * Highlights the active route with a CSS class and a dot indicator.
 */
const Navbar = () => {
  const location = useLocation()
  
  // Helper to determine if the given path matches the current browser location
  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      {/* Brand Section: "Gourmet OS" styled with logo and gradient text */}
      <div className="nav-brand" style={{ display: 'flex', alignItems: 'center' }}>
        <UtensilsCrossed 
          size={28} 
          color="var(--primary)" 
          style={{ marginRight: '12px', filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }} 
        />
        <span style={{ 
            fontWeight: '900', 
            fontSize: '1.4rem', 
            letterSpacing: '-1px',
            background: 'linear-gradient(to right, #fff, var(--primary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        }}>Gourmet OS</span>
      </div>

      {/* Main Navigation Links */}
      <div className="nav-links">
        {/* Basic Route Links */}
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Inicio</Link>
        <Link to="/dishes" className={`nav-link ${isActive('/dishes') ? 'active' : ''}`}>Platos</Link>
        <Link to="/customers" className={`nav-link ${isActive('/customers') ? 'active' : ''}`}>Clientes</Link>
        <Link to="/orders" className={`nav-link ${isActive('/orders') ? 'active' : ''}`}>Pedidos</Link>
        
        {/* Featured App Feature: Special "X" Menu Creation Page */}
        <Link to="/special-menu" className={`nav-link ${isActive('/special-menu') ? 'active' : ''}`}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={14} /> Menú X
          </span>
        </Link>
        
        {/* Admin Link: Styled as a distinct button in the navbar background */}
        <Link to="/admin" className={`nav-link ${isActive('/admin') ? 'active' : ''}`} style={{ 
            background: 'rgba(255,255,255,0.05)', 
            padding: '4px 12px', 
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)'
        }}>Admin</Link>
      </div>
    </nav>
  )
}

export default Navbar
