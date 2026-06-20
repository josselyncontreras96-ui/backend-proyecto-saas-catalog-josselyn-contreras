# Backend Proyecto SaaS Catalog - Josselyn Contreras

## Instalación

1. Clona el repositorio:
```bash
   git clone 
```
2. Navega al directorio del proyecto:
```bash
   cd backend-proyecto-saas-catalog-josselyn-contreras
```
3. Cambiar a la rama `dev`:
```bash
   git switch dev
```
4. Instala las dependencias:
```bash
   npm install
```
5. Crea un archivo `.env` basado en el archivo `.env-example` y configura tus variables de entorno:
```bash
   cp .env-example .env
```
   Luego, edita el archivo `.env` para agregar tu configuración personalizada, como el puerto, la URI de MongoDB y el JWT_SECRET.
6. Inicia el servidor:
```bash
   npm start
```
   Para desarrollo con recarga automática, puedes usar:
```bash
   npm run dev
```

## Seeders

Si deseas poblar la base de datos con datos de ejemplo, puedes ejecutar el seeder:
```bash
node src/seeders/tool.seeder.js
```
## Testing

El proyecto incluye tests automatizados con `mocha`, `chai` y `supertest`, que cubren la ruta raíz, el registro/login de usuarios y el CRUD de herramientas.

Los tests usan una base de datos separada de la de producción, para no afectar los datos reales. Antes de correrlos, crea un archivo `.env.test` en la raíz del proyecto con el mismo formato que `.env-example`, pero apuntando a una base de datos distinta (por ejemplo, cambiando el nombre de la base en la URI de `catalog` a `catalog-test`):

```bash
PORT=3001
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>/catalog-test?appName=Cluster0
JWT_SECRET=<tu_secreto>
```

Para ejecutar los tests:
```bash
npm test
```

Los tests verifican:
- Que la ruta raíz `/` responda con un mensaje de bienvenida
- Que el registro de usuarios funcione correctamente y rechace correos duplicados
- Que el login devuelva un token JWT válido
- Que el listado de herramientas (`GET /api/tools`) responda con un array
- Que un usuario administrador pueda crear una herramienta correctamente



## Uso

Una vez que el servidor esté en funcionamiento, puedes acceder a la API a través de `http://localhost:<PORT>/api`, donde `<PORT>` es el puerto que configuraste en tu archivo `.env`.

### Obtener todas las herramientas

método GET a `/api/tools` para obtener una lista de todas las herramientas.

response:
```json
[
  {
    "_id": "6a3...",
    "name": "Notion",
    "description": "Docs, wikis y gestión de proyectos en un solo workspace colaborativo.",
    "category": "Productividad",
    "pricing": "Freemium",
    "website": "https://notion.so",
    "image": "https://picsum.photos/300/400?random=1",
    "rating": 4.8,
    "featured": true,
    "createdAt": "2026-06-17T10:51:32.082Z",
    "updatedAt": "2026-06-17T10:51:32.082Z"
  }
]
```

### Obtener una herramienta por ID

método GET a `/api/tools/:id` para obtener los detalles de una herramienta específica por su ID.

response:
status: 200
```json
{
  "_id": "6a3...",
  "name": "Notion",
  "description": "Docs, wikis y gestión de proyectos en un solo workspace colaborativo.",
  "category": "Productividad",
  "pricing": "Freemium",
  "website": "https://notion.so",
  "image": "https://picsum.photos/300/400?random=1",
  "rating": 4.8,
  "featured": true,
  "createdAt": "2026-06-17T10:51:32.082Z",
  "updatedAt": "2026-06-17T10:51:32.082Z"
}
```

status: 404
```json
{
  "message": "Herramienta no encontrada"
}
```

### Crear una herramienta (requiere autenticación de admin)

método POST a `/api/tools` con header `Authorization: Bearer <token>`.

body:
```json
{
  "name": "Trello",
  "category": "Productividad",
  "description": "Gestión de proyectos con tableros Kanban.",
  "pricing": "Freemium",
  "website": "https://trello.com",
  "image": "https://picsum.photos/300/400?random=10",
  "rating": 4.5
}
```

response: status 201 con la herramienta creada.

### Actualizar una herramienta (requiere autenticación de admin)

método PUT a `/api/tools/:id` con header `Authorization: Bearer <token>` y el body con los campos a actualizar.

### Eliminar una herramienta (requiere autenticación de admin)

método DELETE a `/api/tools/:id` con header `Authorization: Bearer <token>`.

response:
```json
{
  "message": "Herramienta borrada"
}
```

### Registro de usuario

método POST a `/api/auth/register`.

body:
```json
{
  "name": "Josselyn Contreras",
  "email": "josselyn@test.com",
  "password": "123456"
}
```

response: status 201 con los datos del usuario creado.

### Login de usuario

método POST a `/api/auth/login`.

body:
```json
{
  "email": "josselyn@test.com",
  "password": "123456"
}
```

response: status 200 con el token JWT y los datos del usuario.


## Estructura del proyecto

```
src/
├── config/        # Configuración de conexión a MongoDB
├── controllers/   # Lógica de negocio (auth, tools)
├── middlewares/    # Autenticación JWT y verificación de rol admin
├── models/        # Esquemas de Mongoose (Tool, User)
├── routes/        # Definición de endpoints
└── seeders/       # Script para poblar la base de datos
test/              # Tests automatizados (mocha + chai + supertest)
app.js             # Configuración de Express (sin levantar el servidor)
index.js           # Punto de entrada que levanta el servidor
```