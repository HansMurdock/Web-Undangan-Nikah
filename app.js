/**
 * FAJAR & SALSA . UNDANGAN PERNIKAHAN 07 NOVEMBER 2026
 * M. Fajar Ardi Alhari, S.Pd. & Salsabila Rahayu, S.Pd.
 * Aula Universitas KH. Ruhiat, Cipasung, Singaparna, Tasikmalaya
 *
 * Interactive HTML5 & GSAP Engine:
 * 1. Lenis Smooth Scroll + GSAP ScrollTrigger Integration
 * 2. Full-Viewport HTML5 Ambient Forest Embers & Fireflies Canvas (#ambient-canvas)
 * 3. Smooth Automatic Photo Crossfade Slideshow Engine ([data-auto-slideshow])
 * 4. GSAP Scroll-Triggered Reveal & Motion Choreography
 * 5. Smooth 3D Perspective Tilt ([data-tilt]) & Magnetic CTA Micro-Interactions
 * 6. Interactive Fullscreen Gallery Lightbox Modal (#lightbox-modal)
 * 7. Personalized Guest Name (?to=Nama+Tamu) & Live Countdown to 07 Nov 2026 09:00 WIB
 * 8. Web Audio API Warm Acoustic Guitar Voicing & Tactile Clicks
 * 9. Full Client-Side CRUD (Create, Read, Update, Delete) for RSVP & Doa Restu (localStorage)
 * 10. High-Contrast Scannable QRIS Canvas + Download PNG Card
 */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scrollVelocity = 0;
  var lenisInstance = null;

  /* ------------------------------------------------------------------
     1. LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER SYNC
     ------------------------------------------------------------------ */
  function initSmoothScrollAndGSAP() {
    if (reducedMotion) return;

    var hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
    if (hasGSAP) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    var finePointer = window.matchMedia('(pointer: fine)').matches;
    if (typeof window.Lenis !== 'undefined' && finePointer) {
      var lenis = new window.Lenis({
        lerp: 0.11,
        smoothWheel: true
      });
      lenisInstance = lenis;

      lenis.on('scroll', function (e) {
        scrollVelocity = e && typeof e.velocity === 'number' ? e.velocity : 0;
        if (hasGSAP) {
          window.ScrollTrigger.update();
        }
      });

      if (hasGSAP) {
        window.gsap.ticker.add(function (time) {
          lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        var raf = function (time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    }
  }

  /* ------------------------------------------------------------------
     2. HTML5 AMBIENT GOLDEN BRASS DUST MOTES CANVAS (#ambient-canvas)
     ------------------------------------------------------------------ */
  function initAmbientCanvas() {
    var canvas = document.getElementById('ambient-canvas');
    if (!canvas || reducedMotion) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var width = 0;
    var height = 0;
    var particles = [];
    var count = window.innerWidth < 768 ? 20 : 36;
    var pointerX = -1000;
    var pointerY = -1000;
    var isRunning = true;
    var animFrameId = null;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    var colorPalettes = [
      { r: 223, g: 177, b: 91 },  // antique gold
      { r: 200, g: 157, b: 92 },  // warm brass
      { r: 236, g: 201, b: 125 }, // light champagne
      { r: 247, g: 224, b: 168 }  // sparkle highlight
    ];

    function makeParticle(spawnAnywhere) {
      var col = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      var radius = 0.8 + Math.random() * 1.8;
      return {
        x: Math.random() * (width || window.innerWidth),
        y: spawnAnywhere ? Math.random() * (height || window.innerHeight) : (height || window.innerHeight) + 12,
        r: radius,
        vx: (Math.random() - 0.5) * 0.26,
        vy: -(0.18 + Math.random() * 0.38),
        oscSpeed: 0.008 + Math.random() * 0.014,
        oscAmp: 0.35 + Math.random() * 0.65,
        baseAlpha: 0.16 + Math.random() * 0.40,
        phase: Math.random() * Math.PI * 2,
        rCol: col.r,
        gCol: col.g,
        bCol: col.b
      };
    }

    resize();
    for (var i = 0; i < count; i++) {
      particles.push(makeParticle(true));
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', function (e) {
      pointerX = e.clientX;
      pointerY = e.clientY;
    }, { passive: true });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        isRunning = false;
        if (animFrameId) cancelAnimationFrame(animFrameId);
      } else {
        isRunning = true;
        animFrameId = requestAnimationFrame(draw);
      }
    });

    function draw(now) {
      if (!isRunning) return;
      ctx.clearRect(0, 0, width, height);

      var boost = 1 + Math.min(2.0, Math.abs(scrollVelocity) * 0.05);
      scrollVelocity *= 0.92;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.phase += p.oscSpeed;
        p.x += (p.vx + Math.sin(p.phase) * p.oscAmp * 0.15) * boost;
        p.y += p.vy * boost;

        var dx = p.x - pointerX;
        var dy = p.y - pointerY;
        var distSq = dx * dx + dy * dy;
        if (distSq < 10000 && distSq > 1) {
          var dist = Math.sqrt(distSq);
          var force = (100 - dist) / 100;
          p.x += (dx / dist) * force * 0.6;
          p.y += (dy / dist) * force * 0.6;
        }

        if (p.y < -15) {
          particles[i] = makeParticle(false);
          continue;
        }
        if (p.x < -15) p.x = width + 10;
        if (p.x > width + 15) p.x = -10;

        var pulse = 0.65 + 0.35 * Math.sin(p.phase * 1.5 + now * 0.0015);
        var a = Math.max(0, Math.min(1, p.baseAlpha * pulse));

        var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.2);
        grad.addColorStop(0, 'rgba(' + p.rCol + ',' + p.gCol + ',' + p.bCol + ',' + a.toFixed(3) + ')');
        grad.addColorStop(0.5, 'rgba(' + p.rCol + ',' + p.gCol + ',' + p.bCol + ',' + (a * 0.45).toFixed(3) + ')');
        grad.addColorStop(1, 'rgba(' + p.rCol + ',' + p.gCol + ',' + p.bCol + ',0)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animFrameId = requestAnimationFrame(draw);
    }

    animFrameId = requestAnimationFrame(draw);
  }

  /* ------------------------------------------------------------------
     3. SMOOTH AUTOMATIC PHOTO CROSSFADE SLIDESHOW ENGINE
     ------------------------------------------------------------------ */
  function initAutoSlideshows() {
    if (reducedMotion) return;

    var containers = document.querySelectorAll('[data-auto-slideshow]');
    containers.forEach(function (container, containerIdx) {
      var photos = container.querySelectorAll('.slide-photo');
      var dots = container.querySelectorAll('.slide-dot');
      if (photos.length < 2) return;

      var intervalMs = parseInt(container.getAttribute('data-auto-slideshow'), 10) || 4000;
      var currentIdx = 0;
      var timer = null;

      function advanceSlide(nextIndex) {
        photos[currentIdx].classList.remove('is-visible');
        if (dots[currentIdx]) {
          dots[currentIdx].classList.remove('is-active');
        }

        currentIdx = typeof nextIndex === 'number'
          ? (nextIndex + photos.length) % photos.length
          : (currentIdx + 1) % photos.length;

        photos[currentIdx].classList.add('is-visible');
        if (dots[currentIdx]) {
          dots[currentIdx].classList.add('is-active');
        }

        // Update lightbox target to match the currently visible photo
        if (container.hasAttribute('data-lightbox-src')) {
          var activeSrc = photos[currentIdx].getAttribute('src');
          if (activeSrc) {
            container.setAttribute('data-lightbox-src', activeSrc);
          }
        }
      }

      function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(function () {
          advanceSlide();
        }, intervalMs);
      }

      // Stagger initial start so frames across the page cycle organically
      setTimeout(function () {
        startTimer();
      }, containerIdx * 450);

      // Allow clicking Hero frame to advance photo manually
      if (container.classList.contains('hero-aperture')) {
        container.addEventListener('click', function () {
          playTactileClick(246.94);
          advanceSlide();
          startTimer();
        });
      }

      // Mobile Touch Swipe Left/Right on any slideshow frame
      var touchStartX = 0;
      var touchStartY = 0;
      container.addEventListener('touchstart', function (e) {
        if (!e.touches || !e.touches.length) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      container.addEventListener('touchend', function (e) {
        if (!e.changedTouches || !e.changedTouches.length) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        var dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          playTactileClick(dx < 0 ? 261.63 : 220);
          advanceSlide(dx < 0 ? currentIdx + 1 : currentIdx - 1);
          startTimer();
        }
      }, { passive: true });
    });
  }

  /* ------------------------------------------------------------------
     4. SCROLL REVEALS & MULTI-VARIANT ENTRANCE CHOREOGRAPHY
     ------------------------------------------------------------------ */
  var globalRevealObserver = null;

  function checkElementsInView() {
    var els = document.querySelectorAll('[data-reveal]:not(.is-in), [data-anim]:not(.is-in)');
    var triggerY = window.innerHeight * 0.94;
    els.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < triggerY && rect.bottom > 0) {
        el.classList.add('is-in');
        if (globalRevealObserver) {
          globalRevealObserver.unobserve(el);
        }
      }
    });
  }

  function observeRevealElements(root) {
    var scope = root || document;
    var revealEls = scope.querySelectorAll('[data-reveal], [data-anim]');
    if ('IntersectionObserver' in window) {
      if (!globalRevealObserver) {
        globalRevealObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-in');
              globalRevealObserver.unobserve(entry.target);
            }
          });
        }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
      }
      revealEls.forEach(function (el) {
        globalRevealObserver.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('is-in');
      });
    }
    checkElementsInView();
  }

  function initScrollRevealsAndMotion() {
    observeRevealElements(document);
    window.addEventListener('scroll', checkElementsInView, { passive: true });

    if (reducedMotion || typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
      return;
    }

    var gsap = window.gsap;

    var footerWordmark = document.querySelector('.footer-svg-wordmark');
    if (footerWordmark) {
      gsap.fromTo(
        footerWordmark,
        { y: 28 },
        {
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerWordmark,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  }

  /* ------------------------------------------------------------------
     5. INTERACTIVE 3D PERSPECTIVE TILT ([data-tilt]) & MAGNETIC BUTTONS
     ------------------------------------------------------------------ */
  function init3DTiltAndMagnetic() {
    if (reducedMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    var tiltEls = document.querySelectorAll('[data-tilt]');
    tiltEls.forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var rect = el.getBoundingClientRect();
        var nx = (e.clientX - rect.left) / rect.width - 0.5;
        var ny = (e.clientY - rect.top) / rect.height - 0.5;
        var rotX = (-ny * 5.2).toFixed(2);
        var rotY = (nx * 5.2).toFixed(2);
        el.style.transform = 'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateZ(0)';
      });

      el.addEventListener('pointerleave', function () {
        el.style.transition = 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = '';
        setTimeout(function () {
          el.style.transition = '';
        }, 450);
      });
    });

    var buttons = document.querySelectorAll('.btn-primary, .btn-outline');
    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var dx = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
        var dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
        btn.style.transform = 'translate3d(' + dx.toFixed(1) + 'px, ' + dy.toFixed(1) + 'px, 0)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  /* ------------------------------------------------------------------
     6. INTERACTIVE FULLSCREEN GALLERY LIGHTBOX MODAL (#lightbox-modal)
     ------------------------------------------------------------------ */
  function initGalleryLightbox() {
    var cards = document.querySelectorAll('[data-lightbox-src]');
    var modal = document.getElementById('lightbox-modal');
    var modalImg = document.getElementById('lightbox-img');
    var modalCap = document.getElementById('lightbox-caption');
    var prevBtn = document.getElementById('lightbox-prev');
    var nextBtn = document.getElementById('lightbox-next');
    var closeBtn = document.getElementById('lightbox-close');
    if (!cards.length || !modal || !modalImg || !modalCap) return;

    var allPhotos = [
      { src: 'Foto%20Pasangan/HAW09185.jpg', caption: 'M. Fajar Ardi Alhari, S.Pd. & Salsabila Rahayu, S.Pd.' },
      { src: 'Foto%20Pasangan/WCP09447.jpg', caption: 'Kebahagiaan Fajar & Salsa di bawah kanopi hutan pinus.' },
      { src: 'Foto%20Pasangan/WCP09490.jpg', caption: 'Potret klasik bersama Jeep Willys 1954.' },
      { src: 'Foto%20Pasangan/WCP09438.jpg', caption: 'Senyum bahagia menyambut hari pernikahan Sabtu, 07 November 2026.' },
      { src: 'Foto%20Pasangan/HAW09173.jpg', caption: 'Tatapan hangat menjelang malam.' },
      { src: 'Foto%20Pasangan/WCP09422.jpg', caption: 'Melangkah bersama menuju ikatan suci.' },
      { src: 'Foto%20Pasangan/HAW09158.jpg', caption: 'Potret senja di tengah hutan pinus.' },
      { src: 'Foto%20Pasangan/HAW09063.jpg', caption: 'Kebersamaan Fajar & Salsa.' },
      { src: 'Foto%20Pasangan/HAW09071.jpg', caption: 'Potret hangat kedua mempelai.' },
      { src: 'Foto%20Pasangan/HAW09182.jpg', caption: 'Potret monokrom malam Fajar & Salsa.' },
      { src: 'Foto%20Pasangan/HAW09191.jpg', caption: 'Siluet klasik di kabin Jeep Willys.' }
    ];
    var currentIndex = 0;

    cards.forEach(function (card, index) {
      card.addEventListener('click', function () {
        var activeSrc = card.getAttribute('data-lightbox-src');
        var foundIdx = index;
        for (var i = 0; i < allPhotos.length; i++) {
          if (allPhotos[i].src === activeSrc) {
            foundIdx = i;
            break;
          }
        }
        openAt(foundIdx);
      });
    });

    function showSlide(idx) {
      currentIndex = (idx + allPhotos.length) % allPhotos.length;
      modalImg.src = allPhotos[currentIndex].src;
      modalCap.textContent = allPhotos[currentIndex].caption;
    }

    function openAt(idx) {
      playTactileClick(293.66);
      showSlide(idx);
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeLightbox() {
      modal.hidden = true;
      document.body.style.overflow = '';
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        playTactileClick(220);
        showSlide(currentIndex - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        playTactileClick(261.63);
        showSlide(currentIndex + 1);
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
    });

    var lbStartX = 0;
    modal.addEventListener('touchstart', function (e) {
      if (!e.touches || !e.touches.length) return;
      lbStartX = e.touches[0].clientX;
    }, { passive: true });

    modal.addEventListener('touchend', function (e) {
      if (modal.hidden || !e.changedTouches || !e.changedTouches.length) return;
      var dx = e.changedTouches[0].clientX - lbStartX;
      if (Math.abs(dx) > 40) {
        playTactileClick(dx < 0 ? 261.63 : 220);
        showSlide(dx < 0 ? currentIndex + 1 : currentIndex - 1);
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------
     7. PERSONALIZED 44 GUEST DIRECTORY (?to=Nama+Tamu), COVER GATE & COUNTDOWN
     ------------------------------------------------------------------ */
  var GUEST_DIRECTORY = [
    { id: 1, school: 'SMPN 1 BANTARKALONG', rawName: 'Nono Darsono, S.Pd.,M.Si.', name: 'Nono Darsono, S.Pd., M.Si.' },
    { id: 2, school: 'SMPN 2 BANTARKALONG', rawName: 'Drs. MAMAN, M.Pd.I', name: 'Drs. Maman, M.Pd.I.' },
    { id: 3, school: 'SMPN SATAP 1 BANTARKALONG', rawName: 'HERMANTO', name: 'Hermanto' },
    { id: 4, school: 'SMPN SATAP 2 BANTARKALONG', rawName: 'JEJEN ZAINUL HAKIM', name: 'Jejen Zainul Hakim' },
    { id: 5, school: 'SMP ISLAM BINA INSAN MANDIRI', rawName: 'Agus Triana, S.H.I', name: 'Agus Triana, S.H.I.' },
    { id: 6, school: 'SMP IT ASSALAM NURUL JAZA', rawName: 'M Slamet Budi, S.Pd.I', name: 'M. Slamet Budi, S.Pd.I.' },
    { id: 7, school: 'SMP MAARIF NU ZAENAL MUTTAQIN', rawName: 'Luki Lukmanul Hakim, S.Pd.,M.Pd', name: 'Luki Lukmanul Hakim, S.Pd., M.Pd.' },
    { id: 8, school: 'SMPN 1 BOJONGASIH', rawName: 'IRMAN, S.Pd', name: 'Irman, S.Pd.' },
    { id: 9, school: 'SMPN SATAP 1 BOJONGASIH', rawName: 'Hj. SRI RAHMAWATI, S.S.', name: 'Hj. Sri Rahmawati, S.S.' },
    { id: 10, school: 'SMPN SATAP 2 BOJONGASIH', rawName: 'NONENG RISMAWATI, S.Pd, M.Pd.', name: 'Noneng Rismawati, S.Pd., M.Pd.' },
    { id: 11, school: 'SMP ISLAM MIFTAHUL HUDA BOJONGASIH', rawName: 'Deris Rismawan, S.Pd', name: 'Deris Rismawan, S.Pd.' },
    { id: 12, school: 'SMP TERPADU MIFTAHUL HUDA BOJONGKONENG', rawName: 'HILMI ABDUL AZIZ, ST', name: 'Hilmi Abdul Aziz, S.T.' },
    { id: 13, school: 'SMPN 1 CIPATUJAH', rawName: 'MARWAN SUPRIYADI, S.Pd,M.Pd', name: 'Marwan Supriyadi, S.Pd., M.Pd.' },
    { id: 14, school: 'SMPN 2 CIPATUJAH', rawName: 'DUDUNG SUDARWAN, S.Pd. M.Si', name: 'Dudung Sudarwan, S.Pd., M.Si.' },
    { id: 15, school: 'SMPN 3 CIPATUJAH', rawName: 'DADAN SUNDANA, S.Pd', name: 'Dadan Sundana, S.Pd.' },
    { id: 16, school: 'SMPN 4 CIPATUJAH', rawName: 'Saprudin, S.Pd, M.Pd', name: 'Saprudin, S.Pd., M.Pd.' },
    { id: 17, school: 'SMPN 5 CIPATUJAH', rawName: 'H. Adhika Nurkholis Aziz, S.Pd., M.Pd.', name: 'H. Adhika Nurkholis Aziz, S.Pd., M.Pd.' },
    { id: 18, school: 'SMPN SATAP 1 CIPATUJAH', rawName: 'Ucu Herlina, S.Pd., M.Pd.', name: 'Ucu Herlina, S.Pd., M.Pd.' },
    { id: 19, school: 'SMPN SATAP 2 CIPATUJAH', rawName: 'Dian Wardiana Resdedi, S.Sn.', name: 'Dian Wardiana Resdedi, S.Sn.' },
    { id: 20, school: 'SMPN SATAP 3 CIPATUJAH', rawName: 'WINA WIDYA INDRAYANA, S.Pd.', name: 'Wina Widya Indrayana, S.Pd.' },
    { id: 21, school: 'SMPN SATAP 4 CIPATUJAH', rawName: 'Iis Cucu Maryani, S.Pd.', name: 'Iis Cucu Maryani, S.Pd.' },
    { id: 22, school: 'SMPN SATAP 5 CIPATUJAH', rawName: 'Yogi Fransisca, S.Pd.,M.Pd', name: 'Yogi Fransisca, S.Pd., M.Pd.' },
    { id: 23, school: 'SMP ISLAM AL-FADLILLAH', rawName: 'TIKA KARTIKA, S.Pd.', name: 'Tika Kartika, S.Pd.' },
    { id: 24, school: 'SMPN 1 CULAMEGA', rawName: 'KURNIA HERYANA, S.Pd', name: 'Kurnia Heryana, S.Pd.' },
    { id: 25, school: 'SMPN SATAP 1 CULAMEGA', rawName: 'HERI BUDIWAN, S.Pd.', name: 'Heri Budiwan, S.Pd.' },
    { id: 26, school: 'SMPN SATAP 2 CULAMEGA', rawName: 'BAHRUM, S.Ag., M.Pd.', name: 'Bahrum, S.Ag., M.Pd.' },
    { id: 27, school: 'SMPN SATAP 3 CULAMEGA', rawName: 'KURNIA HERYANA, S.Pd', name: 'Kurnia Heryana, S.Pd.' },
    { id: 28, school: 'SMPN SATAP 4 CULAMEGA', rawName: 'SOPU ALI MUBAROK, S.Pd', name: 'Sopu Ali Mubarok, S.Pd.' },
    { id: 29, school: 'SMPN SATAP 5 CULAMEGA', rawName: 'HERLUS, S.Pd.', name: 'Herlus, S.Pd.' },
    { id: 30, school: 'SMPN 1 KARANGNUNGGAL', rawName: 'ADE IWAN, S.Pd.I. M.Pd.I', name: 'Ade Iwan, S.Pd.I., M.Pd.I.' },
    { id: 31, school: 'SMPN 2 KARANGNUNGGAL', rawName: 'Herna Purnama Direja, S.Pd., M.Pd.', name: 'Herna Purnama Direja, S.Pd., M.Pd.' },
    { id: 32, school: 'SMPN 3 KARANGNUNGGAL', rawName: 'Arie Satria, S.Pd., M.Pd.', name: 'Arie Satria, S.Pd., M.Pd.' },
    { id: 33, school: 'SMPN 4 KARANGNUNGGAL', rawName: 'Gati Durgathy, S.Pd', name: 'Gati Durgathy, S.Pd.' },
    { id: 34, school: 'SMPN SATAP 1 KARANGNUNGGAL', rawName: 'Nikeu Nurulsani, S.Pd.,M.Pd', name: 'Nikeu Nurulsani, S.Pd., M.Pd.' },
    { id: 35, school: 'SMPN SATAP 2 KARANGNUNGGAL', rawName: 'Fahmi Fauzie, S.Pd.', name: 'Fahmi Fauzie, S.Pd.' },
    { id: 36, school: 'SMP ISLAM TRIJAYA KARANGNUNGGAL', rawName: 'Evi Mujiawati, S.Pd, M.Pd', name: 'Evi Mujiawati, S.Pd., M.Pd.' },
    { id: 37, school: 'SMP PLUS AL AFSAR', rawName: 'Wawan Karnawan, S.S.,M.Pd', name: 'Wawan Karnawan, S.S., M.Pd.' },
    { id: 38, school: 'SMP PLUS AL HIKMAH', rawName: 'Enung Taubah,S.Pd', name: 'Enung Taubah, S.Pd.' },
    { id: 39, school: 'SMP IT DAARUSSALAAM', rawName: 'Sukmana S.Pd.I', name: 'Sukmana, S.Pd.I.' },
    { id: 40, school: 'SMP IT MADINATUL ALBAAB', rawName: 'Fitroh Malik,SH', name: 'Fitroh Malik, S.H.' },
    { id: 41, school: 'SMP TERPADU NURATA', rawName: 'Febrian Rizki R., S.Hum., M.Pd.', name: 'Febrian Rizki R., S.Hum., M.Pd.' },
    { id: 42, school: 'SMP IT NURUL IHSAN', rawName: 'Ali Da\'i Al Mahdi, S.Kom', name: 'Ali Da\'i Al Mahdi, S.Kom.' },
    { id: 43, school: 'SMP IT ARROHMAN', rawName: 'Yogi Iskandar, S.Pd', name: 'Yogi Iskandar, S.Pd.' },
    { id: 44, school: 'SMP ISLAM BIHBUL', rawName: 'Enceng, S.Pd.I.', name: 'Enceng, S.Pd.I.' }
  ];

  function normalizeGuestKey(str) {
    if (!str) return '';
    return String(str).toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function resolveGuestFromParams(params) {
    var rawGuest = params.get('to') || params.get('guest') || params.get('tamu') || '';
    var rawOrg = params.get('org') || params.get('instansi') || params.get('sekolah') || '';
    var rawId = parseInt(params.get('id') || params.get('no') || '0', 10);

    if (rawId >= 1 && rawId <= GUEST_DIRECTORY.length) {
      var byId = GUEST_DIRECTORY[rawId - 1];
      return {
        name: byId.name,
        org: 'Kepala Sekolah · ' + byId.school,
        school: byId.school
      };
    }

    var cleanGuest = rawGuest.trim().replace(/\+/g, ' ');
    var cleanOrg = rawOrg.trim().replace(/\+/g, ' ');
    if (!cleanGuest) return null;

    var guestNorm = normalizeGuestKey(cleanGuest);
    var orgNorm = normalizeGuestKey(cleanOrg);

    for (var i = 0; i < GUEST_DIRECTORY.length; i++) {
      var item = GUEST_DIRECTORY[i];
      var matchName = normalizeGuestKey(item.rawName) === guestNorm || normalizeGuestKey(item.name) === guestNorm;
      if (matchName) {
        if (orgNorm && normalizeGuestKey(item.school) !== orgNorm) {
          continue;
        }
        return {
          name: item.name,
          org: 'Kepala Sekolah · ' + item.school,
          school: item.school
        };
      }
    }

    // Check if guest string includes school in parentheses e.g. "Kurnia Heryana, S.Pd. (SMPN SATAP 3 CULAMEGA)"
    for (var j = 0; j < GUEST_DIRECTORY.length; j++) {
      var rec = GUEST_DIRECTORY[j];
      var combinedRaw = normalizeGuestKey(rec.rawName + rec.school);
      var combinedClean = normalizeGuestKey(rec.name + rec.school);
      if (guestNorm === combinedRaw || guestNorm === combinedClean) {
        return {
          name: rec.name,
          org: 'Kepala Sekolah · ' + rec.school,
          school: rec.school
        };
      }
    }

    return {
      name: cleanGuest,
      org: cleanOrg ? cleanOrg : 'Tamu Kehormatan · Tasikmalaya',
      school: cleanOrg
    };
  }

  function initCoverGate() {
    var coverGate = document.getElementById('cover-gate');
    var openBtn = document.getElementById('open-invitation-btn');
    if (!coverGate || !openBtn) return;

    var isCoverOpen = false;

    if (lenisInstance && typeof lenisInstance.stop === 'function') {
      lenisInstance.stop();
    }

    function preventCoverScroll(e) {
      if (isCoverOpen) return;
      if (e.cancelable) {
        e.preventDefault();
      }
    }

    function preventCoverKeys(e) {
      if (isCoverOpen) return;
      var scrollKeys = [' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'End', 'Home'];
      if (scrollKeys.indexOf(e.key) !== -1) {
        e.preventDefault();
      }
    }

    window.addEventListener('wheel', preventCoverScroll, { passive: false });
    window.addEventListener('touchmove', preventCoverScroll, { passive: false });
    window.addEventListener('keydown', preventCoverKeys, { passive: false });

    function unlockInvitation() {
      if (isCoverOpen) return;
      isCoverOpen = true;

      window.removeEventListener('wheel', preventCoverScroll, { passive: false });
      window.removeEventListener('touchmove', preventCoverScroll, { passive: false });
      window.removeEventListener('keydown', preventCoverKeys, { passive: false });

      if (lenisInstance && typeof lenisInstance.start === 'function') {
        lenisInstance.start();
      }

      ensureAudioContext();
      if (bgAudio) {
        userManuallyPaused = false;
        hasAutoStarted = true;
        bgAudio.muted = false;
        if (bgAudio.paused) {
          bgAudio.volume = 0.10;
          var p = bgAudio.play();
          if (p !== undefined) {
            p.then(function () {
              fadeInAudio(1000);
            }).catch(function () {});
          }
        } else {
          fadeInAudio(1000);
        }
      }
      playTactileClick(329.63);

      coverGate.classList.add('is-opening');

      setTimeout(function () {
        coverGate.hidden = true;
        window.scrollTo({ top: 0, behavior: 'instant' });
        if (typeof window.ScrollTrigger !== 'undefined') {
          window.ScrollTrigger.refresh();
        }
        checkElementsInView();
      }, 820);
    }

    openBtn.addEventListener('click', unlockInvitation);
  }

  function initGuestAndCountdown() {
    var params = new URLSearchParams(window.location.search);
    var resolved = resolveGuestFromParams(params);

    var coverNameEl = document.getElementById('cover-guest-name');
    var coverOrgEl = document.getElementById('cover-guest-org');
    var guestDisplay = document.getElementById('guest-name-display');
    var guestOrgDisplay = document.getElementById('guest-org-display');
    var rsvpNameInput = document.getElementById('rsvp-name');

    if (resolved) {
      if (coverNameEl) coverNameEl.textContent = resolved.name;
      if (coverOrgEl) coverOrgEl.textContent = resolved.org;
      if (guestDisplay) guestDisplay.textContent = resolved.name;
      if (guestOrgDisplay) {
        guestOrgDisplay.textContent = resolved.school
          ? (resolved.org + ' · Sabtu, 07 November 2026')
          : 'Sabtu, 07 November 2026 · Aula Universitas KH. Ruhiat, Tasikmalaya';
      }
      if (rsvpNameInput) {
        rsvpNameInput.value = resolved.school
          ? (resolved.name + ' (' + resolved.school + ')')
          : resolved.name;
      }
    }

    if (rsvpNameInput && guestDisplay) {
      rsvpNameInput.addEventListener('input', function () {
        var val = rsvpNameInput.value.trim();
        var fallback = resolved ? resolved.name : 'Sahabat & Keluarga Terkasih';
        guestDisplay.textContent = val.length > 0 ? val : fallback;
        if (coverNameEl) {
          coverNameEl.textContent = val.length > 0 ? val : fallback;
        }
      });
    }

    var elDays = document.getElementById('cd-days');
    var elHours = document.getElementById('cd-hours');
    var elMins = document.getElementById('cd-mins');
    var elSecs = document.getElementById('cd-secs');
    if (!elDays || !elHours || !elMins || !elSecs) return;

    // Target: Sabtu, 07 November 2026 Pukul 09.00 WIB
    var targetTime = new Date('2026-11-07T09:00:00+07:00').getTime();

    function updateCountdown() {
      var now = Date.now();
      var diff = Math.max(0, targetTime - now);

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var mins = Math.floor((diff / (1000 * 60)) % 60);
      var secs = Math.floor((diff / 1000) % 60);

      elDays.textContent = String(days);
      elHours.textContent = String(hours);
      elMins.textContent = String(mins);
      elSecs.textContent = String(secs);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ------------------------------------------------------------------
     8. BACKGROUND AUDIO (FIX YOU - CUT) & TACTILE CLICKS
     ------------------------------------------------------------------ */
  var audioCtx = null;
  var soundEnabled = false;

  function ensureAudioContext() {
    if (!audioCtx) {
      var AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTactileClick(freq) {
    if (!soundEnabled || !audioCtx) return;
    try {
      var now = audioCtx.currentTime;
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq || 196, now);
      osc.frequency.exponentialRampToValueAtTime(65, now + 0.065);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      // Ignore autoplay errors
    }
  }

  var bgAudio = null;
  var fadeTimer = null;
  var targetVolume = 0.75;
  var hasAutoStarted = false;
  var isPlayPending = false;
  var userManuallyPaused = false;
  var activationPollTimer = null;

  function fadeInAudio(durationMs) {
    if (!bgAudio) return;
    if (fadeTimer) {
      clearInterval(fadeTimer);
      fadeTimer = null;
    }
    var totalMs = durationMs || 1000;
    var startVol = 0.10;
    bgAudio.volume = startVol;
    var startTime = Date.now();

    fadeTimer = setInterval(function () {
      if (!bgAudio || bgAudio.paused) {
        clearInterval(fadeTimer);
        fadeTimer = null;
        return;
      }
      var elapsed = Date.now() - startTime;
      var progress = Math.min(1, elapsed / totalMs);
      var newVol = startVol + (targetVolume - startVol) * progress;
      bgAudio.volume = Number(Math.min(targetVolume, Math.max(0, newVol)).toFixed(3));

      if (progress >= 1) {
        clearInterval(fadeTimer);
        fadeTimer = null;
      }
    }, 50);
  }

  function initSoundToggle() {
    var toggleBtn = document.getElementById('sound-toggle');
    var labelEl = document.getElementById('sound-label');
    bgAudio = document.getElementById('bg-music');
    if (!toggleBtn || !labelEl || !bgAudio) return;

    if (!bgAudio.src || bgAudio.src === '') {
      bgAudio.src = 'assets/fix-you-cut.mp3';
    }
    bgAudio.preload = 'auto';

    function setPlayingState(playing) {
      soundEnabled = playing;
      toggleBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
      labelEl.textContent = playing ? 'Jeda Musik' : 'Putar Musik';
    }

    var unlockEvents = [
      'pointerdown',
      'mousedown',
      'touchstart',
      'touchend',
      'click',
      'keydown',
      'scroll',
      'wheel'
    ];

    function removeUnlockListeners() {
      unlockEvents.forEach(function (evt) {
        window.removeEventListener(evt, onUnlockGesture, true);
        document.removeEventListener(evt, onUnlockGesture, true);
      });
      if (activationPollTimer) {
        clearInterval(activationPollTimer);
        activationPollTimer = null;
      }
    }

    function attemptAutoPlay() {
      if (hasAutoStarted || isPlayPending || userManuallyPaused || !bgAudio) return;

      if (!bgAudio.paused) {
        hasAutoStarted = true;
        ensureAudioContext();
        removeUnlockListeners();
        setPlayingState(true);
        fadeInAudio(1000);
        return;
      }

      isPlayPending = true;
      bgAudio.muted = false;
      bgAudio.volume = 0.10;

      var playPromise = bgAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(function () {
          isPlayPending = false;
          hasAutoStarted = true;
          ensureAudioContext();
          removeUnlockListeners();
          setPlayingState(true);
          fadeInAudio(1000);
        }).catch(function () {
          isPlayPending = false;
        });
      } else {
        isPlayPending = false;
      }
    }

    function onUnlockGesture(e) {
      if (hasAutoStarted || userManuallyPaused) {
        removeUnlockListeners();
        return;
      }
      if (e && e.target && e.target.closest && e.target.closest('#sound-toggle')) {
        return;
      }
      attemptAutoPlay();
    }

    unlockEvents.forEach(function (evt) {
      window.addEventListener(evt, onUnlockGesture, { capture: true, passive: true });
      document.addEventListener(evt, onUnlockGesture, { capture: true, passive: true });
    });

    activationPollTimer = setInterval(function () {
      if (hasAutoStarted || userManuallyPaused) {
        removeUnlockListeners();
        return;
      }
      if (navigator.userActivation && (navigator.userActivation.isActive || navigator.userActivation.hasBeenActive)) {
        attemptAutoPlay();
      }
    }, 150);

    toggleBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      ensureAudioContext();
      removeUnlockListeners();

      if (bgAudio.paused) {
        userManuallyPaused = false;
        hasAutoStarted = true;
        bgAudio.muted = false;
        var promise = bgAudio.play();
        if (promise !== undefined) {
          promise.then(function () {
            setPlayingState(true);
            fadeInAudio(1000);
          }).catch(function () {});
        }
      } else {
        userManuallyPaused = true;
        if (fadeTimer) {
          clearInterval(fadeTimer);
          fadeTimer = null;
        }
        bgAudio.pause();
        setPlayingState(false);
      }
    });

    bgAudio.addEventListener('play', function () {
      setPlayingState(true);
    });
    bgAudio.addEventListener('pause', function () {
      setPlayingState(false);
    });
    bgAudio.addEventListener('ended', function () {
      setPlayingState(false);
    });

    attemptAutoPlay();
    bgAudio.addEventListener('canplay', attemptAutoPlay, { once: true });
    bgAudio.addEventListener('loadeddata', attemptAutoPlay, { once: true });
    window.addEventListener('load', attemptAutoPlay, { once: true });
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible' && !hasAutoStarted && !userManuallyPaused) {
        attemptAutoPlay();
      }
    });
  }

  /* ------------------------------------------------------------------
     9. COPY REKENING & QRIS GENERATOR
     ------------------------------------------------------------------ */
  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve) {
      var temp = document.createElement('textarea');
      temp.value = text;
      temp.style.position = 'fixed';
      temp.style.left = '-9999px';
      document.body.appendChild(temp);
      temp.select();
      try {
        document.execCommand('copy');
      } catch (e) {
        // Ignore fallback error
      }
      document.body.removeChild(temp);
      resolve();
    });
  }

  function initCopyButtons() {
    var copyButtons = document.querySelectorAll('[data-copy]');
    copyButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var rawNumber = btn.getAttribute('data-copy');
        var labelSpan = btn.querySelector('[data-copy-label]');
        if (!rawNumber || !labelSpan) return;

        var originalLabel = labelSpan.getAttribute('data-orig') || labelSpan.textContent;
        labelSpan.setAttribute('data-orig', originalLabel);

        copyTextToClipboard(rawNumber).then(function () {
          playTactileClick(293.66);
          btn.classList.add('is-copied');
          labelSpan.textContent = 'Tersalin (' + rawNumber + ')';

          setTimeout(function () {
            btn.classList.remove('is-copied');
            labelSpan.textContent = originalLabel;
          }, 2600);
        });
      });
    });
  }

  function initQRISFeatures() {
    var downloadBtn = document.getElementById('download-qris-btn');
    var zoomBtn = document.getElementById('zoom-qris-btn');
    var modal = document.getElementById('qris-modal');
    var closeBtn = document.getElementById('close-qris-modal');

    if (downloadBtn) {
      downloadBtn.addEventListener('click', function () {
        playTactileClick(329.63);
        var link = document.createElement('a');
        link.href = 'assets/qr-arie.png';
        link.download = 'QRIS-Pernikahan-Fajar-Salsa.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    function openModal() {
      if (!modal) return;
      playTactileClick(246.94);
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      if (!modal) return;
      playTactileClick(220);
      modal.hidden = true;
      document.body.style.overflow = '';
      if (zoomBtn) zoomBtn.focus();
    }

    if (zoomBtn) zoomBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal && !modal.hidden) {
        closeModal();
      }
    });
  }

  /* ------------------------------------------------------------------
     10. RSVP & DOA RESTU CRUD + GOOGLE SHEETS PUBLIC SYNC (NO LOGIN)
     ------------------------------------------------------------------ */
  var STORAGE_KEY = 'fajar_salsa_rsvp_crud_v1';
  var OWN_IDS_KEY = 'fajar_salsa_own_wish_ids_v1';

  // Opsi A (Google Sheets Web App URL): Tempel URL Web App Google Apps Script Anda di bawah ini
  // agar semua ucapan & kehadiran tersimpan di Google Spreadsheet dan tampil publik untuk semua tamu tanpa login.
  var GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbwySsbqbeNGduU0UqdPN1HeiV-8vUnhlH2Sh5kUSLUiisjvcfQRDDVhbDkqqbGKy0Nhmw/exec';

  var defaultWishes = [
    {
      id: 'default-1',
      name: 'Keluarga Besar Singaparna',
      status: 'Hadir di Aula Univ. KH. Ruhiat',
      guests: 'Keluarga',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama’a bainakuma fii khair. Selamat menempuh hidup baru untuk Fajar dan Salsa, semoga menjadi keluarga sakinah, mawaddah, warahmah.',
      editable: false
    },
    {
      id: 'default-2',
      name: 'Rekan Guru & Dosen Tasikmalaya',
      status: 'Hadir di Aula Univ. KH. Ruhiat',
      guests: '2 Orang',
      message: 'Selamat berbahagia Bapak M. Fajar Ardi Alhari, S.Pd. dan Ibu Salsabila Rahayu, S.Pd. InsyaAllah kami hadir di Aula Universitas KH. Ruhiat Cipasung pada Sabtu pagi.',
      editable: false
    },
    {
      id: 'default-3',
      name: 'Aldi Firmansyah · Bandung',
      status: 'Kirim Doa & Tanda Kasih',
      guests: '-',
      message: 'Mohon maaf belum bisa hadir langsung ke Tasikmalaya karena tugas luar kota. Doa terbaik untuk Fajar dan Salsa, tanda kasih sudah dititipkan melalui QRIS di bawah.',
      editable: false
    }
  ];

  function getOwnWishIds() {
    try {
      var raw = window.localStorage.getItem(OWN_IDS_KEY);
      if (!raw) return {};
      return JSON.parse(raw) || {};
    } catch (e) {
      return {};
    }
  }

  function markOwnWishId(id, isOwn) {
    try {
      var map = getOwnWishIds();
      if (isOwn) {
        map[id] = true;
      } else {
        delete map[id];
      }
      window.localStorage.setItem(OWN_IDS_KEY, JSON.stringify(map));
    } catch (e) {
      // Ignore storage errors
    }
  }

  function loadWishesFromStorage() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultWishes.slice();
      var parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      // Fallback if localStorage is blocked
    }
    return defaultWishes.slice();
  }

  function saveWishesToStorage(list) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      // Ignore storage quota errors
    }
  }

  function isAttendingStatus(statusStr) {
    if (!statusStr) return false;
    var lower = statusStr.toLowerCase();
    return lower.indexOf('hadir') !== -1 && lower.indexOf('tidak') === -1 && lower.indexOf('berhalangan') === -1;
  }

  function formatWishBadge(w) {
    if (isAttendingStatus(w.status)) {
      var pax = w.guests && w.guests !== '-' ? w.guests : '2 Orang';
      return 'Hadir · ' + pax;
    }
    return 'Kirim Doa & Tanda Kasih';
  }

  function syncWishToGoogleSheets(action, wishObj) {
    if (!GOOGLE_SHEETS_API_URL || GOOGLE_SHEETS_API_URL.trim() === '') {
      return Promise.resolve(false);
    }
    var payload = {
      action: action,
      id: wishObj.id,
      name: wishObj.name,
      status: wishObj.status,
      guests: wishObj.guests || '-',
      message: wishObj.message,
      timestamp: new Date().toISOString()
    };
    return fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).then(function () {
      return true;
    }).catch(function () {
      return false;
    });
  }

  function stripEmoji(str) {
    if (!str) return '';
    return String(str)
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu, '')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  function fetchWishesFromGoogleSheets() {
    if (!GOOGLE_SHEETS_API_URL || GOOGLE_SHEETS_API_URL.trim() === '') {
      return Promise.resolve(null);
    }
    return fetch(GOOGLE_SHEETS_API_URL + '?t=' + String(Date.now()), {
      method: 'GET'
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      var rows = Array.isArray(data) ? data : (data && Array.isArray(data.data) ? data.data : null);
      if (!rows) return null;
      var ownIds = getOwnWishIds();
      return rows.map(function (r) {
        var rId = String(r.id || ('sheet-' + Math.random()));
        return {
          id: rId,
          name: stripEmoji(r.name) || 'Sahabat Fajar & Salsa',
          status: String(r.status || 'Hadir di Aula Univ. KH. Ruhiat'),
          guests: String(r.guests || '2 Orang'),
          message: stripEmoji(r.message) || '',
          editable: Boolean(ownIds[rId] || r.editable)
        };
      });
    }).catch(function () {
      return null;
    });
  }

  function initRSVPFormAndCRUD() {
    var form = document.getElementById('rsvp-form');
    var editIdInput = document.getElementById('rsvp-edit-id');
    var nameInput = document.getElementById('rsvp-name');
    var statusSelect = document.getElementById('rsvp-status');
    var guestsSelect = document.getElementById('rsvp-guests');
    var guestsGroup = document.getElementById('rsvp-guests-group');
    var messageInput = document.getElementById('rsvp-message');
    var submitBtn = document.getElementById('rsvp-submit-btn');
    var cancelEditBtn = document.getElementById('rsvp-cancel-edit');
    var feedback = document.getElementById('rsvp-feedback');
    var feed = document.getElementById('wishes-feed');
    var countBadge = document.getElementById('rsvp-count-badge');
    if (!form || !feed) return;

    var wishes = loadWishesFromStorage();

    function updateGuestsFieldVisibility() {
      if (!statusSelect || !guestsSelect) return;
      var attending = isAttendingStatus(statusSelect.value);
      if (guestsGroup) {
        guestsGroup.style.opacity = attending ? '1' : '0.55';
      }
      guestsSelect.disabled = !attending;
    }

    if (statusSelect) {
      statusSelect.addEventListener('change', updateGuestsFieldVisibility);
      updateGuestsFieldVisibility();
    }

    function renderWishes() {
      feed.innerHTML = '';
      var attendingCount = 0;
      wishes.forEach(function (w) {
        if (isAttendingStatus(w.status)) attendingCount++;
      });

      if (countBadge) {
        countBadge.textContent = String(wishes.length) + ' Ucapan · ' + String(attendingCount) + ' Hadir';
      }

      wishes.forEach(function (w, idx) {
        var item = document.createElement('article');
        item.className = 'wish-item is-inview';
        item.setAttribute('data-wish-id', w.id);
        item.setAttribute('data-reveal', '');
        item.setAttribute('data-anim', 'fade-up');
        item.style.setProperty('--stagger', String(idx % 4));

        var head = document.createElement('div');
        head.className = 'wish-head';

        var author = document.createElement('span');
        author.className = 'wish-author';
        author.textContent = stripEmoji(w.name);

        var badge = document.createElement('span');
        badge.className = 'wish-badge';
        badge.textContent = formatWishBadge(w);

        head.appendChild(author);
        head.appendChild(badge);

        var body = document.createElement('p');
        body.className = 'wish-text prose-justify';
        body.textContent = stripEmoji(w.message);

        item.appendChild(head);
        item.appendChild(body);

        if (w.editable) {
          var actions = document.createElement('div');
          actions.className = 'wish-actions';

          var editBtn = document.createElement('button');
          editBtn.type = 'button';
          editBtn.className = 'wish-action-btn';
          editBtn.textContent = 'Ubah Ucapan';
          editBtn.addEventListener('click', function () {
            startEditWish(w.id);
          });

          var delBtn = document.createElement('button');
          delBtn.type = 'button';
          delBtn.className = 'wish-action-btn';
          delBtn.textContent = 'Hapus';
          delBtn.addEventListener('click', function () {
            deleteWish(w.id);
          });

          actions.appendChild(editBtn);
          actions.appendChild(delBtn);
          item.appendChild(actions);
        }

        feed.appendChild(item);
      });
      observeRevealElements(feed);
    }

    function startEditWish(id) {
      var target = null;
      for (var i = 0; i < wishes.length; i++) {
        if (wishes[i].id === id) {
          target = wishes[i];
          break;
        }
      }
      if (!target) return;

      if (editIdInput) editIdInput.value = target.id;
      if (nameInput) nameInput.value = target.name;
      if (statusSelect) statusSelect.value = target.status;
      if (guestsSelect && target.guests && target.guests !== '-') {
        guestsSelect.value = target.guests;
      }
      updateGuestsFieldVisibility();
      if (messageInput) messageInput.value = target.message;
      if (submitBtn) submitBtn.textContent = 'Simpan Perubahan';
      if (cancelEditBtn) cancelEditBtn.hidden = false;
      if (feedback) feedback.textContent = 'Mode ubah aktif: silakan perbarui data atau ucapan Anda.';
      if (nameInput) nameInput.focus();
    }

    function resetEditMode() {
      if (editIdInput) editIdInput.value = '';
      if (submitBtn) submitBtn.textContent = 'Simpan Konfirmasi & Doa';
      if (cancelEditBtn) cancelEditBtn.hidden = true;
    }

    function deleteWish(id) {
      var deletedTarget = null;
      wishes = wishes.filter(function (w) {
        if (w.id === id) deletedTarget = w;
        return w.id !== id;
      });
      markOwnWishId(id, false);
      saveWishesToStorage(wishes);
      renderWishes();
      resetEditMode();
      if (deletedTarget) {
        syncWishToGoogleSheets('delete', deletedTarget);
      }
      if (feedback) {
        feedback.textContent = 'Ucapan Anda telah dihapus.';
      }
    }

    if (cancelEditBtn) {
      cancelEditBtn.addEventListener('click', function () {
        resetEditMode();
        if (messageInput) messageInput.value = '';
        if (feedback) feedback.textContent = '';
      });
    }

    renderWishes();

    // Load live public wishes from Google Sheets if URL is configured
    fetchWishesFromGoogleSheets().then(function (cloudList) {
      if (cloudList && cloudList.length > 0) {
        wishes = cloudList.concat(defaultWishes);
        saveWishesToStorage(wishes);
        renderWishes();
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Sahabat Fajar & Salsa';
      var status = statusSelect ? statusSelect.value : 'Hadir di Aula Univ. KH. Ruhiat';
      var isAttending = isAttendingStatus(status);
      var guests = isAttending && guestsSelect ? guestsSelect.value : '-';
      var message = messageInput && messageInput.value.trim()
        ? messageInput.value.trim()
        : 'Selamat menempuh hidup baru M. Fajar Ardi Alhari, S.Pd. & Salsabila Rahayu, S.Pd.! Semoga sakinah, mawaddah, warahmah.';

      playTactileClick(369.99);

      var editingId = editIdInput ? editIdInput.value : '';
      if (editingId) {
        var updatedObj = null;
        for (var i = 0; i < wishes.length; i++) {
          if (wishes[i].id === editingId) {
            wishes[i].name = name;
            wishes[i].status = status;
            wishes[i].guests = guests;
            wishes[i].message = message;
            updatedObj = wishes[i];
            break;
          }
        }
        saveWishesToStorage(wishes);
        renderWishes();
        resetEditMode();
        if (updatedObj) {
          syncWishToGoogleSheets('update', updatedObj);
        }
        if (feedback) {
          feedback.textContent = 'Perubahan ucapan dari ' + name + ' berhasil disimpan.';
        }
      } else {
        var newWish = {
          id: 'wish-' + String(Date.now()),
          name: name,
          status: status,
          guests: guests,
          message: message,
          editable: true
        };
        markOwnWishId(newWish.id, true);
        wishes.unshift(newWish);
        saveWishesToStorage(wishes);
        renderWishes();
        if (feed.scrollTo) {
          feed.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          feed.scrollTop = 0;
        }
        syncWishToGoogleSheets('create', newWish);

        if (feedback) {
          feedback.textContent = !isAttending
            ? 'Terima kasih ' + name + '! Doa restu Anda telah tampil di daftar ucapan. Silakan gunakan QRIS di bawah bila ingin menitipkan tanda kasih.'
            : 'Terima kasih ' + name + '! Konfirmasi kehadiran (' + guests + ') dan doa restu Anda telah tampil di daftar ucapan.';
        }
      }

      var guestDisplay = document.getElementById('guest-name-display');
      if (guestDisplay) {
        guestDisplay.textContent = name;
      }

      if (messageInput) {
        messageInput.value = '';
      }
    });
  }

  /* ------------------------------------------------------------------
     11. MOBILE NAVIGATION ACTIVE SECTION SCROLL-SPY
     ------------------------------------------------------------------ */
  function initMobileNavScrollSpy() {
    var navLinks = document.querySelectorAll('.hero-top .nav-links a[href^="#"]');
    if (!navLinks.length || !('IntersectionObserver' in window)) return;

    var linkMap = {};
    var sections = [];
    navLinks.forEach(function (link) {
      var hash = link.getAttribute('href');
      if (!hash || hash.length < 2) return;
      var target = document.querySelector(hash);
      if (target) {
        linkMap[hash] = link;
        sections.push(target);
      }
    });

    if (!sections.length) return;

    var spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var activeHash = '#' + entry.target.id;
          navLinks.forEach(function (lnk) {
            lnk.classList.toggle('is-current', lnk.getAttribute('href') === activeHash);
          });
        }
      });
    }, { rootMargin: '-28% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (sec) {
      spyObserver.observe(sec);
    });
  }

  /* ------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initSmoothScrollAndGSAP();
    initAmbientCanvas();
    initAutoSlideshows();
    initScrollRevealsAndMotion();
    init3DTiltAndMagnetic();
    initGalleryLightbox();
    initGuestAndCountdown();
    initSoundToggle();
    initCoverGate();
    initCopyButtons();
    initQRISFeatures();
    initRSVPFormAndCRUD();
    initMobileNavScrollSpy();
  });
})();
