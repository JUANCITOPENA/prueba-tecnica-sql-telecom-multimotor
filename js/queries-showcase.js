/**
 * ====================================================================================================
 * PROYECTO: MASTERCLASS MULTI-MOTOR & AUDITORÍA INDOTEL (CLARO DOMINICANA)
 * ARCHIVO: js/queries-showcase.js
 * DESCRIPCIÓN: Catálogo de 30 Consultas Adaptadas a los 4 Motores (SQL Server, Postgres, Oracle, MySQL)
 *              con Sincronización Global de Motor y Notificación Toast de Descarga Todo-en-Uno
 * AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
 * ====================================================================================================
 */

// Estado global del motor activo (sqlserver | postgres | oracle | mysql)
window.motorActivo = window.motorActivo || 'sqlserver';

const DEFINICIONES_SQL = [
  {
    termino: "SELECT & ALIAS (AS)",
    categoria: "Proyección",
    badge: "Básica",
    descripcion: "Instrucción angular del lenguaje SQL que define las columnas o expresiones calculadas que serán devueltas por el motor relacional. El operador AS permite renombrar la proyección para dotarla de semántica de negocio legible y evitar ambigüedades en cruces."
  },
  {
    termino: "WHERE & Operadores Lógicos (AND, OR, NOT)",
    categoria: "Filtrado Horizontal",
    badge: "Básica",
    descripcion: "Filtra filas individuales a nivel de página de datos antes de cualquier agregación. Permite aplicar predicados relacionales (=, <>, <, >, <=, >=) y combinaciones booleanas basadas en álgebra de Boole."
  },
  {
    termino: "LIKE, '%' & '_'",
    categoria: "Filtrado de Patrones",
    badge: "Básica",
    descripcion: "Permite coincidencias difusas en cadenas de texto. El comodín '%' representa cero o más caracteres, mientras que '_' evalúa exactamente un carácter en la posición indicada."
  },
  {
    termino: "BETWEEN & IN",
    categoria: "Filtrado de Conjuntos",
    badge: "Básica",
    descripcion: "BETWEEN evalúa rangos inclusivos (extremo inferior y superior). IN verifica si el valor de una columna pertenece a una lista explícita o al resultado de una subconsulta."
  },
  {
    termino: "IS NULL / IS NOT NULL",
    categoria: "Lógica Tri-Valuada",
    badge: "Básica",
    descripcion: "SQL opera bajo lógica tri-valuada (TRUE, FALSE, UNKNOWN). NULL no representa cero ni cadena vacía, sino la ausencia de dato. Nunca debe compararse con '=', sino mediante predicados IS NULL."
  },
  {
    termino: "ORDER BY & Paginación (OFFSET / FETCH / LIMIT)",
    categoria: "Presentación",
    badge: "Básica",
    descripcion: "Define el orden de salida del conjunto final (ASC o DESC). Junto con OFFSET y FETCH NEXT (o LIMIT), permite implementar paginación eficiente sin sobrecargar la memoria del servidor."
  },
  {
    termino: "GROUP BY & Funciones Agregadas (SUM, AVG, COUNT, MIN, MAX)",
    categoria: "Agrupación",
    badge: "Básica",
    descripcion: "Colapsa múltiples registros en filas únicas según dimensiones de negocio y calcula métricas numéricas agregadas por grupo de datos."
  },
  {
    termino: "HAVING",
    categoria: "Filtrado Post-Agregación",
    badge: "Básica",
    descripcion: "Filtro que opera exclusivamente sobre los resultados calculados por las funciones agregadas, a diferencia del WHERE que actúa fila por fila antes de agrupar."
  },
  {
    termino: "INNER JOIN & LEFT/RIGHT JOIN",
    categoria: "Relacional",
    badge: "Básica",
    descripcion: "Combina conjuntos basándose en una clave foránea común. INNER JOIN devuelve solo coincidencias exactas; LEFT JOIN preserva todas las filas de la tabla izquierda aun si no existen coincidencias en la derecha."
  },
  {
    termino: "ROW_NUMBER() & DENSE_RANK()",
    categoria: "Funciones de Ventana",
    badge: "Avanzada",
    descripcion: "Asigna números secuenciales a las filas dentro de particiones lógicas sin colapsar el número de filas original. DENSE_RANK maneja empates sin dejar saltos en la numeración."
  },
  {
    termino: "LAG() & LEAD()",
    categoria: "Navegación Analítica",
    badge: "Avanzada",
    descripcion: "Permiten acceder a datos de filas anteriores (LAG) o posteriores (LEAD) dentro de una partición sin necesidad de recurrir a costosos auto-joins (Self-Joins)."
  },
  {
    termino: "Common Table Expressions (CTE / WITH)",
    categoria: "Estructuras Modulares",
    badge: "Avanzada",
    descripcion: "Conjunto de resultados temporal con nombre que mejora la legibilidad, modularidad y mantenimiento de consultas complejas. Soporta recursividad para jerarquías organizacionales."
  },
  {
    termino: "CASE WHEN Condicional & Pivot Manual",
    categoria: "Transformación Lógica",
    badge: "Avanzada",
    descripcion: "Estructura de control de flujo declarativa que evalúa condiciones booleanas secuenciales. Combinada con SUM(), permite trasponer filas a columnas (Pivote matricial)."
  },
  {
    termino: "ROLLUP & CUBE",
    categoria: "Agregación Multidimensional",
    badge: "Avanzada",
    descripcion: "Extensiones del GROUP BY que calculan automáticamente subtotales acumulados y el gran total general en una sola pasada de ejecución sobre el árbol de índices."
  },
  {
    termino: "Acumulados Móviles (Running Total)",
    categoria: "Analítica Temporal",
    badge: "Avanzada",
    descripcion: "Uso de cláusulas de marco de ventana (ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) para calcular sumatorias o promedios acumulados a lo largo del tiempo."
  }
];

