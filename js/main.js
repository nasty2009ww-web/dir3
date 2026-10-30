/**
 * DIR3 (درع) - Official Website Scripts
 * High-performance, zero external dependencies, accessible.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Load Configurations & Inject Dynamic Values
  initAppConfig();

  // 2. Navigation & Mobile Menu
  initNavigation();

  // 3. Interactive Phone Mockup
  initPhoneMockup();

  // 4. Animated Counters & Scroll Reveals
  initScrollAnimations();

  // 5. FAQ Accordion & Search Filter
  initFaqAccordion();

  // 6. Checksum Copy Functionality
  initChecksumCopy();

  // 7. Modals System (Install Guide, Privacy, Terms)
  initModals();

  // 8. Download Triggers
  initDownloadButtons();
});

/**
 * 1. Inject configurations from DIR3_CONFIG
 */
function initAppConfig() {
  const config = window.DIR3_CONFIG;
  if (!config) return;

  // Set App Version & Specs
  document.querySelectorAll('[data-config="app-version"]').forEach(el => el.textContent = config.app.version);
  document.querySelectorAll('[data-config="file-size"]').forEach(el => el.textContent = config.app.fileSize);
  document.querySelectorAll('[data-config="min-android"]').forEach(el => el.textContent = config.app.minAndroidVersion);
  document.querySelectorAll('[data-config="release-date"]').forEach(el => el.textContent = config.app.releaseDate);
  document.querySelectorAll('[data-config="sha256"]').forEach(el => el.textContent = config.app.sha256);
  document.querySelectorAll('[data-config="target-arch"]').forEach(el => el.textContent = config.app.targetArch);

  // Set Demo Statistics
  if (config.demoStatistics) {
    document.querySelectorAll('[data-stat="ads"]').forEach(el => el.textContent = config.demoStatistics.adsBlocked.display);
    document.querySelectorAll('[data-stat="trackers"]').forEach(el => el.textContent = config.demoStatistics.trackersBlocked.display);
    document.querySelectorAll('[data-stat="scams"]').forEach(el => el.textContent = config.demoStatistics.scamsAverted.display);
    document.querySelectorAll('[data-stat="battery"]').forEach(el => el.textContent = config.demoStatistics.batterySaved.display);
  }
}

/**
 * 2. Navigation, Sticky Glass Effect & Mobile Menu
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  }, { passive: true });

  // Mobile menu toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      toggleBtn.classList.toggle('active');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggleBtn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active section tracker
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/**
 * 3. Interactive Phone Mockup Simulator
 */
function initPhoneMockup() {
  const mainToggle = document.getElementById('mockupMainToggle');
  const trackerToggle = document.getElementById('mockupTrackerToggle');
  const scamToggle = document.getElementById('mockupScamToggle');
  
  const statusBadge = document.getElementById('mockupStatusBadge');
  const toggleText = document.getElementById('mockupToggleText');
  const liveAdsCount = document.getElementById('liveAdsCount');
  const secDots = document.querySelectorAll('.sec-dot');

  let activeRequests = 1420;
  let counterInterval = null;

  function startLiveCounter() {
    if (counterInterval) clearInterval(counterInterval);
    counterInterval = setInterval(() => {
      if (mainToggle && mainToggle.checked) {
        activeRequests += Math.floor(Math.random() * 3) + 1;
        if (liveAdsCount) {
          liveAdsCount.textContent = activeRequests.toLocaleString('en-US');
        }
      }
    }, 2800);
  }

  if (mainToggle) {
    mainToggle.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      if (isChecked) {
        statusBadge.innerHTML = '<span class="mini-dot"></span> الحماية نشطة';
        statusBadge.style.color = '#34D399';
        statusBadge.style.background = 'rgba(16, 185, 129, 0.15)';
        toggleText.textContent = 'مفعّل بالكامل';
        toggleText.style.color = 'var(--color-accent)';
        secDots.forEach(dot => {
          dot.style.background = 'var(--color-accent)';
          dot.style.boxShadow = '0 0 6px var(--color-accent)';
        });
        showToast('تم تفعيل جدار حماية درع (Dir3) المحلي');
      } else {
        statusBadge.innerHTML = '<span class="mini-dot" style="background:#EF4444;"></span> الحماية متوقفة';
        statusBadge.style.color = '#EF4444';
        statusBadge.style.background = 'rgba(239, 68, 68, 0.15)';
        toggleText.textContent = 'معطّل مؤقتاً';
        toggleText.style.color = '#9CA3AF';
        secDots.forEach(dot => {
          dot.style.background = '#4B5563';
          dot.style.boxShadow = 'none';
        });
        showToast('تم إيقاف فلترة الإعلانات مؤقتاً');
      }
    });

    startLiveCounter();
  }

  // Toggles for secondary cards
  if (trackerToggle) {
    trackerToggle.addEventListener('change', () => {
      showToast(trackerToggle.checked ? 'تم تفعيل حظر المتعقبات والتحليلات' : 'تم تعطيل حظر المتعقبات');
    });
  }

  if (scamToggle) {
    scamToggle.addEventListener('change', () => {
      showToast(scamToggle.checked ? 'تم تفعيل درع التصيد والاحتيال' : 'تم تعطيل فحص الروابط الخبيثة');
    });
  }

  // View Mode Switcher (Simulator vs Real Mockup)
  const btnSimView = document.getElementById('btnSimView');
  const btnRealView = document.getElementById('btnRealView');
  const simMockupWrapper = document.getElementById('simMockupWrapper');
  const realMockupWrapper = document.getElementById('realMockupWrapper');

  if (btnSimView && btnRealView && simMockupWrapper && realMockupWrapper) {
    btnSimView.addEventListener('click', () => {
      btnSimView.classList.add('active');
      btnRealView.classList.remove('active');
      simMockupWrapper.style.display = 'block';
      realMockupWrapper.style.display = 'none';
    });

    btnRealView.addEventListener('click', () => {
      btnRealView.classList.add('active');
      btnSimView.classList.remove('active');
      simMockupWrapper.style.display = 'none';
      realMockupWrapper.style.display = 'block';
    });
  }
}

