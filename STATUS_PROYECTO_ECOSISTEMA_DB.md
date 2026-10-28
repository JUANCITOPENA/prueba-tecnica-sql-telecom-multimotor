# 📋 DOCUMENTO DE STATUS Y AUDITORÍA ARQUITECTÓNICA DEL PROYECTO
## Ecosistema de Bases de Datos & Pipeline Lógico Multi-Motor (Simulación de Caso Telecom RD)

**Fecha de Auditoría:** 28 de Octubre de 2026  
**Versión:** `v1.0.1-PRO`  
**Estado General:** `100% OPERATIVO, DESACOPLADO Y ESTABLE`  
**Lead Architect:** Ing. Juancito Peña (CEO de DataIADev.com)  
**Ubicación Local:** `C:\Users\User\Desktop\Ecosistema de Bases de Datos & Pipeline Lógico Multi-Motor`  
**Repositorio GitHub:** `https://github.com/JUANCITOPENA/prueba-tecnica-sql-telecom-multimotor`  
**Despliegue GitHub Pages:** `https://juancitopena.github.io/prueba-tecnica-sql-telecom-multimotor/`  

---

> [!IMPORTANT]
> **AVISO LEGAL & DESCARGO DE RESPONSABILIDAD (CASO DE ESTUDIO FICTICIO):**  
> Este proyecto y todos sus materiales corresponden a una **simulación técnica, académica e hipotética** diseñada exclusivamente con fines didácticos y de preparación para evaluaciones técnicas en bases de datos. **No es un desarrollo oficial, no representa, no pertenece ni tiene relación laboral, contractual o de patrocinio con Claro Dominicana, América Móvil ni con el Instituto Dominicano de las Telecomunicaciones (INDOTEL)**. Todos los nombres, RNCs, cédulas, teléfonos, contratos y averías son datos sintéticos generados proceduralmente.

---

## 1. RESUMEN EJECUTIVO Y ALCANCE

El proyecto ha alcanzado la consolidación total de su arquitectura técnica, cumpliendo el 100% de los requerimientos de gobernanza empresarial, calidad de software, accesibilidad y fidelidad técnica:

1. **Separación Estricta de Código (Decoupling):**
   - El archivo principal `index.html` quedó liberado de scripts y estilos incrustados.
   - Todos los estilos residen organizados en `css/` (`styles.css`, `quiz.css`, `certificate.css`, `matrix.css`).
   - Toda la lógica reside en módulos específicos en `js/` (`main.js`, `massive-insert.js`, `queries-showcase.js`, `questions-bank.js`, `quiz-engine.js`, `certificate.js`, `matrix-terminal.js`).
   - Todos los scripts de bases de datos residen en `sql/` con 8 scripts maestros y seeders.
2. **Diseño Visual Neo-Brutalista 75% Centrado:**
   - Contenedor principal responsive al 75% de ancho en pantallas de escritorio con bordes negros sólidos (`2px solid #000`), sombras de bloque sin difuminado (`5px 5px 0 #000` / `8px 8px 0 #000`), fuentes técnicas (`Space Grotesk`, `JetBrains Mono`) y colores de alto impacto.
3. **Pipeline Multi-Motor 100% Sincronizado:**
   - Soporte nativo para 4 motores: **Microsoft SQL Server 2022**, **PostgreSQL 16**, **MySQL 8.0** y **Oracle 21c XE**.
   - Al seleccionar un motor en la barra interactiva, se actualizan dinámicamente los diagramas, DDL, procedimientos de inserción masiva y las 30 consultas técnicas.
4. **Catálogo de 30 Consultas de Entrevista Técnica:**
   - 15 Fundamentos esenciales (SELECT, WHERE, JOINs, GROUP BY, HAVING, subconsultas, CASE).
   - 15 Avanzadas empresariales (Window Functions ROW_NUMBER, RANK, DENSE_RANK, NTILE, LAG/LEAD, Running Totals, CTEs recursivas, PIVOT, análisis de churn, detección de fraude y auditoría regulatoria INDOTEL).
