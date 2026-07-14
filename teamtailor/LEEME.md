# Careers en Teamtailor: cómo pasar el código

La página de careers de la web ([careers.html](../careers.html)) está troceada aquí en **bloques**, listos para pegar en el editor del career site de Teamtailor. Cada bloque tiene dos archivos: el **HTML** (maquetación y su script al final, que también carga las fuentes) y el **CSS** (solo estilos).

> **Ojo con las fuentes**: el procesador de CSS de Teamtailor descarta la hoja **entera** si contiene un `@import`, y además elimina las etiquetas `<link>` del campo HTML. Por eso cada bloque carga sus hojas externas (Google Fonts, Ailerons) **por JavaScript** al principio de su `<script>`. No añadas `@import` al campo CSS ni `<link>` al campo HTML: no sobreviven.

> **Nada de iconos Font Awesome con `<i class="fa-...">`**: el career site carga Font Awesome en su versión SVG+JS, que procesa esas etiquetas y deja vacíos los iconos que no están en su subconjunto. Todos los iconos van como **SVG inline** en el HTML (con `fill="currentColor"`, heredan color y tamaño del contenedor).

> Las etiquetas `<style>` dentro del campo HTML **sí** se conservan tal cual (sin reescribir selectores). Los bloques 1 y 7 usan esto para ocultar el encabezado y el pie nativos de Teamtailor con CSS global.

Teamtailor inyecta los bloques de código directamente en la página y reescribe parte del CSS, así que estos archivos están blindados para eso: todos los estilos van con ámbito de su sección (nada de `:root`, `body` ni selectores globales que Teamtailor pueda descartar o que pisen los estilos del propio Teamtailor).

## Paso a paso en Teamtailor

1. Entra en Teamtailor y ve a **Career site → Editar**.
2. Añade (o edita) un bloque de tipo **Código** ("HTML y CSS personalizados").
3. Pega **el archivo `.html` en el campo HTML** y **el archivo `.css` en el campo CSS**. No mezcles: el HTML no debe ir en el campo CSS ni al revés.
4. Guarda y repite con el resto de bloques, en este orden:

| Orden | Archivos | Sección |
|---|---|---|
| 1 | `bloque-1-hero.html` + `.css` | Hero con vídeo de fondo |
| 2 | `bloque-2-bienvenida.html` + `.css` | Bienvenida / Human Capital (foto grupal) |
| 3 | `bloque-3-valores.html` + `.css` | Valores (fondo oscuro, numerales Tessera) |
| 4 | `bloque-4-por-que-tessera.html` + `.css` | Por qué Tessera (3 tarjetas) |
| 5 | `bloque-5-vacantes.html` + `.css` (o el bloque nativo "Jobs") | Vacantes |
| 6 | `bloque-6-ubicacion.html` + `.css` | Acerca de / ubicación (contador) |
| 7 | `bloque-7-footer.html` + `.css` | Footer con enlaces a la web principal |

5. **Quita el bloque nativo "About"** de Teamtailor si sigue en la página: duplica el título "Acerca de Tessera Human Capital" que ya pone el bloque 6.
6. Publica los cambios.

## La franja azul entre secciones

Teamtailor envuelve cada bloque de código en un contenedor con relleno vertical y el color de fondo corporativo: esa es la franja azul que se ve entre secciones. Cada bloque lleva ahora un script que detecta ese contenedor y le quita el relleno y el fondo automáticamente, así las secciones quedan pegadas como en la web original. Si en los ajustes del bloque de Teamtailor existe una opción de "padding" o "fondo", puedes desactivarla también desde ahí, pero no hace falta.

## Sobre las vacantes (paso 5)

El bloque nativo "Jobs" de Teamtailor se actualiza solo al publicar o cerrar ofertas. `bloque-5-vacantes` mantiene el diseño exacto de la web, pero las ofertas están escritas a mano: cada vez que publiques o cierres una vacante tendrás que editar ese bloque. Elige el que prefieras.

Nota: el botón "Ver vacantes" del hero hace scroll suave hasta la sección `#vacantes` si existe (bloque 5); si usas el bloque nativo "Jobs", el botón lleva a la página de ofertas.

## Encabezado y pie nativos de Teamtailor

- **Encabezado**: el bloque 1 (hero) incluye la barra de navegación de la web (`#tsr-nav`, con menú móvil) y oculta el encabezado nativo de Teamtailor (`header[data-section-model="header"]`). Los enlaces apuntan a las secciones de tesseraservices.com; "Careers" vuelve al inicio del career site. Ojo: esto solo aplica en las páginas que tengan el bloque 1 — en el resto (p. ej. la página "Vacantes") sigue saliendo el encabezado nativo.
- **Pie**: el bloque 7 es el único footer; oculta el pie nativo (`[data-section-model="footer"]`) e incluye el enlace "Datos y privacidad" (aviso de datos para candidatos de Teamtailor) para que no se pierda.
- **La barra "Página de empleo de Teamtailor"** del final no se puede quitar con CSS: Teamtailor la protege (estilos inline con `!important` y `data-turbo-permanent`). Es la marca del plan actual; solo desaparece contratando el add-on de marca blanca.

## Cambios respecto a la web original

- **Estilos con ámbito por sección**: cada regla CSS va prefijada con el id de su sección para sobrevivir al procesado de Teamtailor y no afectar al resto de la página.
- **Anclajes internos restaurados**: "Ver vacantes" (hero) y "Conócenos" (bienvenida) hacen scroll suave dentro de la página, como en la web.
- **El hero ocupa la pantalla** (descontando la cabecera de Teamtailor), con 720px de mínimo si el navegador no soporta las unidades modernas.
- **Los enlaces del footer apuntan a URLs absolutas** de tesseraservices.com.
- **Sin nav ni modal de contacto**: la cabecera y los formularios los gestiona Teamtailor.
- **Sin Lenis ni cortinilla de carga**. Se conservan el reveal al hacer scroll, el contador animado, los hovers y los lavados de color de la sección de valores.

## Imágenes y vídeo

- El vídeo del hero se carga desde `https://tesseraservices.com/media/hero-bg.webm` (ya está publicado en Netlify).
- La foto grupal y los numerales SVG **todavía no están en Netlify** (el último deploy es anterior a esos archivos), así que de momento se cargan desde GitHub (`raw.githubusercontent.com/Jaimemamalla/TESSERA/main/media/...`). Esto funciona mientras el repositorio sea público.
- Cuando Netlify publique el último commit, lo ideal es cambiar esas URLs por `https://tesseraservices.com/media/...` en los bloques 2 y 3.

## Previsualizar en local

Sirve la carpeta con un servidor local y abre `teamtailor/_preview.html`: monta los siete bloques inline con el mismo contenedor (relleno + fondo azul) que usa Teamtailor, para comprobar que los scripts lo eliminan. No funciona abriendo el archivo con doble clic, porque carga los bloques con `fetch`.
