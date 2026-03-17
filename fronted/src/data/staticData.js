// Datos estáticos de demostración para uso cuando no hay backend disponible
export const staticRestaurants = [
  { restauranteID: 1, restaurante: 'La Buena Mesa', barrio: 'Salamanca', categoriaID: 1 },
  { restauranteID: 2, restaurante: 'El Rincón Asturiano', barrio: 'Malasaña', categoriaID: 2 },
  { restauranteID: 3, restaurante: 'Sushi Zen', barrio: 'Chamberí', categoriaID: 3 },
  { restauranteID: 4, restaurante: 'La Pizzería del Puerto', barrio: 'La Latina', categoriaID: 1 },
  { restauranteID: 5, restaurante: 'Casa Pedraza', barrio: 'Retiro', categoriaID: 2 },
  { restauranteID: 6, restaurante: 'El Mediterráneo', barrio: 'Chueca', categoriaID: 3 },
]

export const staticDishes = [
  { platoID: 1, plato: 'Croquetas de Jamón', descripcion: 'Croquetas cremosas de jamón ibérico con bechamel artesanal', precio: 12.50, categoriaID: 1, restauranteID: 1, categoria: 'Entrantes' },
  { platoID: 2, plato: 'Cocido Madrileño', descripcion: 'Tradicional cocido con garbanzos, verduras y tres vuelcos', precio: 22.00, categoriaID: 2, restauranteID: 2, categoria: 'Platos Principales' },
  { platoID: 3, plato: 'Salmón Teriyaki', descripcion: 'Salmón a la plancha con salsa teriyaki y arroz jazmín', precio: 18.00, categoriaID: 1, restauranteID: 3, categoria: 'Entrantes' },
  { platoID: 4, plato: 'Pizza Trufa Negra', descripcion: 'Pizza gourmet con trufa negra, mozzarella fior di latte y rúcula', precio: 19.50, categoriaID: 2, restauranteID: 4, categoria: 'Platos Principales' },
  { platoID: 5, plato: 'Tataki de Atún', descripcion: 'Atún rojo marcado con sésamo y salsa ponzu', precio: 24.00, categoriaID: 3, restauranteID: 3, categoria: 'Especiales' },
  { platoID: 6, plato: 'Txuleta a la Brasa', descripcion: 'Chuleta de vaca vieja a la brasa con sal en escamas', precio: 38.00, categoriaID: 2, restauranteID: 5, categoria: 'Platos Principales' },
  { platoID: 7, plato: 'Gambas al Ajillo', descripcion: 'Gambas frescas salteadas con ajo, guindilla y aceite de oliva virgen', precio: 16.50, categoriaID: 1, restauranteID: 6, categoria: 'Entrantes' },
  { platoID: 8, plato: 'Tarta de Queso', descripcion: 'Clásica tarta de queso al horno estilo vasca con mermelada de frutos rojos', precio: 8.00, categoriaID: 3, restauranteID: 1, categoria: 'Postres' },
  { platoID: 9, plato: 'Paella Valenciana', descripcion: 'Arroz con pollo, conejo, judías verdes y garrofón al estilo tradicional', precio: 21.00, categoriaID: 2, restauranteID: 6, categoria: 'Platos Principales' },
  { platoID: 10, plato: 'Crema Catalana', descripcion: 'Clásico postre catalán con caramelización de azúcar en el momento', precio: 7.50, categoriaID: 3, restauranteID: 2, categoria: 'Postres' },
]

export const staticCustomers = [
  { clienteID: 1, nombre: 'Elena', apellido1: 'Rodríguez', poblacion: 'Madrid', sexo: 'M', foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
  { clienteID: 2, nombre: 'Carlos', apellido1: 'Mendoza', poblacion: 'Barcelona', sexo: 'H', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  { clienteID: 3, nombre: 'Sofía', apellido1: 'Martínez', poblacion: 'Valencia', sexo: 'M', foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
  { clienteID: 4, nombre: 'Alejandro', apellido1: 'García', poblacion: 'Sevilla', sexo: 'H', foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  { clienteID: 5, nombre: 'Lucía', apellido1: 'Fernández', poblacion: 'Bilbao', sexo: 'M', foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop' },
  { clienteID: 6, nombre: 'Pablo', apellido1: 'López', poblacion: 'Málaga', sexo: 'H', foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
]

export const staticOrders = [
  { pedidoID: 1, clienteID: 1, restauranteID: 1, fecha: '2026-03-10', nombre: 'Elena', apellido1: 'Rodríguez', restaurante: 'La Buena Mesa', total: 45.50 },
  { pedidoID: 2, clienteID: 2, restauranteID: 3, fecha: '2026-03-11', nombre: 'Carlos', apellido1: 'Mendoza', restaurante: 'Sushi Zen', total: 62.00 },
  { pedidoID: 3, clienteID: 3, restauranteID: 4, fecha: '2026-03-12', nombre: 'Sofía', apellido1: 'Martínez', restaurante: 'La Pizzería del Puerto', total: 39.00 },
  { pedidoID: 4, clienteID: 4, restauranteID: 5, fecha: '2026-03-12', nombre: 'Alejandro', apellido1: 'García', restaurante: 'Casa Pedraza', total: 76.00 },
  { pedidoID: 5, clienteID: 5, restauranteID: 6, fecha: '2026-03-13', nombre: 'Lucía', apellido1: 'Fernández', restaurante: 'El Mediterráneo', total: 53.50 },
]

export const staticCategories = [
  { categoriaID: 1, categoria: 'Entrantes' },
  { categoriaID: 2, categoria: 'Platos Principales' },
  { categoriaID: 3, categoria: 'Postres & Especiales' },
]
