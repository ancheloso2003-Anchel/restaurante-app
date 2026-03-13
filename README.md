# Proyecto Final: Restaurante App

Aplicación web para la gestión de un restaurante, que incluye un frontend en React (Vite) y un backend en Node.js con base de datos MySQL desplegado mediante contenedores.

## 🚀 Cómo lanzar el proyecto paso a paso

### 1. Levantar el Backend
Abre un terminal y lanza los contenedores de Docker (API y Base de Datos):
```bash
cd backend
docker compose up -d
```
*(Nota: la API correrá en el puerto 4000 y phpMyAdmin en el 8080)*

### 2. Levantar el Frontend
Abre otro terminal, instala las dependencias de React e inicia el servidor:
```bash
cd fronted
npm install
npm run dev
```

Una vez ejecutados estos comandos, visita la URL local que te muestre Vite (suele ser `http://localhost:5173`) en tu navegador para ver la página y disfrutar de la App.
