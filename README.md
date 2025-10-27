# 🎯 Tekton Challenge - Magic Cards Viewer

Una aplicación web moderna desarrollada con **Next.js 15**, **React 19**, **TypeScript** y **Tailwind CSS** que implementa un sistema de autenticación y visualización de cartas de Magic: The Gathering.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso de la Aplicación](#-uso-de-la-aplicación)
- [Estructura de Archivos](#-estructura-de-archivos)
- [Características Técnicas](#-características-técnicas)
- [Optimizaciones Implementadas](#-optimizaciones-implementadas)

---

## ✨ Características

- 🔐 **Sistema de Autenticación** con NextAuth.js y JWT
- 🃏 **Visualización de Cartas** de Magic: The Gathering desde Scryfall API
- 🎨 **Interfaz Interactiva** con efectos de flip 3D en las cartas
- 📱 **Diseño Responsivo** optimizado para desktop y mobile
- ⚡ **Virtualización** con react-window para rendimiento óptimo
- 🎯 **Cache Inteligente** con TanStack Query
- 🔄 **Estados de Carga** y manejo de errores
- 🧹 **Código Limpio** siguiendo principios SOLID

---

## 🛠 Tecnologías Utilizadas

| Tecnología          | Versión | Propósito                           |
| ------------------- | ------- | ----------------------------------- |
| **Next.js**         | 15.5.6  | Framework React con App Router      |
| **React**           | 19.1.0  | Librería UI con hooks modernos      |
| **TypeScript**      | 5.x     | Tipado estático y desarrollo seguro |
| **Tailwind CSS**    | 4.x     | Framework CSS utility-first         |
| **NextAuth.js**     | 4.24.11 | Autenticación y manejo de sesiones  |
| **TanStack Query**  | 5.90.5  | Cache y sincronización de datos     |
| **Axios**           | 1.7.7   | Cliente HTTP con interceptores      |
| **react-window**    | 1.8.10  | Virtualización de listas grandes    |
| **react-hook-form** | 7.65.0  | Manejo de formularios               |
| **Yup**             | 1.7.1   | Validación de esquemas              |

---

## 🏗 Arquitectura del Proyecto

### **Patrón de Arquitectura: Clean Architecture + Feature-Based**

```
src/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Rutas de autenticación
│   ├── (pages)/           # Rutas protegidas
│   └── api/               # API Routes
├── components/            # Componentes reutilizables
│   ├── common/            # Componentes base
│   └── features/           # Componentes específicos
├── hooks/                 # Custom hooks
├── layouts/               # Layouts de la aplicación
├── services/              # Servicios y APIs
├── types/                 # Definiciones de TypeScript
├── utils/                 # Utilidades y helpers
└── validations/           # Esquemas de validación
```

---

## 🚀 Instalación y Configuración

### **Prerrequisitos**

- Node.js 18+
- npm o yarn

### **Instalación**

1. **Clonar el repositorio**

```bash
git clone https://github.com/mnuxD/prueba_tekton.git
cd prueba_tekton
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
# Crear archivo .env.local
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3001
NEXT_PUBLIC_API_URL="https://api.scryfall.com"
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
```

5. **Abrir en el navegador**

```
http://localhost:3001
```

### **Scripts Disponibles**

```bash
npm run dev      # Desarrollo en puerto 3001
npm run build    # Build de producción
npm run start    # Servidor de producción en puerto 3001
npm run lint     # Linting con ESLint
```

---

## 🎮 Uso de la Aplicación

### **1. Autenticación**

- Accede a `/login` para iniciar sesión
- Usa cualquier email y contraseña de almenos 4 dígitos (autenticación simulada)
- El sistema genera un JWT token automáticamente

### **2. Dashboard Principal**

- Después del login, va a redirigir a `/home`
- Visualiza las cartas de Magic: The Gathering
- Haz clic en las cartas para ver detalles (efecto flip 3D)

### **3. Navegación**

- **Header**: Logo Tekton y botón de logout
- **Grid Responsivo**: Se adapta automáticamente al tamaño de pantalla
- **Scroll Virtualizado**: Rendimiento óptimo con miles de elementos

---

## 🔧 Características Técnicas

### **Autenticación**

- **NextAuth.js** con estrategia JWT
- **Sesiones persistentes** con configuración optimizada
- **Interceptores Axios** para envío automático de tokens
- **Limpieza de cache** en logout para seguridad

### **Gestión de Estado**

- **TanStack Query** para cache de datos del servidor
- **React hooks** para estado local
- **NextAuth** para estado de autenticación

### **Rendimiento**

- **Virtualización** con react-window para listas grandes
- **Lazy loading** de imágenes
- **Memoización** de componentes pesados
- **Cache inteligente** con TanStack Query

### **UI/UX**

- **Tailwind CSS** con tema personalizado Tekton
- **Efectos 3D** con CSS transforms
- **Responsive design** mobile-first
- **Estados de carga** y feedback visual

---

## ⚡ Optimizaciones Implementadas

### **1. Cache y Datos**

- ✅ **TanStack Query** con configuración optimizada
- ✅ **Cache de sesión** en Axios para evitar peticiones repetidas
- ✅ **Limpieza automática** de cache en logout
- ✅ **Refetch inteligente** solo cuando es necesario

### **2. Rendimiento**

- ✅ **Virtualización** de listas con react-window
- ✅ **Memoización** de cálculos pesados con useMemo
- ✅ **Callbacks optimizados** con useCallback
- ✅ **Lazy loading** de imágenes

### **3. Código**

- ✅ **Separación de responsabilidades** en archivos específicos
- ✅ **Hooks personalizados** para lógica reutilizable
- ✅ **Utilidades centralizadas** para funciones comunes
- ✅ **Tipos compartidos** para evitar duplicación

### **4. Seguridad**

- ✅ **Validación de esquemas** con Yup
- ✅ **Sanitización** de inputs
- ✅ **Manejo seguro** de tokens JWT
- ✅ **Limpieza de datos** entre sesiones

---

## 🎨 Personalización

### **Colores de Marca Tekton**

```css
/* Definidos en globals.css */
--tekton: #356c75; /* Color principal */
--tekton-hover: #264f55; /* Color hover */
--tekton-active: #1d3c42; /* Color activo */
```

### **Uso en Tailwind**

```css
bg-tekton          /* Fondo principal */
bg-tekton-hover    /* Fondo hover */
bg-tekton-active   /* Fondo activo */
text-tekton        /* Texto principal */
border-tekton      /* Borde principal */
```

---

## 🚀 Despliegue

### **Build de Producción**

```bash
npm run build
npm run start
```

### **Variables de Entorno Requeridas**

```env
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_API_URL="https://api.scryfall.com"
```

---

## 📝 Notas de Desarrollo

- **Puerto**: La aplicación se ejecuta en el puerto **3001**
- **API**: Utiliza Scryfall API para datos de cartas de Magic
- **Autenticación**: Sistema simulado para demostración
- **Responsive**: Optimizado para dispositivos móviles y desktop

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---
