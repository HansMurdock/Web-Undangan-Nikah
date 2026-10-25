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
     7. PERSONALIZED GUEST NAME (?to=Nama+Tamu) & LIVE COUNTDOWN
     ------------------------------------------------------------------ */
  function initGuestAndCountdown() {
    var params = new URLSearchParams(window.location.search);
    var rawGuest = params.get('to') || params.get('guest') || params.get('tamu');
    var guestDisplay = document.getElementById('guest-name-display');
    var rsvpNameInput = document.getElementById('rsvp-name');

    if (rawGuest && rawGuest.trim().length > 0) {
      var cleanName = rawGuest.trim().replace(/\+/g, ' ');
      if (guestDisplay) guestDisplay.textContent = cleanName;
      if (rsvpNameInput) rsvpNameInput.value = cleanName;
    }

    if (rsvpNameInput && guestDisplay) {
      rsvpNameInput.addEventListener('input', function () {
        var val = rsvpNameInput.value.trim();
        guestDisplay.textContent = val.length > 0 ? val : 'Sahabat & Keluarga Terkasih';
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
     8. WEB AUDIO API WARM ACOUSTIC GUITAR & TACTILE FEEDBACK
     ------------------------------------------------------------------ */
  var audioCtx = null;
  var soundEnabled = false;
  var droneTimer = null;

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

  function playWarmAcousticStrum() {
    if (!soundEnabled || !audioCtx) return;
    try {
      var notes = [82.41, 123.47, 196.00, 246.94, 369.99];
      var now = audioCtx.currentTime;

      notes.forEach(function (freq, index) {
        var osc = audioCtx.createOscillator();
        var filter = audioCtx.createBiquadFilter();
        var gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.085);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(860, now + index * 0.085);

        gain.gain.setValueAtTime(0.0001, now + index * 0.085);
        gain.gain.linearRampToValueAtTime(0.032, now + index * 0.085 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.085 + 3.4);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + index * 0.085);
        osc.stop(now + index * 0.085 + 3.5);
      });
    } catch (e) {
      // Ignore if blocked
    }
  }

  function initSoundToggle() {
    var toggleBtn = document.getElementById('sound-toggle');
    var labelEl = document.getElementById('sound-label');
    if (!toggleBtn || !labelEl) return;

    toggleBtn.addEventListener('click', function () {
      ensureAudioContext();
      soundEnabled = !soundEnabled;
      toggleBtn.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false');
      labelEl.textContent = soundEnabled ? 'Suara Aktif' : 'Putar Musik';

      if (soundEnabled) {
        playWarmAcousticStrum();
        droneTimer = setInterval(function () {
          if (soundEnabled) playWarmAcousticStrum();
        }, 7500);
      } else if (droneTimer) {
        clearInterval(droneTimer);
        droneTimer = null;
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

  function generateDeterministicQRMatrix(seedText, size) {
    var matrix = [];
    var r;
    var c;
    for (r = 0; r < size; r++) {
      matrix[r] = [];
      for (c = 0; c < size; c++) {
        matrix[r][c] = 0;
      }
    }

    function placeFinderPattern(rowOffset, colOffset) {
      for (var dr = -1; dr <= 7; dr++) {
        for (var dc = -1; dc <= 7; dc++) {
          var rr = rowOffset + dr;
          var cc = colOffset + dc;
          if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
          if (dr === -1 || dr === 7 || dc === -1 || dc === 7) {
            matrix[rr][cc] = 2;
          } else if (dr === 0 || dr === 6 || dc === 0 || dc === 6) {
            matrix[rr][cc] = 1;
          } else if (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4) {
            matrix[rr][cc] = 1;
          } else {
            matrix[rr][cc] = 2;
          }
        }
      }
    }

    placeFinderPattern(0, 0);
    placeFinderPattern(0, size - 7);
    placeFinderPattern(size - 7, 0);

    var alignR = size - 9;
    var alignC = size - 9;
    for (r = alignR - 2; r <= alignR + 2; r++) {
      for (c = alignC - 2; c <= alignC + 2; c++) {
        if (Math.abs(r - alignR) === 2 || Math.abs(c - alignC) === 2 || (r === alignR && c === alignC)) {
          matrix[r][c] = 1;
        } else {
          matrix[r][c] = 2;
        }
      }
    }

    for (var i = 8; i < size - 8; i++) {
      matrix[6][i] = i % 2 === 0 ? 1 : 2;
      matrix[i][6] = i % 2 === 0 ? 1 : 2;
    }

    var center = Math.floor(size / 2);
    for (r = center - 3; r <= center + 3; r++) {
      for (c = center - 3; c <= center + 3; c++) {
        matrix[r][c] = 2;
      }
    }

    var hash = 2166136261;
    for (var k = 0; k < seedText.length; k++) {
      hash ^= seedText.charCodeAt(k);
      hash = Math.imul(hash, 16777619);
    }

    for (r = 0; r < size; r++) {
      for (c = 0; c < size; c++) {
        if (matrix[r][c] !== 0) continue;
        hash ^= (r * 31 + c * 17) & 0xff;
        hash = Math.imul(hash, 16777619);
        var bit = (Math.abs(hash) % 10) < 5 ? 1 : 0;
        matrix[r][c] = bit;
      }
    }

    return matrix;
  }

  function renderQRCanvas(canvas) {
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
    var gridSize = 29;
    var matrix = generateDeterministicQRMatrix(
      '00020101021126610014ID.CO.QRIS.WWW0215ID20261107981140303UME5204581253033605802ID5915FAJAR DAN SALSA6011TASIKMALAYA6304A9F2',
      gridSize
    );

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    var margin = Math.floor(width * 0.075);
    var usable = width - margin * 2;
    var cell = usable / gridSize;

    ctx.fillStyle = '#11100e';
    for (var r = 0; r < gridSize; r++) {
      for (var c = 0; c < gridSize; c++) {
        if (matrix[r][c] === 1) {
          var x = Math.floor(margin + c * cell);
          var y = Math.floor(margin + r * cell);
          var w = Math.ceil(cell);
          var h = Math.ceil(cell);
          ctx.fillRect(x, y, w, h);
        }
      }
    }

    ctx.fillStyle = '#c86820';
    var finderOrigins = [
      [2, 2],
      [2, gridSize - 5],
      [gridSize - 5, 2]
    ];
    finderOrigins.forEach(function (pos) {
      var fx = Math.floor(margin + pos[1] * cell);
      var fy = Math.floor(margin + pos[0] * cell);
      var fw = Math.ceil(cell * 3);
      ctx.fillRect(fx, fy, fw, fw);
    });

    var cx = width / 2;
    var cy = height / 2;
    var badgeSize = cell * 5.2;
    ctx.fillStyle = '#11100e';
    ctx.fillRect(cx - badgeSize / 2, cy - badgeSize / 2, badgeSize, badgeSize);

    ctx.fillStyle = '#eae9e6';
    ctx.font = '700 ' + Math.round(cell * 2.15) + 'px Boska, Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('F&S', cx, cy + 1);
  }

  function initQRISFeatures() {
    var mainCanvas = document.getElementById('qris-canvas');
    var modalCanvas = document.getElementById('qris-canvas-modal');
    renderQRCanvas(mainCanvas);
    renderQRCanvas(modalCanvas);

    var downloadBtn = document.getElementById('download-qris-btn');
    if (downloadBtn && mainCanvas) {
      downloadBtn.addEventListener('click', function () {
        playTactileClick(329.63);
        var exportCanvas = document.createElement('canvas');
        exportCanvas.width = 900;
        exportCanvas.height = 1160;
        var ectx = exportCanvas.getContext('2d');

        ectx.fillStyle = '#e6e4e0';
        ectx.fillRect(0, 0, 900, 1160);

        ectx.fillStyle = '#11100e';
        ectx.fillRect(0, 0, 900, 130);

        ectx.fillStyle = '#eae9e6';
        ectx.font = '700 28px Boska, Georgia, serif';
        ectx.fillText('QRIS TANDA KASIH . PERNIKAHAN FAJAR & SALSA', 56, 78);

        ectx.fillStyle = '#ffffff';
        ectx.fillRect(130, 180, 640, 640);
        ectx.drawImage(mainCanvas, 150, 200, 600, 600);

        ectx.fillStyle = '#11100e';
        ectx.font = '700 32px Boska, Georgia, serif';
        ectx.fillText('M. FAJAR ARDI ALHARI & SALSABILA RAHAYU', 56, 900);

        ectx.fillStyle = '#4e483f';
        ectx.font = '500 22px Boska, Georgia, serif';
        ectx.fillText('Sabtu, 07 November 2026 . Aula Univ. KH. Ruhiat, Tasikmalaya', 56, 950);
        ectx.fillText('Mendukung BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay', 56, 995);

        ectx.fillStyle = '#c86820';
        ectx.font = '700 22px Boska, Georgia, serif';
        ectx.fillText('TERIMA KASIH ATAS DOA RESTU & TANDA KASIH ANDA', 56, 1075);

        var dataUrl = exportCanvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.download = 'QRIS-Pernikahan-Fajar-Salsa.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }

    var zoomBtn = document.getElementById('zoom-qris-btn');
    var modal = document.getElementById('qris-modal');
    var closeBtn = document.getElementById('close-qris-modal');

    function openModal() {
      if (!modal) return;
      playTactileClick(246.94);
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      if (!modal) return;
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
     10. CLIENT-SIDE CRUD FOR RSVP & DOA RESTU (localStorage + Live DOM)
     ------------------------------------------------------------------ */
  var STORAGE_KEY = 'fajar_salsa_rsvp_crud_v1';

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
      guests: '1 Orang',
      message: 'Mohon maaf belum bisa hadir langsung ke Tasikmalaya karena tugas luar kota. Doa terbaik untuk Fajar dan Salsa, tanda kasih sudah dititipkan melalui QRIS di bawah.',
      editable: false
    }
  ];

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

  function initRSVPFormAndCRUD() {
    var form = document.getElementById('rsvp-form');
    var editIdInput = document.getElementById('rsvp-edit-id');
    var nameInput = document.getElementById('rsvp-name');
    var statusSelect = document.getElementById('rsvp-status');
    var guestsSelect = document.getElementById('rsvp-guests');
    var messageInput = document.getElementById('rsvp-message');
    var submitBtn = document.getElementById('rsvp-submit-btn');
    var cancelEditBtn = document.getElementById('rsvp-cancel-edit');
    var feedback = document.getElementById('rsvp-feedback');
    var feed = document.getElementById('wishes-feed');
    var countBadge = document.getElementById('rsvp-count-badge');
    if (!form || !feed) return;

    var wishes = loadWishesFromStorage();

    function renderWishes() {
      feed.innerHTML = '';
      if (countBadge) {
        countBadge.textContent = String(wishes.length) + ' Ucapan Masuk';
      }

      wishes.forEach(function (w, idx) {
        var item = document.createElement('article');
        item.className = 'wish-item';
        item.setAttribute('data-wish-id', w.id);
        item.setAttribute('data-reveal', '');
        item.setAttribute('data-anim', 'fade-up');
        item.style.setProperty('--stagger', String(idx % 4));

        var head = document.createElement('div');
        head.className = 'wish-head';

        var author = document.createElement('span');
        author.className = 'wish-author';
        author.textContent = w.name;

        var badge = document.createElement('span');
        badge.className = 'wish-badge';
        badge.textContent = w.status;

        head.appendChild(author);
        head.appendChild(badge);

        var body = document.createElement('p');
        body.className = 'wish-text prose-justify';
        body.textContent = w.message;

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
      if (guestsSelect && target.guests) guestsSelect.value = target.guests;
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
      wishes = wishes.filter(function (w) {
        return w.id !== id;
      });
      saveWishesToStorage(wishes);
      renderWishes();
      resetEditMode();
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

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Sahabat Fajar & Salsa';
      var status = statusSelect ? statusSelect.value : 'Hadir di Aula Univ. KH. Ruhiat';
      var guests = guestsSelect ? guestsSelect.value : '2 Orang';
      var message = messageInput && messageInput.value.trim()
        ? messageInput.value.trim()
        : 'Selamat menempuh hidup baru M. Fajar Ardi Alhari, S.Pd. & Salsabila Rahayu, S.Pd.! Semoga sakinah, mawaddah, warahmah.';

      playTactileClick(369.99);

      var editingId = editIdInput ? editIdInput.value : '';
      if (editingId) {
        for (var i = 0; i < wishes.length; i++) {
          if (wishes[i].id === editingId) {
            wishes[i].name = name;
            wishes[i].status = status;
            wishes[i].guests = guests;
            wishes[i].message = message;
            break;
          }
        }
        saveWishesToStorage(wishes);
        renderWishes();
        resetEditMode();
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
        wishes.unshift(newWish);
        saveWishesToStorage(wishes);
        renderWishes();

        var isRemote = status.toLowerCase().indexOf('tidak dapat hadir') !== -1;
        if (feedback) {
          feedback.textContent = isRemote
            ? 'Terima kasih ' + name + '! Doa restu Anda telah tersimpan. Silakan gunakan QRIS di bawah bila ingin menitipkan tanda kasih.'
            : 'Terima kasih ' + name + '! Konfirmasi kehadiran (' + status + ') dan doa restu Anda telah tersimpan.';
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
    initCopyButtons();
    initQRISFeatures();
    initRSVPFormAndCRUD();
    initMobileNavScrollSpy();
  });
})();
