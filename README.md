# 🚗 API de Gestión de Autos

Este proyecto es una API RESTful para la gestión de autos, usuarios y categorías. Forma parte de una aplicación fullstack que incluye frontend en React y backend en Node.js con Express, conectados a una base de datos MongoDB Atlas.

---

## 🌐 Despliegue

- 🔧 **Backend**: [Render](https://api-autos-wrnb.onrender.com)
- 🧠 **Base de datos**: MongoDB Atlas
- 🎨 **Frontend**: [GitHub Pages](https://tuusuario.github.io/autos-gestion)

---

## 🛠 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (autenticación)
- Bcrypt (hash de contraseñas)
- CORS
- Dotenv

---

## 🚀 Cómo correr el proyecto localmente

1. Cloná el repositorio:

en bash
git clone https://github.com/tuusuario/backend-autos.git
cd backend-autos

2. npm install

3. Configurar .env
PORT=3000
MONGODB_URI=mongodb+srv://mari:3OfCZNEG3EF16zkn@autos.tvo0mlz.mongodb.net/api-autos?appName=autosme=autos
JWT_SECRET="secret"

4. npm run dev

Y listo!

Podés usar esta cuenta para probar la API:
- Email: admin@example.com
- Contraseña: contraseña


Ejemplos endpoint
-DELETE https://api-autos-wrnb.onrender.com/api/autos/691a8b72b42b14a2c8011001
-GET https://api-autos-wrnb.onrender.com/api/categorias

Ejemplos mock

AUTOS
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "anio": 2022,
  "color": "Gris",
  "precio": 25000,
  "categoria": "Sedán"
}

CATEGORIAS
{
  "nombre": "SUV",
  "descripcion": "Vehículos deportivos utilitarios"
}
