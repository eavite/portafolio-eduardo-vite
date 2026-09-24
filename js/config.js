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
  pageTitle: "Eduardo Vite León | Data Analyst & BI | Python, SQL, Power BI",
  pageDescription: "Portafolio de Eduardo Vite León, Analista de Datos y BI con experiencia en retail y crédito. Análisis, automatización y visualización con Python, SQL, Power BI y Excel.",
  name: "Eduardo Vite León",
  initials: "EV",          // Se muestra en el menú del celular y si no hay foto

  /* Portada */
  role: "Analista de Datos & BI",
  tagline: "Transformo datos operativos en análisis, automatizaciones y dashboards que ayudan a tomar decisiones.",
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
      { label: "Fuentes", value: "Datos", delta: "bancos + sistemas" },
      { label: "Objetivo", value: "Detectar", delta: "diferencias" }
    ],
    chartTitle: "Ejemplo visual de volumen",
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
      "Actualmente trabajo en Pycca S.A., empresa líder de retail con sistema de crédito propio. Conciliamos diariamente información de bancos y sistemas internos para más de 100 almacenes. Con Python, SQL y Selenium he automatizado tareas que antes eran manuales, como cuadres bancarios, descarga de reportes y consolidación de datos.",
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
    linkLabel: "Ver proyecto",
    labels: { problem: "Problema", process: "Proceso", result: "Resultado" },
    moreLabel: "Ver todos en GitHub",
    moreHref: GITHUB,
    items: [
      {
        title: "Conciliador bancario multibanco",
        description: "Cruza las transacciones internas con los reportes del banco (incluye Banred por SFTP) y detecta diferencias sin revisión manual.",
        problem: "Comparar transacciones internas y bancarias de forma manual dificulta detectar diferencias a tiempo.",
        process: "Extracción de archivos y datos, transformación con Pandas y comparación de movimientos.",
        result: "Centraliza la conciliación y facilita identificar diferencias que requieren revisión.",
        tags: ["Python", "pandas", "Tkinter"],
        repo: GITHUB + "/conciliador-bancario",
        image: "",
        imageAlt: "Captura del conciliador bancario"
      },
      {
        title: "Reportes de recaudaciones automáticos",
        description: "Descarga cada mañana los reportes de un portal interno y arma el resumen en Excel sin intervención.",
        problem: "La descarga y consolidación diaria de reportes requiere tareas repetitivas y manuales.",
        process: "Automatización de la navegación y descarga con Selenium y consolidación de la información en Excel.",
        result: "Deja preparado un resumen diario con menos intervención manual.",
        tags: ["Python", "Selenium", "Excel"],
        repo: GITHUB + "/reportes-recaudaciones-selenium",
        image: "",
        imageAlt: "Captura del resumen de recaudaciones en Excel"
      },
      {
        title: "Dashboard del cuadre mensual",
        description: "Muestra las diferencias entre lo recaudado y el reporte final de cierre.",
        problem: "Revisar diferencias de cierre en distintos reportes dificulta tener una visión rápida del resultado.",
        process: "Consulta y preparación de datos en SQL para alimentar indicadores y visualizaciones.",
        result: "Permite visualizar el cuadre y localizar diferencias desde un dashboard.",
        tags: ["SQL", "Power BI"],
        repo: GITHUB + "/dashboard-cuadre-recaudaciones",
        image: "",
        imageAlt: "Captura del dashboard del cuadre mensual en Power BI"
      },
      {
        title: "Detección de anomalías transaccionales",
        description: "Identifica transacciones atípicas para priorizar su revisión.",
        problem: "Revisar grandes volúmenes de transacciones hace difícil detectar comportamientos fuera de lo habitual.",
        process: "Limpieza y análisis de transacciones con Python y Pandas para identificar valores atípicos.",
        result: "Ayuda a priorizar transacciones que requieren una revisión más detallada.",
        tags: ["Python", "pandas"],
        repo: GITHUB + "/deteccion-anomalias-transacciones",
        image: "",
        imageAlt: "Captura de la detección de anomalías transaccionales"
      },
      {
        title: "Warehouse y KPIs con historial (SCD2)",
        description: "Modelo dimensional que conserva el historial de cambios y alimenta los indicadores.",
        problem: "Los cambios históricos pueden perderse cuando solo se conserva el estado actual de los datos.",
        process: "Diseño de un modelo dimensional con historial de cambios mediante SCD2.",
        result: "Conserva la evolución de los datos y deja una base preparada para indicadores históricos.",
        tags: ["SQL"],
        repo: GITHUB + "/warehouse-kpis-scd2",
        image: "",
        imageAlt: "Diagrama del modelo dimensional con historial SCD2"
      },
      {
        title: "Clasificador de correos",
        description: "Clasifica correos por tipo de solicitud para ordenar la bandeja.",
        problem: "Clasificar solicitudes manualmente consume tiempo y dificulta priorizar la bandeja.",
        process: "Procesamiento y clasificación de correos mediante Python.",
        result: "Organiza las solicitudes por tipo para facilitar su revisión y gestión.",
        tags: ["Python"],
        repo: GITHUB + "/clasificador-correos",
        image: "",
        imageAlt: "Captura del clasificador de correos"
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
    intro: "Espacios reservados para certificaciones, cursos o estudios que quieras destacar.",
    items: [
      { title: "Certificación / Estudio 01", file: "images/certificaciones/certificacion-01.svg", type: "image", note: "Espacio reservado" },
      { title: "Certificación / Estudio 02", file: "images/certificaciones/certificacion-02.svg", type: "image", note: "Espacio reservado" },
      { title: "Certificación / Estudio 03", file: "images/certificaciones/certificacion-03.svg", type: "image", note: "Espacio reservado" },
      { title: "Certificación / Estudio 04", file: "images/certificaciones/certificacion-04.svg", type: "image", note: "Espacio reservado" }
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
  pageTitle: "Eduardo Vite León | Data Analyst & BI | Python, SQL, Power BI",
  pageDescription: "Portfolio of Eduardo Vite León, Data Analyst & BI with experience in retail and credit. Data analysis, automation and visualization with Python, SQL, Power BI and Excel.",
  role: "Data Analyst & BI",
  tagline: "I turn operational data into analysis, automation and dashboards that support decision-making.",
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
      { label: "Sources", value: "Data", delta: "banks + systems" },
      { label: "Goal", value: "Detect", delta: "differences" }
    ],
    chartTitle: "Visual example of volume", chart: [72,86,81,94,88,100,92]
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
      "I currently work at Pycca S.A., a retail company with its own credit system. We reconcile daily information from banks and internal systems across more than 100 stores. Using Python, SQL and Selenium, I have automated manual tasks such as bank reconciliations, report downloads and data consolidation.",
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
    title: "Projects", intro: "", linkLabel: "View project", labels: { problem: "Problem", process: "Process", result: "Result" }, moreLabel: "View all on GitHub", moreHref: GITHUB,
    items: [
      { title: "Multi-bank reconciliation tool", description: "Cross-checks internal transactions against bank reports and identifies differences without manual review.", problem: "Manually comparing internal and bank transactions makes it harder to detect differences on time.", process: "File and data extraction, transformation with Pandas and transaction matching.", result: "Centralizes reconciliation and makes differences requiring review easier to identify.", tags: ["Python","pandas","Tkinter"], repo: GITHUB+"/conciliador-bancario", image: "", imageAlt: "Screenshot of the bank reconciliation tool" },
      { title: "Automated collection reports", description: "Downloads reports from an internal portal each morning and prepares the Excel summary without manual intervention.", problem: "Daily report downloading and consolidation requires repetitive manual tasks.", process: "Automated navigation and downloads with Selenium and consolidation in Excel.", result: "Prepares a daily summary with less manual intervention.", tags: ["Python","Selenium","Excel"], repo: GITHUB+"/reportes-recaudaciones-selenium", image: "", imageAlt: "Screenshot of the collection report in Excel" },
      { title: "Monthly reconciliation dashboard", description: "Shows differences between collected amounts and the final closing report.", problem: "Reviewing closing differences across multiple reports makes it difficult to get a quick view of the result.", process: "SQL-based data preparation to feed indicators and visualizations.", result: "Makes the reconciliation visible and helps locate differences from a dashboard.", tags: ["SQL","Power BI"], repo: GITHUB+"/dashboard-cuadre-recaudaciones", image: "", imageAlt: "Screenshot of the monthly reconciliation dashboard in Power BI" },
      { title: "Transaction anomaly detection", description: "Identifies unusual transactions to prioritize for review.", problem: "Reviewing large transaction volumes makes it difficult to detect behavior outside the usual pattern.", process: "Cleaning and analysis of transactions with Python and Pandas to identify outliers.", result: "Helps prioritize transactions that require a more detailed review.", tags: ["Python","pandas"], repo: GITHUB+"/deteccion-anomalias-transacciones", image: "", imageAlt: "Screenshot of transaction anomaly detection" },
      { title: "Data warehouse and historical KPIs (SCD2)", description: "Dimensional model that preserves change history and feeds indicators.", problem: "Historical changes can be lost when only the current state of the data is kept.", process: "Design of a dimensional model with change history using SCD2.", result: "Preserves data evolution and provides a base for historical indicators.", tags: ["SQL"], repo: GITHUB+"/warehouse-kpis-scd2", image: "", imageAlt: "Diagram of the dimensional model with SCD2 history" },
      { title: "Email classifier", description: "Classifies emails by request type to organize the inbox.", problem: "Manually classifying requests takes time and makes inbox prioritization harder.", process: "Email processing and classification with Python.", result: "Organizes requests by type to facilitate review and management.", tags: ["Python"], repo: GITHUB+"/clasificador-correos", image: "", imageAlt: "Screenshot of the email classifier" }
    ]
  },
  certifications: {
    title: "Certifications / Education",
    intro: "Reserved spaces for certifications, courses or studies you want to highlight.",
    items: [
      { title: "Certification / Study 01", file: "images/certificaciones/certificacion-01.svg", type: "image", note: "Reserved space" },
      { title: "Certification / Study 02", file: "images/certificaciones/certificacion-02.svg", type: "image", note: "Reserved space" },
      { title: "Certification / Study 03", file: "images/certificaciones/certificacion-03.svg", type: "image", note: "Reserved space" },
      { title: "Certification / Study 04", file: "images/certificaciones/certificacion-04.svg", type: "image", note: "Reserved space" }
    ]
  },
  contact: {
    title: "Contact",
    text: "Do you have a data opportunity or project? Send me a message and let’s talk.",
    items: [
      { label: "Email", text: CORREO, href: "mailto:"+CORREO },
      { label: "LinkedIn", text: "Eduardo Vite León", href: LINKEDIN },
      { label: "GitHub", text: "github.com/"+USUARIO_GITHUB, href: GITHUB },
      { label: "Country", text: "Ecuador", href: "" },
      { label: "City", text: "Guayaquil", href: "" }
    ],
    highlights: [
      { title: "Languages", tags: ["Spanish (native)", "English (intermediate)"] },
      { title: "Strengths", tags: ["Attention to detail", "Working under pressure", "Proactivity", "Fast learning"] }
    ]
  },
  footer: "© {year} Eduardo Vite León"
});

const ACTIVE_LANG = (() => { try { return localStorage.getItem('portfolio-lang') === 'en' ? 'en' : 'es'; } catch (e) { return 'es'; } })();
const ACTIVE_SITE = ACTIVE_LANG === 'en' ? SITE_EN : SITE_ES;
