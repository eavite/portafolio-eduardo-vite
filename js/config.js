/* =====================================================================
   CONTENIDO DEL PORTAFOLIO
   ---------------------------------------------------------------------
   Aquí cambias TODAS las palabras del sitio. No necesitas tocar el HTML.

   Reglas simples:
   - Edita solo el texto que está entre comillas "así".
   - No borres las comas (,), las llaves { } ni los corchetes [ ].
   - Si necesitas una comilla dentro de un texto, escríbela así: \"
   - Para ocultar un botón o un bloque, deja su texto vacío: ""
   ===================================================================== */


/* ---------- 1. Datos que se repiten en varios lugares (cámbialos una sola vez) ---------- */

const USUARIO_GITHUB = "eavite";                 // <- tu usuario de GitHub
const CORREO         = "eduardovite1111@gmail.com";      // <- tu correo profesional
const LINKEDIN       = "https://www.linkedin.com/in/eduardo-vite-le%C3%B3n-b26535227/";
const GITHUB         = "https://github.com/" + USUARIO_GITHUB;


/* ---------- 2. Contenido del sitio ---------- */

const SITE = {

  /* Datos generales */
  lang: "es",
  pageTitle: "Eduardo Vite León | Análista de Datos y conciliaciones",
  pageDescription: "Portafolio de Eduardo Vite León: proyectos de automatización, conciliaciones bancarias y análisis de datos con Python, SQL y Power BI.",
  name: "Eduardo Vite León",
  initials: "EV",          // Se muestra en el menú del celular y si no hay foto

  /* Portada */
  role: "Analisis de datos: Conciliacion, automatización y gestión de Datos",
  tagline: "Experiencia en Retail y Crédito, Automatizo reportes y flujos de trabajo con Python (Pandas) y SQL, ademas de Visualización de Datos .",
  stack: ["Python", "SQL", "Power BI", "Syscard/SAP", "Excel-Avanzado"],
  buttons: {
    primary:   { label: "Ver proyectos", href: "#proyectos" },
    secondary: { label: "Descargar CV",  href: "cv/CV-Eduardo-Vite.pdf" }   // href "" oculta este botón
  },

  /* Menú superior */
  nav: [
    { label: "Sobre mí",  href: "#sobre-mi" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto",  href: "#contacto" }
  ],

  /* Carrusel de la portada (las flechas cambian entre diapositivas)
     - "order": el orden de las diapositivas. Para ocultar una, bórrala de la lista.
         "chart" = gráfica, "table" = tabla de conciliación, "sql" = consulta SQL.
     - Para ocultar el carrusel completo, deja "order" así: [] */
  deck: {
    ariaLabel: "Ejemplos de mi trabajo con datos",
    order: ["chart", "table", "sql"],
    labels: { chart: "Gráfica de compras, Devoluciones y pagos", table: "Conciliación", sql: "Consulta SQL" },
    prevLabel: "Anterior",
    nextLabel: "Siguiente",
    replayLabel: "Repetir"
  },

  /* Diapositiva 1: gráfica de compras, Devoluciones y pagos (datos FICTICIOS).
     - "months": los meses; el ÚLTIMO es el que se compara contra el promedio de los anteriores.
     - "series": hasta 3 series, cada una con un valor por mes (mismo número de valores que meses).
     - Las variaciones (▲ / ▼) se calculan solas. */
  chart: {
    title: "Compras, Devoluciones y pagos",
    note: "Datos ficticios, en miles",
    caption: "Último mes frente al promedio de los meses anteriores",
    lastLabel: "Último mes",
    months: ["Mar", "Abr", "May", "Jun", "Jul", "Ago"],
    series: [
      { name: "Compras",  values: [412, 438, 455, 470, 492, 528] },
      { name: "Devoluciones", values: [305, 322, 340, 351, 368, 377] },
      { name: "Pagos",    values: [280, 291, 299, 308, 316, 322] }
    ]
  },

  /* Diapositiva 2: tabla animada de conciliación con datos FICTICIOS.
     El sitio calcula solo cuáles filas cuadran y cuáles tienen diferencia.
     - "banco: null" significa que el movimiento no llegó en el reporte del banco.
     - Para quitar la tabla completa, cambia "ledger: {...}" por "ledger: null". */
  ledger: {
    title: "Reportes/Datos",
    note: "Conciliación",
    columns: ["id_Ref", "Sistema", "Reporte Bancario", "Estado"],
    totalLabel: "Diferencia total",
    replayLabel: "Repetir",
    labels: { pending: "A Revisar", match: "Cuadrado", diff: "Diferencia", missing: "Anulación", fixed: "Revisado" },
    ariaLabel: "Ilustración animada de una conciliación diaria: cinco movimientos, dos con diferencia, que terminan cuadrados con una diferencia total de 0.00",
    rows: [
      { ref: "28018", sistema: 1250.00, banco: 1250.00 },
      { ref: "92519", sistema:   89.90, banco:   89.90 },
      { ref: "92119", sistema:  310.00, banco:  301.00 },
      { ref: "10248", sistema:   75.25, banco: null },
      { ref: "59129", sistema:  420.10, banco:  420.10 }
    ]
  },

  /* Diapositiva 3: una consulta SQL que se escribe sola y muestra su resultado (datos FICTICIOS).
     - "query": una línea de SQL por cada texto entre comillas (usa comillas dobles por fuera y simples por dentro).
     - "columns" y "rows": la tabla de resultado. Cada fila lleva un valor por columna.
       Los números se muestran con 2 decimales; los textos (como los id) tal cual.
     - Para quitar esta diapositiva, cambia "sql: {...}" por "sql: null". */
  sql: {
    title: "Consulta SQL (Reporte Sistema vs Reporte Bancario)",
    note: "Datos ficticios",
    runLabel: "Ejecutar",
    resultLabel: "Resultado",
    rowsLabel: "filas",
    query: [
      "SELECT tc.id_ref,",
      "       tc.monto AS sistema,",
      "       COALESCE(b.monto, 0) AS banco,",
      "       tc.monto - COALESCE(b.monto, 0) AS dif",
      "FROM tc_transacciones tc",
      "LEFT JOIN reporte_banco b",
      "       ON b.id_ref = tc.id_ref",
      "WHERE tc.fecha = CURRENT_DATE",
      "  AND tc.monto <> COALESCE(b.monto, 0)",
      "ORDER BY dif DESC;"
    ],
    columns: ["id_ref", "sistema", "banco", "dif"],
    rows: [
      ["10248", 75.25, 0, 75.25],
      ["92119", 310.00, 301.00, 9.00],
      ["12458", 150.50, 312.80, -162.30]
    ]
  },

  /* Sobre mí */
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Actualmente Trabajando en Pycca S.A, empresa Lider de Retail con sistema de crédito propio, Concilio diariamente información de bancos y sistemas internos para más de 100 almacenes. Con Python, SQL y Selenium automaticé tareas que antes eran manuales: cuadres bancarios, descarga de reportes y consolidación de datos.",
      "Ennfocando mi carrera hacia el análisis de datos y BI. Los proyectos de esta página nacen de problemas reales del trabajo del día a día, con los datos anonimizados y ejemplificados. Busco un rol donde seguir aportando valor y convirtiendo datos en decisiones."
    ],
    avatar: "images/avatar.jpg",              // "" para mostrar solo las iniciales
    avatarAlt: "Foto de Eduardo Vite León",
    skillsTitle: "Herramientas",
    skills: ["Python", "pandas: Manejo de Dataframes", "SQL", "Power BI", "Selenium", "Excel - Avanzado", "Tkinter: para interfaz gráfica"]
  },

  /* Proyectos
     - "image": ruta de una captura (por ejemplo "images/conciliador.png"). Déjala en "" si aún no la tienes.
     - "repo": enlace al repositorio.
     - Para agregar un proyecto, copia un bloque { ... }, pégalo debajo y cámbiale los textos.
     - Para quitar uno, borra su bloque completo. */
  projects: {
    title: "Proyectos",
    intro: "",                                // Texto opcional debajo del título
    linkLabel: "Ver en GitHub",
    moreLabel: "Ver todos en GitHub",
    moreHref: GITHUB,
    items: [
      {
        title: "Conciliador bancario multibanco",
        description: "Cruza las transacciones internas con los reportes del banco (incluye Banred por SFTP) y detecta diferencias sin revisión manual.",
        tags: ["Python", "pandas", "Tkinter"],
        repo: GITHUB + "/conciliador-bancario",
        image: "",
        imageAlt: "Captura del conciliador bancario"
      },
      {
        title: "Reportes de recaudaciones automáticos",
        description: "Descarga cada mañana los reportes de un portal interno y arma el resumen en Excel sin intervención.",
        tags: ["Python", "Selenium", "Excel"],
        repo: GITHUB + "/reportes-recaudaciones-selenium",
        image: "",
        imageAlt: "Captura del resumen de recaudaciones en Excel"
      },
      {
        title: "Dashboard del cuadre mensual",
        description: "Muestra las diferencias entre lo recaudado y el reporte final de cierre.",
        tags: ["SQL", "Power BI"],
        repo: GITHUB + "/dashboard-cuadre-recaudaciones",
        image: "",
        imageAlt: "Captura del dashboard del cuadre mensual en Power BI"
      },
      {
        title: "Detección de anomalías transaccionales",
        description: "Identifica transacciones atípicas para priorizar su revisión.",
        tags: ["Python", "pandas"],
        repo: GITHUB + "/deteccion-anomalias-transacciones",
        image: "",
        imageAlt: "Captura de la detección de anomalías transaccionales"
      },
      {
        title: "Warehouse y KPIs con historial (SCD2)",
        description: "Modelo dimensional que conserva el historial de cambios y alimenta los indicadores.",
        tags: ["SQL"],
        repo: GITHUB + "/warehouse-kpis-scd2",
        image: "",
        imageAlt: "Diagrama del modelo dimensional con historial SCD2"
      },
      {
        title: "Clasificador de correos",
        description: "Clasifica correos por tipo de solicitud para ordenar la bandeja.",
        tags: ["Python"],
        repo: GITHUB + "/clasificador-correos",
        image: "",
        imageAlt: "Captura del clasificador de correos"
      }
    ]
  },

  /* Contacto
     - "items": tu correo, LinkedIn, GitHub, ubicación, etc. Agrega o quita filas copiando/borrando
       bloques { ... }; "href" vacío = solo texto. El ícono de cada fila se elige solo según la
       palabra que uses en "label" (correo, linkedin, github, país/ciudad/ubicación); si no
       reconoce la palabra, no pone ícono.
     - "highlights": columna derecha, libre para lo que quieras mostrar a un reclutador
       (idiomas, fortalezas, certificaciones cortas...). Cada bloque tiene un título y una
       lista de etiquetas. Para agregar un bloque, copia uno de "{ title:..., tags:[...] }".
       Para quitar la columna completa, deja "highlights: []". */
  contact: {
    title: "Contacto",
    text: "¿Tienes una vacante o un proyecto de datos? Escríbeme, con gusto conversamos.",
    items: [
      { label: "Correo",    text: CORREO,                 href: "mailto:" + CORREO },
      { label: "LinkedIn",  text: "Eduardo Vite León",    href: LINKEDIN },
      { label: "GitHub",    text: "github.com/" + USUARIO_GITHUB, href: GITHUB },
      { label: "País", text: "Ecuador",              href: "" },
      { label: "Ciudad",    text: "Guayaquil" ,           href: "" }
    ],
    highlights: [
      { title: "Idiomas",    tags: ["Español (nativo)", "Inglés (intermedio)"] },
      { title: "Fortalezas", tags: ["Atención al detalle", "Trabajo bajo presión", "Proactividad", "Aprendizaje rápido"] }
    ]
  },

  /* Pie de página ({year} se reemplaza solo por el año actual) */
  footer: "© {year} Eduardo Vite León"
};
