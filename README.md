# Portafolio de Eduardo Vite León

Portafolio web estático de **Eduardo Vite León — Data Analyst & BI**.

La web está construida con **HTML, CSS y JavaScript puro**. No necesita Node.js, npm, frameworks ni compilación para funcionar.

## 1. Cómo entender el proyecto

Si es la primera vez que abres la carpeta, sigue este orden:

1. `index.html` → estructura general de la página.
2. `js/config.js` → contenido que aparece en pantalla. **Este es el archivo principal para editar.**
3. `css/style.css` → diseño visual.
4. `js/app.js` → funcionamiento de la web.
5. `js/effects.js` → animaciones y efectos visuales.

Dentro de cada carpeta también hay un `LEEME.txt` con instrucciones específicas.

## 2. Estructura de carpetas

```text
portafolio-eduardo-vite/
├── index.html
├── README.md
├── .gitignore
│
├── css/
│   ├── style.css
│   └── LEEME.txt
│
├── js/
│   ├── config.js
│   ├── app.js
│   ├── effects.js
│   └── LEEME.txt
│
├── images/
│   ├── LEEME.txt
│   ├── perfil/
│   │   ├── avatar.jpg              ← colocar foto aquí
│   │   └── LEEME.txt
│   ├── proyectos/
│   │   ├── LEEME.txt
│   │   ├── media/
│   │   │   └── ...una carpeta por proyecto...
│   │   └── ...capturas...
│   └── certificaciones/
│       ├── LEEME.txt
│       ├── certificacion-01.svg    ← marcador, reemplazar
│       ├── certificacion-02.svg    ← marcador, reemplazar
│       ├── certificacion-03.svg    ← marcador, reemplazar
│       └── certificacion-04.svg    ← marcador, reemplazar
│
└── cv/
    ├── CV-Eduardo-Vite.pdf         ← colocar CV aquí
    └── LEEME.txt
```

## 3. Qué debes editar normalmente

### Textos, enlaces y contenido
Edita solamente:

`js/config.js`

Ahí están el nombre, correo, LinkedIn, GitHub, textos de la portada, experiencia, métricas, proyectos, certificaciones y versiones en español/inglés.

### Foto
Coloca tu foto en:

`images/perfil/avatar.jpg`

### CV
Coloca tu CV en:

`cv/CV-Eduardo-Vite.pdf`

### Certificaciones y estudios
Guarda las evidencias en:

`images/certificaciones/`

Los cuatro SVG iniciales son marcadores. Reemplázalos por tus documentos reales cuando los tengas. El visor de la web permite abrir las evidencias en pantalla completa.

### Visuales de proyectos
La web ya incluye una estructura visual completa dentro de cada proyecto. Puedes mostrar una imagen principal, una galería de capturas, un GIF, un video corto o un PDF.

Para mantener todo ordenado, guarda los archivos en:

`images/proyectos/media/nombre-del-proyecto/`

Después completa `media: [...]` del proyecto correspondiente en `js/config.js`.

Ejemplo:

```js
media: [
  { type: "image", src: "images/proyectos/media/mi-proyecto/dashboard.png", alt: "Dashboard principal", caption: "Vista general" },
  { type: "image", src: "images/proyectos/media/mi-proyecto/demo.gif", alt: "Recorrido", caption: "Interacción con filtros" },
  { type: "video", src: "images/proyectos/media/mi-proyecto/demo.mp4", alt: "Demostración", caption: "Demostración corta" }
]
```

Consulta `images/proyectos/LEEME.txt` para los formatos disponibles y recomendaciones de uso.

## 4. Cómo probar la web

No necesitas instalar nada.

Abre `index.html` en el navegador.

Para una experiencia más parecida a un servidor web, también puedes abrir la carpeta con VS Code y usar una extensión como Live Server, pero no es obligatorio.

## 5. Cómo cambiar de español a inglés

El selector de idioma está en la web.

Los dos idiomas están definidos dentro de `js/config.js`. Primero puedes completar y corregir la versión en español y después adaptar la versión en inglés manteniendo la misma estructura.

## 6. Qué información es real y qué información es demostrativa

La web diferencia explícitamente entre experiencia real y demostraciones.

Experiencia real documentada en el contenido actual:
- PYCCA S.A.
- 116 almacenes a nivel nacional.
- Aproximadamente 20.000 transacciones diarias.
- Conciliación de información bancaria y sistemas internos.
- Extracción, transformación y consolidación de datos.
- Automatización de tareas y reportes.
- Proceso automatizado de aproximadamente 4 horas a aproximadamente 10 minutos.

Los datos utilizados en las demostraciones visuales del carrusel se identifican como **DEMO** cuando son ficticios o ilustrativos.

No conviertas automáticamente estos datos en porcentajes, dinero ahorrado, ROI u otros indicadores que no hayan sido calculados y aprobados.

## 7. Cómo agregar un proyecto

En `js/config.js`, busca:

`projects: { items: [...] }`

Cada objeto representa un proyecto. Puedes completar:

- `title`
- `description`
- `problem`
- `process`
- `result`
- `tags`
- `repo`
- `image`
- `imageAlt`

Si todavía no tienes evidencia visual o un repositorio listo, puedes dejar `image` vacío. No inventes enlaces ni resultados.

## 8. Cómo agregar una certificación

En `js/config.js`, busca:

`certifications: { items: [...] }`

Cambia el título y la ruta del archivo.

Para una imagen:

```js
file: "images/certificaciones/mi-certificado.jpg",
type: "image"
```

Para un PDF:

```js
file: "images/certificaciones/mi-certificado.pdf",
type: "pdf"
```

## 9. Publicar en GitHub Pages

1. Crea un repositorio público en GitHub.
2. Sube el contenido de esta carpeta.
3. En GitHub abre `Settings → Pages`.
4. Selecciona `Deploy from a branch`.
5. Elige la rama `main` y la carpeta `/ (root)`.
6. Guarda y espera a que GitHub publique la página.

## 10. Regla para mantener el proyecto limpio

- **Contenido:** `js/config.js`
- **Diseño:** `css/style.css`
- **Funcionamiento:** `js/app.js`
- **Animaciones:** `js/effects.js`
- **Imágenes:** `images/`
- **CV:** `cv/`

Si solo quieres actualizar tu información, empieza por `js/config.js` y no toques el resto.

## 11. Antes de publicar

- [ ] Colocar foto de perfil.
- [ ] Colocar CV.
- [ ] Revisar correo, LinkedIn y GitHub.
- [ ] Reemplazar los cuatro marcadores de certificaciones cuando tengas los documentos.
- [ ] Agregar capturas reales de proyectos cuando estén listas.
- [ ] Revisar que ninguna imagen contenga información confidencial.
- [ ] Probar la versión móvil.
- [ ] Revisar el selector ES/EN.
- [ ] Abrir todos los enlaces importantes antes de publicar.


## Project media
Each project has a dedicated folder under `images/proyectos/media/` for dashboards, screenshots, charts and GIFs. Add the file paths to the project's `media` array in `js/config.js`.
