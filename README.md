# Portafolio de Eduardo Vite León

Sitio web de una sola página hecho con HTML, CSS y JavaScript puro. No necesita instalar nada ni compilar: se abre con doble clic y se publica gratis en GitHub Pages.

## Qué contiene la carpeta

```
portafolio-eduardo-vite/
├── index.html        Estructura de la página (casi no se toca)
├── css/style.css     Colores y estilos
├── js/
│   ├── config.js     TODAS LAS PALABRAS del sitio (aquí editas)
│   └── app.js        Lógica del sitio (no se toca)
├── images/           Tu foto (avatar.jpg) y capturas de proyectos
└── cv/               Tu CV en PDF
```

## 1. Verlo en tu computador

Haz doble clic en `index.html`. Necesitas internet solo para cargar las tipografías; sin conexión se ve igual, con tipografías del sistema.

## 2. Cambiar las palabras

Abre `js/config.js` con cualquier editor de texto (Bloc de notas, VS Code) y cambia el texto que está entre comillas. Guarda y recarga la página en el navegador.

- No borres comas `,`, llaves `{ }` ni corchetes `[ ]`.
- Si necesitas una comilla dentro de un texto, escríbela así: `\"`.
- Arriba del archivo están los datos que se repiten (`USUARIO_GITHUB`, `CORREO`, `LINKEDIN`): cámbialos una sola vez y se actualizan en todos los enlaces.
- Para ocultar un botón, deja su `href` vacío (`""`).
- Los textos son texto plano: no funcionan etiquetas HTML dentro de ellos.

Además, en `index.html` (líneas del `<title>` y `<meta name="description">`) cambia el título y la descripción que ven Google y las vistas previas al compartir el enlace.

### Agregar o quitar un proyecto

En `config.js`, dentro de `projects → items`, cada proyecto es un bloque entre llaves `{ ... },`. Para agregar uno, copia un bloque completo, pégalo debajo y cambia sus textos. Para quitarlo, borra su bloque completo.

### Agregar capturas a los proyectos

1. Guarda la imagen en la carpeta `images/` (por ejemplo `images/conciliador.png`). Funciona mejor en proporción 16:10 (por ejemplo 1200 x 750 px).
2. En el proyecto, cambia `image: ""` por `image: "images/conciliador.png"`.

Antes de subir una captura, revisa que no muestre datos reales: nombres, cuentas, montos o sistemas internos.

### Tu foto y tu CV

- Foto: guarda `avatar.jpg` dentro de `images/` (puedes copiar la del portafolio anterior). Si no existe, el sitio muestra tus iniciales.
- CV: guarda el PDF como `cv/CV-Eduardo-Vite.pdf`, o cambia la ruta en `buttons → secondary → href`.

### El carrusel de la portada

En vez de una sola tabla, la portada tiene un carrusel de 3 tarjetas con flechas, puntos y arrastre (swipe) en el celular:

1. **Gráfica** de compras, consumos y pagos: compara el último mes contra el promedio de los meses anteriores, con barras animadas.
2. **Tabla** de conciliación (la que ya conocías): compara sistema contra banco y corrige las diferencias hasta cuadrar.
3. **Consulta SQL**: se escribe sola, como si la tipearas, y al terminar muestra su resultado.

Todo esto se controla desde `config.js`:

- `deck.order` decide qué tarjetas aparecen y en qué orden. Por ejemplo `["table", "chart"]` deja solo dos, en ese orden. Con `[]` se oculta el carrusel completo.
- `chart` tiene los datos de la gráfica: `months` (los meses) y `series` (hasta 4 líneas de datos, cada una con un valor por mes). El último mes es el que se compara contra el promedio de los anteriores; eso se calcula solo.
- `ledger` es la tabla (igual que antes).
- `sql` tiene las líneas de la consulta (`query`, una línea de texto por línea de código) y la tabla de resultado (`columns` y `rows`).
- Si dejas alguno de los tres (`chart`, `ledger` o `sql`) en `null`, esa tarjeta desaparece del carrusel automáticamente, aunque siga en `deck.order`.
- La tarjeta se ajusta sola a la altura de cada diapositiva: no tienes que preocuparte por dejar todo del mismo tamaño.

## 3. Cambiar colores

En `css/style.css`, al inicio, están las variables de color del tema oscuro y del tema claro (`--bg`, `--text`, `--ok`, etc.). Cambia los códigos de color y listo.

## 4. Publicar gratis en GitHub Pages

1. Entra a GitHub y crea un repositorio nuevo, público. Si lo llamas `TU-USUARIO.github.io`, tu sitio quedará en `https://TU-USUARIO.github.io`. Con cualquier otro nombre, quedará en `https://TU-USUARIO.github.io/nombre-del-repo/`.
2. Sube el contenido de la carpeta (no la carpeta en sí): `index.html`, `css`, `js`, `images` y `cv`. Puedes hacerlo con *Add file → Upload files*.
3. En el repositorio, ve a *Settings → Pages*. En *Source* elige *Deploy from a branch*, luego la rama `main` y la carpeta `/ (root)`, y guarda.
4. Espera uno o dos minutos y GitHub te mostrará el enlace del sitio. Cada vez que subas cambios, el sitio se actualiza solo.

La interfaz de GitHub cambia de vez en cuando; si algún nombre de menú no coincide, busca la opción *Pages* dentro de *Settings*.

## Pendientes antes de publicar

- [ ] Cambiar `USUARIO_GITHUB` y `CORREO` en `js/config.js`.
- [ ] Revisar los nombres de repositorio de cada proyecto (`repo: GITHUB + "/..."`).
- [ ] Revisar las tecnologías de cada proyecto (`tags`).
- [ ] Agregar `images/avatar.jpg` y `cv/CV-Eduardo-Vite.pdf`.
- [ ] Agregar capturas de proyectos, sin datos reales.
- [ ] Agregar tu ciudad en "Ubicación", si quieres.

## Sobre el contacto

El sitio no incluye un formulario, porque un sitio estático no puede enviar mensajes por sí solo. Los enlaces de correo, LinkedIn y GitHub cubren lo esencial. Si más adelante quieres un formulario, se puede conectar a un servicio externo.
