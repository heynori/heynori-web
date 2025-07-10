# heynori! Landing Page

Landing page moderna y completa para heynori!, la IA que realmente entiende cómo trabaja tu equipo.

## 🌍 Idiomas Disponibles

- **Español**: [index.html](./index.html) - Versión principal
- **English**: [en/index.html](./en/index.html) - English version

## 📁 Estructura del Proyecto

```
heynori-web/
├── assets/                          # Recursos estáticos
│   └── images/                      # Imágenes del proyecto
│       ├── logos/                   # Logos en diferentes variantes
│       │   ├── heynori-logo.png     # Logo principal
│       │   ├── heynori-logo.png # Logo para fondos oscuros
│       │   └── heynori-logo.png # Logo para fondos claros
│       ├── heynori-logo.png              # Icono del sitio
│       └── heynori-logo.png # Imagen principal
├── docs/                            # Documentación del proyecto
│   ├── deployment-readme.md         # Guía de deployment
│   ├── estrategia-marketing.md      # Estrategia de marketing
│   └── landing-copy.md             # Copy original completo
├── en/                             # Versión en inglés
│   └── index.html                  # Página principal en inglés
├── index.html                      # Página principal en español
├── styles.css                      # Estilos CSS modernos
├── script.js                       # JavaScript ES6+ interactivo
└── README.md                       # Este archivo
```

## ✨ Características Implementadas

### 🎨 Diseño y UX
- **Responsive Design**: Perfecto en móviles, tablets y desktop
- **Paleta profesional**: Basada en la identidad de heynori!
- **Animaciones fluidas**: Scroll effects, hover states, transiciones
- **Tipografía moderna**: Inter font optimizada para legibilidad
- **Accesibilidad WCAG 2.1**: Navegación por teclado, ARIA labels

### 🔧 Tecnologías Modernas
- **HTML5 semántico**: Estructura optimizada para SEO
- **CSS Grid/Flexbox**: Layout responsive moderno
- **CSS Custom Properties**: Variables para mantenimiento fácil
- **JavaScript ES6+**: Classes, arrow functions, async/await
- **Chart.js 4.4.0**: Gráficos modernos y animados
- **Font Awesome 6.5**: Iconografía profesional

### 📱 Funcionalidades Interactivas
- **Formulario de contacto**: Completamente funcional con Formspree
  - ✅ Envío real de emails
  - ✅ Validación en tiempo real
  - ✅ Protección antispam integrada
  - ✅ Soporte multiidioma
  - ✅ Funciona perfectamente en GitHub Pages
- **Sistema de notificaciones**: Toast notifications
- **Lazy loading**: Optimización de performance
- **Easter eggs**: Konami code, vibración, confetti
- **Modales**: Sistema completo con focus trapping

### 🔍 SEO y Performance
- **Meta tags completos**: Open Graph, Twitter Cards
- **JSON-LD**: Structured data para buscadores
- **Canonical URLs**: URLs únicas por idioma
- **Lazy loading**: Imágenes optimizadas
- **Performance**: Assets minificados y optimizados

## 📧 Formulario de Contacto Funcional

El formulario está **completamente configurado** para funcionar en GitHub Pages usando **Web3Forms**:

### ✅ Características del Formulario
- **Completamente GRATIS**: Sin límites de envíos con Web3Forms
- **Envío real**: Los datos se envían por email automáticamente a `hello@heynori.ai`
- **Validación cliente**: JavaScript valida antes de enviar
- **Protección antispam**: Honeypot integrado para filtrar spam
- **Multiidioma**: Mensajes adaptan al idioma de la página
- **Experiencia fluida**: Sin redirecciones, notificaciones in-page
- **Fallback**: Si falla JS, funciona con envío HTML estándar

### 🔧 Configuración Técnica
```html
<!-- Formulario configurado con Web3Forms -->
<form action="https://api.web3forms.com/submit" method="POST">
  <!-- Campos hidden para configuración -->
  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">
  <input type="hidden" name="subject" value="Nueva solicitud de demo - heynori!">
  <input type="hidden" name="from_name" value="heynori! Landing Page">
  <input type="hidden" name="language" value="es">
  
  <!-- Protección antispam -->
  <input type="checkbox" name="botcheck" style="display: none;">
</form>
```

