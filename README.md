# Cuenta Clara V3.3 — probada de verdad en navegador (Playwright + iPhone emulado)

## Cómo se probó esta vez
Todas las revisiones anteriores fueron lectura de código. Esta vez se abrió la app en un Chromium real (emulando un iPhone 13) y se ejecutaron flujos completos de principio a fin: crear grupo, añadir/borrar personas, añadir gastos con reparto igual y personalizado, calcular resultado, marcar pagos, cerrar y reabrir el grupo. Esto sacó a la luz 2 bugs que la lectura de código no había detectado.

## Bugs nuevos encontrados y corregidos
- **La hoja de "Nueva compra" no tenía scroll interno.** Con varias personas y reparto personalizado, el contenido podía crecer más que la pantalla y los botones "Cancelar"/"Añadir" quedaban fuera de la vista, inalcanzables — el usuario se quedaba bloqueado sin poder cerrar el formulario. Corregido con `max-height` + `overflow-y:auto` en la hoja.
- **Los pasos "1 Personas / 2 Gastos / 3 Resultado" no hacían nada al tocarlos.** Toda la app es una única página con las tres secciones apiladas, y el indicador de pasos solo cambiaba su propio color activo — no desplazaba a la sección correspondiente. Esto también rompía silenciosamente una función ya prevista en el código (abrir un grupo con gastos debía saltar directo al paso 2). Corregido: ahora cada paso hace scroll suave a su sección, y las llamadas internas (guardar gasto, calcular resultado, abrir grupo) funcionan como estaban pensadas.

## Pulido adicional
- "1 personas" → ahora dice correctamente "1 persona" (singular/plural en el contador de la tarjeta de grupo).
- Nombres de grupo largos ya no rompen la fila de la lista; se truncan con "…".

## Confirmado con pruebas reales (no solo lectura de código)
- Añadir personas y **que persistan** al cerrar/reabrir el grupo (fix de `syncGroup()`).
- Marcar un pago como pagado y **que persista** al cerrar/reabrir el grupo.
- Borrar una persona sin gastos asociados: reindexación correcta de `payer`/`participants`/`shares` en los gastos existentes.
- Reparto personalizado: marcar/desmarcar a un participante ya NO borra los importes de las demás personas.
- Sin errores de consola ni errores de página en ningún flujo probado.
- Modo oscuro revisado visualmente en varias pantallas: buen contraste, iconos y avatares legibles.

## Bugs críticos corregidos en revisiones anteriores (pérdida de datos)
- `addPerson()` no sincronizaba con el grupo guardado — una persona añadida podía desaparecer al cambiar de grupo.
- `toggleTransferPaid()` no sincronizaba con el grupo guardado — los pagos marcados volvían a "pendiente".
- Borrar una persona podía "despagar" transferencias ya marcadas (claves de `paidTransfers` no reindexadas).
- Reindexación de gastos (`payer`/`participants`/`shares`) al borrar una persona.
- Botón para borrar personas: existía la función pero ningún botón la llamaba.

## Diseño visual
- Logo real en portada, avatares de color con inicial, iconos de línea en vez de emoji, control segmentado, feedback táctil, vidrio esmerilado en la hoja modal, modo oscuro real.
- Iconos de la app regenerados desde alta resolución: el dibujo ahora ocupa ~84% del marco (antes ~62%), nítido y correctamente proporcionado.

## Lo que todavía NO se ha probado
- Un iPhone físico real (Safari tiene particularidades propias: `backdrop-filter`, `100dvh`, comportamiento del teclado en pantalla que a veces tapa inputs).
- El empaquetado nativo con Capacitor para la App Store — sigue pendiente.
- Recuperación ante errores de `localStorage` lleno o deshabilitado (poco probable pero no gestionado).

## Código muerto detectado (no modificado, bajo riesgo)
`openGroupForEdit()`, `renderSavedGroups()` y `updateExpense()` no se invocan desde ningún botón de la interfaz actual.

## Publicación en GitHub Pages
Sustituye los archivos de la raíz del repositorio por los archivos de este paquete.