5. **Simulador de Evaluación Técnica de 30 Preguntas:**
   - Banco rotativo calibrado de **100 preguntas técnicas**.
   - Temporizador regresivo de 30 minutos.
   - Algoritmo Fisher-Yates para barajar las 4 opciones de cada pregunta dinámicamente en tiempo de ejecución, eliminando patrones fijos de respuesta.
   - Guiño sutil en preguntas correctas (espacio antes del punto final `" ."`) garantizado en el 100% de los reactivos.
6. **Generador Dinámico de Certificados Profesionales:**
   - Emisión interactiva con cálculo de porcentaje de aprobación ($\ge 80\%$), fecha actual, código QR verificable, sello holográfico premium y firma estilográfica del Ing. Juancito Peña.
   - Exportación dual:
     - **PNG de alta resolución** mediante renderizado Canvas.
     - **PDF vectorial A4 Landscape (297mm x 210mm)** a una sola página perfecta sin hojas en blanco intermedias mediante `html2canvas` y `jsPDF`.
7. **Manual de Instalación Práctico de Motores:**
   - Reubicado estratégicamente debajo de los 6 Fundamentos Clave.
   - Dos caminos independientes: **Camino 1 (Oficial Windows con instalador GUI y comando nativo `curl.exe` + `Start-Process`)** y **Camino 2 (Docker)**.
   - Resuelto de raíz el conflicto de Microsoft Visual C++ en PostgreSQL mediante `-ArgumentList "--install_runtimes 0"`.
   - Navegación y descarga segura redirigida automáticamente a la carpeta de descargas del usuario (`$env:USERPROFILE\Downloads`).

---

## 2. INVENTARIO FÍSICO DE ARCHIVOS Y MÓDULOS

| Ruta / Archivo | Tamaño / Líneas | Propósito y Responsabilidad | Estado |
| :--- | :---: | :--- | :---: |
| `index.html` | ~195 KB | Estructura semántica HTML5, Bento Grid, modales, certificado y Matrix | ✅ Validado |
| `.gitignore` | 13 líneas | Exclusión de logs, temporales y copias de seguridad internas | ✅ Validado |
| `README.md` | ~9 KB | Documentación oficial, badges, arquitectura, aviso legal y guía técnica | ✅ Validado |
| `STATUS_PROYECTO_ECOSISTEMA_DB.md` | Este archivo | Registro arquitectónico, trazabilidad y estado de calidad | ✅ Validado |
| `css/styles.css` | 14.2 KB | Estilos generales, layout 75%, neobrutalismo, navegación y footer | ✅ Validado |
| `css/quiz.css` | 2.8 KB | Maquetación del simulador de examen, timer, barra de progreso y badges | ✅ Validado |
| `css/certificate.css` | 3.2 KB | Diseño de diploma oficial, marco perimetral y sello holográfico | ✅ Validado |
| `css/matrix.css` | 2.7 KB | Terminal cibernética, efecto canvas 2D de caracteres y tipografía | ✅ Validado |
| `js/main.js` | 8.4 KB | Orquestador de eventos, inicialización de Prism y helpers UI | ✅ Validado |
| `js/massive-insert.js` | 12.1 KB | Control de motores, actualización de DDL y descargas de scripts | ✅ Validado |
| `js/queries-showcase.js` | 42.6 KB | Renderizado de las 30 consultas técnicas con teoría y sintaxis | ✅ Validado |
| `js/questions-bank.js` | 49.8 KB | Banco estructurado de 100 preguntas técnicas con justificaciones | ✅ Validado |
| `js/quiz-engine.js` | 9.3 KB | Lógica de evaluación, temporizador, shuffle Fisher-Yates y scoring | ✅ Validado |
| `js/certificate.js` | 7.9 KB | Motor de emisión y exportación dual (PNG + PDF A4 Landscape) | ✅ Validado |
| `js/matrix-terminal.js` | 4.1 KB | Animación de lluvia Matrix en Canvas y typewriter de manifiesto | ✅ Validado |
| `sql/Claro_Telecom_SQLSERVER_MASTER_COMPLETO.sql` | 32.4 KB | Script All-in-One: DDL, Seed, Vista, Procedimiento y 30 consultas | ✅ Validado |
| `sql/Claro_Telecom_POSTGRES_MASTER_COMPLETO.sql` | 31.9 KB | Script All-in-One nativo para PostgreSQL 16 con PL/pgSQL | ✅ Validado |
| `sql/Claro_Telecom_MYSQL_MASTER_COMPLETO.sql` | 30.8 KB | Script All-in-One nativo para MySQL 8.0 con Stored Procedures | ✅ Validado |
| `sql/Claro_Telecom_ORACLE_MASTER_COMPLETO.sql` | 33.1 KB | Script All-in-One nativo para Oracle 21c XE con bloques PL/SQL | ✅ Validado |
| `sql/seed_sqlserver_massive.sql` | 8.2 KB | Procedimiento `sp_GenerarTraficoMasivo` para 1,000+ registros | ✅ Validado |
| `sql/seed_postgres_massive.sql` | 7.9 KB | Procedimiento `sp_generar_trafico_masivo` para PostgreSQL | ✅ Validado |
| `sql/seed_mysql_massive.sql` | 7.5 KB | Procedimiento `sp_generar_trafico_masivo` para MySQL | ✅ Validado |
| `sql/seed_oracle_massive.sql` | 8.6 KB | Procedimiento `sp_generar_trafico_masivo` para Oracle | ✅ Validado |
| `assets/LOGO_DATAIADEV.png` | 128 KB | Logotipo oficial de alta resolución DataIADev (ratio 3:1) | ✅ Validado |
| `assets/certificado_premium.webp` | 85 KB | Gráfico de respaldo para el fondo del certificado de honor | ✅ Validado |

