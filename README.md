# Rosé Candle Co. - Velas de Soja

Rosé Candle Co es una tienda de velas aromáticas ecológicas hechas a mano con  
ingredientes naturales y fragancias inspiradas en la calma, la naturaleza y el bienestar.  
Este proyecto digital nace para acompañar el crecimiento del emprendimiento, permitiendo a los clientes explorar fácilmente los productos,  
hacer pedidos y seguir sus compras; mientras que el equipo de Rosé puede gestionar el inventario, la producción y  
las finanzas desde una plataforma práctica e intuitiva.

---

# Desarrolladores  
- Rodrigo Emilio Monterrosa Bernal – [@MonterrosaB](https://github.com/MonterrosaB)  
- Daniel Isaac Granados Cañas – [@danielgranados123](https://github.com/danielgranados123)  
- Bryan Eduardo Cornejo Peréz – [@bCornejoPe](https://github.com/bCornejoPe)  
- Emely Mariana Benitez Lovo – [@Emely2023](https://github.com/Emely2023)  
- Josué Rodrigo Hernández Jovel – [@josueeE3](https://github.com/josueeE3)  
- Jonathan Wilfredo Espinoza Ramiréz – [@JonathanRSS1](https://github.com/JonathanRSS1)  

---

# Descripción del Proyecto

Rosé Candle Co. es una plataforma web y móvil que permite a los clientes explorar y comprar velas aromáticas naturales, mientras brinda al equipo administrativo herramientas para:

- Gestionar productos e inventario  
- Controlar la producción artesanal  
- Supervisar pedidos y envíos  
- Analizar ventas y finanzas  

El objetivo es optimizar el emprendimiento y mejorar tanto la experiencia del cliente como la eficiencia operativa.

---

# Tecnologías Utilizadas

## Frontend  
- **React Native** — Aplicación móvil para clientes  
- **React.js con Vite** — Panel web administrativo  
- **HTML, CSS**  
- **TailwindCSS** — Diseño responsivo y moderno  

## Backend  
- **Node.js con Express** — API REST  
- **MongoDB Atlas** — Base de datos  
- **Mongoose** — para MongoDB  
- **JWT & Bcrypt** — Autenticación segura  

## Control de versiones  
- **GitHub**  
  - Issues utilizados para organizar tareas  

---

# Dependencias y Librerías Utilizadas

## Backend (Node.js con Express)  
- **express** — Framework para crear la API REST  
- **mongoose** — ODM para manejar MongoDB de forma sencilla  
- **dotenv** — Gestión de variables de entorno (`.env`)  
- **jsonwebtoken (JWT)** — Autenticación basada en tokens  
- **bcryptjs** — Encriptación y validación de contraseñas  
- **cors** — Configuración de permisos de origen cruzado para la API  
- **nodemailer** — Envío de correos electrónicos (recuperación de contraseña, confirmaciones, etc.)  
- **cloudinary** — Gestión y almacenamiento de imágenes en la nube  
- **multer** — Middleware para manejo de archivos (subida de imágenes, etc.)

## Frontend (React con Vite)  
- **react** — Biblioteca principal para construir interfaces de usuario  
- **react-dom** — Para renderizado en web
- **vite** — Bundler rápido para desarrollo frontend  
- **tailwindcss** — Framework CSS utilitario para diseño responsivo y moderno  
- **react-router-dom** — Enrutamiento en la aplicación web  
- **react-hook-form** — Manejo sencillo de formularios
- **react-hot-toast** — Alertas para el usuario
- **vite-plugin-svgr** — Soporte para importar archivos `.svg` como componentes de React
- **@heroicons/react** — Íconos SVG estilizados y accesibles, integrados con Tailwind 
- **framer-motion** — Animaciones fluidas y declarativas para React web  
- **motion** — Dependencia relacionada a framer-motion para animaciones  

---

# Nomenclatura y Organización de Archivos

## Backend  
- **Controladores** (`controllers`):  
  Archivos nombrados en minúsculas, usando camelCase seguido de `Controller.js`  
  Ejemplo: `productsController.js`, `employeesController.js`  
- **Modelos** (`models`):  
  Nombres en PascalCase, plural y con la primera letra en mayúscula  
  Ejemplo: `Products.js`, `Employees.js`  
- **Rutas** (`routes`):  
  Archivos en minúsculas y plural (cuando aplica)  
  Ejemplo: `products.js`, `employees.js`  

## Frontend  

### Web (React.js con Vite)  
- **Carpetas principales**:  
  Se utiliza PascalCase para nombres de páginas o secciones principales  
  Ejemplo: `PageProducts`, `PageHome`  
- **Archivos de página/componentes**:  
  Se utiliza PascalCase para componentes y páginas  
  Ejemplo: `PageProducts.jsx`, `ProductCard.jsx`  
- **Subcarpetas**:  
  Nombres en minúsculas, en plural para agrupar funcionalidades similares  
  Ejemplo:  
  - `hooks` (para hooks personalizados)  
  - `components` (para componentes reutilizables) 

---

# Comandos para Inicializar el Proyecto

## Backend (Node.js + Express)
- **npm install** — Instalar dependencias
- **node index.js** — Ejecutar

## Frontend (React + Vite)
- **npm install** — Instalar dependencias
- **npm run dev** — Ejecutar

---

# Configuraciones adicionales

- Uso de archivo `.env` para variables sensibles:  
  ```env
  DB_URI=""
  PORT=""
  JWT_SECRET=""
  JWT_EXPIRES=""
  ADMIN_EMAIL=""
  ADMIN_PASSWORD=""
  USER_EMAIL=""
  USER_PASS=""
  CLOUDINARY_NAME=""
  CLOUDINARY_API_KEY=""
  CLOUDINARY_API_SECRET=""

---

## Contacto

Para más información sobre este proyecto, puedes escribir a cualquiera de los desarrolladores o contactar directamente a **Rosé Candle Co.** en sus redes sociales.

---
