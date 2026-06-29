# Stackly API

API REST desarrollada con Node.js, Express y MongoDB para gestionar un catálogo de herramientas SaaS.

---

# Características

- CRUD completo de herramientas
- Búsqueda por nombre mediante query param `?search=`
- Registro de usuarios
- Inicio de sesión con JWT
- Contraseñas encriptadas con bcrypt
- Autenticación mediante Bearer Token
- Middleware de administrador
- MongoDB Atlas
- Tests con Mocha, Chai y Supertest

---

# 🛠 Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors
- Mocha
- Chai
- Supertest

---

# Instalación

Clonar el repositorio:

```bash
git clone 
```

Ingresar al proyecto:

```bash
cd backend-proyecto-saas-catalog-josselyn-contreras
```

Instalar dependencias:

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` utilizando como referencia `.env.example`.

## .env.example

```env
PORT=
MONGODB_URI=
JWT_SECRET=
```

## Ejemplo

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/catalog
JWT_SECRET=mi-clave-secreta
```

Para correr los tests se utiliza un archivo `.env.test` con una base de datos separada (`catalog-test`).

---

# Ejecutar en desarrollo

```bash
npm run dev
```

---

# Ejecutar en producción

```bash
npm start
```

---

# Ejecutar tests

```bash
npm test
```

5 tests pasando (Mocha + Chai + Supertest).

---

# Endpoints

---

## Home

### GET /

Devuelve un mensaje de bienvenida.

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "message": "Bienvenidos a la API de Stackly"
}
```

---

# Autenticación

## Registro

### POST /api/auth/register

Registra un nuevo usuario.

### Body

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456"
}
```

### Respuesta Exitosa

#### Status: 201 Created

```json
{
  "message": "Usuario registrado correctamente"
}
```

### Posibles Errores

#### Status: 400 Bad Request

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 400 Bad Request

```json
{
  "message": "El usuario ya existe"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Login

### POST /api/auth/login

Inicia sesión y devuelve un token JWT.

### Body

```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "token": "jwt-token",
  "user": {
    "_id": "...",
    "name": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

### Posibles Errores

#### Status: 400 Bad Request

```json
{
  "message": "Todos los campos son obligatorios"
}
```

#### Status: 401 Unauthorized

```json
{
  "message": "Credenciales inválidas"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

# Herramientas

## Obtener todas las herramientas

### GET /api/tools

Devuelve todas las herramientas. Soporta búsqueda con el query param `search`.

### Ejemplo

```txt
GET /api/tools?search=notion
```

### Respuesta Exitosa

#### Status: 200 OK

```json
[
  {
    "_id": "...",
    "name": "Notion",
    "description": "Docs, wikis y gestión de proyectos en un solo workspace colaborativo.",
    "category": "Productividad",
    "pricing": "Freemium",
    "website": "https://notion.so",
    "image": "https://...",
    "rating": 4.8,
    "featured": true
  }
]
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Obtener herramienta por ID

### GET /api/tools/:id

Devuelve una herramienta por su ID.

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "name": "Notion",
  "category": "Productividad",
  "pricing": "Freemium",
  "image": "https://..."
}
```

### Posibles Errores

#### Status: 404 Not Found

```json
{
  "message": "Herramienta no encontrada"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Crear herramienta

### POST /api/tools

Requiere autenticación de administrador.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Body

```json
{
  "name": "Notion",
  "description": "Docs, wikis y gestión de proyectos en un solo workspace colaborativo.",
  "category": "Productividad",
  "pricing": "Freemium",
  "website": "https://notion.so",
  "image": "https://...",
  "rating": 4.8,
  "featured": true
}
```

### Respuesta Exitosa

#### Status: 201 Created

```json
{
  "_id": "...",
  "name": "Notion",
  "category": "Productividad"
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 400 Bad Request

```json
{
  "message": "Datos inválidos"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Actualizar herramienta

### PUT /api/tools/:id

Requiere autenticación de administrador.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "_id": "...",
  "name": "Notion 2",
  "category": "Productividad"
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 404 Not Found

```json
{
  "message": "Herramienta no encontrada"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

## Eliminar herramienta

### DELETE /api/tools/:id

Requiere autenticación de administrador.

### Headers

```txt
Authorization: Bearer TOKEN
```

### Respuesta Exitosa

#### Status: 200 OK

```json
{
  "message": "Herramienta eliminada correctamente"
}
```

### Posibles Errores

#### Status: 401 Unauthorized

```json
{
  "message": "No autorizado"
}
```

#### Status: 404 Not Found

```json
{
  "message": "Herramienta no encontrada"
}
```

#### Status: 500 Internal Server Error

```json
{
  "message": "Error interno del servidor"
}
```

---

# Deploy

Backend desplegado en Render.

```txt
https://backend-proyecto-saas-catalog-josselyn.onrender.com
```

---

# Estructura del proyecto

```txt
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── test/
│
└── app.js

index.js
```

---

# Autor

Proyecto desarrollado como práctica del curso Full Stack de Neoland.

Autora: Josselyn Contreras