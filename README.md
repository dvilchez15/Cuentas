# Cuenta Clara V3.5 — swipe entre pantallas

## Nuevo: deslizar con el dedo entre pantallas
Además de tocar los pasos "1 Personas / 2 Gastos / 3 Resultado", ahora también se puede **deslizar el dedo** hacia la izquierda/derecha para cambiar de pantalla, como en una app nativa. Detalles de la implementación:
- Solo se activa con gestos predominantemente horizontales (umbral de 60px); un gesto vertical normal para hacer scroll no se ve afectado.
- Se ignora si el gesto empieza sobre un campo de texto, botón o enlace, para no interferir con seleccionar texto o pulsar botones.
- Respeta los límites (no se puede deslizar más allá de la pantalla 1 ni de la 3).
- Deslizar hasta "Resultado" también dispara el cálculo automático, igual que al tocar la pestaña.
- Probado con eventos táctiles reales simulados: swipe hacia adelante, hacia atrás, dentro de un input (no debe activarse) y gesto vertical (no debe activarse) — los 4 casos correctos.

## Cambio de arquitectura de navegación (versión anterior)
"Personas / Gastos / Resultado" pasaron de ser 3 secciones apiladas en una página larga a **3 pantallas reales**: solo se muestra una a la vez, con animación de deslizamiento direccional al cambiar. La pantalla de Resultado se calcula sola al entrar (ya no hay botón "Ver resultado").

## Bugs nuevos encontrados y corregidos (sesión de pruebas reales en navegador)
- La hoja de "Nueva compra" no tenía scroll interno; con varias personas los botones podían quedar inalcanzables. Corregido.
- Los pasos no hacían nada al tocarlos (ahora cambian de pantalla de verdad).

## Pulido adicional
- "1 personas" → "1 persona" (singular/plural correcto).
- Nombres de grupo largos ya no rompen la fila de la lista; se truncan con "…".

## Confirmado con pruebas reales en navegador (Playwright + iPhone emulado)
- Añadir personas y que persistan al cerrar/reabrir el grupo.
- Marcar un pago como pagado y que persista al cerrar/reabrir el grupo.
- Borrar una persona sin gastos: reindexación correcta de los gastos existentes.
- Reparto personalizado: marcar/desmarcar un participante no borra los importes de las demás personas.
- Navegación entre las 3 pantallas por toque y por swipe, en ambas direcciones, sin solapamientos.
- Sin errores de consola en ningún flujo probado.
- Modo oscuro revisado visualmente: buen contraste, iconos y avatares legibles.

## Bugs críticos corregidos en revisiones anteriores (pérdida de datos)
- `addPerson()` no sincronizaba con el grupo guardado.
- `toggleTransferPaid()` no sincronizaba con el grupo guardado.
- Borrar una persona podía "despagar" transferencias ya marcadas.
- Reindexación de gastos (`payer`/`participants`/`shares`) al borrar una persona.
- Botón para borrar personas: existía la función pero ningún botón la llamaba.

## Diseño visual
- Logo real en portada, avatares de color con inicial, iconos de línea en vez de emoji, control segmentado, feedback táctil, vidrio esmerilado en la hoja modal, modo oscuro real.
- Iconos de la app regenerados desde alta resolución: el dibujo ahora ocupa ~84% del marco (antes ~62%).

## Lo que todavía NO se ha probado
- Un iPhone físico real (Safari tiene particularidades propias de gestos táctiles, `backdrop-filter`, teclado tapando inputs).
- El empaquetado nativo con Capacitor para la App Store — sigue pendiente.
- Recuperación ante errores de `localStorage` lleno o deshabilitado (poco probable pero no gestionado).

## Código muerto detectado (no modificado, bajo riesgo)
`openGroupForEdit()`, `renderSavedGroups()` y `updateExpense()` no se invocan desde ningún botón de la interfaz actual.

## Publicación en GitHub Pages
Sustituye los archivos de la raíz del repositorio por los archivos de este paquete.





