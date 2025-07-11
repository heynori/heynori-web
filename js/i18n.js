// Sistema de Internacionalización (i18n) para heynori!
// Detección automática de idioma y traducción dinámica

class I18nSystem {
  constructor() {
    this.currentLanguage = 'es'; // Idioma por defecto
    this.supportedLanguages = ['es', 'en'];
    this.translations = {};
    this.isInitialized = false;
    
    // Cargar traducciones
    this.loadTranslations();
    
    // Detectar y aplicar idioma automáticamente
    this.detectAndApplyLanguage();
  }

  // Detectar idioma del usuario automáticamente
  detectAndApplyLanguage() {
    let detectedLanguage = this.detectUserLanguage();
    
    // Si no se detecta un idioma soportado, usar español
    if (!this.supportedLanguages.includes(detectedLanguage)) {
      detectedLanguage = 'es';
    }
    
    this.setLanguage(detectedLanguage);
    console.log(`🌐 Idioma detectado automáticamente: ${detectedLanguage}`);
  }

  // Detectar idioma preferido del usuario
  detectUserLanguage() {
    // 1. Comprobar parámetro URL (?lang=en)
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && this.supportedLanguages.includes(urlLang)) {
      return urlLang;
    }

    // 2. Comprobar localStorage (preferencia guardada)
    const savedLang = localStorage.getItem('heynori_language');
    if (savedLang && this.supportedLanguages.includes(savedLang)) {
      return savedLang;
    }

    // 3. Detectar por navegador
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    if (this.supportedLanguages.includes(langCode)) {
      return langCode;
    }

    // 4. Detectar por geolocalización (opcional)
    this.detectByGeolocation();

