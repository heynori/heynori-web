// Sistema de Internacionalización (i18n) para heynori!
// Detección automática de idioma y traducción dinámica

class I18nSystem {
  constructor() {
    this.currentLanguage = 'en'; // Idioma por defecto
    this.supportedLanguages = ['es', 'en', 'pt', 'fr'];
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
    
    // Si no se detecta un idioma soportado, usar inglés
    if (!this.supportedLanguages.includes(detectedLanguage)) {
      detectedLanguage = 'en';
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
        'en': 'How It Works', 
        'pt': 'Como Funciona',
        'fr': 'Comment Ça Marche'
      },
      'nav.beneficios': {
        'es': 'Beneficios',
        'en': 'Benefits',
        'pt': 'Benefícios', 
        'fr': 'Avantages'
      },
      'nav.integraciones': {
        'es': 'Integraciones',
        'en': 'Integrations',
        'pt': 'Integrações',
        'fr': 'Intégrations'
      },
      'nav.contacto': {
        'es': 'Contacto',
        'en': 'Contact',
        'pt': 'Contato',
        'fr': 'Contact'
      },
      'nav.solicitar-acceso': {
        'es': 'Solicitar Acceso',
        'en': 'Request Access',
        'pt': 'Solicitar Acesso',
        'fr': 'Demander l\'Accès'
      },

      // Hero Section
      'hero.title': {
        'es': 'IA que realmente entiende',
        'en': 'AI that truly understands',
        'pt': 'IA que realmente entende',
        'fr': 'IA qui comprend vraiment'
      },
      'hero.subtitle': {
        'es': 'cómo trabaja tu equipo',
        'en': 'how your team works',
        'pt': 'como sua equipe trabalha',
        'fr': 'comment votre équipe travaille'
      },
      'hero.description': {
        'es': 'Nori conecta automáticamente todas tus herramientas de trabajo para eliminar tareas repetitivas, acelerar proyectos y optimizar la productividad de manera inteligente.',
        'en': 'Nori automatically connects all your work tools to eliminate repetitive tasks, accelerate projects, and intelligently optimize productivity.',
        'pt': 'Nori conecta automaticamente todas as suas ferramentas de trabalho para eliminar tarefas repetitivas, acelerar projetos e otimizar a produtividade de forma inteligente.',
        'fr': 'Nori connecte automatiquement tous vos outils de travail pour éliminer les tâches répétitives, accélérer les projets et optimiser intelligemment la productivité.'
      },
      'hero.btn-solicitar': {
        'es': 'Solicitar Demo Gratuita',
        'en': 'Request Free Demo',
        'pt': 'Solicitar Demo Gratuita',
        'fr': 'Demander une Démo Gratuite'
      },
      'hero.btn-demo': {
        'es': 'Ver Demo en Vivo',
        'en': 'Watch Live Demo',
        'pt': 'Ver Demo ao Vivo',
        'fr': 'Voir la Démo en Direct'
      },
      'hero.note': {
        'es': 'Acceso anticipado limitado • Sin tarjeta de crédito',
        'en': 'Limited early access • No credit card required',
        'pt': 'Acesso antecipado limitado • Sem cartão de crédito',
        'fr': 'Accès anticipé limité • Aucune carte de crédit requise'
      },

      // Formulario
      'form.nombre': {
        'es': 'Nombre completo',
        'en': 'Full name',
        'pt': 'Nome completo',
        'fr': 'Nom complet'
      },
      'form.email': {
        'es': 'Email corporativo',
        'en': 'Corporate email',
        'pt': 'Email corporativo',
        'fr': 'Email corporatif'
      },
      'form.empresa': {
        'es': 'Empresa',
        'en': 'Company',
        'pt': 'Empresa',
        'fr': 'Entreprise'
      },
      'form.submit': {
        'es': 'Solicitar Demo Personalizada',
        'en': 'Request Personalized Demo',
        'pt': 'Solicitar Demo Personalizada',
        'fr': 'Demander une Démo Personnalisée'
      },
      'form.team-size': {
        'es': 'Tamaño del equipo',
        'en': 'Team size',
        'pt': 'Tamanho da equipe',
        'fr': 'Taille de l\'équipe'
      },
      'form.select-placeholder': {
        'es': 'Seleccionar...',
        'en': 'Select...',
        'pt': 'Selecionar...',
        'fr': 'Sélectionner...'
      },
      'form.team-size.1-10': {
        'es': '1-10 personas',
        'en': '1-10 people',
        'pt': '1-10 pessoas',
        'fr': '1-10 personnes'
      },
      'form.team-size.11-50': {
        'es': '11-50 personas',
        'en': '11-50 people',
        'pt': '11-50 pessoas',
        'fr': '11-50 personnes'
      },
      'form.team-size.51-200': {
        'es': '51-200 personas',
        'en': '51-200 people',
        'pt': '51-200 pessoas',
        'fr': '51-200 personnes'
      },
      'form.team-size.201-500': {
        'es': '201-500 personas',
        'en': '201-500 people',
        'pt': '201-500 pessoas',
        'fr': '201-500 personnes'
      },
      'form.team-size.500+': {
        'es': 'Más de 500 personas',
        'en': 'More than 500 people',
        'pt': 'Mais de 500 pessoas',
        'fr': 'Plus de 500 personnes'
      },
      'form.use-case': {
        'es': '¿Qué quieres optimizar?',
        'en': 'What do you want to optimize?',
        'pt': 'O que você quer otimizar?',
        'fr': 'Que voulez-vous optimiser?'
      },
      'form.use-case.development': {
        'es': 'Desarrollo de software',
        'en': 'Software development',
        'pt': 'Desenvolvimento de software',
        'fr': 'Développement logiciel'
      },
      'form.use-case.sales': {
        'es': 'Procesos de ventas',
        'en': 'Sales processes',
        'pt': 'Processos de vendas',
        'fr': 'Processus de vente'
      },
      'form.use-case.marketing': {
        'es': 'Campañas de marketing',
        'en': 'Marketing campaigns',
        'pt': 'Campanhas de marketing',
        'fr': 'Campagnes marketing'
      },
      'form.use-case.operations': {
        'es': 'Operaciones generales',
        'en': 'General operations',
        'pt': 'Operações gerais',
        'fr': 'Opérations générales'
      },
      'form.use-case.support': {
        'es': 'Atención al cliente',
        'en': 'Customer support',
        'pt': 'Atendimento ao cliente',
        'fr': 'Support client'
      },
      'form.use-case.other': {
        'es': 'Otro',
        'en': 'Other',
        'pt': 'Outro',
        'fr': 'Autre'
      },
      'form.message': {
        'es': 'Cuéntanos tu principal desafío',
        'en': 'Tell us your main challenge',
        'pt': 'Conte-nos seu principal desafio',
        'fr': 'Parlez-nous de votre principal défi'
      },
      'form.message.placeholder': {
        'es': 'Ej: Perdemos mucho tiempo sincronizando datos entre Slack y Jira...',
        'en': 'Ex: We waste a lot of time syncing data between Slack and Jira...',
        'pt': 'Ex: Perdemos muito tempo sincronizando dados entre Slack e Jira...',
        'fr': 'Ex: Nous perdons beaucoup de temps à synchroniser les données entre Slack et Jira...'
      },
      'form.message.help': {
        'es': 'Opcional - nos ayuda a preparar una demo más relevante',
        'en': 'Optional - helps us prepare a more relevant demo',
        'pt': 'Opcional - nos ajuda a preparar uma demo mais relevante',
        'fr': 'Optionnel - nous aide à préparer une démo plus pertinente'
      },
      'form.newsletter': {
        'es': 'Quiero recibir actualizaciones sobre nuevas integraciones y funcionalidades',
        'en': 'I want to receive updates about new integrations and features',
        'pt': 'Quero receber atualizações sobre novas integrações e funcionalidades',
        'fr': 'Je veux recevoir des mises à jour sur les nouvelles intégrations et fonctionnalités'
      },
      'form.privacy.text1': {
        'es': 'Acepto la',
        'en': 'I accept the',
        'pt': 'Aceito a',
        'fr': 'J\'accepte la'
      },
      'form.privacy.text2': {
        'es': 'y el procesamiento de mis datos',
        'en': 'and data processing',
        'pt': 'e o processamento dos meus dados',
        'fr': 'et le traitement de mes données'
      },
      'form.privacy.link': {
        'es': 'política de privacidad',
        'en': 'privacy policy',
        'pt': 'política de privacidade',
        'fr': 'politique de confidentialité'
      },
      'form.note': {
        'es': 'Te contactaremos en menos de 24 horas',
        'en': 'We\'ll contact you within 24 hours',
        'pt': 'Entraremos em contato em menos de 24 horas',
        'fr': 'Nous vous contacterons dans les 24 heures'
      },
      'form.loading': {
        'es': 'Enviando...',
        'en': 'Sending...',
        'pt': 'Enviando...',
        'fr': 'Envoi en cours...'
      },

      // Validaciones
      'validation.required': {
        'es': 'Este campo es obligatorio',
        'en': 'This field is required',
        'pt': 'Este campo é obrigatório',
        'fr': 'Ce champ est requis'
      },
      'validation.email': {
        'es': 'Por favor ingresa un email válido',
        'en': 'Please enter a valid email',
        'pt': 'Por favor, insira um email válido',
        'fr': 'Veuillez saisir un email valide'
      },
      'validation.corporate-email': {
        'es': 'Por favor usa tu email corporativo',
        'en': 'Please use your corporate email',
        'pt': 'Por favor, use seu email corporativo',
        'fr': 'Veuillez utiliser votre email corporatif'
      },

      // Modales
      'modal.demo.title': {
        'es': 'Ver Demo en Vivo',
        'en': 'Live Demo',
        'pt': 'Demo ao Vivo',
        'fr': 'Démo en Direct'
      },
      'modal.demo.description': {
        'es': 'Descubre cómo Nori puede transformar tu productividad en solo 15 minutos',
        'en': 'Discover how Nori can transform your productivity in just 15 minutes',
        'pt': 'Descubra como Nori pode transformar sua produtividade em apenas 15 minutos',
        'fr': 'Découvrez comment Nori peut transformer votre productivité en seulement 15 minutes'
      },
      'modal.demo.coming-soon': {
        'es': 'Demo interactivo próximamente',
        'en': 'Interactive demo coming soon',
        'pt': 'Demo interativo em breve',
        'fr': 'Démo interactive bientôt disponible'
      },
      'modal.demo.btn-request': {
        'es': 'Solicitar Demo Personalizada',
        'en': 'Request Personalized Demo',
        'pt': 'Solicitar Demo Personalizada',
        'fr': 'Demander une Démo Personnalisée'
      },
      'modal.success.title': {
        'es': '¡Solicitud Enviada!',
        'en': 'Request Sent!',
        'pt': 'Solicitação Enviada!',
        'fr': 'Demande Envoyée!'
      },
      'modal.success.description': {
        'es': 'Gracias por tu interés en heynori!',
        'en': 'Thank you for your interest in heynori!',
        'pt': 'Obrigado pelo seu interesse em heynori!',
        'fr': 'Merci pour votre intérêt pour heynori!'
      },
      'modal.success.contact-24h': {
        'es': 'Te contactaremos en 24 horas',
        'en': 'We\'ll contact you within 24 hours',
        'pt': 'Entraremos em contato em 24 horas',
        'fr': 'Nous vous contacterons dans les 24 heures'
      },
      'modal.success.contact-desc': {
        'es': 'Nuestro equipo revisará tu información y te contactará pronto',
        'en': 'Our team will review your information and contact you soon',
        'pt': 'Nossa equipe revisará suas informações e entrará em contato em breve',
        'fr': 'Notre équipe examinera vos informations et vous contactera bientôt'
      },
      'modal.success.demo-ready': {
        'es': 'Demo personalizada lista',
        'en': 'Personalized demo ready',
        'pt': 'Demo personalizada pronta',
        'fr': 'Démo personnalisée prête'
      },
      'modal.success.demo-desc': {
        'es': 'Prepararemos una demo específica para tu caso de uso',
        'en': 'We\'ll prepare a demo specific to your use case',
        'pt': 'Prepararemos uma demo específica para seu caso de uso',
        'fr': 'Nous préparerons une démo spécifique à votre cas d\'usage'
      },
      'modal.success.setup-24h': {
        'es': 'Setup en 24 horas',
        'en': '24-hour setup',
        'pt': 'Configuração em 24 horas',
        'fr': 'Configuration en 24 heures'
      },
      'modal.success.setup-desc': {
        'es': 'Si decides continuar, tendrás Nori funcionando al día siguiente',
        'en': 'If you decide to continue, you\'ll have Nori running the next day',
        'pt': 'Se decidir continuar, terá Nori funcionando no dia seguinte',
        'fr': 'Si vous décidez de continuer, vous aurez Nori opérationnel le lendemain'
      },

      // Hero tagline
      'hero.tagline': {
        'es': 'Tu vida. Tu trabajo. Tu ritmo. Potenciado.',
        'en': 'Your life. Your work. Your rhythm. Enhanced.',
        'pt': 'Sua vida. Seu trabalho. Seu ritmo. Potencializado.',
        'fr': 'Votre vie. Votre travail. Votre rythme. Amélioré.'
      },

      // Problems Section
      'problems.title': {
        'es': '¿Te suena familiar?',
        'en': 'Sound familiar?',
        'pt': 'Soa familiar?',
        'fr': 'Ça vous dit quelque chose?'
      },
      'problems.time-lost.title': {
        'es': 'Tiempo perdido',
        'en': 'Time wasted',
        'pt': 'Tempo perdido',
        'fr': 'Temps perdu'
      },
      'problems.time-lost.desc': {
        'es': 'Tu equipo pierde horas cada semana cambiando entre aplicaciones y copiando información manualmente',
        'en': 'Your team wastes hours every week switching between applications and copying information manually',
        'pt': 'Sua equipe perde horas toda semana mudando entre aplicações e copiando informações manualmente',
        'fr': 'Votre équipe perd des heures chaque semaine à passer d\'une application à l\'autre et à copier des informations manuellement'
      },
      'problems.visibility.title': {
        'es': 'Falta de visibilidad',
        'en': 'Lack of visibility',
        'pt': 'Falta de visibilidade',
        'fr': 'Manque de visibilité'
      },
      'problems.visibility.desc': {
        'es': 'Los proyectos se retrasan porque nadie tiene una vista completa del progreso real',
        'en': 'Projects get delayed because no one has a complete view of real progress',
        'pt': 'Projetos se atrasam porque ninguém tem uma visão completa do progresso real',
        'fr': 'Les projets prennent du retard car personne n\'a une vue complète du progrès réel'
      },
      'problems.talent.title': {
        'es': 'Talento frustrado',
        'en': 'Frustrated talent',
        'pt': 'Talento frustrado',
        'fr': 'Talent frustré'
      },
      'problems.talent.desc': {
        'es': 'Tus mejores profesionales se agotan con tareas repetitivas que una máquina podría hacer',
        'en': 'Your best professionals burn out on repetitive tasks that a machine could do',
        'pt': 'Seus melhores profissionais se esgotam com tarefas repetitivas que uma máquina poderia fazer',
        'fr': 'Vos meilleurs professionnels s\'épuisent sur des tâches répétitives qu\'une machine pourrait faire'
      },
      'problems.decisions.title': {
        'es': 'Decisiones a ciegas',
        'en': 'Blind decisions',
        'pt': 'Decisões às cegas',
        'fr': 'Décisions aveugles'
      },
      'problems.decisions.desc': {
        'es': 'No tienes datos confiables para tomar decisiones estratégicas sobre productividad',
        'en': 'You don\'t have reliable data to make strategic decisions about productivity',
        'pt': 'Você não tem dados confiáveis para tomar decisões estratégicas sobre produtividade',
        'fr': 'Vous n\'avez pas de données fiables pour prendre des décisions stratégiques sur la productivité'
      },

      // Solution Section
      'solution.title': {
        'es': 'Nori es diferente',
        'en': 'Nori is different',
        'pt': 'Nori é diferente',
        'fr': 'Nori est différent'
      },
      'solution.subtitle': {
        'es': 'La primera IA que realmente entiende cómo trabaja tu equipo',
        'en': 'The first AI that truly understands how your team works',
        'pt': 'A primeira IA que realmente entende como sua equipe trabalha',
        'fr': 'La première IA qui comprend vraiment comment votre équipe travaille'
      },
      'solution.connectivity.title': {
        'es': 'Conectividad Sin Límites',
        'en': 'Limitless Connectivity',
        'pt': 'Conectividade Sem Limites',
        'fr': 'Connectivité Sans Limites'
      },
      'solution.connectivity.desc': {
        'es': 'Integra todas tus herramientas en minutos, no meses. APIs nativas y conectores personalizados para sincronización bidireccional en tiempo real.',
        'en': 'Integrate all your tools in minutes, not months. Native APIs and custom connectors for real-time bidirectional synchronization.',
        'pt': 'Integre todas as suas ferramentas em minutos, não meses. APIs nativas e conectores personalizados para sincronização bidirecional em tempo real.',
        'fr': 'Intégrez tous vos outils en minutes, pas en mois. APIs natives et connecteurs personnalisés pour une synchronisation bidirectionnelle en temps réel.'
      },
      'solution.connectivity.setup': {
        'es': 'Setup instantáneo',
        'en': 'Instant setup',
        'pt': 'Configuração instantânea',
        'fr': 'Configuration instantanée'
      },
      'solution.connectivity.friction': {
        'es': 'Zero fricción para tu equipo',
        'en': 'Zero friction for your team',
        'pt': 'Zero atrito para sua equipe',
        'fr': 'Zéro friction pour votre équipe'
      },
      'solution.connectivity.tools': {
        'es': 'Mantén las herramientas que amas',
        'en': 'Keep the tools you love',
        'pt': 'Mantenha as ferramentas que você ama',
        'fr': 'Gardez les outils que vous aimez'
      },
      'solution.ai.title': {
        'es': 'IA que Aprende Tu Contexto',
        'en': 'AI that Learns Your Context',
        'pt': 'IA que Aprende Seu Contexto',
        'fr': 'IA qui Apprend Votre Contexte'
      },
      'solution.ai.desc': {
        'es': 'Mapea automáticamente tus procesos únicos, predice bloqueos antes de que ocurran y sugiere optimizaciones basadas en los patrones de tu equipo.',
        'en': 'Automatically maps your unique processes, predicts blocks before they occur and suggests optimizations based on your team\'s patterns.',
        'pt': 'Mapeia automaticamente seus processos únicos, prevê bloqueios antes que ocorram e sugere otimizações baseadas nos padrões da sua equipe.',
        'fr': 'Cartographie automatiquement vos processus uniques, prédit les blocages avant qu\'ils ne se produisent et suggère des optimisations basées sur les modèles de votre équipe.'
      },
      'solution.ai.learning': {
        'es': 'Aprendizaje continuo',
        'en': 'Continuous learning',
        'pt': 'Aprendizagem contínua',
        'fr': 'Apprentissage continu'
      },
      'solution.ai.predictions': {
        'es': 'Predicciones inteligentes',
        'en': 'Intelligent predictions',
        'pt': 'Previsões inteligentes',
        'fr': 'Prédictions intelligentes'
      },
      'solution.ai.optimization': {
        'es': 'Optimización automática',
        'en': 'Automatic optimization',
        'pt': 'Otimização automática',
        'fr': 'Optimisation automatique'
      },
      'solution.automation.title': {
        'es': 'Automatización Inteligente',
        'en': 'Intelligent Automation',
        'pt': 'Automação Inteligente',
        'fr': 'Automatisation Intelligente'
      },
      'solution.automation.desc': {
        'es': 'Elimina la mayoría de tareas manuales entre apps, actualiza estados de proyectos automáticamente y genera reportes ejecutivos al instante.',
        'en': 'Eliminates most manual tasks between apps, automatically updates project statuses and generates executive reports instantly.',
        'pt': 'Elimina a maioria das tarefas manuais entre apps, atualiza status de projetos automaticamente e gera relatórios executivos instantaneamente.',
        'fr': 'Élimine la plupart des tâches manuelles entre les applications, met à jour automatiquement les statuts de projet et génère des rapports exécutifs instantanément.'
      },
      'solution.automation.workflows': {
        'es': 'Workflows automáticos',
        'en': 'Automatic workflows',
        'pt': 'Fluxos de trabalho automáticos',
        'fr': 'Flux de travail automatiques'
      },
      'solution.automation.reports': {
        'es': 'Reportes instantáneos',
        'en': 'Instant reports',
        'pt': 'Relatórios instantâneos',
        'fr': 'Rapports instantanés'
      },
      'solution.automation.alerts': {
        'es': 'Alertas proactivas',
        'en': 'Proactive alerts',
        'pt': 'Alertas proativos',
        'fr': 'Alertes proactives'
      },
      'solution.insights.title': {
        'es': 'Insights para Líderes',
        'en': 'Insights for Leaders',
        'pt': 'Insights para Líderes',
        'fr': 'Insights pour Leaders'
      },
      'solution.insights.desc': {
        'es': 'Dashboards ejecutivos con métricas de productividad real, identificación de cuellos de botella y benchmarking con equipos de alto rendimiento.',
        'en': 'Executive dashboards with real productivity metrics, bottleneck identification and benchmarking with high-performance teams.',
        'pt': 'Dashboards executivos com métricas de produtividade real, identificação de gargalos e benchmarking com equipes de alto desempenho.',
        'fr': 'Tableaux de bord exécutifs avec des métriques de productivité réelles, identification des goulots d\'étranglement et benchmarking avec des équipes performantes.'
      },
      'solution.insights.metrics': {
        'es': 'Métricas accionables',
        'en': 'Actionable metrics',
        'pt': 'Métricas acionáveis',
        'fr': 'Métriques exploitables'
      },
      'solution.insights.roi': {
        'es': 'ROI medible',
        'en': 'Measurable ROI',
        'pt': 'ROI mensurável',
        'fr': 'ROI mesurable'
      },
      'solution.insights.continuous': {
        'es': 'Optimización continua',
        'en': 'Continuous optimization',
        'pt': 'Otimização contínua',
        'fr': 'Optimisation continue'
      },

      // Benefits Section
      'benefits.title': {
        'es': 'Para equipos que valoran su tiempo',
        'en': 'For teams that value their time',
        'pt': 'Para equipes que valorizam seu tempo',
        'fr': 'Pour les équipes qui valorisent leur temps'
      },
      'benefits.create.title': {
        'es': 'Más tiempo para crear',
        'en': 'More time to create',
        'pt': 'Mais tempo para criar',
        'fr': 'Plus de temps pour créer'
      },
      'benefits.create.desc': {
        'es': 'Tu equipo se enfoca en trabajo estratégico, no en copiar y pegar entre herramientas',
        'en': 'Your team focuses on strategic work, not copying and pasting between tools',
        'pt': 'Sua equipe se concentra em trabalho estratégico, não em copiar e colar entre ferramentas',
        'fr': 'Votre équipe se concentre sur le travail stratégique, pas sur copier-coller entre les outils'
      },
      'benefits.flow.title': {
        'es': 'Proyectos que fluyen',
        'en': 'Projects that flow',
        'pt': 'Projetos que fluem',
        'fr': 'Projets qui coulent'
      },
      'benefits.flow.desc': {
        'es': 'Sincronización automática mantiene a todos alineados sin reuniones innecesarias',
        'en': 'Automatic synchronization keeps everyone aligned without unnecessary meetings',
        'pt': 'Sincronização automática mantém todos alinhados sem reuniões desnecessárias',
        'fr': 'La synchronisation automatique maintient tout le monde aligné sans réunions inutiles'
      },
      'benefits.decisions.title': {
        'es': 'Decisiones más inteligentes',
        'en': 'Smarter decisions',
        'pt': 'Decisões mais inteligentes',
        'fr': 'Décisions plus intelligentes'
      },
      'benefits.decisions.desc': {
        'es': 'Datos en tiempo real para optimizar procesos y anticipar problemas',
        'en': 'Real-time data to optimize processes and anticipate problems',
        'pt': 'Dados em tempo real para otimizar processos e antecipar problemas',
        'fr': 'Données en temps réel pour optimiser les processus et anticiper les problèmes'
      },
      'benefits.scalability.title': {
        'es': 'Escalabilidad sin estrés',
        'en': 'Scalability without stress',
        'pt': 'Escalabilidade sem estresse',
        'fr': 'Évolutivité sans stress'
      },
      'benefits.scalability.desc': {
        'es': 'Crece tu equipo sin multiplicar la complejidad de tus procesos',
        'en': 'Grow your team without multiplying the complexity of your processes',
        'pt': 'Faça sua equipe crescer sem multiplicar a complexidade dos seus processos',
        'fr': 'Développez votre équipe sans multiplier la complexité de vos processus'
      },
      'benefits.workflow.step1': {
        'es': 'Detecta patrones',
        'en': 'Detects patterns',
        'pt': 'Detecta padrões',
        'fr': 'Détecte les modèles'
      },
      'benefits.workflow.step2': {
        'es': 'Automatiza flujos',
        'en': 'Automates flows',
        'pt': 'Automatiza fluxos',
        'fr': 'Automatise les flux'
      },
      'benefits.workflow.step3': {
        'es': 'Optimiza continuamente',
        'en': 'Continuously optimizes',
        'pt': 'Otimiza continuamente',
        'fr': 'Optimise en continu'
      },

      // Integrations Section
      'integrations.title': {
        'es': 'Se conecta con las herramientas que ya usas',
        'en': 'Connects with the tools you already use',
        'pt': 'Conecta com as ferramentas que você já usa',
        'fr': 'Se connecte avec les outils que vous utilisez déjà'
      },
      'integrations.subtitle': {
        'es': 'No cambies tu stack, mejóralo',
        'en': 'Don\'t change your stack, improve it',
        'pt': 'Não mude seu stack, melhore-o',
        'fr': 'Ne changez pas votre pile, améliorez-la'
      },
      'integrations.communication': {
        'es': 'Comunicación',
        'en': 'Communication',
        'pt': 'Comunicação',
        'fr': 'Communication'
      },
      'integrations.project-management': {
        'es': 'Gestión de Proyectos',
        'en': 'Project Management',
        'pt': 'Gestão de Projetos',
        'fr': 'Gestion de Projet'
      },
      'integrations.development': {
        'es': 'Desarrollo',
        'en': 'Development',
        'pt': 'Desenvolvimento',
        'fr': 'Développement'
      },
      'integrations.crm-sales': {
        'es': 'CRM & Ventas',
        'en': 'CRM & Sales',
        'pt': 'CRM & Vendas',
        'fr': 'CRM & Ventes'
      },
      'integrations.note': {
        'es': '+ Más de 100 integraciones adicionales',
        'en': '+ More than 100 additional integrations',
        'pt': '+ Mais de 100 integrações adicionais',
        'fr': '+ Plus de 100 intégrations supplémentaires'
      },

      // CTA Section
      'cta.title': {
        'es': 'Únete al futuro del trabajo',
        'en': 'Join the future of work',
        'pt': 'Junte-se ao futuro do trabalho',
        'fr': 'Rejoignez l\'avenir du travail'
      },
      'cta.subtitle': {
        'es': 'Acceso anticipado limitado para equipos que quieren ser pioneros en productividad inteligente',
        'en': 'Limited early access for teams that want to be pioneers in intelligent productivity',
        'pt': 'Acesso antecipado limitado para equipes que querem ser pioneiras em produtividade inteligente',
        'fr': 'Accès anticipé limité pour les équipes qui veulent être pionnières en productivité intelligente'
      },
      'cta.btn-access': {
        'es': 'Solicitar Acceso Anticipado',
        'en': 'Request Early Access',
        'pt': 'Solicitar Acesso Antecipado',
        'fr': 'Demander l\'Accès Anticipé'
      },
      'cta.btn-call': {
        'es': 'Agendar Llamada',
        'en': 'Schedule Call',
        'pt': 'Agendar Chamada',
        'fr': 'Programmer un Appel'
      },
      'cta.feature.setup': {
        'es': 'Setup personalizado incluido',
        'en': 'Personalized setup included',
        'pt': 'Configuração personalizada incluída',
        'fr': 'Configuration personnalisée incluse'
      },
      'cta.feature.support': {
        'es': 'Soporte dedicado',
        'en': 'Dedicated support',
        'pt': 'Suporte dedicado',
        'fr': 'Support dédié'
      },
      'cta.feature.roadmap': {
        'es': 'Influencia en roadmap',
        'en': 'Roadmap influence',
        'pt': 'Influência no roadmap',
        'fr': 'Influence sur la feuille de route'
      },

      // Contact Section
      'contact.title': {
        'es': '¿Listo para transformar tu productividad?',
        'en': 'Ready to transform your productivity?',
        'pt': 'Pronto para transformar sua produtividade?',
        'fr': 'Prêt à transformer votre productivité?'
      },
      'contact.subtitle': {
        'es': 'Cuéntanos sobre tu equipo y te mostraremos cómo Nori puede revolucionar tu flujo de trabajo en menos de 30 días.',
        'en': 'Tell us about your team and we\'ll show you how Nori can revolutionize your workflow in less than 30 days.',
        'pt': 'Conte-nos sobre sua equipe e mostraremos como Nori pode revolucionar seu fluxo de trabalho em menos de 30 dias.',
        'fr': 'Parlez-nous de votre équipe et nous vous montrerons comment Nori peut révolutionner votre flux de travail en moins de 30 jours.'
      },
      'contact.feature.setup.title': {
        'es': 'Setup en 24 horas',
        'en': '24-hour setup',
        'pt': 'Configuração em 24 horas',
        'fr': 'Configuration en 24 heures'
      },
      'contact.feature.setup.desc': {
        'es': 'Implementación express sin interrumpir tu trabajo',
        'en': 'Express implementation without interrupting your work',
        'pt': 'Implementação expressa sem interromper seu trabalho',
        'fr': 'Implémentation express sans interrompre votre travail'
      },
      'contact.feature.security.title': {
        'es': 'Seguridad enterprise',
        'en': 'Enterprise security',
        'pt': 'Segurança enterprise',
        'fr': 'Sécurité entreprise'
      },
      'contact.feature.security.desc': {
        'es': 'SOC2, GDPR compliance y encriptación end-to-end',
        'en': 'SOC2, GDPR compliance and end-to-end encryption',
        'pt': 'SOC2, conformidade GDPR e criptografia end-to-end',
        'fr': 'SOC2, conformité GDPR et chiffrement end-to-end'
      },
      'contact.feature.support247.title': {
        'es': 'Soporte 24/7',
        'en': '24/7 Support',
        'pt': 'Suporte 24/7',
        'fr': 'Support 24/7'
      },
      'contact.feature.support247.desc': {
        'es': 'Equipo dedicado para resolver cualquier duda',
        'en': 'Dedicated team to resolve any questions',
        'pt': 'Equipe dedicada para resolver qualquer dúvida',
        'fr': 'Équipe dédiée pour résoudre toute question'
      },

      // Footer
      'footer.product': {
        'es': 'Producto',
        'en': 'Product',
        'pt': 'Produto',
        'fr': 'Produit'
      },
      'footer.how-it-works': {
        'es': 'Cómo Funciona',
        'en': 'How It Works',
        'pt': 'Como Funciona',
        'fr': 'Comment Ça Marche'
      },
      'footer.integrations': {
        'es': 'Integraciones',
        'en': 'Integrations',
        'pt': 'Integrações',
        'fr': 'Intégrations'
      },
      'footer.security': {
        'es': 'Seguridad',
        'en': 'Security',
        'pt': 'Segurança',
        'fr': 'Sécurité'
      },
      'footer.roadmap': {
        'es': 'Roadmap',
        'en': 'Roadmap',
        'pt': 'Roadmap',
        'fr': 'Feuille de Route'
      },
      'footer.company': {
        'es': 'Empresa',
        'en': 'Company',
        'pt': 'Empresa',
        'fr': 'Entreprise'
      },
      'footer.about-us': {
        'es': 'Sobre Nosotros',
        'en': 'About Us',
        'pt': 'Sobre Nós',
        'fr': 'À Propos'
      },
      'footer.careers': {
        'es': 'Carreras',
        'en': 'Careers',
        'pt': 'Carreiras',
        'fr': 'Carrières'
      },
      'footer.blog': {
        'es': 'Blog',
        'en': 'Blog',
        'pt': 'Blog',
        'fr': 'Blog'
      },
      'footer.press': {
        'es': 'Prensa',
        'en': 'Press',
        'pt': 'Imprensa',
        'fr': 'Presse'
      },
      'footer.support': {
        'es': 'Soporte',
        'en': 'Support',
        'pt': 'Suporte',
        'fr': 'Support'
      },
      'footer.help-center': {
        'es': 'Centro de Ayuda',
        'en': 'Help Center',
        'pt': 'Central de Ajuda',
        'fr': 'Centre d\'Aide'
      },
      'footer.documentation': {
        'es': 'Documentación',
        'en': 'Documentation',
        'pt': 'Documentação',
        'fr': 'Documentation'
      },
      'footer.status': {
        'es': 'Status',
        'en': 'Status',
        'pt': 'Status',
        'fr': 'Statut'
      },
      'footer.contact': {
        'es': 'Contacto',
        'en': 'Contact',
        'pt': 'Contato',
        'fr': 'Contact'
      },
      'footer.copyright': {
        'es': '© 2024 heynori! Todos los derechos reservados.',
        'en': '© 2024 heynori! All rights reserved.',
        'pt': '© 2024 heynori! Todos os direitos reservados.',
        'fr': '© 2024 heynori! Tous droits réservés.'
      },
      'footer.privacy': {
        'es': 'Privacidad',
        'en': 'Privacy',
        'pt': 'Privacidade',
        'fr': 'Confidentialité'
      },
      'footer.terms': {
        'es': 'Términos',
        'en': 'Terms',
        'pt': 'Termos',
        'fr': 'Conditions'
      },
      'footer.cookies': {
        'es': 'Cookies',
        'en': 'Cookies',
        'pt': 'Cookies',
        'fr': 'Cookies'
      },

      // Easter eggs
      'easter.rainbow-activated': {
        'es': '🌈 ¡Modo arcoíris activado! 🦄',
        'en': '🌈 Rainbow mode activated! 🦄',
        'pt': '🌈 Modo arco-íris ativado! 🦄',
        'fr': '🌈 Mode arc-en-ciel activé! 🦄'
      },
      'easter.rainbow-disabled': {
        'es': 'Modo arcoíris desactivado',
        'en': 'Rainbow mode disabled',
        'pt': 'Modo arco-íris desativado',
        'fr': 'Mode arc-en-ciel désactivé'
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
      <button class="lang-btn" data-lang="es" title="Español">🇪🇸</button>
      <button class="lang-btn" data-lang="en" title="English">🇺🇸</button>
      <button class="lang-btn" data-lang="pt" title="Português">🇧🇷</button>
      <button class="lang-btn" data-lang="fr" title="Français">🇫🇷</button>
    `;

    // Event listeners
    selector.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLanguage(btn.dataset.lang);
      });
    });

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
      'pt': 'heynori! - IA que realmente entende como você trabalha',
      'fr': 'heynori! - IA qui comprend vraiment comment vous travaillez'
    };

    const descriptions = {
      'es': 'Nori conecta todas tus herramientas de trabajo para eliminar tareas repetitivas y multiplicar la productividad de tu equipo.',
      'en': 'Nori connects all your work tools to eliminate repetitive tasks and multiply your team\'s productivity.',
      'pt': 'Nori conecta todas as suas ferramentas de trabalho para eliminar tarefas repetitivas e multiplicar a produtividade da sua equipe.',
      'fr': 'Nori connecte tous vos outils de travail pour éliminer les tâches répétitives et multiplier la productivité de votre équipe.'
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