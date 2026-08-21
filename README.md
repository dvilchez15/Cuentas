# Cuenta Clara V3.7 — colores de botones acordes al logo

## Nuevo: paleta de marca en vez de azul genérico
Los botones, el foco de los campos y los checkboxes usaban el azul estándar de iOS, sin relación con el logo de la app. Ahora usan el **teal extraído directamente del propio logo** (muestreado del degradado del anillo y la moneda):
- Botón principal: degradado teal (`#0d8083` → `#0a6e73`), replicando el mismo ángulo del degradado del logo.
- Foco de campos de texto: teal claro en vez de azul claro.
- Checkboxes: `accent-color` teal en vez del azul nativo del sistema.
- La flecha "→" de "quién paga a quién" también hereda el nuevo teal.
- El verde (pagos al día) y el rojo (deuda pendiente / borrar) se mantienen sin cambios — son colores semánticos de estado, no de marca.
- Contraste comprobado matemáticamente: el teal elegido da 4.7:1 sobre blanco (cumple el mínimo de accesibilidad AA para texto normal).
- Revisado en claro y en oscuro; los avatares de grupo mantienen su paleta variada de 10 colores (estilo Contactos), sin forzar el teal ahí — la variedad es intencional para poder distinguir grupos de un vistazo.

## Botones de "continuar" (versión anterior)
Cada pantalla tiene su propio botón para avanzar a la siguiente, justo encima de "Empezar de nuevo", sin tener que volver arriba a tocar la pestaña pequeña.

## Swipe y pantallas independientes (versiones anteriores)
"Personas / Gastos / Resultado" son 3 pantallas reales (no scroll continuo), navegables tocando los pasos, deslizando el dedo, o con los botones de continuar.

## Bugs críticos corregidos en revisiones anteriores (pérdida de datos)
- `addPerson()` y `toggleTransferPaid()` no sincronizaban con el grupo guardado.
- Borrar una persona podía romper la reindexación de gastos y transferencias marcadas como pagadas.
- Botón para borrar personas: existía la función pero ningún botón la llamaba.
- La hoja de "Nueva compra" no tenía scroll interno.

## Confirmado con pruebas reales en navegador (Playwright + iPhone emulado)
- Toda la batería de regresión de sesiones anteriores sigue pasando sin errores de consola tras el cambio de color.
- Navegación por toque, swipe y botones "Continuar", en ambas direcciones.

## Diseño visual
- Logo real en portada, avatares de color con inicial, iconos de línea en vez de emoji, control segmentado, feedback táctil, vidrio esmerilado en la hoja modal, modo oscuro real, paleta de marca en botones.
- Iconos de la app regenerados desde alta resolución: el dibujo ocupa ~84% del marco (antes ~62%).

## Lo que todavía NO se ha probado
- Un iPhone físico real.
- El empaquetado nativo con Capacitor para la App Store — sigue pendiente.
- Recuperación ante errores de `localStorage` lleno o deshabilitado (poco probable pero no gestionado).

## Código muerto detectado (no modificado, bajo riesgo)
`openGroupForEdit()`, `renderSavedGroups()` y `updateExpense()` no se invocan desde ningún botón de la interfaz actual.

## Publicación en GitHub Pages
Sustituye los archivos de la raíz del repositorio por los archivos de este paquete.







