# 🎫 Sistema de Venta de Entradas - NTT DATA

¡Bienvenidos al repositorio de nuestro proyecto final! Esta es una aplicación web Full Stack para la gestión y venta de entradas (conciertos, obras de teatro y festivales), diseñada mediante una arquitectura desacoplada moderna que comunica un Backend en Spring Boot con un Frontend en Angular.

---

## 🚀 Funcionalidades Implementadas en el Código

En base al estado actual de las carpetas y archivos del repositorio, el sistema cuenta con los siguientes elementos completamente desarrollados:

### ⚙️ Backend (`backend`)

* **Modelos y Entidades JPA:** Clases `Usuario.java` y `Compra.java` con mapeo de base de datos relacional y relación $1:N$ (Un usuario con su lista de compras asociada). Evitan bucles infinitos en JSON mediante `@JsonManagedReference` y `@JsonBackReference`.
* **Persistencia Automática:** Interfaces `UsuarioRepository.java` y `CompraRepository.java` que extienden de `JpaRepository` para la gestión ágil de consultas. Incluyen búsquedas personalizadas como `findByEmail` y `findByUsuarioId`.
* **Controladores API REST:**
    * `UsuarioController.java`: Endpoints para listar todos los usuarios, buscar por ID, crear nuevos registros y procesar el flujo lógico de autenticación (`/api/usuarios/login`).
    * `CompraController.java`: Endpoints para listar todas las compras del sistema (`GET /api/compras`), registrar transacciones asociándolas a usuarios existentes (`POST`), buscar detalles por ID y filtrar el historial de compras de un usuario específico.
* **Configuración de Datos Base:** Archivo `application.properties` adaptado para levantar una base de datos **H2 en memoria** (`jdbc:h2:mem:ticketdb`) con la consola web habilitada en `/h2-console`.
* **Script de Inicialización:** Archivo `data.sql` precargado con registros reales de usuarios (*Ana López, Juan Martínez*) y compras asociadas (*Festival de Verano 2026, Obra de Teatro Clásica, Concierto Rock Urbano*) que se inyectan en el sistema automáticamente.

### 🎨 Frontend (`frontend`)

* **Módulos de Autenticación:** Componente `login` con estilos personalizados (`login.css`), vista (`login.html`) y lógica en TypeScript (`login.ts`) para la captura y validación interactiva de credenciales.
* **Vistas del Catálogo:** Componente `compra` (`compra.component.html`, `.ts`, `.css`) estructurado para interactuar con los datos del servidor y la visualización de eventos.
* **Consumo de Servicios:** Archivo `ticket.service.ts` encargado de centralizar las conexiones HTTP con la API del servidor local.

---

## 👥 Participación Activa del Equipo

El desarrollo del proyecto se ha llevado a cabo de manera conjunta y equitativa. **Los 5 integrantes del grupo hemos participado activamente** en la codificación, diseño y maquetación de la aplicación.

---

## ⚠️ Estado Actual del Proyecto y Problemas de Ejecución (Backend)

> 📋 **Nota para la evaluación:** Todo el código fuente de Java está disponible y estructurado correctamente en el repositorio para su revisión manual y evaluación de la lógica implementada, a falta de solventar este error de entorno.

Queremos dejar constancia de que, aunque todo el diseño de la arquitectura y el código fuente de los controladores, entidades y vistas están completamente programados y subidos al repositorio, el proyecto presenta un bloqueo técnico en la capa local del Backend:

1.  **Incidencia con Maven:** Existe un problema con el entorno del gestor de dependencias Maven. Al intentar lanzar el comando de arranque de Spring Boot (`mvn spring-boot:run`), el sistema no logra compilar o descargar correctamente las librerías necesarias.
2.  **Fallo de Compilación Local:** Debido a este conflicto de dependencias, el proyecto backend actualmente no compila en local. Esto impide levantar el servidor (`localhost:8080`) y conectar la base de datos H2 activa en memoria con el Frontend de Angular.

---

## 📦 Instrucciones de Arranque (Local)

### 🟢 Frontend (Operativo)

La parte visual compila e inicia correctamente en local. Para levantar la interfaz de usuario de Angular, ejecuta los siguientes comandos en tu terminal:

```bash
cd frontend
npm install
npm start
