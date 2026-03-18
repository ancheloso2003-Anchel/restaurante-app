// Configuración inicial del servidor Express y middleware necesario
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()

const app = express()
app.use(cors())
const port = process.env.PORT || 3000
let db

// Función para establecer la conexión con la base de datos MySQL con sistema de reintentos
function connectWithRetry() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  // Attempt to connect
  db.connect((err) => {
    if (err) {
      console.error('Error al conectar con MySQL:', err)
      // Reintentar tras 5 segundos
      console.log('Reintentando en 5 segundos...')
      setTimeout(connectWithRetry, 5000)
    } else {
      console.log('Conectado a la base de datos MySQL')
    }
  })
}

// Start the connection with retries
connectWithRetry()

// Definición de los endpoints de la API para el manejo de datos de restaurantes y pedidos
// Obtener todas las categorías de la base de datos
app.get('/categories', (req, res) => {
  db.query('SELECT * FROM categorias', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err)
      res.status(500).json({ error: 'Error interno del servidor' })
    } else {
      res.json(results)
    }
  })
})

// Get all restaurants
app.get('/restaurants', (req, res) => {
  db.query('SELECT * FROM restaurantes', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err)
      res.status(500).json({ error: 'Error interno del servidor' })
    } else {
      res.json(results)
    }
  })
})

// Get all dishes
app.get('/dishes', (req, res) => {
  db.query('SELECT * FROM platos', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err)
      res.status(500).json({ error: 'Error interno del servidor' })
    } else {
      res.json(results)
    }
  })
})

// Get all customers
app.get('/customers', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err)
      res.status(500).json({ error: 'Error interno del servidor' })
    } else {
      res.json(results)
    }
  })
})

// Get all orders with total price calculation
app.get('/orders', (req, res) => {
  const query = `
    SELECT p.*, c.nombre, c.apellido1, r.restaurante,
    (SELECT SUM(pp.cantidad * pl.precio) FROM platospedidos pp JOIN platos pl ON pp.platoID = pl.platoID WHERE pp.pedidoID = p.pedidoID) as total
    FROM pedidos p
    JOIN clientes c ON p.clienteID = c.clienteID
    JOIN restaurantes r ON p.restauranteID = r.restauranteID
    ORDER BY p.fecha DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err)
      res.status(500).json({ error: 'Error interno del servidor' })
    } else {
      res.json(results)
    }
  })
})

// Get all dishes for a specific order
app.get('/order/:orderId/dishes', (req, res) => {
  const orderId = req.params.orderId
  db.query(
    'SELECT pl.platoID, pl.plato, pl.descripcion, pl.precio, pp.cantidad FROM platospedidos pp JOIN platos pl ON pp.platoID = pl.platoID WHERE pp.pedidoID = ?',
    [orderId],
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
      } else {
        res.json(results)
      }
    }
  )
})

// --- RESTAURANTS CRUD ---

// Create restaurant
app.post('/restaurants', express.json(), (req, res) => {
  const { restaurante, barrio } = req.body
  db.query(
    'INSERT INTO restaurantes (restaurante, barrio) VALUES (?, ?)',
    [restaurante, barrio],
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
      } else {
        res.status(201).json({ restauranteID: results.insertId, restaurante, barrio })
      }
    }
  )
})

// Update restaurant
app.put('/restaurants/:id', express.json(), (req, res) => {
  const { id } = req.params
  const { restaurante, barrio } = req.body
  db.query(
    'UPDATE restaurantes SET restaurante = ?, barrio = ? WHERE restauranteID = ?',
    [restaurante, barrio, id],
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
      } else {
        res.json({ message: 'Restaurante actualizado correctamente' })
      }
    }
  )
})

// Delete restaurant
app.delete('/restaurants/:id', (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM restaurantes WHERE restauranteID = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err)
      res.status(500).json({ error: 'Error interno del servidor' })
    } else {
      res.json({ message: 'Restaurante eliminado correctamente' })
    }
  })
})

// --- DISHES CRUD ---

// Add dish
app.post('/dishes', express.json(), (req, res) => {
  const { plato, descripcion, precio, categoriaID, restauranteID } = req.body
  db.query(
    'INSERT INTO platos (plato, descripcion, precio, categoriaID, restauranteID) VALUES (?, ?, ?, ?, ?)',
    [plato, descripcion, precio, categoriaID, restauranteID],
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
      } else {
        res.status(201).json({ platoID: results.insertId, plato, descripcion, precio, categoriaID, restauranteID })
      }
    }
  )
})

// Update dish
app.put('/dishes/:id', express.json(), (req, res) => {
  const { id } = req.params
  const { plato, descripcion, precio, categoriaID, restauranteID } = req.body
  db.query(
    'UPDATE platos SET plato = ?, descripcion = ?, precio = ?, categoriaID = ?, restauranteID = ? WHERE platoID = ?',
    [plato, descripcion, precio, categoriaID, restauranteID, id],
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
      } else {
        res.json({ message: 'Plato actualizado correctamente' })
      }
    }
  )
})

// Delete dish
app.delete('/dishes/:id', (req, res) => {
  const { id } = req.params
  db.query('DELETE FROM platos WHERE platoID = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err)
      res.status(500).json({ error: 'Error interno del servidor' })
    } else {
      res.json({ message: 'Plato eliminado correctamente' })
    }
  })
})

// Get dishes for a specific restaurant
app.get('/restaurants/:id/dishes', (req, res) => {
  const { id } = req.params
  db.query(
    'SELECT p.*, c.categoria FROM platos p JOIN categorias c ON p.categoriaID = c.categoriaID WHERE p.restauranteID = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error('Error al ejecutar la consulta:', err)
        res.status(500).json({ error: 'Error interno del servidor' })
      } else {
        res.json(results)
      }
    }
  )
})

// Inicio del servidor para escuchar peticiones en el puerto configurado
app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`)
})
