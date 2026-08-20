# Cuenta Clara V3.2 — auditoría de grupos/personas/gastos + pasada de diseño visual

## Diseño visual (nuevo, esta versión)
- **Logo real en la portada**, sustituyendo el emoji genérico 🧾.
- **Avatares de color con inicial** para cada grupo y persona (elemento distintivo, estilo Contactos/Recordatorios de iOS), con chevron de navegación en las filas de grupo.
- **Iconos de línea** (editar, copiar, borrar, compartir, añadir) sustituyendo a los emoji de control — mismo lenguaje visual que SF Symbols, dibujados a medida.
- **Control segmentado** para el indicador de pasos (Personas/Gastos/Resultado), como en Ajustes o Fotos de iOS.
- **Feedback táctil**: los botones y filas se comprimen ligeramente al pulsarlos.
- **Vidrio esmerilado** en la hoja modal de gastos (`backdrop-filter: blur`).
- **Modo oscuro real** vía `prefers-color-scheme`, siguiendo el sistema del dispositivo — cubre tarjetas, inputs, botones, filas de grupo/persona, transferencias y la hoja modal.

## Bugs críticos corregidos (pérdida de datos)
- **`addPerson()` no sincronizaba con el grupo guardado.** Al añadir una persona, el cambio solo se escribía en las claves sueltas de localStorage, no en `savedGroups[groupName]`. Si después cambiabas de grupo o recargabas y reabrías el mismo grupo, la persona añadida desaparecía. **Corregido**: ahora llama a `syncGroup()`.
- **`toggleTransferPaid()` no sincronizaba con el grupo guardado.** Marcar un pago como "pagado" no persistía en `savedGroups`, así que al cambiar de grupo o recargar, los pagos volvían a aparecer como pendientes. **Corregido**: ahora llama a `syncGroup()`.
- **Borrar una persona podía "despagar" transferencias.** Las claves de `paidTransfers` se basan en los índices de `people` (`origen|destino|importe`). Al borrar a alguien, los índices posteriores se desplazaban pero las claves de pagos ya marcados no se actualizaban, perdiendo el estado "pagado". **Corregido**: se reindexan también las claves de `paidTransfers`.

## Bugs corregidos en la revisión anterior (V3.1.1)
- Reindexación de `payer`/`participants`/`shares` en los gastos al borrar una persona.
- Pérdida de importes personalizados al marcar/desmarcar participantes en el reparto custom.
- Llamada duplicada a `renderHomeGroups()` en `deleteGroup()`.
- Función muerta `editGroupSafeName()` eliminada.

## Mejoras adicionales
- Los nombres de grupo ahora se comparan sin distinguir mayúsculas/minúsculas, igual que los nombres de persona.
- Service Worker cachea los iconos para funcionamiento offline correcto; versión de caché incrementada.
- `aria-label` en los campos principales para accesibilidad con VoiceOver.

## Código muerto detectado (no modificado, bajo riesgo)
`openGroupForEdit()`, `renderSavedGroups()` y `updateExpense()` no se invocan desde ningún botón de la interfaz actual.

## Publicación en GitHub Pages
Sustituye los archivos de la raíz del repositorio por los archivos de este paquete.


