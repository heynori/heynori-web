// Modern JavaScript ES6+ for heynori! landing page
class HeyNoriApp {
  constructor() {
    this.konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ];
    this.konamiIndex = 0;
    this.isRainbowMode = false;
    this.charts = new Map();
    this.observers = new Map();
    
    this.init();
  }

  // Initialize all functionality
  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupLazyLoading();
    this.setupSmoothScrolling();
    this.setupTabSwitching();
    this.setupContactForm();
    this.setupKonamiCode();
    this.setupAccessibility();
    this.setupNotifications();
    this.initializeCharts();
    this.handleURLParameters();
    this.setupLanguageSelector();
  }

  // Setup all event listeners
  setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', () => this.toggleMobileMenu());
      
      // Close mobile menu when clicking outside
      mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
          this.closeMobileMenu();
        }
      });

      // Close mobile menu when clicking links
      const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });
    }

    // CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary:not(.form-submit), .nav-cta, .mobile-cta');
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleCTAClick(e));
    });

    // Demo button clicks
    const demoButtons = document.querySelectorAll('.btn-secondary, [data-action="live-demo"]');
    demoButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleDemoClick(e));
    });

    // Modal close events
    document.addEventListener('click', (e) => {
      if (e.target.matches('.modal-overlay, .modal-close')) {
        this.closeModal();
      }
    });

    // Escape key handlers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
        this.closeModal();
      }
    });

    // Prevent form submission on demo buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-action="demo-request"]')) {
        e.preventDefault();
        this.scrollToContact();
      }
    });
  }

  // Mobile menu functionality
  toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileMenu.classList.contains('active')) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    mobileMenu.style.display = 'block';
    mobileMenu.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      mobileMenu.classList.add('active');
    }, 10);
    
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    
    setTimeout(() => {
      mobileMenu.style.display = 'none';
    }, 300);
    
    document.body.style.overflow = '';
  }

  // Lazy loading for images
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });

      this.observers.set('images', imageObserver);
    }
  }

  // Intersection Observer for scroll animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Trigger chart animations when they come into view
          if (entry.target.classList.contains('network-diagram')) {
            this.animateChart(entry.target.id);
          }
        }
      });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll(
      '.problem-card, .feature, .benefit-item, .use-case-card, .integration-category, .contact-feature'
    );
    
    animatedElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });

    this.observers.set('animations', observer);
  }

  // Smooth scrolling for anchor links
  setupSmoothScrolling() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
          setTimeout(() => target.removeAttribute('tabindex'), 1000);
        }
      }
    });
  }

  // Tab switching functionality
  setupTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        
        // Update buttons
        tabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        
        // Update content
        tabContents.forEach(content => {
          content.classList.remove('active');
          content.setAttribute('aria-hidden', 'true');
        });
        
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
          targetContent.classList.add('active');
          targetContent.setAttribute('aria-hidden', 'false');
          
          // Recreate chart for the active tab
          this.recreateChartForTab(targetTab);
        }
      });
    });
  }

  // Contact form with validation
  setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleFormSubmission(form);
      });

      // Validación en tiempo real
      const inputs = form.querySelectorAll('input[required], select[required]');
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          if (input.value.trim() === '') {
            input.classList.add('error');
          } else {
            input.classList.remove('error');
          }
        });

        input.addEventListener('input', () => {
          input.classList.remove('error');
        });
      });
    }
  }

  // Field validation
  validateField(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = window.i18n ? window.i18n.translate('validation.required') : 'Este campo es obligatorio';
    }

    // Email validation
    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        errorMessage = window.i18n ? window.i18n.translate('validation.email') : 'Por favor ingresa un email válido';
      }
    }

    // Company email validation (no personal domains)
    if (field.name === 'email' && field.value.trim()) {
      const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
      const domain = field.value.split('@')[1]?.toLowerCase();
      if (personalDomains.includes(domain)) {
        isValid = false;
        errorMessage = window.i18n ? window.i18n.translate('validation.corporate-email') : 'Por favor usa tu email corporativo';
      }
    }

    // Update UI
    if (isValid) {
      field.classList.remove('error');
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
      }
    } else {
      field.classList.add('error');
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
      }
    }

    return isValid;
  }

  // Form submission handler
  async handleFormSubmission(form) {
    try {
      const formData = new FormData(form);
      const baserowToken = formData.get('baserow_token');
      const tableId = formData.get('baserow_table_id');
      
      // Validar campos requeridos
      const requiredFields = ['Name', 'Email', 'Company', 'Industry', 'Team Size'];
      for (const field of requiredFields) {
        if (!formData.get(field)) {
          this.showNotification('Por favor completa todos los campos requeridos', 'error');
          return;
        }
      }

      // Validar que al menos una categoría esté seleccionada
      const selectedCategories = Array.from(form.querySelectorAll('input[name="Stack"]:checked'))
        .map(checkbox => checkbox.value);

      if (selectedCategories.length === 0) {
        this.showNotification('Por favor selecciona al menos una categoría de herramientas', 'error');
        return;
      }

      // Deshabilitar el botón de envío y mostrar estado de carga
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Enviando...';

      // Preparar datos para Web3Forms
      const web3FormsData = {
        access_key: formData.get('access_key'),
        subject: formData.get('subject'),
        from_name: formData.get('from_name'),
        name: formData.get('Name'),
        email: formData.get('Email'),
        company: formData.get('Company'),
        teamSize: formData.get('Team Size'),
        stack: selectedCategories.join(', '),
        message: formData.get('Message') || 'No message provided'
      };

      console.log('Enviando a Web3Forms:', web3FormsData);

      const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(web3FormsData)
      });

      if (!web3FormsResponse.ok) {
        throw new Error('Error al enviar el formulario a Web3Forms');
      }

      // Preparar datos para Baserow
      const baserowData = {
        "Name": formData.get('Name'),
        "Email": formData.get('Email'),
        "Company": formData.get('Company'),
        "Industry": formData.get('Industry'),
        "Stack": selectedCategories.join(', '),
        "Team Size": formData.get('Team Size'),
        "Message": formData.get('Message') || '',
        "Created At": new Date().toISOString()
      };

      console.log('Enviando a Baserow:', baserowData);

      // Enviar a Baserow usando la URL proporcionada con user_field_names=true
      const baserowResponse = await fetch(`https://api.baserow.io/api/database/rows/table/${tableId}/?user_field_names=true`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${baserowToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(baserowData)
      });

      const responseText = await baserowResponse.text();
      console.log('Respuesta de Baserow (texto):', responseText);

      if (!baserowResponse.ok) {
        let errorMessage = 'Error desconocido';
        try {
          const errorData = JSON.parse(responseText);
          console.error('Error detallado de Baserow:', errorData);
          errorMessage = errorData.detail || JSON.stringify(errorData);
        } catch (e) {
          errorMessage = responseText || 'Error desconocido';
        }
        console.error('Error de Baserow:', errorMessage);
        throw new Error(`Error al enviar el formulario a Baserow: ${errorMessage}`);
      }

      // Intentar parsear la respuesta para verificar
      try {
        const responseData = JSON.parse(responseText);
        console.log('Respuesta parseada de Baserow:', responseData);
      } catch (e) {
        console.error('Error al parsear la respuesta:', e);
      }

      // Mostrar mensaje de éxito y resetear formulario
      this.showNotification('¡Gracias! Te contactaremos pronto', 'success');
      form.reset();

      // Redirigir si hay URL de redirección
      const redirectUrl = formData.get('redirect');
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      this.showNotification(`Error: ${error.message}`, 'error');
    } finally {
      // Rehabilitar el botón de envío y restaurar texto original
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }

  // Handle URL parameters (e.g., ?submitted=true)
  handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const submitted = urlParams.get('submitted');
    
    if (submitted === 'true') {
      // Show success message for redirected users
      const successMessage = document.documentElement.lang === 'es' 
        ? '¡Formulario enviado exitosamente! Te contactaremos pronto.' 
        : 'Form submitted successfully! We\'ll contact you soon.';
      
      setTimeout(() => {
        this.showNotification(successMessage, 'success', 8000);
        this.triggerConfetti();
      }, 1000);
      
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  // Konami code easter egg
  setupKonamiCode() {
    document.addEventListener('keydown', (e) => {
      if (e.code === this.konamiCode[this.konamiIndex]) {
        this.konamiIndex++;
        
        if (this.konamiIndex === this.konamiCode.length) {
          this.activateRainbowMode();
          this.konamiIndex = 0;
        }
      } else {
        this.konamiIndex = 0;
      }
    });
  }

  // Activate rainbow mode
  activateRainbowMode() {
    if (this.isRainbowMode) return;
    
    const t = (key, fallback) => window.i18n ? window.i18n.translate(key) : fallback;
    this.isRainbowMode = true;
    document.body.classList.add('rainbow-mode');
    
    // Trigger confetti
    this.triggerConfetti();
    
    // Trigger vibration
    this.triggerVibration();
    
    this.showNotification(
      t('easter.rainbow-activated', '🌈 ¡Modo arcoíris activado! 🦄'), 
      'success'
    );
    
    // Auto-disable after 10 seconds
    setTimeout(() => {
      document.body.classList.remove('rainbow-mode');
      this.isRainbowMode = false;
      this.showNotification(
        t('easter.rainbow-disabled', 'Modo arcoíris desactivado'), 
        'info'
      );
    }, 10000);
  }

  // Trigger confetti effect
  triggerConfetti() {
    if (typeof confetti !== 'undefined') {
      // Multiple bursts for better effect
      const colors = ['#FF3947', '#F4E6D1', '#1a1a1a', '#25d366'];
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: 0.25, y: 0.7 },
          colors: colors
        });
      }, 250);
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x: 0.75, y: 0.7 },
          colors: colors
        });
      }, 500);
    }
  }

  // Trigger vibration (if supported)
  triggerVibration() {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  }

  // Accessibility enhancements
  setupAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('main-content');
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
          setTimeout(() => target.removeAttribute('tabindex'), 1000);
        }
      });
    }

    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          this.closeMobileMenu();
        }
      });

    // Focus management for modals
    this.setupModalFocusManagement();
  }

  // Modal focus management
  setupModalFocusManagement() {
    const modal = document.getElementById('modalOverlay');
    if (!modal) return;

    let lastFocusedElement = null;

    // Store last focused element when modal opens
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          if (modal.classList.contains('show')) {
            lastFocusedElement = document.activeElement;
            // Focus first focusable element in modal
            const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
              setTimeout(() => firstFocusable.focus(), 100);
            }
          } else if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
          }
        }
      });
    });

    observer.observe(modal, { attributes: true });
  }

  // Notification system
  setupNotifications() {
    this.notificationContainer = document.getElementById('notificationsContainer');
  }

  showNotification(message, type = 'info', duration = 5000) {
    if (!this.notificationContainer) return;

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle'
    };

    notification.innerHTML = `
      <i class="notification-icon ${icons[type]}" aria-hidden="true"></i>
      <div class="notification-content">
        <div class="notification-message">${message}</div>
      </div>
      <button class="notification-close" aria-label="Cerrar notificación">
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>
    `;

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
      this.closeNotification(notification);
    });

    this.notificationContainer.appendChild(notification);

    // Auto-close after duration
    if (duration > 0) {
          setTimeout(() => {
        this.closeNotification(notification);
      }, duration);
    }

    return notification;
  }

  closeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    notification.style.opacity = '0';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Initialize Chart.js diagrams
  initializeCharts() {
    // Wait for Chart.js to load
    if (typeof Chart === 'undefined') {
      setTimeout(() => this.initializeCharts(), 100);
      return;
    }

    // Set Chart.js global defaults
    Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
    Chart.defaults.font.size = 14;
    Chart.defaults.color = '#404040';

    this.createDevelopmentChart();
    this.createSalesChart();
    this.createMarketingChart();
  }

  // Development team workflow chart
  createDevelopmentChart() {
    const canvas = document.getElementById('dev-diagram');
    if (!canvas) return;

    try {
      const ctx = canvas.getContext('2d');
      
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['GitHub', 'Jira', 'Slack', 'Confluence', 'Azure DevOps'],
          datasets: [{
            data: [30, 25, 20, 15, 10],
            backgroundColor: [
              '#333333',
              '#0052CC',
              '#4A154B',
              '#172B4D',
              '#0078D4'
            ],
            borderWidth: 3,
            borderColor: '#ffffff',
            hoverBorderWidth: 4,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1.5,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 15,
                usePointStyle: true,
                font: {
                  family: 'Inter',
                  size: 12,
                  weight: '500'
                },
                boxWidth: 12
              }
            },
            tooltip: {
              backgroundColor: '#1a1a1a',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: '#FF3947',
              borderWidth: 2,
              callbacks: {
                label: function(context) {
                  return `${context.label}: ${context.parsed}% del flujo`;
                }
              }
            }
          },
          animation: {
            animateRotate: true,
            duration: 2000,
            easing: 'easeOutQuart',
            onComplete: () => {
              canvas.classList.add('chart-loaded');
            }
          }
        }
      });

      this.charts.set('development', chart);
    } catch (error) {
      console.error('Error creating development chart:', error);
      this.showChartError(canvas, 'Integración de herramientas de desarrollo');
    }
  }

  // Sales team workflow chart
  createSalesChart() {
    const canvas = document.getElementById('sales-diagram');
    if (!canvas) return;

    try {
      const ctx = canvas.getContext('2d');
      
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Prospecting', 'Qualification', 'Demo', 'Proposal', 'Close'],
          datasets: [{
            label: 'Tiempo ahorrado (horas/semana)',
            data: [12, 8, 6, 7, 4],
            backgroundColor: '#FF3947',
            borderColor: '#1a1a1a',
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
            hoverBackgroundColor: '#FF1927',
            hoverBorderColor: '#1a1a1a',
            hoverBorderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1.8,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#1a1a1a',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: '#FF3947',
              borderWidth: 2,
              callbacks: {
                label: function(context) {
                  return `💰 ${context.parsed.y} horas ahorradas/semana`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#e5e5e5',
                lineWidth: 1
              },
              border: {
                color: '#1a1a1a',
                width: 2
              },
              ticks: {
                callback: function(value) {
                  return value + 'h';
                },
        font: {
                  weight: '500'
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              border: {
          color: '#1a1a1a',
                width: 2
              },
              ticks: {
                font: {
                  weight: '500',
                  size: 11
                }
              }
            }
          },
          animation: {
            duration: 2500,
            easing: 'easeOutQuart',
            delay: (context) => {
              return context.dataIndex * 200;
            },
            onComplete: () => {
              canvas.classList.add('chart-loaded');
            }
          }
        }
      });

      this.charts.set('sales', chart);
    } catch (error) {
      console.error('Error creating sales chart:', error);
      this.showChartError(canvas, 'Optimización del proceso de ventas');
    }
  }

  // Marketing team workflow chart
  createMarketingChart() {
    const canvas = document.getElementById('marketing-diagram');
    if (!canvas) return;

    try {
      const ctx = canvas.getContext('2d');
      
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
          datasets: [{
            label: 'ROI Improvement',
            data: [100, 125, 140, 165, 185, 220],
            borderColor: '#FF3947',
            backgroundColor: 'rgba(255, 57, 71, 0.15)',
            borderWidth: 4,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#FF3947',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 3,
            pointRadius: 8,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: '#FF1927',
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 1.8,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: '#1a1a1a',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: '#FF3947',
              borderWidth: 2,
              callbacks: {
                label: function(context) {
                  const improvement = context.parsed.y - 100;
                  return `📊 ROI: ${context.parsed.y}% (+${improvement}%)`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 80,
              max: 240,
              grid: {
                color: '#e5e5e5',
                lineWidth: 1
              },
              border: {
          color: '#1a1a1a',
                width: 2
              },
              ticks: {
                callback: function(value) {
                  return value + '%';
                },
                font: {
                  weight: '500'
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              border: {
                color: '#1a1a1a',
                width: 2
              },
              ticks: {
                font: {
                  weight: '500',
                  size: 11
                }
              }
            }
          },
          animation: {
            duration: 3000,
            easing: 'easeOutQuart',
            delay: (context) => {
              return context.dataIndex * 300;
            },
            onComplete: () => {
              canvas.classList.add('chart-loaded');
            }
          }
        }
      });

      this.charts.set('marketing', chart);
    } catch (error) {
      console.error('Error creating marketing chart:', error);
      this.showChartError(canvas, 'Crecimiento ROI de marketing');
    }
  }

  // Recreate chart for active tab
  recreateChartForTab(tabId) {
    const chartMap = {
      'development': 'development',
      'sales': 'sales',
      'marketing': 'marketing'
    };

    const chartKey = chartMap[tabId];
    if (chartKey && this.charts.has(chartKey)) {
      const chart = this.charts.get(chartKey);
      chart.update('active');
    }
  }

  // Animate chart when it comes into view
  animateChart(chartId) {
    const chartMap = {
      'dev-diagram': 'development',
      'sales-diagram': 'sales',
      'marketing-diagram': 'marketing'
    };

    const chartKey = chartMap[chartId];
    if (chartKey && this.charts.has(chartKey)) {
      const chart = this.charts.get(chartKey);
      chart.update('active');
    }
  }

  // Scroll to contact section
  scrollToContact() {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = contactSection.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // CTA button handler
  handleCTAClick(e) {
    e.preventDefault();
    this.scrollToContact();
    this.trackEvent('cta_click', {
      button_text: e.target.textContent.trim(),
      source: e.target.closest('.hero, .nav, .mobile-menu, .cta') ? 'header' : 'page'
    });
  }

  // Demo button handler
  handleDemoClick(e) {
    e.preventDefault();
    this.showModal('demo');
    this.trackEvent('demo_click', {
      button_text: e.target.textContent.trim()
    });
  }

  // Modal functionality
  showModal(type) {
    const modal = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;

    let content = '';
    
    if (type === 'demo') {
      content = this.getDemoModalContent();
    } else if (type === 'success') {
      content = this.getSuccessModalContent();
    }

    modalBody.innerHTML = content;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // Show success modal after form submission
  showSuccessModal() {
    this.showModal('success');
  }

  // Demo modal content
  getDemoModalContent() {
    const t = (key, fallback) => window.i18n ? window.i18n.translate(key) : fallback;
    
    return `
      <div class="modal-header">
        <h2>${t('modal.demo.title', 'Ver Demo en Vivo')}</h2>
        <p>${t('modal.demo.description', 'Descubre cómo Nori puede transformar tu productividad en solo 15 minutos')}</p>
      </div>
      <div class="modal-video">
        <div class="video-placeholder">
          <i class="fas fa-play-circle" style="font-size: 4rem; color: var(--accent-red);"></i>
          <p>${t('modal.demo.coming-soon', 'Demo interactivo próximamente')}</p>
        </div>
        </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="window.heyNoriApp.scrollToContact(); window.heyNoriApp.closeModal();">
          <i class="fas fa-calendar-alt" aria-hidden="true"></i>
          ${t('modal.demo.btn-request', 'Solicitar Demo Personalizada')}
        </button>
      </div>
    `;
  }

  // Success modal content
  getSuccessModalContent() {
    const t = (key, fallback) => window.i18n ? window.i18n.translate(key) : fallback;
    
    return `
      <div class="modal-header">
        <div style="text-align: center; margin-bottom: 2rem;">
          <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--success); margin-bottom: 1rem;"></i>
          <h2>${t('modal.success.title', '¡Solicitud Enviada!')}</h2>
          <p>${t('modal.success.description', 'Gracias por tu interés en heynori!')}</p>
      </div>
          </div>
      <div class="modal-content-body">
        <div class="success-features">
          <div class="success-feature">
            <i class="fas fa-clock" aria-hidden="true"></i>
            <div>
              <h3>${t('modal.success.contact-24h', 'Te contactaremos en 24 horas')}</h3>
              <p>${t('modal.success.contact-desc', 'Nuestro equipo revisará tu información y te contactará pronto')}</p>
        </div>
      </div>
          <div class="success-feature">
            <i class="fas fa-calendar-check" aria-hidden="true"></i>
            <div>
              <h3>${t('modal.success.demo-ready', 'Demo personalizada lista')}</h3>
              <p>${t('modal.success.demo-desc', 'Prepararemos una demo específica para tu caso de uso')}</p>
            </div>
          </div>
          <div class="success-feature">
            <i class="fas fa-rocket" aria-hidden="true"></i>
            <div>
              <h3>${t('modal.success.setup-24h', 'Setup en 24 horas')}</h3>
              <p>${t('modal.success.setup-desc', 'Si decides continuar, tendrás Nori funcionando al día siguiente')}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Event tracking (replace with actual analytics)
  trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, properties);
    }
    
    // Facebook Pixel example
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, properties);
    }
  }

  // Show chart error fallback
  showChartError(canvas, description) {
    canvas.style.display = 'none';
    
    const isEnglish = document.documentElement.lang === 'en';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'chart-error';
    errorDiv.innerHTML = `
      <div class="error-content">
        <i class="fas fa-chart-bar" style="font-size: 2rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
        <h4>${description}</h4>
        <p>${isEnglish ? 'Interactive chart not available<br>Data loads dynamically' : 'Gráfico interactivo no disponible<br>Los datos se cargan dinámicamente'}</p>
      </div>
    `;
    
    // Add error styles
    errorDiv.style.cssText = `
      background: var(--gray-100);
      border: 2px dashed var(--gray-400);
      border-radius: var(--border-radius-md);
      padding: var(--spacing-xl);
      text-align: center;
      color: var(--gray-600);
      min-height: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    
    canvas.parentNode.appendChild(errorDiv);
  }

  // Setup language selector
  setupLanguageSelector() {
    // Wait for i18n to be ready
    if (!window.i18n) {
      setTimeout(() => this.setupLanguageSelector(), 100);
        return;
      }

    const container = document.getElementById('language-selector-container');
    if (!container) return;

    // Create language selector
    const selector = window.i18n.createLanguageSelector();
    container.appendChild(selector);

    // Listen for language changes to update UI
    document.addEventListener('languageChanged', (e) => {
      console.log(`🌐 Idioma cambiado a: ${e.detail.language}`);
    });
  }

  // Cleanup on page unload
  destroy() {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    
    // Clean up charts
    this.charts.forEach(chart => chart.destroy());
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.heyNoriApp = new HeyNoriApp();
});

// Manejar la selección múltiple del select de herramientas
document.addEventListener('DOMContentLoaded', function() {
    // Aquí estaba el código del select que eliminamos
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.heyNoriApp) {
    window.heyNoriApp.destroy();
  }
});

// Add styles for modal content
const modalStyles = `
<style>
.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  margin-bottom: 0.5rem;
  color: var(--primary-black);
}

.modal-header p {
  color: var(--gray-600);
  margin: 0;
}

.modal-video {
  margin: 2rem 0;
}

.video-placeholder {
  background: var(--gray-100);
  border-radius: var(--border-radius-lg);
  padding: 3rem;
  text-align: center;
  color: var(--gray-600);
}

.success-features {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
}

.success-feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.success-feature i {
  font-size: 1.5rem;
  color: var(--success);
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.success-feature h3 {
  margin-bottom: 0.25rem;
  font-size: 1rem;
  color: var(--primary-black);
}

.success-feature p {
  font-size: 0.875rem;
  color: var(--gray-600);
  margin: 0;
}

.modal-footer {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .modal-footer {
    flex-direction: column;
  }
  
  .success-features {
    gap: 1rem;
  }
  
  .success-feature {
    gap: 0.75rem;
  }
  
  .success-feature i {
    font-size: 1.25rem;
  }
}
</style>
`;

// Add modal styles to head
document.head.insertAdjacentHTML('beforeend', modalStyles); 