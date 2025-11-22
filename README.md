# INVITA-3 - Plataforma de Invitaciones Digitales

Plataforma web moderna para crear, administrar y compartir invitaciones digitales para eventos especiales.

## 🎉 Características

### Para Clientes
- **Galería de Diseños**: Navega por plantillas categorizadas (15 Años, Bodas, Bautizos, etc.)
- **Invitaciones Interactivas**: Con música, cuenta regresiva, galería de fotos, ubicación GPS
- **Chatbot Inteligente**: Asistente virtual para consultas sobre precios, planes y creación de invitaciones
- **Descarga App**: Botón directo para descargar la aplicación móvil
- **100% Responsive**: Optimizado para dispositivos móviles y desktop

### Para Administradores
- **Panel de Control**: Gestión completa de eventos e invitaciones
- **Editor Visual**: Personalización de colores, fuentes, diseños (Classic, Cinematic, Minimal, Neon)
- **Plantillas**: 4 diseños base con variaciones premium (Bronce, Plata, Oro, Premium)
- **Gestión de Contenido**: Fotos, música, videos, itinerario, regalos, dress code
- **Publicación**: Control de visibilidad y categorización
- **Configuración APK**: Gestión del link de descarga de la app móvil

## 🚀 Tecnologías

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Fuentes**: 40+ Google Fonts para personalización
- **Storage**: LocalStorage (migrable a backend)

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/Frawa11/INVITA-3.git

# Navegar al directorio
cd INVITA-3

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar producción
npm start
```

## 🎨 Diseños Disponibles

### Diseños Básicos (S/30-40)
- **Classic Glass**: Elegante con efecto glassmorphism (sin video S/30, con video S/35)
- **Cinematic**: Con video full screen (S/40)
- **Minimalista**: Diseño limpio y moderno (sin video S/30, con video S/35)
- **Neon Party**: Vibrante con efectos neón (S/40)

### Planes Premium (S/91-325)
- **Bronce**: Video con 1 foto, hasta 3 fotos en galería
- **Plata**: Video con 2 fotos, hasta 6 fotos, itinerario
- **Oro**: Video con 3 fotos, hasta 10 fotos, PDF de recuerdo
- **Premium**: Diseño exclusivo animado, video con 4 fotos, hasta 15 fotos, video de recuerdo

## 🔑 Acceso Admin

```
Usuario: admin
Contraseña: admin123
```

## 📱 Estructura del Proyecto

```
INVITA-3/
├── app/
│   ├── page.tsx              # Galería pública
│   ├── admin/page.tsx        # Panel de administración
│   ├── invitation/[id]/      # Páginas de invitaciones
│   └── api/auth/             # API de autenticación
├── components/
│   ├── ChatBot.tsx           # Chatbot asistente
│   ├── admin/EditorPanel.tsx # Editor de eventos
│   └── ui/                   # Componentes UI
├── lib/
│   └── utils.ts              # Utilidades
└── public/                   # Assets estáticos
```

## ⚙️ Configuración

### APK Link
1. Ir al panel de administración
2. Clic en "Configuración" ⚙️
3. Pegar link del APK
4. Guardar

### Crear Nueva Invitación
1. Login en `/admin`
2. Clic en "+ Crear Nuevo Evento"
3. Configurar datos del evento
4. Seleccionar diseño y colores
5. Agregar multimedia (fotos, música, video)
6. Publicar en galería

## 🎯 Optimizaciones

- **Performance**: Reducción de partículas animadas (30 → 10)
- **Lazy Loading**: Carga diferida de imágenes
- **Mobile First**: Diseño optimizado para smartphones
- **SEO Ready**: Meta tags y estructura semántica

## 📞 Contacto

- **WhatsApp Admin**: +51 996001280
- **Email**: aameztm@gmail.com

## 📄 Licencia

Este proyecto es propiedad privada de INVITA.

---

**Desarrollado con ❤️ para crear invitaciones inolvidables**
