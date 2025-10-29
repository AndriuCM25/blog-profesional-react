# 🌟 Plataforma de Blog Moderna

Una aplicación de blogging moderna construida con React que ofrece una experiencia completa de gestión de contenido con autenticación segura y diseño responsive.

## ✨ Características

### 🔐 Autenticación y Usuarios
- Registro seguro con validación en tiempo real
- Inicio de sesión con persistencia de sesión
- Protección de rutas privadas
- Gestión de perfiles de usuario
- Subida de fotos de perfil

### 📝 Gestión de Contenido
- Lista de posts con diseño de tarjetas
- Vista detallada de artículos
- Búsqueda en tiempo real
- Tiempo de lectura estimado automático
- Información de autores

### 🎨 Experiencia de Usuario
- Diseño completamente responsive
- Animaciones y transiciones suaves
- Efectos glassmorphism modernos
- Estados de carga elegantes
- Manejo robusto de errores

## 🛠️ Tecnologías

- **React 18** - Biblioteca principal
- **Tailwind CSS** - Estilos y diseño
- **React Router DOM** - Navegación
- **Vite** - Build tool y desarrollo
- **Axios** - Peticiones HTTP
- **Context API** - Estado global

## 🚀 Instalación

Sigue estos pasos para instalar y ejecutar el proyecto:

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/modern-blog-platform.git
cd modern-blog-platform

Instalar dependencias

bash
npm install
Configurar variables de entorno

bash
# Crear archivo .env en la raíz del proyecto
VITE_API_URL=tu_url_de_api_aqui
Ejecutar en modo desarrollo

bash
npm run dev
La aplicación estará disponible en http://localhost:5173

📖 Uso
Para Usuarios Regulares
Registro

Ve a /register

Completa el formulario con tus datos

Recibirás confirmación y serás redirigido al login

Inicio de Sesión

Accede a /login

Ingresa tu email y contraseña

Serás redirigido al blog principal

Navegación por el Blog

Explora los posts en /blog/posts

Usa la barra de búsqueda para filtrar

Haz clic en cualquier post para ver detalles

Gestión de Perfil

Accede a tu perfil desde el navbar

Actualiza tu foto de perfil

Revisa tu información personal

Para Desarrolladores
Estructura principal de componentes:

text
src/
├── features/
│   ├── auth/           # Autenticación
│   ├── blog/           # Blog y posts
│   └── profile/        # Perfiles de usuario
├── components/         # Componentes compartidos
└── contexts/          # Contextos de React
Ejemplo de uso de componentes:

jsx
import { PostCard } from './components/PostCard';

function MyComponent() {
  return (
    <PostCard 
      post={postData}
      variant="default"
    />
  );
}
🏗️ Scripts Disponibles
bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
📱 Capturas
Páginas Principales
Login: Interfaz moderna con validaciones

Registro: Formulario completo con progreso

Blog: Grid de posts con búsqueda

Detalles de Post: Vista completa de artículos

Perfil: Gestión de usuario con foto

🤝 Contribución
Las contribuciones son bienvenidas. Para contribuir:

Haz fork del proyecto

Crea una rama para tu feature (git checkout -b feature/AmazingFeature)

Commit tus cambios (git commit -m 'Add some AmazingFeature')

Push a la rama (git push origin feature/AmazingFeature)

Abre un Pull Request

📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para detalles.

👨‍💻 Autor
Valentino Cuenca 

GitHub: @AndriuCM25