// CATÁLOGO DE 15 CONSULTAS BÁSICAS CON VARIANTES PARA LOS 4 MOTORES
const CONSULTAS_BASICAS_MULTI = [
  {
    id: "q-basic-1",
    titulo: "1. Catálogo de Clientes con Alias Legibles",
    descripcion: "Proyección limpia de datos de abonados con nombres ejecutivos.",
    sql: {
      sqlserver: `-- [SQL Server T-SQL] Consulta 1
SELECT 
    C.ID_Cliente AS [Código Cliente],
    C.Nombre_Completo AS [Cliente],
    C.Telefono_Contacto AS [Teléfono],
    C.Provincia AS [Ubicación],
    C.Segmento_Cliente AS [Segmento]
FROM Clientes C
ORDER BY C.Nombre_Completo ASC;`,
      postgres: `-- [PostgreSQL PL/pgSQL] Consulta 1
SELECT 
    C.ID_Cliente AS "Código Cliente",
    C.Nombre_Completo AS "Cliente",
    C.Telefono_Contacto AS "Teléfono",
    C.Provincia AS "Ubicación",
    C.Segmento_Cliente AS "Segmento"
FROM Clientes C
ORDER BY C.Nombre_Completo ASC;`,
      oracle: `-- [Oracle PL/SQL] Consulta 1
SELECT 
    C.ID_Cliente AS "Código Cliente",
    C.Nombre_Completo AS "Cliente",
    C.Telefono_Contacto AS "Teléfono",
    C.Provincia AS "Ubicación",
    C.Segmento_Cliente AS "Segmento"
FROM Clientes C
ORDER BY C.Nombre_Completo ASC;`,
      mysql: `-- [MySQL InnoDB] Consulta 1
SELECT 
    C.ID_Cliente AS \`Código Cliente\`,
    C.Nombre_Completo AS \`Cliente\`,
    C.Telefono_Contacto AS \`Teléfono\`,
    C.Provincia AS \`Ubicación\`,
    C.Segmento_Cliente AS \`Segmento\`
FROM Clientes C
ORDER BY C.Nombre_Completo ASC;`
    }
  },
  {
    id: "q-basic-2",
    titulo: "2. Filtrado de Tickets Críticos Abiertos",
    descripcion: "Identifica incidencias de prioridad crítica que continúan sin resolverse.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 2
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Prioridad, T.Estado_Ticket, T.Fecha_Apertura
FROM Tickets_Averias T
WHERE T.Prioridad = 'Critica' AND T.Estado_Ticket = 'Abierto'
ORDER BY T.Fecha_Apertura DESC;`,
      postgres: `-- [PostgreSQL] Consulta 2
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Prioridad, T.Estado_Ticket, T.Fecha_Apertura
FROM Tickets_Averias T
WHERE T.Prioridad = 'Critica' AND T.Estado_Ticket = 'Abierto'
ORDER BY T.Fecha_Apertura DESC;`,
      oracle: `-- [Oracle] Consulta 2
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Prioridad, T.Estado_Ticket, T.Fecha_Apertura
FROM Tickets_Averias T
WHERE T.Prioridad = 'Critica' AND T.Estado_Ticket = 'Abierto'
ORDER BY T.Fecha_Apertura DESC;`,
      mysql: `-- [MySQL] Consulta 2
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Prioridad, T.Estado_Ticket, T.Fecha_Apertura
FROM Tickets_Averias T
WHERE T.Prioridad = 'Critica' AND T.Estado_Ticket = 'Abierto'
ORDER BY T.Fecha_Apertura DESC;`
    }
  },
  {
    id: "q-basic-3",
    titulo: "3. Búsqueda por Patrón de Zona (LIKE)",
    descripcion: "Localiza clientes en sectores del polígono central metropolitano.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 3
SELECT C.Nombre_Completo, C.Direccion_Instalacion, C.Provincia
FROM Clientes C
WHERE C.Direccion_Instalacion LIKE '%Piantini%' OR C.Direccion_Instalacion LIKE '%Bella Vista%'
ORDER BY C.Provincia;`,
      postgres: `-- [PostgreSQL] Consulta 3
SELECT C.Nombre_Completo, C.Direccion_Instalacion, C.Provincia
FROM Clientes C
WHERE C.Direccion_Instalacion ILIKE '%Piantini%' OR C.Direccion_Instalacion ILIKE '%Bella Vista%'
ORDER BY C.Provincia;`,
      oracle: `-- [Oracle] Consulta 3
SELECT C.Nombre_Completo, C.Direccion_Instalacion, C.Provincia
FROM Clientes C
WHERE UPPER(C.Direccion_Instalacion) LIKE '%PIANTINI%' OR UPPER(C.Direccion_Instalacion) LIKE '%BELLA VISTA%'
ORDER BY C.Provincia;`,
      mysql: `-- [MySQL] Consulta 3
SELECT C.Nombre_Completo, C.Direccion_Instalacion, C.Provincia
FROM Clientes C
WHERE C.Direccion_Instalacion LIKE '%Piantini%' OR C.Direccion_Instalacion LIKE '%Bella Vista%'
ORDER BY C.Provincia;`
    }
  },
  {
    id: "q-basic-4",
    titulo: "4. Rango de Fechas en los Últimos 30 Días (BETWEEN)",
    descripcion: "Filtra incidentes en la ventana temporal del último mes.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 4
SELECT T.Codigo_Ticket, T.Fecha_Apertura, T.Categoria_Incidencia, T.Tecnico_Asignado
FROM Tickets_Averias T
WHERE T.Fecha_Apertura BETWEEN DATEADD(DAY, -30, GETDATE()) AND GETDATE()
ORDER BY T.Fecha_Apertura ASC;`,
      postgres: `-- [PostgreSQL] Consulta 4
SELECT T.Codigo_Ticket, T.Fecha_Apertura, T.Categoria_Incidencia, T.Tecnico_Asignado
FROM Tickets_Averias T
WHERE T.Fecha_Apertura BETWEEN (NOW() - INTERVAL '30 days') AND NOW()
ORDER BY T.Fecha_Apertura ASC;`,
      oracle: `-- [Oracle] Consulta 4
SELECT T.Codigo_Ticket, T.Fecha_Apertura, T.Categoria_Incidencia, T.Tecnico_Asignado
FROM Tickets_Averias T
WHERE T.Fecha_Apertura BETWEEN (SYSDATE - 30) AND SYSDATE
ORDER BY T.Fecha_Apertura ASC;`,
      mysql: `-- [MySQL] Consulta 4
SELECT T.Codigo_Ticket, T.Fecha_Apertura, T.Categoria_Incidencia, T.Tecnico_Asignado
FROM Tickets_Averias T
WHERE T.Fecha_Apertura BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW()
ORDER BY T.Fecha_Apertura ASC;`
    }
  },
  {
    id: "q-basic-5",
    titulo: "5. Pertenencia a Conjuntos de Provincias (IN)",
    descripcion: "Abona clientes de los tres principales nodos de tráfico de la red.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 5
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Segmento_Cliente
FROM Clientes C
WHERE C.Provincia IN ('Distrito Nacional', 'Santiago', 'La Altagracia')
ORDER BY C.Provincia, C.Nombre_Completo;`,
      postgres: `-- [PostgreSQL] Consulta 5
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Segmento_Cliente
FROM Clientes C
WHERE C.Provincia IN ('Distrito Nacional', 'Santiago', 'La Altagracia')
ORDER BY C.Provincia, C.Nombre_Completo;`,
      oracle: `-- [Oracle] Consulta 5
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Segmento_Cliente
FROM Clientes C
WHERE C.Provincia IN ('Distrito Nacional', 'Santiago', 'La Altagracia')
ORDER BY C.Provincia, C.Nombre_Completo;`,
      mysql: `-- [MySQL] Consulta 5
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Segmento_Cliente
FROM Clientes C
WHERE C.Provincia IN ('Distrito Nacional', 'Santiago', 'La Altagracia')
ORDER BY C.Provincia, C.Nombre_Completo;`
    }
  },
  {
    id: "q-basic-6",
    titulo: "6. Detección de Tickets Sin Cierre (IS NULL)",
    descripcion: "Aplica la lógica tri-valuada para detectar casos pendientes de atención.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 6
SELECT T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket
FROM Tickets_Averias T
WHERE T.Fecha_Cierre IS NULL;`,
      postgres: `-- [PostgreSQL] Consulta 6
SELECT T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket
FROM Tickets_Averias T
WHERE T.Fecha_Cierre IS NULL;`,
      oracle: `-- [Oracle] Consulta 6
SELECT T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket
FROM Tickets_Averias T
WHERE T.Fecha_Cierre IS NULL;`,
      mysql: `-- [MySQL] Consulta 6
SELECT T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket
FROM Tickets_Averias T
WHERE T.Fecha_Cierre IS NULL;`
    }
  },
  {
    id: "q-basic-7",
    titulo: "7. Ordenamiento Compuesto de Criticidad (ORDER BY Multi-Columna)",
    descripcion: "Prioriza por severidad de avería y tiempo de retraso acumulado.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 7
SELECT T.Codigo_Ticket, T.Prioridad, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas
FROM Tickets_Averias T
ORDER BY 
    CASE T.Prioridad WHEN 'Critica' THEN 1 WHEN 'Alta' THEN 2 WHEN 'Media' THEN 3 ELSE 4 END ASC,
    T.Tiempo_Resolucion_Horas DESC;`,
      postgres: `-- [PostgreSQL] Consulta 7
SELECT T.Codigo_Ticket, T.Prioridad, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas
FROM Tickets_Averias T
ORDER BY 
    CASE T.Prioridad WHEN 'Critica' THEN 1 WHEN 'Alta' THEN 2 WHEN 'Media' THEN 3 ELSE 4 END ASC,
    T.Tiempo_Resolucion_Horas DESC;`,
      oracle: `-- [Oracle] Consulta 7
SELECT T.Codigo_Ticket, T.Prioridad, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas
FROM Tickets_Averias T
ORDER BY 
    CASE T.Prioridad WHEN 'Critica' THEN 1 WHEN 'Alta' THEN 2 WHEN 'Media' THEN 3 ELSE 4 END ASC,
    T.Tiempo_Resolucion_Horas DESC;`,
      mysql: `-- [MySQL] Consulta 7
SELECT T.Codigo_Ticket, T.Prioridad, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas
FROM Tickets_Averias T
ORDER BY 
    CASE T.Prioridad WHEN 'Critica' THEN 1 WHEN 'Alta' THEN 2 WHEN 'Media' THEN 3 ELSE 4 END ASC,
    T.Tiempo_Resolucion_Horas DESC;`
    }
  },
  {
    id: "q-basic-8",
    titulo: "8. Paginación Eficiente (OFFSET & LIMIT)",
    descripcion: "Recupera la primera página de 10 clientes sin sobrecargar la memoria.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 8: OFFSET & FETCH
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Fecha_Registro
FROM Clientes C
ORDER BY C.ID_Cliente ASC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;`,
      postgres: `-- [PostgreSQL] Consulta 8: LIMIT & OFFSET
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Fecha_Registro
FROM Clientes C
ORDER BY C.ID_Cliente ASC
LIMIT 10 OFFSET 0;`,
      oracle: `-- [Oracle 12c+] Consulta 8: FETCH FIRST
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Fecha_Registro
FROM Clientes C
ORDER BY C.ID_Cliente ASC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;`,
      mysql: `-- [MySQL] Consulta 8: LIMIT & OFFSET
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Fecha_Registro
FROM Clientes C
ORDER BY C.ID_Cliente ASC
LIMIT 10 OFFSET 0;`
    }
  },
  {
    id: "q-basic-9",
    titulo: "9. Conteo de Tickets y Clientes Afectados (COUNT / DISTINCT)",
    descripcion: "Calcula el volumen global de reportes versus usuarios únicos impactados.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 9
SELECT COUNT(*) AS [Total Reportes], COUNT(DISTINCT T.ID_Cliente) AS [Clientes Únicos]
FROM Tickets_Averias T;`,
      postgres: `-- [PostgreSQL] Consulta 9
SELECT COUNT(*) AS "Total Reportes", COUNT(DISTINCT T.ID_Cliente) AS "Clientes Únicos"
FROM Tickets_Averias T;`,
      oracle: `-- [Oracle] Consulta 9
SELECT COUNT(*) AS "Total Reportes", COUNT(DISTINCT T.ID_Cliente) AS "Clientes Únicos"
FROM Tickets_Averias T;`,
      mysql: `-- [MySQL] Consulta 9
SELECT COUNT(*) AS \`Total Reportes\`, COUNT(DISTINCT T.ID_Cliente) AS \`Clientes Únicos\`
FROM Tickets_Averias T;`
    }
  },
  {
    id: "q-basic-10",
    titulo: "10. Facturación Mensual por Segmento (SUM & GROUP BY)",
    descripcion: "Totaliza los ingresos recurrentes clasificados por categoría comercial.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 10
SELECT 
    C.Segmento_Cliente,
    COUNT(CT.ID_Contrato) AS [Total Contratos],
    SUM(CT.Tarifa_Mensual) AS [Facturación Total (DOP)]
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
WHERE CT.Estado_Contrato = 'Activo'
GROUP BY C.Segmento_Cliente
ORDER BY [Facturación Total (DOP)] DESC;`,
      postgres: `-- [PostgreSQL] Consulta 10
SELECT 
    C.Segmento_Cliente,
    COUNT(CT.ID_Contrato) AS "Total Contratos",
    SUM(CT.Tarifa_Mensual) AS "Facturación Total (DOP)"
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
WHERE CT.Estado_Contrato = 'Activo'
GROUP BY C.Segmento_Cliente
ORDER BY "Facturación Total (DOP)" DESC;`,
      oracle: `-- [Oracle] Consulta 10
SELECT 
    C.Segmento_Cliente,
    COUNT(CT.ID_Contrato) AS "Total Contratos",
    SUM(CT.Tarifa_Mensual) AS "Facturación Total (DOP)"
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
WHERE CT.Estado_Contrato = 'Activo'
GROUP BY C.Segmento_Cliente
ORDER BY "Facturación Total (DOP)" DESC;`,
      mysql: `-- [MySQL] Consulta 10
SELECT 
    C.Segmento_Cliente,
    COUNT(CT.ID_Contrato) AS \`Total Contratos\`,
    SUM(CT.Tarifa_Mensual) AS \`Facturación Total (DOP)\`
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
WHERE CT.Estado_Contrato = 'Activo'
GROUP BY C.Segmento_Cliente
ORDER BY \`Facturación Total (DOP)\` DESC;`
    }
  },
  {
    id: "q-basic-11",
    titulo: "11. Estadísticas de Resolución: Promedio, Mínimo y Máximo (AVG, MIN, MAX)",
    descripcion: "Métricas cuantitativas clave del rendimiento de las cuadrillas de campo.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 11
SELECT 
    ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS [Promedio Horas],
    MIN(T.Tiempo_Resolucion_Horas) AS [Mínimo Horas],
    MAX(T.Tiempo_Resolucion_Horas) AS [Máximo Horas]
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto';`,
      postgres: `-- [PostgreSQL] Consulta 11
SELECT 
    ROUND(AVG(T.Tiempo_Resolucion_Horas)::numeric, 2) AS "Promedio Horas",
    MIN(T.Tiempo_Resolucion_Horas) AS "Mínimo Horas",
    MAX(T.Tiempo_Resolucion_Horas) AS "Máximo Horas"
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto';`,
      oracle: `-- [Oracle] Consulta 11
SELECT 
    ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS "Promedio Horas",
    MIN(T.Tiempo_Resolucion_Horas) AS "Mínimo Horas",
    MAX(T.Tiempo_Resolucion_Horas) AS "Máximo Horas"
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto';`,
      mysql: `-- [MySQL] Consulta 11
SELECT 
    ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS \`Promedio Horas\`,
    MIN(T.Tiempo_Resolucion_Horas) AS \`Mínimo Horas\`,
    MAX(T.Tiempo_Resolucion_Horas) AS \`Máximo Horas\`
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto';`
    }
  },
  {
    id: "q-basic-12",
    titulo: "12. Filtrado de Agrupaciones Críticas (HAVING)",
    descripcion: "Aísla provincias donde el promedio de fallas sobrepasa 10 horas.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 12
SELECT C.Provincia, COUNT(T.ID_Ticket) AS [Total Averías], ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS [Promedio]
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia
HAVING AVG(T.Tiempo_Resolucion_Horas) > 10.0
ORDER BY [Promedio] DESC;`,
      postgres: `-- [PostgreSQL] Consulta 12
SELECT C.Provincia, COUNT(T.ID_Ticket) AS "Total Averías", ROUND(AVG(T.Tiempo_Resolucion_Horas)::numeric, 2) AS "Promedio"
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia
HAVING AVG(T.Tiempo_Resolucion_Horas) > 10.0
ORDER BY "Promedio" DESC;`,
      oracle: `-- [Oracle] Consulta 12
SELECT C.Provincia, COUNT(T.ID_Ticket) AS "Total Averías", ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS "Promedio"
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia
HAVING AVG(T.Tiempo_Resolucion_Horas) > 10.0
ORDER BY "Promedio" DESC;`,
      mysql: `-- [MySQL] Consulta 12
SELECT C.Provincia, COUNT(T.ID_Ticket) AS \`Total Averías\`, ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS \`Promedio\`
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia
HAVING AVG(T.Tiempo_Resolucion_Horas) > 10.0
ORDER BY \`Promedio\` DESC;`
    }
  },
  {
    id: "q-basic-13",
    titulo: "13. Cruce Relacional de Tickets y Abonados (INNER JOIN)",
    descripcion: "Combina tickets activos con el teléfono y dirección para despacho técnico.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 13
SELECT T.Codigo_Ticket, C.Nombre_Completo, C.Telefono_Contacto, C.Direccion_Instalacion, T.Descripcion_Falla
FROM Tickets_Averias T
INNER JOIN Clientes C ON T.ID_Cliente = C.ID_Cliente
WHERE T.Estado_Ticket IN ('Abierto', 'En Ruta');`,
      postgres: `-- [PostgreSQL] Consulta 13
SELECT T.Codigo_Ticket, C.Nombre_Completo, C.Telefono_Contacto, C.Direccion_Instalacion, T.Descripcion_Falla
FROM Tickets_Averias T
INNER JOIN Clientes C ON T.ID_Cliente = C.ID_Cliente
WHERE T.Estado_Ticket IN ('Abierto', 'En Ruta');`,
      oracle: `-- [Oracle] Consulta 13
SELECT T.Codigo_Ticket, C.Nombre_Completo, C.Telefono_Contacto, C.Direccion_Instalacion, T.Descripcion_Falla
FROM Tickets_Averias T
INNER JOIN Clientes C ON T.ID_Cliente = C.ID_Cliente
WHERE T.Estado_Ticket IN ('Abierto', 'En Ruta');`,
      mysql: `-- [MySQL] Consulta 13
SELECT T.Codigo_Ticket, C.Nombre_Completo, C.Telefono_Contacto, C.Direccion_Instalacion, T.Descripcion_Falla
FROM Tickets_Averias T
INNER JOIN Clientes C ON T.ID_Cliente = C.ID_Cliente
WHERE T.Estado_Ticket IN ('Abierto', 'En Ruta');`
    }
  },
  {
    id: "q-basic-14",
    titulo: "14. Detección de Clientes Sin Incidentes (LEFT JOIN / Anti-Join)",
    descripcion: "Identifica a todos los abonados con servicio continuo y sin averías registradas.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 14
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Provincia
FROM Clientes C
LEFT JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE T.ID_Ticket IS NULL;`,
      postgres: `-- [PostgreSQL] Consulta 14
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Provincia
FROM Clientes C
LEFT JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE T.ID_Ticket IS NULL;`,
      oracle: `-- [Oracle] Consulta 14
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Provincia
FROM Clientes C
LEFT JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE T.ID_Ticket IS NULL;`,
      mysql: `-- [MySQL] Consulta 14
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Provincia
FROM Clientes C
LEFT JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE T.ID_Ticket IS NULL;`
    }
  },
  {
    id: "q-basic-15",
    titulo: "15. Catálogo Único de Tipos de Fallas (DISTINCT)",
    descripcion: "Genera la lista consolidada sin duplicados de problemas en la red.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta 15
SELECT DISTINCT T.Categoria_Incidencia, T.Descripcion_Falla
FROM Tickets_Averias T
ORDER BY T.Categoria_Incidencia, T.Descripcion_Falla;`,
      postgres: `-- [PostgreSQL] Consulta 15
SELECT DISTINCT T.Categoria_Incidencia, T.Descripcion_Falla
FROM Tickets_Averias T
ORDER BY T.Categoria_Incidencia, T.Descripcion_Falla;`,
      oracle: `-- [Oracle] Consulta 15
SELECT DISTINCT T.Categoria_Incidencia, T.Descripcion_Falla
FROM Tickets_Averias T
ORDER BY T.Categoria_Incidencia, T.Descripcion_Falla;`,
      mysql: `-- [MySQL] Consulta 15
SELECT DISTINCT T.Categoria_Incidencia, T.Descripcion_Falla
FROM Tickets_Averias T
ORDER BY T.Categoria_Incidencia, T.Descripcion_Falla;`
    }
  }
];

// CATÁLOGO DE 15 CONSULTAS AVANZADAS CON VARIANTES PARA LOS 4 MOTORES
const CONSULTAS_AVANZADAS_MULTI = [
  {
    id: "q-adv-1",
    titulo: "1. Última Incidencia por Cada Cliente (ROW_NUMBER & PARTITION BY)",
    descripcion: "Calcula el estado más reciente de cada cliente sin subconsultas lentas.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 1
WITH HistorialNumerado AS (
    SELECT 
        T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket, T.Descripcion_Falla,
        ROW_NUMBER() OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura DESC) AS FilaSecuencial
    FROM Tickets_Averias T
)
SELECT C.Nombre_Completo AS [Cliente], H.Codigo_Ticket, H.Fecha_Apertura, H.Estado_Ticket, H.Descripcion_Falla
FROM HistorialNumerado H
INNER JOIN Clientes C ON H.ID_Cliente = C.ID_Cliente
WHERE H.FilaSecuencial = 1;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 1
WITH HistorialNumerado AS (
    SELECT 
        T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket, T.Descripcion_Falla,
        ROW_NUMBER() OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura DESC) AS FilaSecuencial
    FROM Tickets_Averias T
)
SELECT C.Nombre_Completo AS "Cliente", H.Codigo_Ticket, H.Fecha_Apertura, H.Estado_Ticket, H.Descripcion_Falla
FROM HistorialNumerado H
INNER JOIN Clientes C ON H.ID_Cliente = C.ID_Cliente
WHERE H.FilaSecuencial = 1;`,
      oracle: `-- [Oracle] Consulta Avanzada 1
WITH HistorialNumerado AS (
    SELECT 
        T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket, T.Descripcion_Falla,
        ROW_NUMBER() OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura DESC) AS FilaSecuencial
    FROM Tickets_Averias T
)
SELECT C.Nombre_Completo AS "Cliente", H.Codigo_Ticket, H.Fecha_Apertura, H.Estado_Ticket, H.Descripcion_Falla
FROM HistorialNumerado H
INNER JOIN Clientes C ON H.ID_Cliente = C.ID_Cliente
WHERE H.FilaSecuencial = 1;`,
      mysql: `-- [MySQL 8.0+] Consulta Avanzada 1
WITH HistorialNumerado AS (
    SELECT 
        T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket, T.Descripcion_Falla,
        ROW_NUMBER() OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura DESC) AS FilaSecuencial
    FROM Tickets_Averias T
)
SELECT C.Nombre_Completo AS \`Cliente\`, H.Codigo_Ticket, H.Fecha_Apertura, H.Estado_Ticket, H.Descripcion_Falla
FROM HistorialNumerado H
INNER JOIN Clientes C ON H.ID_Cliente = C.ID_Cliente
WHERE H.FilaSecuencial = 1;`
    }
  },
  {
    id: "q-adv-2",
    titulo: "2. Ranking Denso de Técnicos Más Rápidos (DENSE_RANK)",
    descripcion: "Clasifica las cuadrillas de campo por velocidad de solución sin saltos numéricos.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 2
SELECT 
    T.Tecnico_Asignado,
    COUNT(T.ID_Ticket) AS [Casos Resueltos],
    ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS [Promedio Horas],
    DENSE_RANK() OVER(ORDER BY AVG(T.Tiempo_Resolucion_Horas) ASC) AS [Posición Eficiencia]
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto'
GROUP BY T.Tecnico_Asignado
HAVING COUNT(T.ID_Ticket) >= 5;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 2
SELECT 
    T.Tecnico_Asignado,
    COUNT(T.ID_Ticket) AS "Casos Resueltos",
    ROUND(AVG(T.Tiempo_Resolucion_Horas)::numeric, 2) AS "Promedio Horas",
    DENSE_RANK() OVER(ORDER BY AVG(T.Tiempo_Resolucion_Horas) ASC) AS "Posición Eficiencia"
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto'
GROUP BY T.Tecnico_Asignado
HAVING COUNT(T.ID_Ticket) >= 5;`,
      oracle: `-- [Oracle] Consulta Avanzada 2
SELECT 
    T.Tecnico_Asignado,
    COUNT(T.ID_Ticket) AS "Casos Resueltos",
    ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS "Promedio Horas",
    DENSE_RANK() OVER(ORDER BY AVG(T.Tiempo_Resolucion_Horas) ASC) AS "Posición Eficiencia"
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto'
GROUP BY T.Tecnico_Asignado
HAVING COUNT(T.ID_Ticket) >= 5;`,
      mysql: `-- [MySQL] Consulta Avanzada 2
SELECT 
    T.Tecnico_Asignado,
    COUNT(T.ID_Ticket) AS \`Casos Resueltos\`,
    ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS \`Promedio Horas\`,
    DENSE_RANK() OVER(ORDER BY AVG(T.Tiempo_Resolucion_Horas) ASC) AS \`Posición Eficiencia\`
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto'
GROUP BY T.Tecnico_Asignado
HAVING COUNT(T.ID_Ticket) >= 5;`
    }
  },
  {
    id: "q-adv-3",
    titulo: "3. Días Entre Averías Consecutivas con LAG",
    descripcion: "Calcula el intervalo entre fallas repetidas del mismo usuario.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 3
SELECT 
    T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS FechaPrevia,
    DATEDIFF(DAY, LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC), T.Fecha_Apertura) AS [Días Desde Falla Previa]
