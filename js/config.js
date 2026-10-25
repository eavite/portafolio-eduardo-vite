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
const LINKEDIN       = "https://www.linkedin.com/in/eduardo-vite/";
const GITHUB         = "https://github.com/" + USUARIO_GITHUB;


/* ---------- 2. Contenido del sitio ---------- */

const SITE = {

  /* Datos generales */
  lang: "es",
  pageTitle: "Eduardo Vite León | Analista de Datos, Conciliación y Crédito | Python, SQL, Power BI",
  pageDescription: "Portafolio de Eduardo Vite León, analista de datos con experiencia en crédito, conciliación bancaria y retail. Análisis, automatización y visualización con Python, SQL Server, Power BI y Excel.",
  name: "Eduardo Vite León",
  initials: "EV",          // Se muestra en el menú del celular y si no hay foto

  /* Portada */
  role: "Analista de Datos · Conciliación y Crédito",
  tagline: "Convierto datos de pagos, crédito y conciliación bancaria en información confiable, automatizaciones y dashboards para decidir mejor.",
  stack: ["Python", "SQL", "Power BI", "Excel", "Pandas"],
  buttons: {
    primary:   { label: "Ver proyectos", href: "#proyectos" },
    secondary: { label: "Descargar CV",  href: "cv/CV-Eduardo-Vite.pdf" }   // href "" oculta este botón
  },

  /* Menú superior */
  nav: [
    { label: "Sobre mí",  href: "#sobre-mi" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Certificaciones", href: "#certificaciones" },
    { label: "Contacto",  href: "#contacto" }
  ],

  /* Carrusel de la portada (las flechas cambian entre diapositivas)
     - "order": el orden de las diapositivas. Para ocultar una, bórrala de la lista.
         "chart" = gráfica, "table" = tabla de conciliación, "sql" = consulta SQL.
     - Para ocultar el carrusel completo, deja "order" así: [] */
  deck: {
    ariaLabel: "Ejemplos de mi trabajo con datos",
    order: ["dashboard", "table", "sql", "automation"],
    labels: { dashboard: "01 · Contexto", table: "02 · Conciliar", sql: "03 · Investigar", automation: "04 · Automatizar" },
    prevLabel: "Anterior",
    nextLabel: "Siguiente",
    replayLabel: "Repetir"
  },

  /* Diapositiva 1: contexto operativo (visual de demostración; no representa un dashboard real). */
  dashboard: {
    title: "01 · Entender la operación",
    note: "DEMO · contexto basado en experiencia real",
    period: "Escala operativa",
    kpis: [
      { label: "Almacenes", value: "116", delta: "a nivel nacional" },
      { label: "Transacciones", value: "20.000", delta: "diarias" },
      { label: "Entidades", value: "7", delta: "bancos y medios de pago" },
      { label: "Cuadre", value: "Diario", delta: "pagos y comisiones" }
    ],
    chartTitle: "Pagos recibidos por día",
    chartNote: "Índice · datos ilustrativos",
    chart: [72, 86, 81, 94, 88, 100, 92]
  },

  /* Diapositiva 2: tabla animada de conciliación con datos FICTICIOS.
     El sitio calcula solo cuáles filas cuadran y cuáles tienen diferencia.
     - "banco: null" significa que el movimiento no llegó en el reporte del banco.
     - Para quitar la tabla completa, cambia "ledger: {...}" por "ledger: null". */
  ledger: {
    title: "02 · Encontrar diferencias",
    note: "DEMO · datos ficticios",
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
    title: "03 · Investigar diferencias con SQL",
    note: "DEMO · datos ficticios",
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

  /* Diapositiva 4: automatización de un proceso operativo. */
  automation: {
    title: "04 · Automatizar el proceso",
    note: "DEMO · flujo basado en experiencia real",
    steps: [
      { label: "1", title: "Extraer", text: "Acceso y descarga automática de reportes." },
      { label: "2", title: "Procesar", text: "Limpieza y consolidación de la información." },
      { label: "3", title: "Validar", text: "Revisión de diferencias y excepciones." },
      { label: "4", title: "Entregar", text: "Resumen listo para análisis y seguimiento." }
    ],
    impact: { before: "4 horas", after: "10 minutos", label: "Proceso manual → proceso automatizado" }
  },

  /* Tecnologías: cada nombre debe existir en js/logos.js. Para quitar la sección, deja "items: []". */
  tech: {
    title: "Tecnologías",
    intro: "",
    items: ["Python", "Pandas", "NumPy", "SQL Server", "Power BI", "Excel", "Selenium", "Git", "GitHub"]
  },

  /* Sobre mí */
  about: {
    title: "Sobre mí",
    paragraphs: [
      "Actualmente trabajo en Pycca S.A., empresa líder de retail con sistema de crédito propio. Conciliamos diariamente información de bancos y sistemas internos para 116 almacenes a nivel nacional. Con Python, SQL y Selenium he automatizado tareas que antes eran manuales, como cuadres bancarios, descarga de reportes y consolidación de datos.",
      "Estoy orientando mi carrera hacia el análisis de datos y Business Intelligence. Los proyectos de esta página parten de problemas de trabajo y aprendizaje, con datos anonimizados o ejemplificados. Busco seguir desarrollándome en un rol donde pueda convertir datos en información útil para la toma de decisiones."
    ],
    avatar: "images/perfil/avatar.jpg",              // "" para mostrar solo las iniciales
    avatarAlt: "Foto de Eduardo Vite León",
    experience: {
      eyebrow: "EXPERIENCIA CON DATOS",
      title: "PYCCA S.A.",
      meta: "Retail & Crédito",
      points: [
        "Conciliación de información bancaria y sistemas internos.",
        "Automatización de tareas y reportes operativos.",
        "Extracción, transformación y consolidación de datos.",
        "Análisis de diferencias y excepciones."
      ]
    },
  },


  impact: {
    title: "Resultados con datos",
    intro: "Resultados concretos de mi experiencia diaria en procesos de conciliación y automatización.",
    metrics: [
      { value: "116", label: "almacenes a nivel nacional" },
      { value: "20.000", label: "transacciones procesadas diariamente" },
      { value: "4 h → 10 min", label: "tiempo de proceso manual reducido" }
    ]
  },

  /* Proyectos
     - "image": ruta de una captura (por ejemplo "images/proyectos/conciliador.png"). Déjala en "" si aún no la tienes.
     - "repo": enlace al repositorio.
     - Para agregar un proyecto, copia un bloque { ... }, pégalo debajo y cámbiale los textos.
     - Para quitar uno, borra su bloque completo. */
  projects: {
    title: "Proyectos",
    intro: "",                                // Texto opcional debajo del título
    mediaTitle: "Visuales del proyecto",
    mediaHint: "Dashboards, capturas, GIFs y videos cortos",
    mediaEmptyTitle: "Visuales próximamente",
    mediaEmptyText: "Este espacio está preparado para capturas de dashboards, gráficos, GIFs o videos cortos relacionados con el proyecto.",
    linkLabel: "Ver proyecto",
    labels: { problem: "Problema", process: "Proceso", result: "Resultado" },
    moreLabel: "",
    moreHref: "",
    items: [
      {
  "title": "Conciliador bancario multibanco",
  "description": "La aplicación compara pagos del sistema y del banco para concentrar la revisión en las diferencias. Demo pública con datos ficticios.",
  "problem": "Al cerrar las recaudaciones, comparar dos reportes pago por pago hacía difícil localizar qué faltaba o tenía un importe distinto.",
  "process": "Organicé la lectura de archivos, los horarios de cierre y el cruce por cliente y referencia en una aplicación.",
  "result": "El resultado reúne el cuadre y una lista de pendientes con sus fuentes para revisión. La demostración usa datos totalmente ficticios.",
  "tags": [
    "Python",
    "pandas",
    "SQL",
    "Tkinter"
  ],
  "repo": "proyectos/conciliador-bancario/index.html",
  "image": "images/proyectos/media/conciliador-bancario/vista-previa.gif",
  "imageAlt": "Recorrido de la aplicación de demostración en Windows, con pagos y servicios ficticios.",
  "media": [
    {
      "type": "image",
      "src": "images/proyectos/media/conciliador-bancario/detalle.png",
      "alt": "Consulta de un servicio ficticio relacionado con un pago pendiente.",
      "caption": "Una coincidencia aporta una pista; el pago sigue pendiente de revisión."
    }
  ],
  "newTab": false,
  "previewWide": true,
  "imageStatic": "images/proyectos/media/conciliador-bancario/vista-previa.png"
}
    ]
  },

  /* Certificaciones / Estudios
     - Son espacios reservados: no representan certificaciones reales todavía.
     - Reemplaza "file" por una imagen JPG/PNG/SVG o por un PDF cuando tengas el documento.
     - Los archivos se abren en pantalla completa al hacer clic.
  */
  certifications: {
    title: "Certificaciones / Estudios",
    intro: "Cursos y estudios que respaldan mi perfil en datos, finanzas y tributación.",
    items: [
      { title: "Tributación y Finanzas para Negocios (40 h)", file: "images/certificaciones/tributacion-finanzas-negocios.svg", type: "image", note: "UNEMI · Vicerrectorado de Vinculación · abril 2026." },
      { title: "Curso de Python Profesional", file: "images/certificaciones/Captura de pantalla 2026-09-24 160556.png", type: "image", note: "Aprendizaje sobre Bucles, tuplas, Listas, diccionarios, y manejo de Errores." },
      { title: "Introduccion a las Bases de Datos relaciones", file: "images/certificaciones/Certificado_base_de_datos.png", type: "image", note: "Conocimiento Sólido en: Bases de datos relacionales y Querys Intermedias, manejo de Datos, Análisis de Datos y su estructura." },
      { title: "Python (Intermedio-Avanzado)", file: "images/certificaciones/Certificado_unemi_python.png", type: "image", note: "Conocimiento y aprendizaje tales como PANDAS, Programación orientada a objetos y estructuras de Datos." },
      { title: "Curso de bases y conceptos de la ciencia de Datos", file: "images/certificaciones/Curso_bases_ciencia_de_datos.png", type: "image", note: "Introducción en Machine learning y vectores, además de sistemas relacionales." }
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
    text: "¿Buscas un perfil de análisis de datos, conciliación financiera o crédito? Estoy disponible para nuevas oportunidades laborales.",
    items: [
      { label: "Correo",    text: CORREO,                 href: "mailto:" + CORREO },
      { label: "LinkedIn",  text: "Eduardo Vite León",    href: LINKEDIN },
      { label: "GitHub",    text: "github.com/" + USUARIO_GITHUB, href: GITHUB },
      { label: "País", text: "Ecuador",              href: "" },
      { label: "Ciudad",    text: "Guayaquil" ,           href: "" }
    ],
    highlights: [
      { title: "Idiomas",    tags: ["Español (nativo)", "Inglés (Avanzado)"] },
      { title: "Fortalezas", tags: ["Conciliación multibanco", "Crédito revolvente y recaudación", "Automatización (Python y Selenium)", "SQL Server y Power BI", "Control de calidad de datos", "Trabajo bajo presión"] }
    ]
  },

  /* Pie de página ({year} se reemplaza solo por el año actual) */
  footer: "© {year} Eduardo Vite León"
};


/* ---------------------------------------------------------------------
   English version
   ---------------------------------------------------------------------
   Spanish is the content source of truth. The English version is kept as
   an adapted translation so it can be refined later without changing the
   structure, metrics, repositories or files.
*/
const SITE_ES = SITE;
const SITE_EN = JSON.parse(JSON.stringify(SITE_ES));
Object.assign(SITE_EN, {
  lang: "en",
  pageTitle: "Eduardo Vite León | Data Analyst, Reconciliation & Credit | Python, SQL, Power BI",
  pageDescription: "Portfolio of Eduardo Vite León, data analyst with experience in credit, bank reconciliation and retail. Analysis, automation and visualization with Python, SQL Server, Power BI and Excel.",
  role: "Data Analyst · Reconciliation & Credit",
  tagline: "I turn payment, credit and bank reconciliation data into reliable information, automation and dashboards for better decisions.",
  buttons: { primary: { label: "View projects", href: "#proyectos" }, secondary: { label: "Download CV", href: "cv/CV-Eduardo-Vite.pdf" } },
  nav: [
    { label: "About", href: "#sobre-mi" },
    { label: "Projects", href: "#proyectos" },
    { label: "Certifications", href: "#certificaciones" },
    { label: "Contact", href: "#contacto" }
  ],
  deck: {
    ariaLabel: "Examples of my work with data",
    order: ["dashboard", "table", "sql", "automation"],
    labels: { dashboard: "01 · Context", table: "02 · Reconcile", sql: "03 · Investigate", automation: "04 · Automate" },
    prevLabel: "Previous", nextLabel: "Next", replayLabel: "Replay"
  },
  dashboard: {
    title: "01 · Understand the operation",
    note: "DEMO · context based on real experience",
    period: "Operational scale",
    kpis: [
      { label: "Stores", value: "116", delta: "nationwide" },
      { label: "Transactions", value: "20,000", delta: "daily" },
      { label: "Entities", value: "7", delta: "banks & payment providers" },
      { label: "Reconciliation", value: "Daily", delta: "payments & fees" }
    ],
    chartNote: "Index · illustrative data",
    chartTitle: "Payments received per day", chart: [72,86,81,94,88,100,92]
  },
  ledger: {
    title: "02 · Find differences", note: "DEMO · fictional data",
    columns: ["Ref_ID", "System", "Bank Report", "Status"], totalLabel: "Total difference", replayLabel: "Replay",
    labels: { pending: "To review", match: "Matched", diff: "Difference", missing: "Missing", fixed: "Reviewed" },
    ariaLabel: "Animated illustration of a daily reconciliation: five transactions, two with differences, ending with a total difference of 0.00",
    rows: [
      { ref: "28018", sistema: 1250.00, banco: 1250.00 },
      { ref: "92519", sistema: 89.90, banco: 89.90 },
      { ref: "92119", sistema: 310.00, banco: 301.00 },
      { ref: "10248", sistema: 75.25, banco: null },
      { ref: "59129", sistema: 420.10, banco: 420.10 }
    ]
  },
  sql: {
    title: "03 · Investigate differences with SQL", note: "DEMO · fictional data", runLabel: "Run", resultLabel: "Result", rowsLabel: "rows",
    query: SITE_ES.sql.query, columns: ["ref_id", "system", "bank", "diff"], rows: SITE_ES.sql.rows
  },
  automation: {
    title: "04 · Automate the process", note: "DEMO · workflow based on real experience",
    steps: [
      { label: "1", title: "Extract", text: "Automatic access and report download." },
      { label: "2", title: "Process", text: "Clean and consolidate the information." },
      { label: "3", title: "Validate", text: "Review differences and exceptions." },
      { label: "4", title: "Deliver", text: "Summary ready for analysis and follow-up." }
    ],
    impact: { before: "4 hours", after: "10 minutes", label: "Manual process → automated process" }
  },
  tech: { title: "Technologies", intro: "", items: SITE_ES.tech.items },
  about: {
    title: "About me",
    paragraphs: [
      "I currently work at Pycca S.A., a retail company with its own credit system. We reconcile daily information from banks and internal systems across 116 stores nationwide. Using Python, SQL and Selenium, I have automated manual tasks such as bank reconciliations, report downloads and data consolidation.",
      "I am building my career toward Data Analysis and Business Intelligence. The projects on this page are based on work and learning problems, using anonymized or illustrative data. I am looking to keep developing in a role where I can turn data into useful information for decision-making."
    ],
    avatarAlt: "Photo of Eduardo Vite León",
    experience: { eyebrow: "DATA EXPERIENCE", title: "PYCCA S.A.", meta: "Retail & Credit", points: [
      "Reconciliation of banking information and internal systems.",
      "Automation of operational tasks and reports.",
      "Data extraction, transformation and consolidation.",
      "Analysis of differences and exceptions."
    ]}
  },
  impact: {
    title: "Results with data",
    intro: "Concrete results from my daily experience with reconciliation and automation processes.",
    metrics: [
      { value: "116", label: "stores nationwide" },
      { value: "20,000", label: "transactions processed daily" },
      { value: "4 h → 10 min", label: "manual process time reduced" }
    ]
  },
  projects: {
    title: "Projects", intro: "", mediaTitle: "Project visuals", mediaHint: "Dashboards, screenshots and GIFs", mediaEmptyTitle: "Visuals coming soon", mediaEmptyText: "This space is ready for dashboard screenshots, charts, GIFs or short videos related to the project.", linkLabel: "View project", labels: { problem: "Problem", process: "Process", result: "Result" }, moreLabel: "", moreHref: "",
    items: [
      {
  "title": "Multi-bank reconciliation tool",
  "description": "The application compares system and bank payments to focus the review on differences. Public demo with fictional data.",
  "problem": "Comparing two reports payment by payment made it harder to locate missing transactions and amount differences at closing.",
  "process": "I brought file reading, closing cutoffs and customer-plus-reference matching into one application.",
  "result": "The output includes a reconciliation and a pending list with source copies for follow-up. The demonstration uses entirely fictional data.",
  "tags": [
    "Python",
    "pandas",
    "SQL",
    "Tkinter"
  ],
  "repo": "proyectos/conciliador-bancario/index-en.html",
  "image": "images/proyectos/media/conciliador-bancario/vista-previa-en.gif",
  "imageAlt": "Walkthrough of the Windows demo application, with fictional payments and services.",
  "media": [
    {
      "type": "image",
      "src": "images/proyectos/media/conciliador-bancario/detalle-en.png",
      "alt": "Fictional service lookup for a pending payment.",
      "caption": "A match provides a clue; the payment remains pending review."
    }
  ],
  "newTab": false,
  "previewWide": true,
  "imageStatic": "images/proyectos/media/conciliador-bancario/vista-previa-en.png"
}
    ]
  },
  certifications: {
    title: "Certifications / Education",
    intro: "Courses and studies that support my profile in data, finance and taxation.",
    items: [
      { title: "Taxation and Finance for Business (40 h)", file: "images/certificaciones/tributacion-finanzas-negocios.svg", type: "image", note: "UNEMI · Outreach Vice-Rectorate · April 2026." },
      { title: "Professional Python Course", file: "images/certificaciones/Captura de pantalla 2026-09-24 160556.png", type: "image", note: "Loops, tuples, lists, dictionaries and error handling." },
      { title: "Introduction to Relational Databases", file: "images/certificaciones/Certificado_base_de_datos.png", type: "image", note: "Relational databases, intermediate queries, data handling and structure." },
      { title: "Python (Intermediate-Advanced)", file: "images/certificaciones/Certificado_unemi_python.png", type: "image", note: "Pandas, object-oriented programming and data structures." },
      { title: "Data Science Basics and Concepts", file: "images/certificaciones/Curso_bases_ciencia_de_datos.png", type: "image", note: "Introduction to machine learning, vectors and relational systems." }
    ]
  },
  contact: {
    title: "Contact",
    text: "Looking for a data, financial reconciliation or credit analyst? I am open to new opportunities.",
    items: [
      { label: "Email", text: CORREO, href: "mailto:"+CORREO },
      { label: "LinkedIn", text: "Eduardo Vite León", href: LINKEDIN },
      { label: "GitHub", text: "github.com/"+USUARIO_GITHUB, href: GITHUB },
      { label: "Country", text: "Ecuador", href: "" },
      { label: "City", text: "Guayaquil", href: "" }
    ],
    highlights: [
      { title: "Languages", tags: ["Spanish (native)", "English (advanced)"] },
      { title: "Strengths", tags: ["Multi-bank reconciliation", "Revolving credit & collections", "Automation (Python & Selenium)", "SQL Server & Power BI", "Data quality control", "Working under pressure"] }
    ]
  },
  footer: "© {year} Eduardo Vite León"
});

const ACTIVE_LANG = (() => { try { return localStorage.getItem('portfolio-lang') === 'en' ? 'en' : 'es'; } catch (e) { return 'es'; } })();
const ACTIVE_SITE = ACTIVE_LANG === 'en' ? SITE_EN : SITE_ES;
