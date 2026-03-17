# Frontend - Restaurante App

Esta es la parte del cliente (frontend) de la Aplicación de Restaurantes, desarrollada con **React** y **Vite**.

## 🛠️ Tecnologías Utilizadas

- **React 19**: Biblioteca para la interfaz de usuario.
- **Vite**: Herramienta de construcción rápida y servidor de desarrollo.
- **Axios**: Para realizar peticiones HTTP a la API.
- **Lucide React**: Biblioteca de iconos modernos.
- **CSS Vanilla**: Estilos personalizados con un enfoque premium y moderno (Midnight Emerald).

## 🚀 Instalación y Ejecución

1. Entra en la carpeta del frontend:
   ```bash
   cd fronted
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` basado en el entorno necesario:
   - Para desarrollo local: configura `VITE_API_URL=http://localhost:4000`
   - Para producción: configura la URL de la API correspondiente.

4. Lanza el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## 📦 Despliegue

El proyecto está configurado para desplegarse en **GitHub Pages**. Para desplegar una nueva versión:

```bash
npm run deploy
```

La URL de despliegue es: [https://ancheloso2003-Anchel.github.io/restaurante-app](https://ancheloso2003-Anchel.github.io/restaurante-app)

## 📁 Estructura del Proyecto

- `src/components`: Componentes reutilizables (Carousels, DishItem, etc.).
- `src/pages`: Vistas principales de la aplicación (Home, Orders, Customers, etc.).
- `src/data`: Datos estáticos para fallback cuando la API no está disponible.
- `src/index.css`: Sistema de diseño global y temas.