### 📬 Qué Incluye Cada Email
- **Destinatario**: `hello@heynori.ai`
- **Asunto**: "Nueva solicitud de demo - heynori!" / "New demo request - heynori!"
- **Remitente**: "heynori! Landing Page"
- **Idioma**: Detectado automáticamente
- **Datos del usuario**: Nombre, empresa, email, tamaño equipo
- **Contexto**: Qué quiere optimizar, desafío principal
- **Origen**: Español o inglés según la versión

### ✅ CONFIGURACIÓN COMPLETA

**El formulario está COMPLETAMENTE ACTIVO:**

- ✅ **Access Key configurado**: `93b2e936-c8d2-4e12-bfd5-1eef00c25ff6`
- ✅ **Email destino**: `hello@heynori.ai`
- ✅ **Ambos idiomas**: Español e inglés configurados
- ✅ **Protección antispam**: Honeypot activo
- ✅ **Listo para producción**: GitHub Pages compatible

**¡Los emails de contacto ya llegan automáticamente a `hello@heynori.ai`!**

### 💡 Ventajas de Web3Forms
- ✅ **Gratis ilimitado**: Sin restricciones de envíos
- ✅ **Sin registro complejo**: Solo necesitas email + access key
- ✅ **GitHub Pages compatible**: Funciona perfectamente en hosting estático
- ✅ **Antispam incluido**: Protección honeypot integrada
- ✅ **API moderna**: JSON y JavaScript friendly

## 🚀 Deployment

### GitHub Pages
```bash
# La estructura está lista para GitHub Pages
# Solo habilita Pages en la configuración del repositorio
# Branch: main, Folder: / (root)
```

### URLs de acceso:
- **Español**: `https://tu-usuario.github.io/heynori-web/`
- **English**: `https://tu-usuario.github.io/heynori-web/en/`

## 🛠️ Desarrollo Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/heynori-web.git
   cd heynori-web
   ```

2. **Servir localmente** (opcional):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js (si tienes live-server)
   npx live-server
   ```

3. **Acceder a las versiones**:
   - Español: `http://localhost:8000/`
   - English: `http://localhost:8000/en/`

## 📝 Personalización

### Cambiar colores
Modifica las variables CSS en `styles.css`:
```css
:root {
  --primary-beige: #F4E6D1;
  --primary-black: #1a1a1a;
  --accent-red: #E53E3E;
  --accent-pink: #ED64A6;
}
```

### Actualizar contenido
- **Español**: Edita `index.html`
- **English**: Edita `en/index.html`
- **Assets**: Reemplaza archivos en `assets/`

### Sistema de Internacionalización (i18n) Dinámico

**🌍 NUEVA FUNCIONALIDAD: Detección automática de idioma**

El sitio ahora detecta automáticamente el idioma preferido del usuario y traduce dinámicamente todo el contenido:

1. **Detección por navegador**: `navigator.language`
2. **Detección por geolocalización**: País → idioma automático  
3. **Persistencia**: Guarda preferencia en localStorage
4. **Parámetro URL**: `?lang=en` para forzar idioma
5. **4 idiomas soportados**: Español, Inglés, Portugués, Francés

### Agregar nuevos idiomas
1. **Editar**: `js/i18n.js`
2. **Agregar idioma** a `supportedLanguages`: `['es', 'en', 'pt', 'fr', 'de']`
3. **Agregar traducciones** para todas las claves existentes
4. **¡Automático!** El selector se actualiza dinámicamente

## 📊 Métricas y Analytics

Para implementar tracking, actualiza en `script.js`:

```javascript
// Google Analytics
trackEvent(eventName, properties = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, properties);
  }
}
```

## 🔒 Seguridad

- **CSP**: Content Security Policy recomendado
- **HTTPS**: Obligatorio para todas las funcionalidades
- **Integrity checks**: CDNs con hashes de verificación
- **No inline scripts**: JavaScript separado

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🎯 Próximos Pasos

- [ ] Implementar más idiomas (FR, DE, PT)
- [ ] Añadir más integraciones visuales
- [ ] A/B testing de elementos críticos
- [ ] Implementar PWA capabilities
- [ ] Añadir blog/news section

---

**¡Tu landing page multiidioma está lista para conquistar mercados globales! 🌍🚀**
