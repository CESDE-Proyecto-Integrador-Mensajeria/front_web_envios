 # 📦 Sistema de Envíos — Frontend (UI)

 Una interfaz ligera y estética para gestionar paquetes, envíos y clientes. Ideal como prototipo local o base para integrar con una API.

 ---

 ## 🔖 Índice
 - **Descripción**
 - **Características principales**
 - **Archivos & Módulos**
 - **Cómo funciona (flujo)**
 - **Uso rápido**
 - **Consejos de despliegue**
 - **Solución de problemas**

 ---

 ## ✨ Descripción
 `Sistema de Envíos` es una interfaz web estática (HTML/CSS/JS) que permite:
 - Registrar y administrar paquetes.
 - Crear y gestionar envíos asociados a paquetes.
 - Registrar y administrar clientes/destinatarios.

 La app guarda todo en `localStorage`, por lo que es ideal para prototipos, demos y pruebas sin backend.

 ---

 ## 🚀 Características principales
 - Interfaz limpia y moderna con diseño responsivo.
 - CRUD completo para Paquetes, Envíos y Usuarios.
 - Pestañas para navegación rápida entre secciones.
 - Badges de estado para seguimiento de envíos.
 - Credenciales demo integradas para login.

 ---

 ## 🗂️ Archivos & Módulos
 - **[index.html](index.html)**: Interfaz principal con Login y la App (pestañas: Paquetes, Envíos, Usuarios).
 - **[inicio.html](inicio.html)**: Dashboard alternativo con contadores y layout de ejemplo.
 - **[style.css](style.css)**: Estilos modernos, responsive y detalles visuales (gradientes, sombras, badges).
 - **[app.js](app.js)**: Lógica principal en JavaScript:
   - Manejo de `localStorage` para `usuarios`, `paquetes`, `envios`, `usuarioActual`.
   - CRUD de `usuarios` (clientes/destinatarios).
   - CRUD de `paquetes`.
   - CRUD de `envios` (vincula paquetes y destinatarios cuando se usa select).
   - Login demo con credenciales fijas `admin` / `admin123`.

 ---

 ## 🧭 Cómo funciona (flujo básico)
 1. Abre `index.html` en el navegador.
 2. Inicia sesión con las credenciales demo: **Documento**: `admin` — **Contraseña**: `admin123`.
 3. Navega entre pestañas:
    - **Paquetes**: crea/edita/elimina paquetes. Los paquetes se usan en envíos.
    - **Envíos**: crea envíos asignando un paquete y completando destinatario, dirección y estado.
    - **Usuarios**: administra clientes/destinatarios (opcional: puedes usar campo libre en envíos si no quieres select).
 4. Todos los cambios se guardan en `localStorage` (persisten en el navegador hasta que borres datos o uses otra máquina).

 ---


 ## 🧩 Detalle de módulos (qué hace cada parte)
 - Login (en `index.html` + `app.js`): muestra pantalla de acceso y guarda `usuarioActual` en `localStorage`.
 - `Paquetes` (UI + `paqueteForm`): campos: descripción, peso, dimensiones. Lista con fecha y acciones.
 - `Envíos` (UI + `envioForm`): vincula `paqueteId` y guarda `destinatarioId`/datos, estado y dirección. Muestra badge de estado.
 - `Usuarios` (UI + `usuarioForm`): CRUD de clientes/destinatarios con campos de contacto.
 - Utilidades: `actualizarSelectPaquetes()` y `actualizarSelectUsuarios()` mantienen selects sincronizados.

 ---

 ## 💡 Buenas prácticas y consejos
 - Si vas a integrar un backend, reemplaza las operaciones de `localStorage` por llamadas `fetch()` a tu API.
 - Añade validaciones adicionales en `app.js` si necesitas reglas de negocio (p. ej. pesos mínimos, formatos de dirección).
 - Para respaldo o migración, exporta manualmente el contenido de `localStorage` o implementa un export JSON.

 ---

 ## 🧰 Sugerencias de mejoras futuras
 - Conectar con API REST para persistencia multi-usuario.
 - Añadir búsqueda y filtros en tablas (por estado, fecha, destinatario).
 - Historial de cambios y auditoría por usuario.
 - Exportar CSV / PDF de listados.

 ---

 ## ⚠️ Problemas comunes
 - Si no ves datos guardados: revisa que `localStorage` no esté bloqueado o estés en modo incógnito con restricciones.
 - Si el select de paquetes aparece vacío: crea primero un paquete en la pestaña `Paquetes`.

 ---

 ## ✍️ Autor / Contribución
 Proyecto creado como prototipo UI. Puedes modificar libremente el código HTML/CSS/JS.

 ---

 ¿Quieres que también cree un pequeño script para exportar/importar los datos de `localStorage` o que añada un README en inglés? 😄
