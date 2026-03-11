import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RestaurantDetail from './pages/RestaurantDetail'
import AdminDashboard from './pages/AdminDashboard'
import SpecialMenuCreator from './pages/SpecialMenuCreator'
import Customers from './pages/Customers'
import AllDishes from './pages/AllDishes'
import Orders from './pages/Orders'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/special-menu" element={<SpecialMenuCreator />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/dishes" element={<AllDishes />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