/**
 * 4. Animated Statistics & Scroll Reveals
 */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal');
  const statsElements = document.querySelectorAll('.stat-number[data-target]');
  let statsTriggered = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Check if this is the stats section
        if (entry.target.closest('.stats-section') && !statsTriggered) {
          statsTriggered = true;
          animateNumbers();
        }
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));

  function animateNumbers() {
    statsElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 1800;
      const start = 0;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing easeOutQuart
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * ease;

        if (target >= 1000) {
          el.textContent = `${prefix}${Math.floor(current).toLocaleString('en-US')}${suffix}`;
        } else if (Number.isInteger(target)) {
          el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
        } else {
          el.textContent = `${prefix}${current.toFixed(1)}${suffix}`;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      }

      requestAnimationFrame(update);
    });
  }
}

/**
 * 5. FAQ Accordion & Live Filter
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faqSearchInput');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others for sleek accordion behavior
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      item.classList.toggle('active', !isActive);
    });
  });

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-trigger span')?.textContent.toLowerCase() || '';
        const answer = item.querySelector('.faq-content p')?.textContent.toLowerCase() || '';

        if (question.includes(query) || answer.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

/**
 * 6. Copy SHA-256 Checksum
 */
function initChecksumCopy() {
  const copyBtn = document.getElementById('btnCopyChecksum');
  const checksumEl = document.querySelector('[data-config="sha256"]');

  if (copyBtn && checksumEl) {
    copyBtn.addEventListener('click', async () => {
      const textToCopy = checksumEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast('تم نسخ بصمة التحقق (SHA-256) إلى الحافظة');
        copyBtn.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          تم النسخ!
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            نسخ الرمز
          `;
        }, 2500);
      } catch (err) {
        showToast('يرجى تحديد الرمز ونسخه يدوياً');
      }
    });
  }
}

/**
 * 7. Modals System (Install Guide, Privacy, Terms)
 */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloses = document.querySelectorAll('[data-close-modal]');
  const overlays = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  function closeAllModals() {
    overlays.forEach(overlay => overlay.classList.remove('active'));
    document.body.style.overflow = '';
  }
}

/**
 * 8. Download Buttons Action Handler
 */
function initDownloadButtons() {
  const downloadBtns = document.querySelectorAll('.action-download-apk');
  const config = window.DIR3_CONFIG;

  if (config?.download?.apkUrl) {
    downloadBtns.forEach(btn => {
      if (btn.tagName === 'A') {
        btn.setAttribute('href', config.download.apkUrl);
      }
    });
  }

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const apkUrl = config?.download?.apkUrl;

      if (!apkUrl || apkUrl.includes('example.com') || apkUrl.startsWith('#')) {
        e.preventDefault();
        // Open download modal guide if no live direct URL is bound yet
        const installModal = document.getElementById('modal-install-guide');
        if (installModal) {
          installModal.classList.add('active');
        }
        showToast('رابط ملف APK قابل للضبط عبر ملف js/config.js');
      } else {
        // Link is valid official URL
        showToast('جاري بدء تحميل ملف APK لتطبيق درع...');
      }
    });
  });
}

/**
 * Global Toast Notification Helper
 */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }, 3500);
}