FROM Tickets_Averias T
ORDER BY T.ID_Cliente, T.Fecha_Apertura;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 3
SELECT 
    T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS "FechaPrevia",
    ROUND(EXTRACT(EPOCH FROM (T.Fecha_Apertura - LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC))) / 86400.0) AS "Días Desde Falla Previa"
FROM Tickets_Averias T
ORDER BY T.ID_Cliente, T.Fecha_Apertura;`,
      oracle: `-- [Oracle] Consulta Avanzada 3
SELECT 
    T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS FechaPrevia,
    ROUND(T.Fecha_Apertura - LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC)) AS "Días Desde Falla Previa"
FROM Tickets_Averias T
ORDER BY T.ID_Cliente, T.Fecha_Apertura;`,
      mysql: `-- [MySQL] Consulta Avanzada 3
SELECT 
    T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS FechaPrevia,
    DATEDIFF(T.Fecha_Apertura, LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC)) AS \`Días Desde Falla Previa\`
FROM Tickets_Averias T
ORDER BY T.ID_Cliente, T.Fecha_Apertura;`
    }
  },
  {
    id: "q-adv-4",
    titulo: "4. Pipeline CTE de Severidad Regulatoria INDOTEL",
    descripcion: "Calcula excesos de tiempo y cuantifica sanciones normativas.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 4
WITH CasosEnInfraccion AS (
    SELECT T.ID_Ticket, T.Codigo_Ticket, T.ID_Cliente, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
           (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS ExcesoHoras
    FROM Tickets_Averias T WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
)
SELECT CLI.Nombre_Completo, CLI.Provincia, C.Codigo_Ticket, C.Tiempo_Resolucion_Horas, C.SLA_Compromiso_Horas, C.ExcesoHoras,
       CASE WHEN C.ExcesoHoras > 24 THEN 75000.00 WHEN C.ExcesoHoras > 8 THEN 40000.00 ELSE 15000.00 END AS MultaEstimadaDOP
FROM CasosEnInfraccion C
INNER JOIN Clientes CLI ON C.ID_Cliente = CLI.ID_Cliente
ORDER BY MultaEstimadaDOP DESC;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 4
WITH CasosEnInfraccion AS (
    SELECT T.ID_Ticket, T.Codigo_Ticket, T.ID_Cliente, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
           (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS ExcesoHoras
    FROM Tickets_Averias T WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
)
SELECT CLI.Nombre_Completo, CLI.Provincia, C.Codigo_Ticket, C.Tiempo_Resolucion_Horas, C.SLA_Compromiso_Horas, C.ExcesoHoras,
       CASE WHEN C.ExcesoHoras > 24 THEN 75000.00 WHEN C.ExcesoHoras > 8 THEN 40000.00 ELSE 15000.00 END AS MultaEstimadaDOP
FROM CasosEnInfraccion C
INNER JOIN Clientes CLI ON C.ID_Cliente = CLI.ID_Cliente
ORDER BY MultaEstimadaDOP DESC;`,
      oracle: `-- [Oracle] Consulta Avanzada 4
WITH CasosEnInfraccion AS (
    SELECT T.ID_Ticket, T.Codigo_Ticket, T.ID_Cliente, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
           (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS ExcesoHoras
    FROM Tickets_Averias T WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
)
SELECT CLI.Nombre_Completo, CLI.Provincia, C.Codigo_Ticket, C.Tiempo_Resolucion_Horas, C.SLA_Compromiso_Horas, C.ExcesoHoras,
       CASE WHEN C.ExcesoHoras > 24 THEN 75000.00 WHEN C.ExcesoHoras > 8 THEN 40000.00 ELSE 15000.00 END AS MultaEstimadaDOP
FROM CasosEnInfraccion C
INNER JOIN Clientes CLI ON C.ID_Cliente = CLI.ID_Cliente
ORDER BY MultaEstimadaDOP DESC;`,
      mysql: `-- [MySQL] Consulta Avanzada 4
WITH CasosEnInfraccion AS (
    SELECT T.ID_Ticket, T.Codigo_Ticket, T.ID_Cliente, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
           (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS ExcesoHoras
    FROM Tickets_Averias T WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
)
SELECT CLI.Nombre_Completo, CLI.Provincia, C.Codigo_Ticket, C.Tiempo_Resolucion_Horas, C.SLA_Compromiso_Horas, C.ExcesoHoras,
       CASE WHEN C.ExcesoHoras > 24 THEN 75000.00 WHEN C.ExcesoHoras > 8 THEN 40000.00 ELSE 15000.00 END AS MultaEstimadaDOP
FROM CasosEnInfraccion C
INNER JOIN Clientes CLI ON C.ID_Cliente = CLI.ID_Cliente
ORDER BY MultaEstimadaDOP DESC;`
    }
  },
  {
    id: "q-adv-5",
    titulo: "5. Semáforo Dinámico de Riesgo Operativo (CASE)",
    descripcion: "Calcula alertas según el porcentaje de consumo de la ventana SLA.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 5
SELECT T.Codigo_Ticket, T.Tecnico_Asignado, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN '🚨 VIOLACIÓN CRÍTICA'
        WHEN T.Tiempo_Resolucion_Horas >= (T.SLA_Compromiso_Horas * 0.85) THEN '⚠️ ALERTA CONSUMO > 85%'
        ELSE '🟢 RENDIMIENTO ÓPTIMO'
    END AS [Estado Semáforo SLA]
FROM Tickets_Averias T ORDER BY T.Tiempo_Resolucion_Horas DESC;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 5
SELECT T.Codigo_Ticket, T.Tecnico_Asignado, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN '🚨 VIOLACIÓN CRÍTICA'
        WHEN T.Tiempo_Resolucion_Horas >= (T.SLA_Compromiso_Horas * 0.85) THEN '⚠️ ALERTA CONSUMO > 85%'
        ELSE '🟢 RENDIMIENTO ÓPTIMO'
    END AS "Estado Semáforo SLA"
FROM Tickets_Averias T ORDER BY T.Tiempo_Resolucion_Horas DESC;`,
      oracle: `-- [Oracle] Consulta Avanzada 5
SELECT T.Codigo_Ticket, T.Tecnico_Asignado, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN '🚨 VIOLACIÓN CRÍTICA'
        WHEN T.Tiempo_Resolucion_Horas >= (T.SLA_Compromiso_Horas * 0.85) THEN '⚠️ ALERTA CONSUMO > 85%'
        ELSE '🟢 RENDIMIENTO ÓPTIMO'
    END AS "Estado Semáforo SLA"
FROM Tickets_Averias T ORDER BY T.Tiempo_Resolucion_Horas DESC;`,
      mysql: `-- [MySQL] Consulta Avanzada 5
SELECT T.Codigo_Ticket, T.Tecnico_Asignado, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN '🚨 VIOLACIÓN CRÍTICA'
        WHEN T.Tiempo_Resolucion_Horas >= (T.SLA_Compromiso_Horas * 0.85) THEN '⚠️ ALERTA CONSUMO > 85%'
        ELSE '🟢 RENDIMIENTO ÓPTIMO'
    END AS \`Estado Semáforo SLA\`
FROM Tickets_Averias T ORDER BY T.Tiempo_Resolucion_Horas DESC;`
    }
  },
  {
    id: "q-adv-6",
    titulo: "6. Pivoteo Matricial de Severidades por Provincia (SUM CASE)",
    descripcion: "Traspone filas a columnas para dashboards de mando ejecutivo.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 6: Pivot Universal
SELECT 
    C.Provincia,
    COUNT(T.ID_Ticket) AS [Total],
    SUM(CASE WHEN T.Prioridad = 'Critica' THEN 1 ELSE 0 END) AS [Críticas],
    SUM(CASE WHEN T.Prioridad = 'Alta' THEN 1 ELSE 0 END) AS [Altas],
    SUM(CASE WHEN T.Prioridad = 'Media' THEN 1 ELSE 0 END) AS [Medias]
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia ORDER BY [Críticas] DESC;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 6: Pivot Universal
SELECT 
    C.Provincia,
    COUNT(T.ID_Ticket) AS "Total",
    SUM(CASE WHEN T.Prioridad = 'Critica' THEN 1 ELSE 0 END) AS "Críticas",
    SUM(CASE WHEN T.Prioridad = 'Alta' THEN 1 ELSE 0 END) AS "Altas",
    SUM(CASE WHEN T.Prioridad = 'Media' THEN 1 ELSE 0 END) AS "Medias"
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia ORDER BY "Críticas" DESC;`,
      oracle: `-- [Oracle] Consulta Avanzada 6: Pivot Universal
SELECT 
    C.Provincia,
    COUNT(T.ID_Ticket) AS "Total",
    SUM(CASE WHEN T.Prioridad = 'Critica' THEN 1 ELSE 0 END) AS "Críticas",
    SUM(CASE WHEN T.Prioridad = 'Alta' THEN 1 ELSE 0 END) AS "Altas",
    SUM(CASE WHEN T.Prioridad = 'Media' THEN 1 ELSE 0 END) AS "Medias"
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia ORDER BY "Críticas" DESC;`,
      mysql: `-- [MySQL] Consulta Avanzada 6: Pivot Universal
SELECT 
    C.Provincia,
    COUNT(T.ID_Ticket) AS \`Total\`,
    SUM(CASE WHEN T.Prioridad = 'Critica' THEN 1 ELSE 0 END) AS \`Críticas\`,
    SUM(CASE WHEN T.Prioridad = 'Alta' THEN 1 ELSE 0 END) AS \`Altas\`,
    SUM(CASE WHEN T.Prioridad = 'Media' THEN 1 ELSE 0 END) AS \`Medias\`
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia ORDER BY \`Críticas\` DESC;`
    }
  },
  {
    id: "q-adv-7",
    titulo: "7. Subconsulta Correlacionada de Impacto Provincial",
    descripcion: "Calcula en el SELECT el porcentaje de quejas del cliente frente a su provincia.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 7
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia,
    (SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS [Tickets Cliente],
    ROUND(CAST((SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS FLOAT) /
          NULLIF((SELECT COUNT(*) FROM Tickets_Averias T2 INNER JOIN Clientes C2 ON T2.ID_Cliente = C2.ID_Cliente WHERE C2.Provincia = C.Provincia), 0) * 100, 2) AS [% Impacto]
FROM Clientes C
WHERE EXISTS (SELECT 1 FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente)
ORDER BY [% Impacto] DESC;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 7
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia,
    (SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS "Tickets Cliente",
    ROUND(CAST((SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS NUMERIC) /
          NULLIF((SELECT COUNT(*) FROM Tickets_Averias T2 INNER JOIN Clientes C2 ON T2.ID_Cliente = C2.ID_Cliente WHERE C2.Provincia = C.Provincia), 0) * 100, 2) AS "% Impacto"
FROM Clientes C
WHERE EXISTS (SELECT 1 FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente)
ORDER BY "% Impacto" DESC;`,
      oracle: `-- [Oracle] Consulta Avanzada 7
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia,
    (SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS "Tickets Cliente",
    ROUND(CAST((SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS NUMBER) /
          NULLIF((SELECT COUNT(*) FROM Tickets_Averias T2 INNER JOIN Clientes C2 ON T2.ID_Cliente = C2.ID_Cliente WHERE C2.Provincia = C.Provincia), 0) * 100, 2) AS "% Impacto"
FROM Clientes C
WHERE EXISTS (SELECT 1 FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente)
ORDER BY "% Impacto" DESC;`,
      mysql: `-- [MySQL] Consulta Avanzada 7
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia,
    (SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS \`Tickets Cliente\`,
    ROUND(CAST((SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS DOUBLE) /
          NULLIF((SELECT COUNT(*) FROM Tickets_Averias T2 INNER JOIN Clientes C2 ON T2.ID_Cliente = C2.ID_Cliente WHERE C2.Provincia = C.Provincia), 0) * 100, 2) AS \`% Impacto\`
FROM Clientes C
WHERE EXISTS (SELECT 1 FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente)
ORDER BY \`% Impacto\` DESC;`
    }
  },
  {
    id: "q-adv-8",
    titulo: "8. Clientes VIP en Riesgo de Churn (EXISTS)",
    descripcion: "Aísla cuentas de alto valor con más de 2 incumplimientos de SLA.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 8
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Telefono_Contacto
FROM Clientes C
WHERE C.Segmento_Cliente = 'Corporativo VIP'
  AND EXISTS (
      SELECT 1 FROM Tickets_Averias T 
      WHERE T.ID_Cliente = C.ID_Cliente AND T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
      GROUP BY T.ID_Cliente HAVING COUNT(*) >= 2
  );`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 8
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Telefono_Contacto
FROM Clientes C
WHERE C.Segmento_Cliente = 'Corporativo VIP'
  AND EXISTS (
      SELECT 1 FROM Tickets_Averias T 
      WHERE T.ID_Cliente = C.ID_Cliente AND T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
      GROUP BY T.ID_Cliente HAVING COUNT(*) >= 2
  );`,
      oracle: `-- [Oracle] Consulta Avanzada 8
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Telefono_Contacto
FROM Clientes C
WHERE C.Segmento_Cliente = 'Corporativo VIP'
  AND EXISTS (
      SELECT 1 FROM Tickets_Averias T 
      WHERE T.ID_Cliente = C.ID_Cliente AND T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
      GROUP BY T.ID_Cliente HAVING COUNT(*) >= 2
  );`,
      mysql: `-- [MySQL] Consulta Avanzada 8
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Telefono_Contacto
FROM Clientes C
WHERE C.Segmento_Cliente = 'Corporativo VIP'
  AND EXISTS (
      SELECT 1 FROM Tickets_Averias T 
      WHERE T.ID_Cliente = C.ID_Cliente AND T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
      GROUP BY T.ID_Cliente HAVING COUNT(*) >= 2
  );`
    }
  },
  {
    id: "q-adv-9",
    titulo: "9. Subtotales y Gran Total Jerárquico (GROUP BY ROLLUP)",
    descripcion: "Genera árboles de agregación para reportes contables.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 9
SELECT 
    COALESCE(C.Provincia, '=== TODAS ===') AS Provincia,
    COALESCE(C.Segmento_Cliente, '--- SUBTOTAL ---') AS Segmento,
    COUNT(CT.ID_Contrato) AS [Total Contratos],
    SUM(CT.Tarifa_Mensual) AS [Facturación DOP]
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
GROUP BY ROLLUP (C.Provincia, C.Segmento_Cliente);`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 9
SELECT 
    COALESCE(C.Provincia, '=== TODAS ===') AS "Provincia",
    COALESCE(C.Segmento_Cliente, '--- SUBTOTAL ---') AS "Segmento",
    COUNT(CT.ID_Contrato) AS "Total Contratos",
    SUM(CT.Tarifa_Mensual) AS "Facturación DOP"
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
GROUP BY ROLLUP (C.Provincia, C.Segmento_Cliente);`,
      oracle: `-- [Oracle] Consulta Avanzada 9
SELECT 
    COALESCE(C.Provincia, '=== TODAS ===') AS "Provincia",
    COALESCE(C.Segmento_Cliente, '--- SUBTOTAL ---') AS "Segmento",
    COUNT(CT.ID_Contrato) AS "Total Contratos",
    SUM(CT.Tarifa_Mensual) AS "Facturación DOP"
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
GROUP BY ROLLUP (C.Provincia, C.Segmento_Cliente);`,
      mysql: `-- [MySQL] Consulta Avanzada 9
SELECT 
    COALESCE(C.Provincia, '=== TODAS ===') AS Provincia,
    COALESCE(C.Segmento_Cliente, '--- SUBTOTAL ---') AS Segmento,
    COUNT(CT.ID_Contrato) AS \`Total Contratos\`,
    SUM(CT.Tarifa_Mensual) AS \`Facturación DOP\`
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
GROUP BY C.Provincia, C.Segmento_Cliente WITH ROLLUP;`
    }
  },
  {
    id: "q-adv-10",
    titulo: "10. Acumulado Móvil de Penalidades INDOTEL (Running Total)",
    descripcion: "Curva acumulativa financiera a lo largo del tiempo.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 10
SELECT A.ID_Auditoria, A.Fecha_Fiscalizacion, A.Monto_Penalidad_DOP,
    SUM(A.Monto_Penalidad_DOP) OVER(ORDER BY A.Fecha_Fiscalizacion ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS [Acumulado Multas DOP]
FROM Auditoria_Regulatoria_INDOTEL A
WHERE A.Monto_Penalidad_DOP > 0;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 10
SELECT A.ID_Auditoria, A.Fecha_Fiscalizacion, A.Monto_Penalidad_DOP,
    SUM(A.Monto_Penalidad_DOP) OVER(ORDER BY A.Fecha_Fiscalizacion ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS "Acumulado Multas DOP"
FROM Auditoria_Regulatoria_INDOTEL A
WHERE A.Monto_Penalidad_DOP > 0;`,
      oracle: `-- [Oracle] Consulta Avanzada 10
SELECT A.ID_Auditoria, A.Fecha_Fiscalizacion, A.Monto_Penalidad_DOP,
    SUM(A.Monto_Penalidad_DOP) OVER(ORDER BY A.Fecha_Fiscalizacion ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS "Acumulado Multas DOP"
FROM Auditoria_Regulatoria_INDOTEL A
WHERE A.Monto_Penalidad_DOP > 0;`,
      mysql: `-- [MySQL] Consulta Avanzada 10
SELECT A.ID_Auditoria, A.Fecha_Fiscalizacion, A.Monto_Penalidad_DOP,
    SUM(A.Monto_Penalidad_DOP) OVER(ORDER BY A.Fecha_Fiscalizacion ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS \`Acumulado Multas DOP\`
FROM Auditoria_Regulatoria_INDOTEL A
WHERE A.Monto_Penalidad_DOP > 0;`
    }
  },
  {
    id: "q-adv-11",
    titulo: "11. Desviación Frente a la Media de la Categoría (OVER AVG)",
    descripcion: "Calcula cuántas horas se desvía cada ticket frente a la media de su tipología.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 11
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Tiempo_Resolucion_Horas,
    ROUND(AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla), 2) AS [Media Categoría],
    ROUND(T.Tiempo_Resolucion_Horas - AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla), 2) AS [Desviación]
FROM Tickets_Averias T ORDER BY [Desviación] DESC;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 11
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Tiempo_Resolucion_Horas,
    ROUND(AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla)::numeric, 2) AS "Media Categoría",
    ROUND((T.Tiempo_Resolucion_Horas - AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla))::numeric, 2) AS "Desviación"
FROM Tickets_Averias T ORDER BY "Desviación" DESC;`,
      oracle: `-- [Oracle] Consulta Avanzada 11
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Tiempo_Resolucion_Horas,
    ROUND(AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla), 2) AS "Media Categoría",
    ROUND(T.Tiempo_Resolucion_Horas - AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla), 2) AS "Desviación"
FROM Tickets_Averias T ORDER BY "Desviación" DESC;`,
      mysql: `-- [MySQL] Consulta Avanzada 11
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Tiempo_Resolucion_Horas,
    ROUND(AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla), 2) AS \`Media Categoría\`,
    ROUND(T.Tiempo_Resolucion_Horas - AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla), 2) AS \`Desviación\`
FROM Tickets_Averias T ORDER BY \`Desviación\` DESC;`
    }
  },
  {
    id: "q-adv-12",
    titulo: "12. Trazabilidad de Primer y Último Estado (FIRST_VALUE / LAST_VALUE)",
    descripcion: "Inspecciona el comportamiento inicial de la orden y su cuadrilla de cierre.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 12
SELECT T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    FIRST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS [Primer Técnico],
    LAST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS [Último Técnico]
FROM Tickets_Averias T;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 12
SELECT T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    FIRST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS "Primer Técnico",
    LAST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS "Último Técnico"
FROM Tickets_Averias T;`,
      oracle: `-- [Oracle] Consulta Avanzada 12
SELECT T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    FIRST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS "Primer Técnico",
    LAST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS "Último Técnico"
FROM Tickets_Averias T;`,
      mysql: `-- [MySQL] Consulta Avanzada 12
SELECT T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    FIRST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS \`Primer Técnico\`,
    LAST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS \`Último Técnico\`
FROM Tickets_Averias T;`
    }
  },
  {
    id: "q-adv-13",
    titulo: "13. Clasificación de Tramos Regulatorios (Non-Equi Join)",
    descripcion: "Asocia registros con bandas de tolerancia sin igualdad exacta.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 13
WITH EscalaMultas AS (
    SELECT 'Leve' AS Tramo, 0.01 AS MinH, 4.00 AS MaxH, 10000.00 AS Multa UNION ALL
    SELECT 'Grave', 4.01, 12.00, 35000.00 UNION ALL
    SELECT 'Muy Grave', 12.01, 999.00, 85000.00
)
SELECT T.Codigo_Ticket, (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS Exceso, M.Tramo, M.Multa AS [Tarifa Normativa DOP]
FROM Tickets_Averias T
INNER JOIN EscalaMultas M ON (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) BETWEEN M.MinH AND M.MaxH
WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 13
WITH EscalaMultas AS (
    SELECT 'Leve' AS Tramo, 0.01 AS MinH, 4.00 AS MaxH, 10000.00 AS Multa UNION ALL
    SELECT 'Grave', 4.01, 12.00, 35000.00 UNION ALL
    SELECT 'Muy Grave', 12.01, 999.00, 85000.00
)
SELECT T.Codigo_Ticket, (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS Exceso, M.Tramo, M.Multa AS "Tarifa Normativa DOP"
FROM Tickets_Averias T
INNER JOIN EscalaMultas M ON (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) BETWEEN M.MinH AND M.MaxH
WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas;`,
      oracle: `-- [Oracle] Consulta Avanzada 13
WITH EscalaMultas AS (
    SELECT 'Leve' AS Tramo, 0.01 AS MinH, 4.00 AS MaxH, 10000.00 AS Multa FROM DUAL UNION ALL
    SELECT 'Grave', 4.01, 12.00, 35000.00 FROM DUAL UNION ALL
    SELECT 'Muy Grave', 12.01, 999.00, 85000.00 FROM DUAL
)
SELECT T.Codigo_Ticket, (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS Exceso, M.Tramo, M.Multa AS "Tarifa Normativa DOP"
FROM Tickets_Averias T
INNER JOIN EscalaMultas M ON (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) BETWEEN M.MinH AND M.MaxH
WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas;`,
      mysql: `-- [MySQL] Consulta Avanzada 13
WITH EscalaMultas AS (
    SELECT 'Leve' AS Tramo, 0.01 AS MinH, 4.00 AS MaxH, 10000.00 AS Multa UNION ALL
    SELECT 'Grave', 4.01, 12.00, 35000.00 UNION ALL
    SELECT 'Muy Grave', 12.01, 999.00, 85000.00
)
SELECT T.Codigo_Ticket, (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS Exceso, M.Tramo, M.Multa AS \`Tarifa Normativa DOP\`
FROM Tickets_Averias T
INNER JOIN EscalaMultas M ON (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) BETWEEN M.MinH AND M.MaxH
WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas;`
    }
  },
  {
    id: "q-adv-14",
    titulo: "14. Auditoría de Integridad Referencial (FULL OUTER JOIN)",
    descripcion: "Detecta registros huérfanos o discordancias entre abonados y averías.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 14
SELECT COALESCE(C.ID_Cliente, T.ID_Cliente) AS [ID Evaluado],
    CASE 
        WHEN C.ID_Cliente IS NULL THEN 'ALERTA: Ticket sin cliente'
        WHEN T.ID_Ticket IS NULL THEN 'Cliente activo sin incidencias'
        ELSE 'Relación Íntegra Validada'
    END AS [Estado Consistencia]
FROM Clientes C
FULL OUTER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE C.ID_Cliente IS NULL OR T.ID_Ticket IS NULL;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 14
SELECT COALESCE(C.ID_Cliente, T.ID_Cliente) AS "ID Evaluado",
    CASE 
        WHEN C.ID_Cliente IS NULL THEN 'ALERTA: Ticket sin cliente'
        WHEN T.ID_Ticket IS NULL THEN 'Cliente activo sin incidencias'
        ELSE 'Relación Íntegra Validada'
    END AS "Estado Consistencia"
FROM Clientes C
FULL OUTER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE C.ID_Cliente IS NULL OR T.ID_Ticket IS NULL;`,
      oracle: `-- [Oracle] Consulta Avanzada 14
SELECT COALESCE(C.ID_Cliente, T.ID_Cliente) AS "ID Evaluado",
    CASE 
        WHEN C.ID_Cliente IS NULL THEN 'ALERTA: Ticket sin cliente'
        WHEN T.ID_Ticket IS NULL THEN 'Cliente activo sin incidencias'
        ELSE 'Relación Íntegra Validada'
    END AS "Estado Consistencia"
FROM Clientes C
FULL OUTER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE C.ID_Cliente IS NULL OR T.ID_Ticket IS NULL;`,
      mysql: `-- [MySQL] Consulta Avanzada 14: Emulación FULL JOIN con UNION
SELECT C.ID_Cliente AS \`ID Evaluado\`, 'Cliente sin incidencias' AS \`Estado Consistencia\`
FROM Clientes C LEFT JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente WHERE T.ID_Ticket IS NULL
UNION
SELECT T.ID_Cliente, 'ALERTA: Ticket sin cliente'
FROM Clientes C RIGHT JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente WHERE C.ID_Cliente IS NULL;`
    }
  },
  {
    id: "q-adv-15",
    titulo: "15. Matriz Scoring de Riesgo INDOTEL (0 a 100)",
    descripcion: "Modelo scoring en SQL puro que combina fallas, retrasos y tipo de enlace.",
    sql: {
      sqlserver: `-- [SQL Server] Consulta Avanzada 15
WITH AnalisisCliente AS (
    SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente,
           COUNT(T.ID_Ticket) AS TotalTickets,
           SUM(CASE WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 1 ELSE 0 END) AS ViolacionesSLA
    FROM Clientes C
    INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
    GROUP BY C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente
)
SELECT A.ID_Cliente, A.Nombre_Completo, A.Segmento_Cliente, A.TotalTickets, A.ViolacionesSLA,
    ROUND((A.ViolacionesSLA * 30.0) + (A.TotalTickets * 5.0) + (CASE WHEN A.Segmento_Cliente = 'Corporativo VIP' THEN 25.0 ELSE 10.0 END), 1) AS [Score Riesgo],
    CASE 
        WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 70 THEN '🔴 ALTO RIESGO SANCIÓN'
        WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 40 THEN '🟡 RIESGO MODERADO'
        ELSE '🟢 BAJO RIESGO'
    END AS [Clasificación]
FROM AnalisisCliente A ORDER BY [Score Riesgo] DESC;`,
      postgres: `-- [PostgreSQL] Consulta Avanzada 15
WITH AnalisisCliente AS (
    SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente,
           COUNT(T.ID_Ticket) AS TotalTickets,
           SUM(CASE WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 1 ELSE 0 END) AS ViolacionesSLA
    FROM Clientes C
    INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
    GROUP BY C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente
)
SELECT A.ID_Cliente, A.Nombre_Completo, A.Segmento_Cliente, A.TotalTickets, A.ViolacionesSLA,
    ROUND(((A.ViolacionesSLA * 30.0) + (A.TotalTickets * 5.0) + (CASE WHEN A.Segmento_Cliente = 'Corporativo VIP' THEN 25.0 ELSE 10.0 END))::numeric, 1) AS "Score Riesgo",
    CASE 
        WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 70 THEN '🔴 ALTO RIESGO SANCIÓN'
        WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 40 THEN '🟡 RIESGO MODERADO'
        ELSE '🟢 BAJO RIESGO'
    END AS "Clasificación"
FROM AnalisisCliente A ORDER BY "Score Riesgo" DESC;`,
      oracle: `-- [Oracle] Consulta Avanzada 15
WITH AnalisisCliente AS (
    SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente,
           COUNT(T.ID_Ticket) AS TotalTickets,
           SUM(CASE WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 1 ELSE 0 END) AS ViolacionesSLA
    FROM Clientes C
    INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
    GROUP BY C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente
)
SELECT A.ID_Cliente, A.Nombre_Completo, A.Segmento_Cliente, A.TotalTickets, A.ViolacionesSLA,
    ROUND((A.ViolacionesSLA * 30.0) + (A.TotalTickets * 5.0) + (CASE WHEN A.Segmento_Cliente = 'Corporativo VIP' THEN 25.0 ELSE 10.0 END), 1) AS "Score Riesgo",
    CASE 
        WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 70 THEN '🔴 ALTO RIESGO SANCIÓN'
        WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 40 THEN '🟡 RIESGO MODERADO'
        ELSE '🟢 BAJO RIESGO'
    END AS "Clasificación"
FROM AnalisisCliente A ORDER BY "Score Riesgo" DESC;`,
      mysql: `-- [MySQL] Consulta Avanzada 15
WITH AnalisisCliente AS (
    SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente,
           COUNT(T.ID_Ticket) AS TotalTickets,
           SUM(CASE WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 1 ELSE 0 END) AS ViolacionesSLA
    FROM Clientes C
    INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
    GROUP BY C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente
)
SELECT A.ID_Cliente, A.Nombre_Completo, A.Segmento_Cliente, A.TotalTickets, A.ViolacionesSLA,
    ROUND((A.ViolacionesSLA * 30.0) + (A.TotalTickets * 5.0) + (CASE WHEN A.Segmento_Cliente = 'Corporativo VIP' THEN 25.0 ELSE 10.0 END), 1) AS \`Score Riesgo\`,
    CASE 
        WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 70 THEN '🔴 ALTO RIESGO SANCIÓN'
        WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 40 THEN '🟡 RIESGO MODERADO'
        ELSE '🟢 BAJO RIESGO'
    END AS \`Clasificación\`
FROM AnalisisCliente A ORDER BY \`Score Riesgo\` DESC;`
    }
  }
];

// Función para renderizar definiciones
function renderizarDefiniciones() {
  const container = document.getElementById('definiciones-sql-grid');
  if (!container) return;

  container.innerHTML = DEFINICIONES_SQL.map(def => `
    <div class="col-md-6 col-lg-4">
      <div class="p-3 bg-white border border-2 border-dark rounded-3 h-100 shadow-sm" style="box-shadow: 3px 3px 0 #000;">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="badge ${def.badge === 'Avanzada' ? 'bg-danger text-white' : 'bg-primary text-white'} border border-dark">
            ${def.badge}
          </span>
          <small class="fw-bold text-muted">${def.categoria}</small>
        </div>
        <h6 class="fw-bold text-dark mb-2" style="font-family: 'Space Grotesk', sans-serif;">
          <i class="bi bi-code-slash text-danger"></i> ${def.termino}
        </h6>
        <p class="small text-secondary mb-0" style="line-height: 1.5;">${def.descripcion}</p>
      </div>
    </div>
  `).join('');
}

// Función para renderizar consultas adaptadas al motor actual
function renderizarConsultas(tipo = 'todas') {
  const container = document.getElementById('consultas-sql-container');
  if (!container) return;

  const motor = window.motorActivo || 'sqlserver';

  let items = [];
  if (tipo === 'basicas') items = CONSULTAS_BASICAS_MULTI;
  else if (tipo === 'avanzadas') items = CONSULTAS_AVANZADAS_MULTI;
  else items = [...CONSULTAS_BASICAS_MULTI, ...CONSULTAS_AVANZADAS_MULTI];

  const motorNombres = {
    sqlserver: 'SQL Server (T-SQL)',
    postgres: 'PostgreSQL (PL/pgSQL)',
    oracle: 'Oracle Database (PL/SQL)',
    mysql: 'MySQL 8.0+ (InnoDB)'
  };

  container.innerHTML = items.map(q => {
    const sqlCode = q.sql[motor] || q.sql['sqlserver'];
    const esBasica = q.id.includes('basic');

    return `
      <div class="card mb-4 border border-2 border-dark rounded-3" style="box-shadow: 4px 4px 0px #000;">
        <div class="card-header bg-white border-bottom border-2 border-dark py-3 d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div class="d-flex align-items-center gap-2 flex-wrap">
            <span class="badge ${esBasica ? 'bg-primary text-white' : 'bg-danger text-white'} border border-dark">
              ${esBasica ? 'Básica' : 'Avanzada'}
            </span>
            <span class="badge bg-dark text-white border border-dark">
              <i class="bi bi-cpu-fill text-warning me-1"></i> ${motorNombres[motor]}
            </span>
            <strong class="h6 mb-0 text-dark fw-bold" style="font-family: 'Space Grotesk', sans-serif;">${q.titulo}</strong>
          </div>
          <button class="btn btn-sm btn-outline-dark border-2 fw-bold d-flex align-items-center gap-1" onclick="copiarAlPortapapeles('${q.id}-code', this)">
            <i class="bi bi-clipboard"></i> Copiar Consulta (${motor.toUpperCase()})
          </button>
        </div>
        <div class="card-body bg-light">
          <p class="small text-secondary mb-3"><strong>Objetivo:</strong> ${q.descripcion}</p>
          <div class="position-relative">
            <pre class="m-0 rounded-3 border border-dark" style="background: #1e1e1e !important;"><code id="${q.id}-code" class="language-sql">${sqlCode}</code></pre>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.Prism) {
    Prism.highlightAllUnder(container);
  }
}

// SINCRONIZACIÓN GLOBAL: Cambiar de motor en toda la plataforma
window.cambiarMotorGlobal = function(nuevoMotor) {
  if (!['sqlserver', 'postgres', 'oracle', 'mysql'].includes(nuevoMotor)) return;

  window.motorActivo = nuevoMotor;

  // 1. Sincronizar pestañas de la Sección 5 (Scripts DDL/DML)
  const tabButton = document.getElementById(`${nuevoMotor}-tab`);
  if (tabButton && window.bootstrap) {
    const tabInstance = bootstrap.Tab.getOrCreateInstance(tabButton);
    tabInstance.show();
  }

  // 2. Sincronizar botones del Laboratorio de Consultas y Carga Masiva
  document.querySelectorAll('.motor-sync-btn').forEach(btn => {
    if (btn.getAttribute('data-motor') === nuevoMotor) {
      btn.classList.remove('btn-outline-dark');
      btn.classList.add('btn-dark', 'active');
    } else {
      btn.classList.remove('btn-dark', 'active');
      btn.classList.add('btn-outline-dark');
    }
  });

  // 3. Actualizar el script de Carga Masiva mostrado
  if (window.actualizarScriptMasivoMotor) {
    window.actualizarScriptMasivoMotor(nuevoMotor);
  }

  // 4. Re-renderizar las 30 consultas
  renderizarConsultas('todas');

  // 5. Lanzar Notificación Toast de Descarga del Script Maestro Todo-en-Uno
  mostrarNotificacionMotorToast(nuevoMotor);
};

// Notificación Toast interactiva Neobrutalista
function mostrarNotificacionMotorToast(motor) {
  const nombres = {
    sqlserver: 'Microsoft SQL Server (T-SQL)',
    postgres: 'PostgreSQL (PL/pgSQL)',
    oracle: 'Oracle Database (PL/SQL)',
    mysql: 'MySQL 8.0+ (InnoDB)'
  };

  const nombreLimpio = nombres[motor] || motor;

  let toastBox = document.getElementById('toast-motor-container');
  if (!toastBox) {
    toastBox = document.createElement('div');
    toastBox.id = 'toast-motor-container';
    toastBox.className = 'position-fixed bottom-0 end-0 p-3';
    toastBox.style.zIndex = '9999';
    document.body.appendChild(toastBox);
  }

  toastBox.innerHTML = `
    <div class="toast show border border-3 border-dark rounded-3 bg-white shadow-lg" role="alert" aria-live="assertive" aria-atomic="true" style="box-shadow: 6px 6px 0px #000 !important; max-width: 440px;">
      <div class="toast-header bg-dark text-white border-bottom border-2 border-dark d-flex justify-content-between align-items-center">
        <strong class="me-auto text-uppercase fw-bold" style="font-family: 'Space Grotesk', sans-serif;">
          <i class="bi bi-cpu text-warning me-1"></i> Motor Activo Sincronizado
        </strong>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close" onclick="this.closest('.toast').remove()"></button>
      </div>
      <div class="toast-body p-3">
        <p class="mb-2 fw-bold text-dark">
          Has seleccionado: <span class="badge bg-danger text-white border border-dark">${nombreLimpio}</span>
        </p>
        <p class="small text-secondary mb-3">
          Todo el laboratorio (DDL, Data Seeder y las 30 Consultas) se adaptó a esta sintaxis. Puedes descargar el <strong>Script Maestro 100% Completo (Todo-en-Uno)</strong> para trabajarlo directamente en tu IDE:
        </p>
        <div class="d-flex gap-2">
          <button class="btn btn-claro btn-sm fw-bold w-100 d-flex align-items-center justify-content-center gap-1" onclick="descargarScriptTodoEnUno('${motor}')">
            <i class="bi bi-cloud-arrow-down-fill"></i> Descargar Script Completo (${motor.toUpperCase()})
          </button>
        </div>
      </div>
    </div>
  `;

  // Auto-cerrar luego de 10 segundos
  setTimeout(() => {
    const t = toastBox.querySelector('.toast');
    if (t) t.remove();
  }, 10000);
}

// Exposición global para integración con main.js y descargas
window.CONSULTAS_BASICAS_MULTI = CONSULTAS_BASICAS_MULTI;
window.CONSULTAS_AVANZADAS_MULTI = CONSULTAS_AVANZADAS_MULTI;
window.DEFINICIONES_SQL = DEFINICIONES_SQL;

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  renderizarDefiniciones();
  renderizarConsultas('todas');

  // Interceptar clics en los tabs de la Sección 5 existentes para sincronizar globalmente
  ['sqlserver', 'postgres', 'oracle', 'mysql'].forEach(m => {
    const tabEl = document.getElementById(`${m}-tab`);
    if (tabEl) {
      tabEl.addEventListener('shown.bs.tab', () => {
        if (window.motorActivo !== m) {
          window.cambiarMotorGlobal(m);
        }
      });
    }
  });
});