---

## 3. CHECKLIST DE CONTROL DE CALIDAD (QUALITY GATES)

- [x] **Gate 1 - Deslinde Legal & Caso Ficticio:** Eliminación total de cualquier atribución oficial de Claro o relación de empleo en Navbar, cuerpo y pie. Incorporación de avisos legales explícitos de caso de estudio hipotético.
- [x] **Gate 2 - Arquitectura y Desacoplamiento:** 100% de código CSS, JS y SQL extraído a sus respectivas carpetas sin romper referencias ni ID bindings.
- [x] **Gate 3 - Integridad Sintáctica:** Todos los archivos JavaScript validados con `node -c` con cero errores léxicos o sintácticos.
- [x] **Gate 4 - Barajado de Opciones (Fisher-Yates):** Opciones del quiz distribuidas aleatoriamente entre A, B, C y D en cada intento; preservación del guiño técnico (`" ."`) intacto.
- [x] **Gate 5 - Exportación de Certificado (Paridad PDF / PNG):** PDF exportado a escala 2.5 directo a una sola página A4 horizontal (297x210mm) mediante `html2canvas` + `jsPDF`, sin hojas en blanco ni desbordes.
- [x] **Gate 6 - Resiliencia de Instaladores Windows:** Inyección del parámetro `--install_runtimes 0` y uso de `Start-Process` apuntando a `Downloads`, eliminando bloqueos de permisos de `System32` y conflictos con Microsoft Visual C++ 2022.
- [x] **Gate 7 - Despliegue en GitHub Pages:** Repositorio público sincronizado en rama `main` y GitHub Pages activo para consumo web global.

---

## 4. INSTRUCCIONES DE RESTAURACIÓN MAESTRA

Para clonar y levantar este entorno en cualquier equipo de trabajo:

```bash
# 1. Clonar el repositorio
git clone https://github.com/JUANCITOPENA/prueba-tecnica-sql-telecom-multimotor.git

# 2. Entrar a la carpeta
cd prueba-tecnica-sql-telecom-multimotor

# 3. Abrir en el navegador (no requiere compilación ni dependencias de servidor)
start index.html
```

*Fin del informe de status.*
