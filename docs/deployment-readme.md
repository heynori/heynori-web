# heynori! Landing Page

Landing page moderna y elegante para heynori!, la IA que realmente entiende cómo trabaja tu equipo.

## 🚀 Deployment en GitHub Pages

### Configuración Inicial

1. **Fork o clona este repositorio**
   ```bash
   git clone https://github.com/tu-usuario/heynori-web.git
   cd heynori-web
   ```

2. **Habilita GitHub Pages**
   - Ve a Settings → Pages en tu repositorio
   - Selecciona "Deploy from a branch"
   - Elige "main" branch y "/ (root)"
   - Guarda los cambios

3. **Configura dominio personalizado (opcional)**
   - En Settings → Pages → Custom domain
   - Agrega tu dominio personalizado
   - Habilita "Enforce HTTPS"

### Estructura de Archivos

```
heynori-web/
├── index.html          # Página principal
├── styles.css          # Estilos modernos con CSS Grid/Flexbox
├── script.js           # JavaScript interactivo
├── heynori-logo.png    # Logo principal (fondo neutro/beige)
├── heynori-logo.png # Logo para fondos claros
├── heynori-logo.png  # Logo para fondos oscuros
├── heynori-logo.png         # Favicon
├── landing-copy.md     # Copy original completo
├── estrategia-marketing.md # Estrategias de marketing y conversión
└── deployment-readme.md # Este archivo
```

## ✨ Características

### 🎨 Diseño y UX
- **Responsive Design**: Perfecto en todos los dispositivos
- **Paleta de colores**: Basada en la identidad de heynori! (beige, negro, rojo)
- **Animaciones fluidas**: Scroll animations, hover effects
- **Logos profesionales**: Logos reales de heynori! y herramientas de integración
- **Tipografía moderna**: Inter font para máxima legibilidad

### 🔧 Tecnologías Modernas
- **HTML5 semántico**: Accesibilidad y SEO optimizado
- **CSS Grid/Flexbox**: Layout moderno y flexible
- **CSS Custom Properties**: Variables para fácil mantenimiento
- **JavaScript ES6+**: Classes, arrow functions, async/await
- **Intersection Observer**: Animaciones al hacer scroll
- **Smooth scrolling**: Navegación fluida

### 📱 Responsive & Accesible
- **Mobile-first approach**: Diseñado primero para móviles
- **Breakpoints optimizados**: 480px, 768px, 1024px
- **Navegación móvil**: Hamburger menu con animaciones
- **ARIA labels**: Accesibilidad para lectores de pantalla
- **Contraste WCAG**: Cumple estándares de accesibilidad

### 🎯 Funcionalidades Interactivas
- **Modal system**: Formularios de demo en modals elegantes
- **Tab switching**: Casos de uso por industria
- **Form validation**: Validación en tiempo real
- **Loading states**: Feedback visual en todas las acciones
- **Notifications**: Sistema de notificaciones toast

## 🛠️ Personalización

### Cambiar Colores
Modifica las variables CSS en `styles.css`:
```css
:root {
  --primary-beige: #F4E6D1;
  --primary-black: #1a1a1a;
  --accent-red: #E53E3E;
  --accent-pink: #ED64A6;
}
```

### Actualizar Contenido
- **Textos**: Edita directamente en `index.html`
- **Integraciones**: Modifica la sección `.integrations-grid`
- **Testimonials**: Actualiza la sección `.use-cases`
- **CTAs**: Personaliza botones y formularios

### Agregar Analytics
En `script.js`, actualiza la función `trackEvent()`:
```javascript
trackEvent(eventName, properties = {}) {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
  
  // Segment/Mixpanel
  if (typeof analytics !== 'undefined') {
    analytics.track(eventName, properties);
  }
}
```

## 📊 Optimización para Conversión

### Elementos de Conversión Implementados
- ✅ **Headlines orientados a beneficios**
- ✅ **Problema-solución clarity**
- ✅ **Social proof placeholders**
- ✅ **Multiple CTAs** (demo, trial, contacto)
- ✅ **Urgency/escasez** (acceso limitado)
- ✅ **Trust signals** (seguridad, compliance)
- ✅ **Mobile optimization**

### Métricas Recomendadas
- **Conversion Rate**: % visitantes → leads
- **Bounce Rate**: Tiempo en página
- **Scroll Depth**: % de página vista
- **CTA Clicks**: Botones más efectivos
- **Form Completion**: Tasa de formularios completados

## 🔒 SEO y Performance

### SEO Optimizado
- Meta tags completos
- Open Graph para redes sociales
- Schema markup ready
- URLs amigables
- Sitemap automático (GitHub Pages)

### Performance
- **Lazy loading**: Imágenes cargadas cuando son necesarias
- **CSS/JS minificado**: Para producción
- **Web fonts optimizados**: Google Fonts con preload
- **SVG icons**: Vectoriales y ligeros

## 🚀 Próximos Pasos

### Inmediatos (Esta semana)
1. **Personalizar contenido** con información real
2. **Conectar formularios** a tu backend/CRM
3. **Configurar analytics** (Google Analytics, Hotjar)
4. **Test en dispositivos** reales

### Corto plazo (2-4 semanas)
1. **A/B test headlines** y CTAs
2. **Agregar testimonials** reales
3. **Crear videos demo** y embedder
4. **SEO optimization** completo

### Mediano plazo (1-3 meses)
1. **Lead magnets** (whitepapers, calculadoras)
2. **Marketing automation** integración
3. **Multi-idioma** soporte
4. **Advanced analytics** y heat mapping

## 📞 Soporte

Para modificaciones avanzadas o integraciones personalizadas, contacta al equipo de desarrollo.

---

**¡Tu landing page está lista para conquistar el mercado B2B! 🚀** 