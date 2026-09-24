/* =====================================================================
   LÓGICA DEL SITIO
   Lee el contenido de js/config.js y lo dibuja en la página.
   Normalmente NO necesitas editar este archivo.
   ===================================================================== */
(function () {
  'use strict';

  if (typeof SITE === 'undefined') {
    console.error('No se encontró el contenido: revisa que js/config.js exista y no tenga errores.');
    return;
  }
  const S = SITE;
  const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ---------- Utilidades ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const byId = (id) => document.getElementById(id);
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  // Crea un elemento: h('a', { href: '#', text: 'Hola' }, hijo1, hijo2)
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    Object.entries(props || {}).forEach(([k, v]) => {
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else el.setAttribute(k, v);
    });
    kids.forEach((kid) => { if (kid !== null && kid !== undefined) el.append(kid); });
    return el;
  }
  function svgEl(tag, attrs, ...kids) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs || {}).forEach(([k, v]) => { if (v !== null && v !== undefined) el.setAttribute(k, v); });
    kids.forEach((kid) => { if (kid !== null && kid !== undefined) el.append(kid); });
    return el;
  }

  // Los enlaces que salen del sitio se abren en otra pestaña
  function linkAttrs(href) {
    return /^https?:/i.test(href || '') ? { target: '_blank', rel: 'noopener' } : {};
  }

  const tagList = (items) => (items || []).map((t) => h('li', { text: t }));

  /* ---------- Secciones fijas ---------- */
  function renderMeta() {
    document.documentElement.lang = S.lang || 'es';
    document.title = S.pageTitle || S.name || document.title;
    const desc = $('meta[name="description"]');
    if (desc && S.pageDescription) desc.setAttribute('content', S.pageDescription);
  }

  function renderNav() {
    const brand = byId('brand');
    brand.append(
      h('span', { class: 'brand-full', text: S.name }),
      h('span', { class: 'brand-short', text: S.initials || S.name })
    );
    const ul = byId('nav-links');
    (S.nav || []).forEach((n) => ul.append(h('li', null, h('a', { href: n.href, text: n.label }))));
  }

  function renderHero() {
    byId('hero-name').textContent = S.name || '';
    byId('hero-role').textContent = S.role || '';
    byId('hero-tagline').textContent = S.tagline || '';
    byId('hero-stack').append(...tagList(S.stack));

    const actions = byId('hero-actions');
    const b = S.buttons || {};
    if (b.primary && b.primary.href) {
      actions.append(h('a', Object.assign({ class: 'btn btn-primary', href: b.primary.href, text: b.primary.label }, linkAttrs(b.primary.href))));
    }
    if (b.secondary && b.secondary.href) {
      actions.append(h('a', Object.assign({ class: 'btn btn-ghost', href: b.secondary.href, text: b.secondary.label }, linkAttrs(b.secondary.href))));
    }
  }

  function renderAbout() {
    const A = S.about || {};
    byId('about-title').textContent = A.title || '';
    const text = byId('about-text');
    (A.paragraphs || []).forEach((p) => text.append(h('p', { text: p })));

    const box = byId('avatar');
    const initials = h('div', { class: 'avatar avatar-initials', text: S.initials || '' });
    if (A.avatar) {
      const img = h('img', { class: 'avatar', src: A.avatar, alt: A.avatarAlt || '' });
      img.addEventListener('error', () => img.replaceWith(initials));   // si no existe la foto, muestra las iniciales
      box.append(img);
    } else {
      box.append(initials);
    }

    byId('skills-title').textContent = A.skillsTitle || '';
    byId('skills').append(...tagList(A.skills));
  }

  function renderProjects() {
    const P = S.projects || {};
    byId('projects-title').textContent = P.title || '';
    byId('projects-intro').textContent = P.intro || '';

    const list = byId('project-list');
    // Sin capturas, los proyectos se muestran en dos columnas; con capturas, en filas
    if (!(P.items || []).some((p) => p.image)) list.classList.add('project-list--grid');
    (P.items || []).forEach((p) => {
      const hasImage = !!p.image;
      const article = h('article', { class: 'project' + (hasImage ? '' : ' project--text') });
      if (hasImage) {
        article.append(h('img', { class: 'project-thumb', src: p.image, alt: p.imageAlt || '', loading: 'lazy' }));
      }
      const body = h('div', { class: 'project-body' },
        h('h3', { text: p.title }),
        h('p', { text: p.description }),
        h('ul', { class: 'tags' }, ...tagList(p.tags))
      );
      if (p.repo) {
        body.append(h('a', Object.assign({ class: 'link', href: p.repo, text: P.linkLabel || 'Ver en GitHub' }, linkAttrs(p.repo))));
      }
      article.append(body);
      list.append(article);
    });

    if (P.moreHref) {
      byId('projects-more').append(
        h('a', Object.assign({ class: 'btn btn-ghost', href: P.moreHref, text: P.moreLabel || 'Ver más' }, linkAttrs(P.moreHref)))
      );
    }
  }

  // Pequeño set de íconos para la lista de contacto. Se elige uno solo (o ninguno)
  // según una palabra clave dentro de la etiqueta ("Correo", "LinkedIn", "Ciudad"...).
  const ICON_PATHS = {
    mail: { stroke: true, d: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'm3.5 6 8.5 7 8.5-7'] },
    mappin: { stroke: true, d: ['M20 10c0 6.5-8 12-8 12s-8-5.5-8-12a8 8 0 0 1 16 0Z'], circle: { cx: 12, cy: 10, r: 2.6 } },
    linkedin: { fill: true, d: ['M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96ZM3 9h4v12H3V9Zm7 0h3.6v1.7h.05c.5-.95 1.8-1.95 3.7-1.95 3.95 0 4.65 2.6 4.65 6V21h-4v-5.3c0-1.25-.02-2.85-1.75-2.85-1.75 0-2 1.35-2 2.75V21h-4V9Z'] },
    github: { fill: true, d: ['M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.48v-1.7c-2.78.62-3.37-1.35-3.37-1.35-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.28 9.28 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.48A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z'] }
  };
  function icon(name) {
    const spec = ICON_PATHS[name];
    if (!spec) return null;
    const attrs = spec.stroke
      ? { viewBox: '0 0 24 24', width: 15, height: 15, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false' }
      : { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'currentColor', 'aria-hidden': 'true', focusable: 'false' };
    const node = svgEl('svg', attrs, ...spec.d.map((d) => svgEl('path', { d })));
    if (spec.circle) node.append(svgEl('circle', spec.circle));
    return node;
  }
  function iconForLabel(label) {
    const l = (label || '').toLowerCase();
    if (l.includes('correo') || l.includes('email') || l.includes('mail')) return 'mail';
    if (l.includes('linkedin')) return 'linkedin';
    if (l.includes('github')) return 'github';
    if (l.includes('país') || l.includes('pais') || l.includes('ciudad') || l.includes('ubicaci')) return 'mappin';
    return null;
  }

  function renderContact() {
    const C = S.contact || {};
    byId('contact-title').textContent = C.title || '';
    byId('contact-text').textContent = C.text || '';
    const dl = byId('contact-list');
    (C.items || []).forEach((it) => {
      const value = it.href
        ? h('a', Object.assign({ href: it.href, text: it.text }, linkAttrs(it.href)))
        : document.createTextNode(it.text);
      const ic = icon(iconForLabel(it.label));
      dl.append(h('dt', {}, ic, document.createTextNode(it.label)), h('dd', null, value));
    });

    const highlights = C.highlights || [];
    if (highlights.length) {
      const box = byId('contact-highlights');
      highlights.forEach((g) => {
        box.append(h('div', { class: 'chl-group' }, h('p', { class: 'chl-title', text: g.title || '' }), h('ul', { class: 'tags' }, ...tagList(g.tags))));
      });
    } else {
      byId('contact-grid').classList.add('contact-grid--single');
    }
  }

  function renderFooter() {
    byId('footer-text').textContent = (S.footer || '').replace('{year}', new Date().getFullYear());
  }

  /* ---------- Tema claro / oscuro ---------- */
  function setupTheme() {
    byId('theme-toggle').addEventListener('click', () => {
      const root = document.documentElement;
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* sin almacenamiento: no pasa nada */ }
    });
  }

  /* =====================================================================
     DIAPOSITIVA: tabla de conciliación
     Cada fila compara "sistema" contra "banco" y se corrige hasta cuadrar.
     ===================================================================== */
  function buildTableSlide(cfg) {
    const L = Object.assign({ pending: 'Pendiente', match: 'Cuadra', diff: 'Diferencia', missing: 'No llegó', fixed: 'Corregido' }, cfg.labels);
    const cols = cfg.columns || ['Ref.', 'Sistema', 'Banco', 'Estado'];
    const toCents = (n) => Math.round(Number(n) * 100);
    const fmt = (c) => (c / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const rows = (cfg.rows || []).map((r) => {
      const sis = toCents(r.sistema);
      const ban = (r.banco === null || r.banco === undefined) ? null : toCents(r.banco);
      const kind = ban === null ? 'missing' : (ban === sis ? 'match' : 'diff');
      const diff = kind === 'match' ? 0 : (kind === 'missing' ? sis : Math.abs(sis - ban));
      return { ref: r.ref, sis, ban, kind, diff };
    });

    rows.forEach((r) => {
      r.stTxt = h('span', { text: L.pending });
      r.stEl = h('span', { class: 'c-status', 'data-state': 'pending' }, h('i', { class: 'dot-state' }), r.stTxt);
      r.banEl = h('span', { class: 'c-num' });
      r.el = h('div', { class: 'lrow lgrid' }, h('span', { text: r.ref }), h('span', { class: 'c-num', text: fmt(r.sis) }), r.banEl, r.stEl);
    });

    const totalVal = h('span', { class: 'ltotal-value', 'data-state': 'pending', text: fmt(0) });
    const panel = h('div', { class: 'panel', role: 'img', 'aria-label': cfg.ariaLabel || '' },
      h('div', { class: 'panel-head' }, h('span', { class: 'panel-title', text: cfg.title || '' }), h('span', { class: 'panel-note', text: cfg.note || '' })),
      h('div', { class: 'panel-body', style: 'padding:0' },
        h('div', { class: 'ledger-cols lgrid' }, h('span', { text: cols[0] }), h('span', { class: 'c-num', text: cols[1] }), h('span', { class: 'c-num', text: cols[2] }), h('span', { text: cols[3] })),
        h('div', { class: 'ledger-body' }, ...rows.map((r) => r.el))
      ),
      h('div', { class: 'panel-foot' }, h('div', { class: 'ltotal' }, h('span', { text: cfg.totalLabel || 'Diferencia total' }), totalVal))
    );

    const setState = (r, state, label) => { r.stEl.dataset.state = state; r.stTxt.textContent = label; };
    const paintTotal = (c) => { totalVal.textContent = fmt(c); };
    const setTotalState = (s) => { totalVal.dataset.state = s; };

    function resetView() {
      rows.forEach((r) => {
        r.el.classList.remove('in');
        r.banEl.classList.remove('is-fixed');
        r.banEl.textContent = r.ban === null ? '—' : fmt(r.ban);
        setState(r, 'pending', L.pending);
      });
      paintTotal(0);
      setTotalState('pending');
    }

    function showFinal() {
      rows.forEach((r) => {
        r.el.classList.add('in');
        r.banEl.textContent = fmt(r.sis);
        setState(r, 'ok', r.kind === 'match' ? L.match : L.fixed);
      });
      paintTotal(0);
      setTotalState('ok');
    }

    function tween(from, to, ms, alive) {
      if (from === to) return Promise.resolve();
      return new Promise((res) => {
        const t0 = performance.now();
        (function step(now) {
          if (!alive()) { res(); return; }
          const p = Math.min(1, (now - t0) / ms);
          paintTotal(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step); else res();
        })(t0);
      });
    }

    let token = 0;
    async function play() {
      const mine = ++token;
      const alive = () => mine === token;
      resetView();
      if (reduceMotion) { showFinal(); return; }

      for (const r of rows) { await sleep(300); if (!alive()) return; r.el.classList.add('in'); }
      await sleep(600); if (!alive()) return;

      let total = 0;
      for (const r of rows) {
        await sleep(420); if (!alive()) return;
        if (r.kind === 'match') {
          setState(r, 'ok', L.match);
        } else {
          setState(r, 'warn', r.kind === 'missing' ? L.missing : L.diff);
          setTotalState('warn');
          const to = total + r.diff;
          await tween(total, to, 350, alive); if (!alive()) return;
          total = to;
        }
      }
      await sleep(1300); if (!alive()) return;

      for (const r of rows.filter((x) => x.diff > 0)) {
        await sleep(800); if (!alive()) return;
        r.banEl.textContent = fmt(r.sis);
        r.banEl.classList.add('is-fixed');
        setState(r, 'ok', L.fixed);
        const to = total - r.diff;
        await tween(total, to, 450, alive); if (!alive()) return;
        total = to;
      }
      setTotalState('ok');
    }
    function cancel() { token++; }

    resetView();
    return { el: panel, controller: { play, cancel } };
  }

  /* =====================================================================
     DIAPOSITIVA: gráfica de compras, consumos y pagos
     Compara el último mes contra el promedio de los meses anteriores.
     ===================================================================== */
  function buildChartSlide(cfg) {
    const months = cfg.months || [];
    const series = (cfg.series || []).slice(0, 4);
    const colorVars = ['var(--ok)', 'var(--accent)', 'var(--warn)', 'var(--muted)'];
    const fmtNum = (n) => Math.round(n).toLocaleString('en-US');

    const allValues = series.flatMap((s) => s.values || []);
    const rawMax = Math.max(1, ...allValues);
    const niceMax = Math.ceil((rawMax * 1.12) / 50) * 50 || rawMax;

    // Geometría del gráfico
    const W = 420, H = 200;
    const padL = 30, padR = 4, padT = 10, padB = 22;
    const plotW = W - padL - padR, plotH = H - padT - padB;
    const n = Math.max(1, months.length);
    const groupW = plotW / n;
    const groupPad = groupW * 0.16;
    const barGap = 2;
    const barW = Math.max(2, (groupW - groupPad * 2 - barGap * (series.length - 1)) / Math.max(1, series.length));
    const yFor = (v) => padT + plotH - (v / niceMax) * plotH;

    const chart = svgEl('svg', { class: 'chart-svg', viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': cfg.caption || cfg.title || '' });

    // Líneas guía y sus valores (0%, 50%, 100% de la escala)
    [0, 0.5, 1].forEach((f) => {
      const y = padT + plotH * (1 - f);
      chart.append(svgEl('line', { class: 'chart-gridline', x1: padL, x2: W - padR, y1: y, y2: y }));
      chart.append(svgEl('text', { class: 'chart-axis-label', x: padL - 6, y: y + 3, 'text-anchor': 'end' }, document.createTextNode(fmtNum(niceMax * f))));
    });

    // Línea divisoria antes del último mes, para separar "meses anteriores" del mes actual
    if (n > 1) {
      const xDiv = padL + groupW * (n - 1);
      chart.append(svgEl('line', { class: 'chart-divider', x1: xDiv, x2: xDiv, y1: padT, y2: padT + plotH }));
    }

    const bars = [];
    months.forEach((m, mi) => {
      const isLast = mi === n - 1;
      const groupX = padL + groupW * mi + groupPad;
      series.forEach((s, si) => {
        const val = (s.values && s.values[mi]) || 0;
        const x = groupX + si * (barW + barGap);
        const yEnd = yFor(val);
        const rect = svgEl('rect', {
          class: 'chart-bar' + (isLast ? ' is-last' : ''), x, width: barW,
          y: padT + plotH, height: 0, rx: 1.5, fill: colorVars[si % colorVars.length],
          opacity: isLast ? 1 : 0.82
        });
        chart.append(rect);
        bars.push({ rect, yEnd, hEnd: padT + plotH - yEnd });
      });
      chart.append(svgEl('text', { class: 'chart-axis-label' + (isLast ? ' is-last' : ''), x: groupX + (groupW - groupPad * 2) / 2, y: H - 6, 'text-anchor': 'middle' }, document.createTextNode(m)));
    });
    if (n > 0) {
      chart.append(svgEl('text', { class: 'chart-flag', x: W - padR, y: padT - 2, 'text-anchor': 'end' }, document.createTextNode(cfg.lastLabel || 'Último mes')));
    }

    // Estadísticas: último mes contra el promedio de los meses anteriores
    const statsList = h('ul', { class: 'chart-stats' });
    series.forEach((s, si) => {
      const vals = s.values || [];
      const last = vals[vals.length - 1] || 0;
      const prevVals = vals.slice(0, -1);
      const avg = prevVals.length ? prevVals.reduce((a, b) => a + b, 0) / prevVals.length : last;
      const deltaPct = avg ? ((last - avg) / avg) * 100 : 0;
      const up = deltaPct >= 0;
      statsList.append(h('li', { class: 'chart-stat' },
        h('span', { class: 'cs-name' }, h('i', { class: 'swatch', style: `background:${colorVars[si % colorVars.length]}` }), document.createTextNode(s.name || '')),
        h('span', { class: 'cs-values' },
          h('span', { class: 'cs-value', text: fmtNum(last) }),
          h('span', { class: 'cs-delta ' + (up ? 'up' : 'down'), text: (up ? '▲ ' : '▼ ') + Math.abs(deltaPct).toFixed(1) + '%' })
        )
      ));
    });

    const panel = h('div', { class: 'panel' },
      h('div', { class: 'panel-head' }, h('span', { class: 'panel-title', text: cfg.title || '' }), h('span', { class: 'panel-note', text: cfg.note || '' })),
      h('div', { class: 'panel-body chart-figure' }, chart),
      h('div', { class: 'panel-foot' },
        h('p', { class: 'chart-caption', text: cfg.caption || '' }),
        statsList
      )
    );

    function reset() { bars.forEach((b) => { b.rect.setAttribute('height', 0); b.rect.setAttribute('y', padT + plotH); }); }
    let token = 0;
    async function play() {
      const mine = ++token;
      const alive = () => mine === token;
      reset();
      if (reduceMotion) {
        bars.forEach((b) => { b.rect.setAttribute('height', b.hEnd); b.rect.setAttribute('y', b.yEnd); });
        return;
      }
      await sleep(60);
      for (let i = 0; i < bars.length; i++) {
        if (!alive()) return;
        const b = bars[i];
        b.rect.setAttribute('height', b.hEnd);
        b.rect.setAttribute('y', b.yEnd);
        await sleep(38);
      }
    }
    function cancel() { token++; }

    reset();
    return { el: panel, controller: { play, cancel } };
  }

  /* =====================================================================
     DIAPOSITIVA: consulta SQL
     La consulta se escribe sola y, al terminar, aparece el resultado.
     ===================================================================== */
  function buildSqlSlide(cfg) {
    const lines = cfg.query || [];
    const fullText = lines.join('\n');
    const code = h('code', {});
    const cursor = h('span', { class: 'sql-cursor' });
    const pre = h('pre', { class: 'sql-code' }, code, cursor);
    const codeScroll = h('div', { class: 'sql-scroll' }, pre);   // si una línea no cabe, se desliza en vez de desbordar la página

    const cols = cfg.columns || [];
    const resultHead = h('div', { class: 'sql-result-head' },
      h('span', { text: cfg.resultLabel || 'Resultado' }),
      h('span', { text: (cfg.rows || []).length + ' ' + (cfg.rowsLabel || 'filas') })
    );
    const table = h('table', { class: 'sql-table' },
      h('thead', {}, h('tr', {}, ...cols.map((c) => h('th', { text: c })))),
      h('tbody', {}, ...(cfg.rows || []).map((row) => h('tr', {}, ...row.map((v, i) => {
        const isNum = typeof v === 'number';
        const isDiff = cols[i] && cols[i].toLowerCase().indexOf('dif') === 0;
        return h('td', { class: isDiff ? 'is-diff' : '', text: isNum ? v.toFixed(2) : String(v) });
      }))))
    );
    const result = h('div', { class: 'sql-result', hidden: true }, resultHead, table);

    const panel = h('div', { class: 'panel' },
      h('div', { class: 'panel-head' }, h('span', { class: 'panel-title', text: cfg.title || '' }), h('span', { class: 'panel-note', text: cfg.note || '' })),
      h('div', { class: 'panel-body' }, codeScroll),
      h('div', { class: 'panel-foot' }, result)
    );

    function reset() { code.textContent = ''; cursor.classList.remove('is-done'); result.hidden = true; }
    let token = 0;
    async function play() {
      const mine = ++token;
      const alive = () => mine === token;
      reset();
      if (reduceMotion) { code.textContent = fullText; cursor.classList.add('is-done'); result.hidden = false; return; }

      await sleep(400);
      for (let i = 0; i < fullText.length; i++) {
        if (!alive()) return;
        code.textContent += fullText[i];
        await sleep(fullText[i] === '\n' ? 90 : 14);
      }
      cursor.classList.add('is-done');
      await sleep(500); if (!alive()) return;
      result.hidden = false;
    }
    function cancel() { token++; }

    reset();
    return { el: panel, controller: { play, cancel } };
  }

  /* =====================================================================
     CARRUSEL: une las diapositivas con flechas, puntos y repetición
     ===================================================================== */
  function setupDeck() {
    const cfg = S.deck || {};
    const wrap = byId('deck-wrap');
    const builders = { chart: buildChartSlide, table: buildTableSlide, sql: buildSqlSlide };
    const configFor = { chart: S.chart, table: S.ledger, sql: S.sql };
    const order = (Array.isArray(cfg.order) ? cfg.order : []).filter((t) => builders[t] && configFor[t]);

    if (!wrap || order.length === 0) {
      if (wrap) wrap.remove();
      $('.hero-grid').classList.add('hero-grid--single');
      return;
    }

    const deckEl = byId('deck');
    const viewport = byId('deck-viewport');
    const track = byId('deck-track');
    const prevBtn = byId('deck-prev');
    const nextBtn = byId('deck-next');
    const dotsWrap = byId('deck-dots');
    const replayBtn = byId('deck-replay');
    const statusEl = byId('deck-status');

    if (cfg.ariaLabel) deckEl.setAttribute('aria-label', cfg.ariaLabel);
    deckEl.setAttribute('aria-roledescription', 'carrusel');
    byId('deck-prev-label').textContent = cfg.prevLabel || 'Anterior';
    byId('deck-next-label').textContent = cfg.nextLabel || 'Siguiente';
    replayBtn.textContent = cfg.replayLabel || 'Repetir';

    const slides = order.map((type) => {
      const built = builders[type](configFor[type]);
      built.el.classList.add('deck-slide');
      built.el.setAttribute('role', 'tabpanel');
      track.append(built.el);
      return { type, el: built.el, controller: built.controller, label: (cfg.labels && cfg.labels[type]) || type };
    });

    const single = slides.length < 2;
    if (single) { prevBtn.remove(); nextBtn.remove(); dotsWrap.remove(); }

    const dots = single ? [] : slides.map((s, i) => {
      const btn = h('button', { class: 'deck-dot', type: 'button', role: 'tab', 'aria-label': s.label });
      btn.addEventListener('click', () => goTo(i, true));
      dotsWrap.append(btn);
      return btn;
    });

    let index = 0;
    let playToken = 0;

    // La tarjeta se ajusta a la altura de la diapositiva activa (así ninguna queda
    // con espacio vacío si el contenido de otra diapositiva es más largo), y se
    // recalcula sola si ese contenido crece durante su propia animación
    // (por ejemplo, cuando aparece el resultado de la consulta SQL).
    function syncHeight() { viewport.style.height = slides[index].el.scrollHeight + 'px'; }
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncHeight) : null;

    function goTo(newIndex, animate) {
      const mine = ++playToken;
      slides[index].controller.cancel();
      const total = slides.length;
      index = ((newIndex % total) + total) % total;
      track.classList.toggle('is-animating', !!animate && !reduceMotion);
      track.style.transform = `translateX(${-index * 100}%)`;
      syncHeight();
      if (resizeObserver) { resizeObserver.disconnect(); resizeObserver.observe(slides[index].el); }
      dots.forEach((d, i) => d.setAttribute('aria-current', i === index ? 'true' : 'false'));
      statusEl.textContent = (index + 1) + ' de ' + total + ' — ' + slides[index].label;
      const delay = (animate && !reduceMotion) ? 520 : 0;
      setTimeout(() => { if (mine === playToken) slides[index].controller.play(); }, delay);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(syncHeight, 150);
    });

    prevBtn && prevBtn.addEventListener('click', () => goTo(index - 1, true));
    nextBtn && nextBtn.addEventListener('click', () => goTo(index + 1, true));
    replayBtn.addEventListener('click', () => slides[index].controller.play());

    if (!single) {
      deckEl.setAttribute('tabindex', '0');
      deckEl.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1, true); }
        if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1, true); }
      });
      let touchX = null;
      deckEl.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
      deckEl.addEventListener('touchend', (e) => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        touchX = null;
        if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1), true);
      }, { passive: true });
    }

    goTo(0, false);
  }

  /* ---------- Arranque ---------- */
  renderMeta();
  renderNav();
  renderHero();
  renderAbout();
  renderProjects();
  renderContact();
  renderFooter();
  setupTheme();
  setupDeck();
})();
