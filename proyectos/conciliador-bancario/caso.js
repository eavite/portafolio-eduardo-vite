/* Vista local de resultados generados por la demo Python con datos ficticios. */
(() => {
  const en = document.documentElement.lang === 'en';
  const labels = en ? {
    'Conciliado': 'Matched', 'Diferencia de importe': 'Amount difference',
    'Solo en sistema': 'System only', 'Solo en banco': 'Bank only'
  } : Object.fromEntries(['Conciliado', 'Diferencia de importe', 'Solo en sistema', 'Solo en banco'].map(x => [x, x]));
  let banco = 'Banco A';
  const filter = document.getElementById('status-filter');
  const tbody = document.getElementById('demo-rows');
  const money = value => value === '' ? '—' : new Intl.NumberFormat(en ? 'en-US' : 'es-EC', {style: 'currency', currency: 'USD'}).format(Number(value));
  function filasVisibles() {
    return DEMO_DATOS[banco].filas.filter(fila => filter.value === 'all' || (filter.value === 'review' ? fila.estado !== 'Conciliado' : fila.estado === filter.value));
  }
  function render() {
    const datos = DEMO_DATOS[banco];
    document.querySelectorAll('[data-bank]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.bank === banco)));
    document.getElementById('metric-matched').textContent = datos.resumen.Conciliado;
    document.getElementById('metric-review').textContent = datos.filas.length - datos.resumen.Conciliado;
    document.getElementById('metric-system').textContent = money(datos.resumen.total_sistema);
    document.getElementById('metric-late').textContent = money(datos.resumen.posterior_al_corte);
    const hora = banco === 'Banco A' ? '17:00' : '20:00';
    document.getElementById('cutoff').textContent = en ? `Fictional closing: 15 Apr 2030 · from 14 Apr at ${hora} to 15 Apr before ${hora}. Late total: closing day, ${hora}–23:59:59.` : `Cierre ficticio: 15 abr 2030 · del 14 abr a las ${hora} al 15 abr antes de las ${hora}. Total posterior: día de cierre, ${hora}–23:59:59.`;
    const filas = filasVisibles();
    tbody.replaceChildren();
    filas.forEach(fila => {
      const tr = document.createElement('tr');
      for (const clave of ['cliente_id','referencia','importe_sistema','importe_banco','diferencia']) {
        const td = document.createElement('td');
        td.textContent = clave.startsWith('importe') || clave === 'diferencia' ? money(fila[clave]) : fila[clave];
        if (clave.startsWith('importe') || clave === 'diferencia') td.className = 'number';
        if (clave === 'diferencia' && Number(fila[clave]) !== 0) td.classList.add('difference');
        tr.append(td);
      }
      const td = document.createElement('td'); const tag = document.createElement('span');
      tag.className = `status ${fila.estado === 'Conciliado' ? 'match' : 'review'}`;
      tag.textContent = labels[fila.estado]; td.append(tag); tr.append(td); tbody.append(tr);
    });
    document.getElementById('row-count').textContent = en ? `${filas.length} of ${datos.filas.length} sample transactions` : `${filas.length} de ${datos.filas.length} movimientos del ejemplo`;
    document.getElementById('service-note').textContent = en ? `The local query finds ${datos.servicios.length} related fictional service. The transaction remains pending review; no payment is deleted or changed.` : `La consulta local encuentra ${datos.servicios.length} servicio ficticio relacionado. La partida sigue pendiente de revisión; no se elimina ni modifica ningún pago.`;
  }
  document.querySelectorAll('[data-bank]').forEach(button => button.addEventListener('click', () => { banco = button.dataset.bank; render(); }));
  filter.addEventListener('change', render);
  document.getElementById('download-csv').addEventListener('click', () => {
    const campos = ['cliente_id','referencia','importe_sistema','importe_banco','diferencia','estado'];
    const escapar = valor => '"' + String(valor).replaceAll('"','""') + '"';
    const csv = [campos, ...filasVisibles().map(f => campos.map(c => f[c]))].map(f => f.map(escapar).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], {type:'text/csv;charset=utf-8'}));
    const a = document.createElement('a'); a.href = url; a.download = banco.toLowerCase().replace(' ','-') + '-demo.csv'; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  render();
})();
