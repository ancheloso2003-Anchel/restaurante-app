// Datos estáticos de demostración para uso cuando no hay backend disponible
export const staticRestaurants = [
  { restauranteID: 1, restaurante: 'El Tubo de Oro', barrio: 'Centro', categoriaID: 1 },
  { restauranteID: 2, restaurante: 'Asador del Cierzo', barrio: 'Delicias', categoriaID: 2 },
  { restauranteID: 3, restaurante: 'Sushi Ebro', barrio: 'Actur', categoriaID: 3 },
  { restauranteID: 4, restaurante: 'Pizzería Goya', barrio: 'Centro', categoriaID: 1 },
  { restauranteID: 5, restaurante: 'Bodega Torrero', barrio: 'Torrero', categoriaID: 2 },
  { restauranteID: 6, restaurante: 'Taberna San José', barrio: 'San José', categoriaID: 3 },
]

export const staticDishes = [
  { platoID: 1, plato: 'Ternasco de Aragón', descripcion: 'Ternasco asado con patatas a lo pobre y aroma de romero', precio: 24.50, categoriaID: 2, restauranteID: 2, categoria: 'Platos Principales' },
  { platoID: 2, plato: 'Migas a la Pastora', descripcion: 'Migas tradicionales con uvas, huevo frito y embutido local', precio: 14.00, categoriaID: 1, restauranteID: 5, categoria: 'Entrantes' },
  { platoID: 3, plato: 'Borrajas con Patatas', descripcion: 'Borrajas frescas de la huerta zaragozana con un toque de ajo', precio: 12.00, categoriaID: 1, restauranteID: 1, categoria: 'Entrantes' },
  { platoID: 4, plato: 'Pizza Pilarica', descripcion: 'Pizza artesanal con longaniza de Graus y queso de Teruel', precio: 16.50, categoriaID: 2, restauranteID: 4, categoria: 'Platos Principales' },
  { platoID: 5, plato: 'Ramen Aragonés', descripcion: 'Fusión de caldo tradicional con fideos japoneses y panceta', precio: 18.00, categoriaID: 2, restauranteID: 3, categoria: 'Platos Principales' },
  { platoID: 6, plato: 'Adobados al Horno', descripcion: 'Costillas y lomo adobados siguiendo la receta de la abuela', precio: 19.00, categoriaID: 2, restauranteID: 5, categoria: 'Platos Principales' },
  { platoID: 7, plato: 'Frutas de Aragón', descripcion: 'Selección de frutas confitadas bañadas en chocolate negro', precio: 8.50, categoriaID: 3, restauranteID: 6, categoria: 'Postres' },
  { platoID: 8, plato: 'Adoquín de Caramelo', descripcion: 'Pequeños bocados de caramelo con envoltorio tradicional', precio: 4.00, categoriaID: 3, restauranteID: 1, categoria: 'Postres' },
  { platoID: 9, plato: 'Bacalao al Ajoarriero', descripcion: 'Bacalao desmigado con pimientos y salsa de tomate casera', precio: 21.00, categoriaID: 2, restauranteID: 6, categoria: 'Platos Principales' },
  { platoID: 10, plato: 'Trenza de Almudévar', descripcion: 'Famoso hojaldre caramelizado con frutos secos y pasas', precio: 7.50, categoriaID: 3, restauranteID: 2, categoria: 'Postres' },
]

export const staticCustomers = [
  { clienteID: 1, nombre: 'Francisco', apellido1: 'Goya', poblacion: 'Zaragoza', sexo: 'H', foto: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop' },
  { clienteID: 2, nombre: 'Pilar', apellido1: 'Aragón', poblacion: 'Zaragoza', sexo: 'M', foto: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop' },
  { clienteID: 3, nombre: 'Jorge', apellido1: 'Zapater', poblacion: 'Zaragoza', sexo: 'H', foto: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?w=400&h=400&fit=crop' },
  { clienteID: 4, nombre: 'Isabel', apellido1: 'Alfaro', poblacion: 'Zaragoza', sexo: 'M', foto: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop' },
  { clienteID: 5, nombre: 'Marcos', apellido1: 'Ebro', poblacion: 'Zaragoza', sexo: 'H', foto: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop' },
]

export const staticOrders = [
  { pedidoID: 1, clienteID: 1, restauranteID: 1, fecha: '2026-03-10', nombre: 'Francisco', apellido1: 'Goya', restaurante: 'El Tubo de Oro', total: 32.50 },
  { pedidoID: 2, clienteID: 2, restauranteID: 3, fecha: '2026-03-11', nombre: 'Pilar', apellido1: 'Aragón', restaurante: 'Sushi Ebro', total: 45.00 },
  { pedidoID: 3, clienteID: 3, restauranteID: 4, fecha: '2026-03-12', nombre: 'Jorge', apellido1: 'Zapater', restaurante: 'Pizzería Goya', total: 29.00 },
  { pedidoID: 4, clienteID: 4, restauranteID: 2, fecha: '2026-03-12', nombre: 'Isabel', apellido1: 'Alfaro', restaurante: 'Asador del Cierzo', total: 72.00 },
  { pedidoID: 5, clienteID: 5, restauranteID: 6, fecha: '2026-03-13', nombre: 'Marcos', apellido1: 'Ebro', restaurante: 'Taberna San José', total: 21.50 },
]

export const staticCategories = [
  { categoriaID: 1, categoria: 'Entrantes' },
  { categoriaID: 2, categoria: 'Platos Principales' },
  { categoriaID: 3, categoria: 'Postres & Especiales' },
]
