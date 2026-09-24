/* =====================================================================
   EFECTOS EXTRA
   ---------------------------------------------------------------------
   Este archivo es independiente de app.js: agrega dos cosas sin tocar
   nada de tu contenido (config.js) ni de la lógica que ya tenías.

   1) Un fondo animado detrás de todo el sitio: una red de nodos que se
      conectan y, de vez en cuando, "cuadran" (se ponen verdes), como
      una conciliación. Rellena el espacio vacío a los lados del
      contenido en pantallas anchas.

   2) Una paleta de comandos (Ctrl/Cmd + K): un buscador de acciones
      rápidas, como el de VS Code o Linear. Sus opciones se arman
      solas leyendo los enlaces que ya existen en la página (menú,
      contacto, proyectos, CV), así que si más adelante cambias algo
      en config.js, la paleta se actualiza sola, sin tocar este archivo.
   ===================================================================== */
(function () {
  'use strict';

  const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* =====================================================================
     FONDO: red de nodos
     ===================================================================== */
  function setupBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext('2d');

    let w = 0, h = 0, dpr = 1, nodes = [], colors = {};
    const LINK_DIST = 150;

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        line: cs.getPropertyValue('--line').trim() || '#24384f',
        ok: cs.getPropertyValue('--ok').trim() || '#3fbf8f',
        accent: cs.getPropertyValue('--accent').trim() || '#5b9df0'
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(26, Math.min(70, Math.round((w * h) / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        pulse: Math.random() * Math.PI * 2
      }));
    }

    function drawFrame(animate) {
      readColors();
      ctx.clearRect(0, 0, w, h);

      if (animate) {
        nodes.forEach((n) => {
          n.x += n.vx; n.y += n.vy; n.pulse += 0.012;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        });
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d >= LINK_DIST) continue;
          // Cuando dos nodos "laten" en fase, la conexión se marca como cuadrada
          const inPhase = animate && (Math.sin(a.pulse) + Math.sin(b.pulse)) / 2 > 0.92;
          ctx.strokeStyle = inPhase ? colors.ok : colors.line;
          ctx.globalAlpha = inPhase ? 0.55 : 0.12 * (1 - d / LINK_DIST);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 0.55;
      ctx.fillStyle = colors.accent;
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
    }

    let raf = null;
    function loop() {
      drawFrame(true);
      raf = requestAnimationFrame(loop);
    }

    resize();
    if (reduceMotion) {
      drawFrame(false);
    } else {
      loop();
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (raf) cancelAnimationFrame(raf);
        resize();
        if (reduceMotion) { drawFrame(false); } else { loop(); }
      }, 150);
    });

    // Si cambian el tema (claro/oscuro), el fondo toma los colores nuevos
    // solo con volver a leer las variables en el próximo cuadro; no hace
    // falta nada extra aquí porque readColors() se llama en cada dibujo.
  }

  /* =====================================================================
     PALETA DE COMANDOS (Ctrl/Cmd + K)
     ===================================================================== */
  function setupCommandPalette() {
    const trigger = document.getElementById('cmdk-trigger');
    const overlay = document.getElementById('cmdk-overlay');
    const input = document.getElementById('cmdk-input');
    const list = document.getElementById('cmdk-list');
    const empty = document.getElementById('cmdk-empty');
    const themeToggle = document.getElementById('theme-toggle');
    const shortcutHint = document.getElementById('cmdk-shortcut-hint');
    if (!trigger || !overlay || !input || !list || !empty) return;

    // En Mac se muestra "⌘K"; en el resto, "Ctrl K"
    const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '');
    if (shortcutHint) shortcutHint.textContent = isMac ? '⌘K' : 'Ctrl K';

    const ICONS = {
      go: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M9 18l6-6-6-6"/></svg>',
      theme: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
      copy: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
      link: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>'
    };

    // Arma la lista de acciones leyendo los enlaces que app.js ya dibujó
    // en la página, en vez de repetir textos a mano.
    function buildActions() {
      const actions = [];
      const seenHref = new Set();

      document.querySelectorAll('#nav-links a').forEach((a) => {
        const href = a.getAttribute('href');
        actions.push({ label: 'Ir a ' + a.textContent, icon: ICONS.go, run: () => a.click() });
        seenHref.add(href);
      });

      const cvLink = document.querySelector('#hero-actions a.btn-ghost');
      if (cvLink && !seenHref.has(cvLink.getAttribute('href'))) {
        actions.push({ label: cvLink.textContent, icon: ICONS.link, run: () => cvLink.click() });
        seenHref.add(cvLink.getAttribute('href'));
      }

      document.querySelectorAll('#contact-list a').forEach((a) => {
        const href = a.getAttribute('href') || '';
        const dd = a.closest('dd');
        const dt = dd && dd.previousElementSibling;
        const label = dt ? dt.textContent.trim() : '';
        if (href.indexOf('mailto:') === 0) {
          const email = a.textContent.trim();
          actions.push({ label: 'Copiar correo', icon: ICONS.copy, run: () => copyText(email, 'Correo copiado') });
        } else if (!seenHref.has(href)) {
          actions.push({ label: 'Abrir ' + (label || 'enlace'), icon: ICONS.link, run: () => a.click() });
        }
        seenHref.add(href);
      });

      const moreLink = document.querySelector('#projects-more a');
      if (moreLink && !seenHref.has(moreLink.getAttribute('href'))) {
        actions.push({ label: moreLink.textContent, icon: ICONS.link, run: () => moreLink.click() });
      }

      if (themeToggle) {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        actions.push({
          label: isLight ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro',
          icon: ICONS.theme,
          run: () => themeToggle.click()
        });
      }

      return actions;
    }

    function copyText(text, okMessage) {
      const finish = () => {
        list.innerHTML = '';
        empty.hidden = false;
        empty.textContent = okMessage + ' ✓';
        setTimeout(close, 900);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(finish, finish);
      } else {
        finish();
      }
    }

    let items = [];
    let activeIndex = 0;
    let lastFocused = null;

    function renderItem(action, index) {
      const li = document.createElement('li');
      li.className = 'cmdk-item';
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');

      const iconSpan = document.createElement('span');
      iconSpan.className = 'cmdk-icon';
      iconSpan.innerHTML = action.icon; // iconos fijos definidos arriba, no vienen del usuario

      const labelSpan = document.createElement('span');
      labelSpan.textContent = action.label;

      li.append(iconSpan, labelSpan);
      li.addEventListener('mouseenter', () => setActive(index));
      li.addEventListener('click', () => choose(index));
      return li;
    }

    function render(filter) {
      const all = buildActions();
      const q = (filter || '').trim().toLowerCase();
      items = q ? all.filter((a) => a.label.toLowerCase().includes(q)) : all;
      activeIndex = 0;
      list.innerHTML = '';
      items.forEach((action, i) => list.append(renderItem(action, i)));
      empty.hidden = items.length !== 0;
      empty.textContent = 'Sin resultados';
    }

    function setActive(i) {
      if (!items.length) return;
      activeIndex = ((i % items.length) + items.length) % items.length;
      [...list.children].forEach((li, idx) => li.setAttribute('aria-selected', idx === activeIndex ? 'true' : 'false'));
      const el = list.children[activeIndex];
      if (el) el.scrollIntoView({ block: 'nearest' });
    }

    function choose(i) {
      const action = items[i];
      if (!action) return;
      close();
      setTimeout(() => action.run(), reduceMotion ? 0 : 120);
    }

    function open() {
      lastFocused = document.activeElement;
      overlay.hidden = false;
      input.value = '';
      render('');
      input.focus();
      document.addEventListener('keydown', onKeydown, true);
    }

    function close() {
      overlay.hidden = true;
      document.removeEventListener('keydown', onKeydown, true);
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function onKeydown(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(activeIndex + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(activeIndex - 1); }
      else if (e.key === 'Enter') { e.preventDefault(); choose(activeIndex); }
    }

    trigger.addEventListener('click', () => (overlay.hidden ? open() : close()));
    overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
    input.addEventListener('input', () => render(input.value));

    // Atajo global: Ctrl/Cmd + K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        overlay.hidden ? open() : close();
      }
    });
  }

  setupBackground();
  setupCommandPalette();
})();