    // 5. Fallback a inglés
    return 'en';
  }

  // Detección por geolocalización (opcional y asíncrona)
  async detectByGeolocation() {
    try {
      // Usar API gratuita para detectar país por IP
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      const countryToLanguage = {
        'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es', 'CL': 'es', 'PE': 'es',
        'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en', 'IE': 'en',
        'BR': 'pt', 'PT': 'pt',
        'FR': 'fr', 'BE': 'fr', 'CH': 'fr'
      };
      
      const detectedLang = countryToLanguage[data.country_code];
      if (detectedLang && detectedLang !== this.currentLanguage) {
        this.setLanguage(detectedLang);
        console.log(`🌍 Idioma detectado por ubicación: ${detectedLang} (${data.country_name})`);
      }
    } catch (error) {
      console.log('No se pudo detectar ubicación:', error);
    }
  }

  // Definir todas las traducciones
  loadTranslations() {
    this.translations = {
      // Navegación
      'nav.como-funciona': {
        'es': 'Cómo Funciona',
        'en': 'How It Works'
      },
      'nav.beneficios': {
        'es': 'Beneficios',
        'en': 'Benefits'
      },
      'nav.integraciones': {
        'es': 'Integraciones',
        'en': 'Integrations'
      },
      'nav.contacto': {
        'es': 'Contacto',
        'en': 'Contact'
      },
      'nav.solicitar-acceso': {
        'es': 'Solicitar Acceso',
        'en': 'Request Access'
      },

      // Hero Section
      'hero.title': {
        'es': 'IA que realmente entiende',
        'en': 'AI that truly understands'
      },
      'hero.subtitle': {
        'es': 'cómo trabaja tu equipo',
        'en': 'how your team works'
      },
      'hero.description': {
        'es': 'Nori conecta automáticamente todas tus herramientas de trabajo para eliminar tareas repetitivas, acelerar proyectos y optimizar la productividad de manera inteligente.',
        'en': 'Nori automatically connects all your work tools to eliminate repetitive tasks, accelerate projects, and intelligently optimize productivity.'
      },
      'hero.btn-solicitar': {
        'es': 'Solicitar Demo Gratuita',
        'en': 'Request Free Demo'
      },
      'hero.btn-demo': {
        'es': 'Ver Demo en Vivo',
        'en': 'Watch Live Demo'
      },
      'hero.note': {
        'es': 'Acceso anticipado limitado • Sin tarjeta de crédito',
        'en': 'Limited early access • No credit card required'
      },

      // Formulario
      'form.nombre': {
        'es': 'Nombre completo',
        'en': 'Full name'
      },
      'form.email': {
        'es': 'Email corporativo',
        'en': 'Corporate email'
      },
      'form.empresa': {
        'es': 'Empresa',
        'en': 'Company'
      },
      'form.industry': {
        'es': 'Industria',
        'en': 'Industry'
      },
      'form.toolCategories': {
        'es': 'Categorías de herramientas a integrar',
        'en': 'Tool categories to integrate'
      },
      'form.toolCategories.project_management': {
        'es': 'Gestión de Proyectos',
        'en': 'Project Management'
      },
      'form.toolCategories.communication': {
        'es': 'Comunicación',
        'en': 'Communication'
      },
      'form.toolCategories.development': {
        'es': 'Desarrollo',
        'en': 'Development'
      },
      'form.toolCategories.documentation': {
        'es': 'Documentación',
        'en': 'Documentation'
      },
      'form.toolCategories.crm': {
        'es': 'CRM y Ventas',
        'en': 'CRM & Sales'
      },
      'form.toolCategories.marketing': {
        'es': 'Marketing',
        'en': 'Marketing'
      },
      'form.toolCategories.design': {
        'es': 'Diseño y Producto',
        'en': 'Design & Product'
      },
      'form.toolCategories.analytics': {
        'es': 'Analytics',
        'en': 'Analytics'
      },
      'form.toolCategories.other': {
        'es': 'Otras categorías',
        'en': 'Other categories'
      },
      'form.toolCategories.help': {
        'es': 'Selecciona las categorías de herramientas que te gustaría conectar entre sí',
        'en': 'Select the tool categories you would like to connect with each other'
      },
      'form.submit': {
        'es': 'Solicitar Demo Personalizada',
        'en': 'Request Personalized Demo'
      },
      'form.team-size': {
        'es': 'Tamaño del equipo',
        'en': 'Team size'
      },
      'form.select-placeholder': {
        'es': 'Seleccionar...',
        'en': 'Select...'
      },
      'form.team-size.1-10': {
        'es': '1-10 personas',
        'en': '1-10 people'
      },
      'form.team-size.11-50': {
        'es': '11-50 personas',
        'en': '11-50 people'
      },
      'form.team-size.51-200': {
        'es': '51-200 personas',
        'en': '51-200 people'
      },
      'form.team-size.201-500': {
        'es': '201-500 personas',
        'en': '201-500 people'
      },
      'form.team-size.500+': {
        'es': 'Más de 500 personas',
        'en': 'More than 500 people'
      },
      'form.use-case': {
        'es': '¿Qué quieres optimizar?',
        'en': 'What do you want to optimize?'
      },
      'form.use-case.development': {
        'es': 'Desarrollo de software',
        'en': 'Software development'
      },
      'form.use-case.sales': {
        'es': 'Procesos de ventas',
        'en': 'Sales processes'
      },
      'form.use-case.marketing': {
        'es': 'Campañas de marketing',
        'en': 'Marketing campaigns'
      },
      'form.use-case.operations': {
        'es': 'Operaciones generales',
        'en': 'General operations'
      },
      'form.use-case.support': {
        'es': 'Atención al cliente',
        'en': 'Customer support'
      },
      'form.use-case.other': {
        'es': 'Otro',
        'en': 'Other'
      },
      'form.message': {
        'es': 'Cuéntanos tu principal desafío',
        'en': 'Tell us your main challenge'
      },
      'form.message.placeholder': {
        'es': 'Ej: Perdemos mucho tiempo sincronizando datos entre Slack y Jira...',
        'en': 'Ex: We waste a lot of time syncing data between Slack and Jira...'
      },
      'form.message.help': {
        'es': 'Opcional - nos ayuda a preparar una demo más relevante',
        'en': 'Optional - helps us prepare a more relevant demo'
      },
      'form.newsletter': {
        'es': 'Quiero recibir actualizaciones sobre nuevas integraciones y funcionalidades',
        'en': 'I want to receive updates about new integrations and features'
      },
      'form.privacy.text1': {
        'es': 'Acepto la',
        'en': 'I accept the'
      },
      'form.privacy.text2': {
        'es': 'y el procesamiento de mis datos',
        'en': 'and data processing'
      },
      'form.privacy.link': {
        'es': 'política de privacidad',
        'en': 'privacy policy'
      },
      'form.note': {
        'es': 'Te contactaremos en menos de 24 horas',
        'en': 'We\'ll contact you within 24 hours'
      },
      'form.loading': {
        'es': 'Enviando...',
        'en': 'Sending...'
      },

      // Validaciones
      'validation.required': {
        'es': 'Este campo es obligatorio',
        'en': 'This field is required'
      },
      'validation.email': {
        'es': 'Por favor ingresa un email válido',
        'en': 'Please enter a valid email'
      },
      'validation.corporate-email': {
        'es': 'Por favor usa tu email corporativo',
        'en': 'Please use your corporate email'
      },

      // Modales
      'modal.demo.title': {
        'es': 'Ver Demo en Vivo',
        'en': 'Live Demo'
      },
      'modal.demo.description': {
        'es': 'Descubre cómo Nori puede transformar tu productividad en solo 15 minutos',
        'en': 'Discover how Nori can transform your productivity in just 15 minutes'
      },
      'modal.demo.coming-soon': {
        'es': 'Demo interactivo próximamente',
        'en': 'Interactive demo coming soon'
      },
      'modal.demo.btn-request': {
        'es': 'Solicitar Demo Personalizada',
        'en': 'Request Personalized Demo'
      },
      'modal.success.title': {
        'es': '¡Solicitud Enviada!',
        'en': 'Request Sent!'
      },
      'modal.success.description': {
        'es': 'Gracias por tu interés en heynori!',
        'en': 'Thank you for your interest in heynori!'
      },
      'modal.success.contact-24h': {
        'es': 'Te contactaremos en 24 horas',
        'en': 'We\'ll contact you within 24 hours'
      },
      'modal.success.contact-desc': {
        'es': 'Nuestro equipo revisará tu información y te contactará pronto',
        'en': 'Our team will review your information and contact you soon'
      },
      'modal.success.demo-ready': {
        'es': 'Demo personalizada lista',
        'en': 'Personalized demo ready'
      },
      'modal.success.demo-desc': {
        'es': 'Prepararemos una demo específica para tu caso de uso',
        'en': 'We\'ll prepare a demo specific to your use case'
      },
      'modal.success.setup-24h': {
        'es': 'Setup en 24 horas',
        'en': '24-hour setup'
      },
      'modal.success.setup-desc': {
        'es': 'Si decides continuar, tendrás Nori funcionando al día siguiente',
        'en': 'If you decide to continue, you\'ll have Nori running the next day'
      },

      // Hero tagline
      'hero.tagline': {
        'es': 'Tu vida. Tu trabajo. Tu ritmo. Potenciado.',
        'en': 'Your life. Your work. Your rhythm. Enhanced.'
      },

      // Problems Section
      'problems.title': {
        'es': '¿Te suena familiar?',
        'en': 'Sound familiar?'
      },
      'problems.time-lost.title': {
        'es': 'Tiempo perdido',
        'en': 'Time wasted'
      },
      'problems.time-lost.desc': {
        'es': 'Tu equipo pierde horas cada semana cambiando entre aplicaciones y copiando información manualmente',
        'en': 'Your team wastes hours every week switching between applications and copying information manually'
      },
      'problems.visibility.title': {
        'es': 'Falta de visibilidad',
        'en': 'Lack of visibility'
      },
      'problems.visibility.desc': {
        'es': 'Los proyectos se retrasan porque nadie tiene una vista completa del progreso real',
        'en': 'Projects get delayed because no one has a complete view of real progress'
      },
      'problems.talent.title': {
        'es': 'Talento frustrado',
        'en': 'Frustrated talent'
      },
      'problems.talent.desc': {
        'es': 'Tus mejores profesionales se agotan con tareas repetitivas que una máquina podría hacer',
        'en': 'Your best professionals burn out on repetitive tasks that a machine could do'
      },
      'problems.decisions.title': {
        'es': 'Decisiones a ciegas',
        'en': 'Blind decisions'
      },
      'problems.decisions.desc': {
        'es': 'No tienes datos confiables para tomar decisiones estratégicas sobre productividad',
        'en': 'You don\'t have reliable data to make strategic decisions about productivity'
      },

      // Solution Section
      'solution.title': {
        'es': 'Nori es diferente',
        'en': 'Nori is different'
      },
      'solution.subtitle': {
        'es': 'La primera IA que realmente entiende cómo trabaja tu equipo',
        'en': 'The first AI that truly understands how your team works'
      },
      'solution.connectivity.title': {
        'es': 'Conectividad Sin Límites',
        'en': 'Limitless Connectivity'
      },
      'solution.connectivity.desc': {
        'es': 'Integra todas tus herramientas en minutos, no meses. APIs nativas y conectores personalizados para sincronización bidireccional en tiempo real.',
        'en': 'Integrate all your tools in minutes, not months. Native APIs and custom connectors for real-time bidirectional synchronization.'
      },
      'solution.connectivity.setup': {
        'es': 'Setup instantáneo',
        'en': 'Instant setup'
      },
      'solution.connectivity.friction': {
        'es': 'Zero fricción para tu equipo',
        'en': 'Zero friction for your team'
      },
      'solution.connectivity.tools': {
        'es': 'Mantén las herramientas que amas',
        'en': 'Keep the tools you love'
      },
      'solution.ai.title': {
        'es': 'IA que Aprende Tu Contexto',
        'en': 'AI that Learns Your Context'
      },
      'solution.ai.desc': {
        'es': 'Mapea automáticamente tus procesos únicos, predice bloqueos antes de que ocurran y sugiere optimizaciones basadas en los patrones de tu equipo.',
        'en': 'Automatically maps your unique processes, predicts blocks before they occur and suggests optimizations based on your team\'s patterns.'
      },
      'solution.ai.learning': {
        'es': 'Aprendizaje continuo',
        'en': 'Continuous learning'
      },
      'solution.ai.predictions': {
        'es': 'Predicciones inteligentes',
        'en': 'Intelligent predictions'
      },
      'solution.ai.optimization': {
        'es': 'Optimización automática',
        'en': 'Automatic optimization'
      },
      'solution.automation.title': {
        'es': 'Automatización Inteligente',
        'en': 'Intelligent Automation'
      },
      'solution.automation.desc': {
        'es': 'Elimina la mayoría de tareas manuales entre apps, actualiza estados de proyectos automáticamente y genera reportes ejecutivos al instante.',
        'en': 'Eliminates most manual tasks between apps, automatically updates project statuses and generates executive reports instantly.'
      },
      'solution.automation.workflows': {
        'es': 'Workflows automáticos',
        'en': 'Automatic workflows'
      },
      'solution.automation.reports': {
        'es': 'Reportes instantáneos',
        'en': 'Instant reports'
      },
      'solution.automation.alerts': {
        'es': 'Alertas proactivas',
        'en': 'Proactive alerts'
      },
      'solution.insights.title': {
        'es': 'Insights para Líderes',
        'en': 'Insights for Leaders'
      },
      'solution.insights.desc': {
        'es': 'Dashboards ejecutivos con métricas de productividad real, identificación de cuellos de botella y benchmarking con equipos de alto rendimiento.',
        'en': 'Executive dashboards with real productivity metrics, bottleneck identification and benchmarking with high-performance teams.'
      },
      'solution.insights.metrics': {
        'es': 'Métricas accionables',
        'en': 'Actionable metrics'
      },
      'solution.insights.roi': {
        'es': 'ROI medible',
        'en': 'Measurable ROI'
      },
      'solution.insights.continuous': {
        'es': 'Optimización continua',
        'en': 'Continuous optimization'
      },

      // Benefits Section
      'benefits.title': {
        'es': 'Para equipos que valoran su tiempo',
        'en': 'For teams that value their time'
      },
      'benefits.create.title': {
        'es': 'Más tiempo para crear',
        'en': 'More time to create'
      },
      'benefits.create.desc': {
        'es': 'Tu equipo se enfoca en trabajo estratégico, no en copiar y pegar entre herramientas',
        'en': 'Your team focuses on strategic work, not copying and pasting between tools'
      },
      'benefits.flow.title': {
        'es': 'Proyectos que fluyen',
        'en': 'Projects that flow'
      },
      'benefits.flow.desc': {
        'es': 'Sincronización automática mantiene a todos alineados sin reuniones innecesarias',
        'en': 'Automatic synchronization keeps everyone aligned without unnecessary meetings'
      },
      'benefits.decisions.title': {
        'es': 'Decisiones más inteligentes',
        'en': 'Smarter decisions'
      },
      'benefits.decisions.desc': {
        'es': 'Datos en tiempo real para optimizar procesos y anticipar problemas',
        'en': 'Real-time data to optimize processes and anticipate problems'
      },
      'benefits.scalability.title': {
        'es': 'Escalabilidad sin estrés',
        'en': 'Scalability without stress'
      },
      'benefits.scalability.desc': {
        'es': 'Crece tu equipo sin multiplicar la complejidad de tus procesos',
        'en': 'Grow your team without multiplying the complexity of your processes'
      },
      'benefits.workflow.step1': {
        'es': 'Detecta patrones',
        'en': 'Detects patterns'
      },
      'benefits.workflow.step2': {
        'es': 'Automatiza flujos',
        'en': 'Automates flows'
      },
      'benefits.workflow.step3': {
        'es': 'Optimiza continuamente',
        'en': 'Continuously optimizes'
      },

      // Integrations Section
      'integrations.title': {
        'es': 'Se conecta con las herramientas que ya usas',
        'en': 'Connects with the tools you already use'
      },
      'integrations.subtitle': {
        'es': 'No cambies tu stack, mejóralo',
        'en': 'Don\'t change your stack, improve it'
      },
      'integrations.communication': {
        'es': 'Comunicación',
        'en': 'Communication'
      },
      'integrations.project-management': {
        'es': 'Gestión de Proyectos',
        'en': 'Project Management'
      },
      'integrations.development': {
        'es': 'Desarrollo',
        'en': 'Development'
      },
      'integrations.crm-sales': {
        'es': 'CRM & Ventas',
        'en': 'CRM & Sales'
      },
      'integrations.note': {
        'es': '+ Más de 100 integraciones adicionales',
        'en': '+ More than 100 additional integrations'
      },

      // CTA Section
      'cta.title': {
        'es': 'Únete al futuro del trabajo',
        'en': 'Join the future of work'
      },
      'cta.subtitle': {
        'es': 'Acceso anticipado limitado para equipos que quieren ser pioneros en productividad inteligente',
        'en': 'Limited early access for teams that want to be pioneers in intelligent productivity'
      },
      'cta.btn-access': {
        'es': 'Solicitar Acceso Anticipado',
        'en': 'Request Early Access'
      },
      'cta.btn-call': {
        'es': 'Agendar Llamada',
        'en': 'Schedule Call'
      },
      'cta.feature.setup': {
        'es': 'Setup personalizado incluido',
        'en': 'Personalized setup included'
      },
      'cta.feature.support': {
        'es': 'Soporte dedicado',
        'en': 'Dedicated support'
      },
      'cta.feature.roadmap': {
        'es': 'Influencia en roadmap',
        'en': 'Roadmap influence'
      },

      // Contact Section
      'contact.title': {
        'es': '¿Listo para transformar tu productividad?',
        'en': 'Ready to transform your productivity?'
      },
      'contact.subtitle': {
        'es': 'Cuéntanos sobre tu equipo y te mostraremos cómo Nori puede revolucionar tu flujo de trabajo en menos de 30 días.',
        'en': 'Tell us about your team and we\'ll show you how Nori can revolutionize your workflow in less than 30 days.'
      },
      'contact.feature.setup.title': {
        'es': 'Setup en 24 horas',
        'en': '24-hour setup'
      },
      'contact.feature.setup.desc': {
        'es': 'Implementación express sin interrumpir tu trabajo',
        'en': 'Express implementation without interrupting your work'
      },
      'contact.feature.security.title': {
        'es': 'Seguridad enterprise',
        'en': 'Enterprise security'
      },
      'contact.feature.security.desc': {
        'es': 'SOC2, GDPR compliance y encriptación end-to-end',
        'en': 'SOC2, GDPR compliance and end-to-end encryption'
      },
      'contact.feature.support247.title': {
        'es': 'Soporte 24/7',
        'en': '24/7 Support'
      },
      'contact.feature.support247.desc': {
        'es': 'Equipo dedicado para resolver cualquier duda',
        'en': 'Dedicated team to resolve any questions'
      },

      // Footer
      'footer.product': {
        'es': 'Producto',
        'en': 'Product'
      },
      'footer.how-it-works': {
        'es': 'Cómo Funciona',
        'en': 'How It Works'
      },
      'footer.integrations': {
        'es': 'Integraciones',
        'en': 'Integrations'
      },
      'footer.security': {
        'es': 'Seguridad',
        'en': 'Security'
      },
      'footer.roadmap': {
        'es': 'Roadmap',
        'en': 'Roadmap'
      },
      'footer.company': {
        'es': 'Empresa',
        'en': 'Company'
      },
      'footer.about-us': {
        'es': 'Sobre Nosotros',
        'en': 'About Us'
      },
      'footer.careers': {
        'es': 'Carreras',
        'en': 'Careers'
      },
      'footer.blog': {
        'es': 'Blog',
        'en': 'Blog'
      },
      'footer.press': {
        'es': 'Prensa',
        'en': 'Press'
      },
      'footer.support': {
        'es': 'Soporte',
        'en': 'Support'
      },
      'footer.help-center': {
        'es': 'Centro de Ayuda',
        'en': 'Help Center'
      },
      'footer.documentation': {
        'es': 'Documentación',
        'en': 'Documentation'
      },
      'footer.status': {
        'es': 'Status',
        'en': 'Status'
      },
      'footer.contact': {
        'es': 'Contacto',
        'en': 'Contact'
      },
      'footer.copyright': {
        'es': '© 2024 heynori! Todos los derechos reservados.',
        'en': '© 2024 heynori! All rights reserved.'
      },
      'footer.privacy': {
        'es': 'Privacidad',
        'en': 'Privacy'
      },
      'footer.terms': {
        'es': 'Términos',
        'en': 'Terms'
      },
      'footer.cookies': {
        'es': 'Cookies',
        'en': 'Cookies'
      },

      // Easter eggs
      'easter.rainbow-activated': {
        'es': '🌈 ¡Modo arcoíris activado! 🦄',
        'en': '🌈 Rainbow mode activated! 🦄'
      },
      'easter.rainbow-disabled': {
        'es': 'Modo arcoíris desactivado',
        'en': 'Rainbow mode disabled'
      },
      // Herramientas
      'form.tools': {
        'es': 'Herramientas',
        'en': 'Tools'
      },
      'form.tools.project': {
        'es': 'Gestión de Proyectos',
        'en': 'Project Management'
      },
      'form.tools.communication': {
        'es': 'Comunicación',
        'en': 'Communication'
      },
      'form.tools.development': {
        'es': 'Desarrollo',
        'en': 'Development'
      },
      'form.tools.documentation': {
        'es': 'Documentación',
        'en': 'Documentation'
      },
      'form.tools.crm': {
        'es': 'CRM y Ventas',
        'en': 'CRM & Sales'
      },
      'form.tools.marketing': {
        'es': 'Marketing',
        'en': 'Marketing'
      },
      'form.tools.design': {
        'es': 'Diseño y Producto',
        'en': 'Design & Product'
      },
      'form.tools.analytics': {
        'es': 'Analítica',
        'en': 'Analytics'
      },
      'form.tools.other': {
        'es': 'Otras herramientas',
        'en': 'Other tools'
      },
      'form.message': {
        'es': 'Cuéntanos tu problema',
        'en': 'Tell us your main challenge'
      },
      'form.submit': {
        'es': 'Solicitar Demo Personalizada',
        'en': 'Request Personalized Demo'
      }
    };
  }

  // Cambiar idioma
  setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Idioma no soportado: ${lang}`);
      return;
    }

    this.currentLanguage = lang;
    
    // Guardar preferencia
    localStorage.setItem('heynori_language', lang);
    
    // Actualizar HTML lang attribute
    document.documentElement.lang = lang;
    
    // Aplicar traducciones
    this.applyTranslations();
    
    // Actualizar botones de idioma
    this.updateLanguageButtons();
    
    // Disparar evento custom
    document.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: lang } 
    }));
  }

  // Aplicar traducciones a toda la página
  applyTranslations() {
    // Buscar todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      const translation = this.translate(key);
      
      if (translation) {
        if (element.tagName === 'INPUT' && element.type !== 'submit') {
          element.placeholder = translation;
        } else if (element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      }
    });

    // Actualizar meta tags para SEO
    this.updateMetaTags();
  }

  // Obtener traducción
  translate(key) {
    return this.translations[key]?.[this.currentLanguage] || key;
  }

  // Crear selector de idiomas dinámico
  createLanguageSelector() {
    const selector = document.createElement('div');
    selector.className = 'language-selector';
    selector.innerHTML = `
      <button class="lang-btn" data-lang="es" title="Español">ES</button>
      <button class="lang-btn" data-lang="en" title="English">EN</button>
    `;

    // Event listeners
    selector.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.dataset.lang);
      });
    });

    // Marcar el botón activo inicialmente
    const activeBtn = selector.querySelector(`[data-lang="${this.currentLanguage}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    return selector;
  }

  // Actualizar botones de idioma activos
  updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
    });
  }

  // Actualizar meta tags para SEO
  updateMetaTags() {
    const titles = {
      'es': 'heynori! - IA que realmente entiende cómo trabajas',
      'en': 'heynori! - AI that truly understands how you work',
    };

    const descriptions = {
      'es': 'Nori conecta todas tus herramientas de trabajo para eliminar tareas repetitivas y multiplicar la productividad de tu equipo.',
      'en': 'Nori connects all your work tools to eliminate repetitive tasks and multiply your team\'s productivity.',
    };

    document.title = titles[this.currentLanguage];
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = descriptions[this.currentLanguage];
    }
  }

  // Obtener idioma actual
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  // Comprobar si es un idioma específico
  isLanguage(lang) {
    return this.currentLanguage === lang;
  }
}

// Exportar como singleton
window.i18n = new I18nSystem();

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // El sistema ya se inicializa en el constructor
  console.log('🌐 Sistema i18n inicializado');
}); 