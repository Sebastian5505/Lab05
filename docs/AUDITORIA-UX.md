# Auditoría y Rediseño de UX/UI - App de Notas

## 1. Tabla Heurística (Las 5 Heurísticas de Nielsen)

| Heurística | Problema (Pantalla Original) | Solución Aplicada (Rediseño) |
| :--- | :--- | :--- |
| **1. Visibilidad del estado del sistema** | Al agregar o borrar una nota no existía ninguna notificación visual de confirmación. | Se implementó un mensaje flotante (toast) visible tras cada acción (ej. "Nota agregada con éxito"). |
| **2. Coincidencia con el mundo real** | Botones e instrucciones con términos genéricos y falta de jerarquía visual. | Se usó lenguaje claro ("Guardar nota", "Eliminar") junto con íconos comprensibles. |
| **3. Control y libertad del usuario** | La eliminación de notas era inmediata e irreversible sin confirmación. | Se agregó un botón de "Deshacer" (Undo) por 5 segundos tras eliminar una nota. |
| **4. Prevención de errores** | Se permitía enviar notas en blanco, generando tarjetas vacías en la interfaz. | Se deshabilitó el botón si el campo está vacío y se aplicaron los atributos `required` y `trim()`. |
| **5. Reconocer, no recordar** | Los campos dependían solo de placeholders que desaparecían al escribir. | Se colocó una etiqueta `<label>` visible y permanente arriba de cada campo de texto. |

---

## 2. Justificación por Leyes de UX

* **Ley de Fitts:** Los botones principales tienen una altura mínima de **44px** y un área de toque amplia para facilitar el clic o toque rápido.
* **Ley de Hick:** Se eliminaron opciones destructivas innecesarias en la pantalla principal para reducir las opciones inmediatas y acelerar la toma de decisiones.
* **Ley de Miller:** Las notas guardadas se muestran estructuradas en tarjetas (*cards*) con título y contenido delimitado, organizando la información en bloques digeribles.

---

## 3. Respuestas Teóricas

### a) Diferencia entre UX y UI con un ejemplo del laboratorio
* **UX (User Experience):** Es la experiencia global y el flujo funcional al interactuar con el sistema. **Cambio UX:** Bloquear el envío si la nota está vacía o permitir deshacer una eliminación.
* **UI (User Interface):** Es el aspecto visual y la estética del diseño. **Cambio UI:** Definir variables CSS en `:root` con contraste adecuado de al menos 4.5:1 y botones de 44px de alto.

### b) ¿Por qué un placeholder no reemplaza a un label?
* **Motivo:** El placeholder desaparece en cuanto el usuario empieza a escribir o al enfocar el campo.
* **Heurística incumplida:** *Reconocer antes que recordar* (obliga al usuario a recordar qué campo estaba rellenando).
* **Problema de accesibilidad:** Los lectores de pantalla solían ignorar los placeholders y suelen carecer de un contraste de color adecuado.

### c) Justificación por Leyes
* **Ley de Fitts:** Botones creados con un alto mínimo de 44px para aumentar el área de clic objetivo.
* **Ley de Hick:** Eliminación de opciones destructivas globales para agilizar el tiempo de decisión.
* **Ley de Miller:** Formateo de notas en listas de tarjetas estructuradas para no sobrecargar la memoria de trabajo.

---

## 4. Captura de Lighthouse

* **Score de Accesibilidad (>= 90):** [Pega aquí la captura del reporte de Lighthouse]