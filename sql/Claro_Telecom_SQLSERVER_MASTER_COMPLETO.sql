-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - MASTERCLASS SQL MULTI-MOTOR
-- SCRIPT MAESTRO 100% COMPLETO (TODO-EN-UNO): MICROSOFT SQL SERVER (T-SQL)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com | SANTO DOMINGO, REPÚBLICA DOMINICANA
-- ====================================================================================================
-- ESTRUCTURA DEL ENTREGABLE:
--   FASE 1: Creación y Preparación de la Base de Datos (ClaroOpsDB)
--   FASE 2: Creación del Esquema Relacional DDL (Tablas, Claves Primarias, Foráneas & Restricciones)
--   FASE 3: Inserción de Datos Iniciales y Catálogos de Servicio
--   FASE 4: Creación de la Vista de Monitoreo & Auditoría Regulatoria INDOTEL
--   FASE 5: Generador de Carga Masiva Automatizado (Data Seeder: 250 Clientes + 1,000 Tickets)
--   FASE 6: Laboratorio de 30 Consultas Prácticas Comentadas (15 Básicas + 15 Avanzadas)
-- ====================================================================================================

-- ====================================================================================================
-- FASE 1: CREACIÓN Y PREPARACIÓN DE LA BASE DE DATOS
-- ====================================================================================================
USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ClaroOpsDB')
BEGIN
    CREATE DATABASE ClaroOpsDB
    COLLATE Modern_Spanish_CI_AS;
    PRINT '>>> Base de datos ClaroOpsDB creada exitosamente.';
END
ELSE
BEGIN
    PRINT '>>> La base de datos ClaroOpsDB ya existe en el servidor.';
END
GO

USE ClaroOpsDB;
GO

SET NOCOUNT ON;
GO

-- ====================================================================================================
-- FASE 2: CREACIÓN DEL ESQUEMA RELACIONAL DDL (TABLAS, LLAVES & RESTRICCIONES)
-- ====================================================================================================
PRINT '>>> FASE 2: Creando tablas e índices relacionales en ClaroOpsDB...';

-- 1. Tabla: Planes_Servicio
IF OBJECT_ID('dbo.Contratos', 'U') IS NOT NULL DROP TABLE dbo.Contratos;
IF OBJECT_ID('dbo.Auditoria_Regulatoria_INDOTEL', 'U') IS NOT NULL DROP TABLE dbo.Auditoria_Regulatoria_INDOTEL;
IF OBJECT_ID('dbo.Tickets_Averias', 'U') IS NOT NULL DROP TABLE dbo.Tickets_Averias;
IF OBJECT_ID('dbo.Clientes', 'U') IS NOT NULL DROP TABLE dbo.Clientes;
IF OBJECT_ID('dbo.Planes_Servicio', 'U') IS NOT NULL DROP TABLE dbo.Planes_Servicio;

CREATE TABLE dbo.Planes_Servicio (
    ID_Plan INT IDENTITY(1,1) PRIMARY KEY,
    Codigo_Plan VARCHAR(20) NOT NULL UNIQUE,
    Nombre_Plan VARCHAR(100) NOT NULL,
    Tecnologia VARCHAR(50) NOT NULL, -- Fibra Óptica, Móvil 5G, Enlace Dedicado
    Velocidad_Bajada_Mbps INT NOT NULL,
    Tarifa_Mensual_DOP DECIMAL(10,2) NOT NULL,
    SLA_Garantizado_Horas INT NOT NULL DEFAULT 4
);

-- 2. Tabla: Clientes
CREATE TABLE dbo.Clientes (
    ID_Cliente INT IDENTITY(1,1) PRIMARY KEY,
    Nombre_Completo VARCHAR(150) NOT NULL,
    Documento_Identidad VARCHAR(20) NOT NULL UNIQUE,
    Telefono_Contacto VARCHAR(25) NOT NULL,
    Correo_Electronico VARCHAR(120) NOT NULL,
    Direccion_Instalacion VARCHAR(250) NOT NULL,
    Provincia VARCHAR(60) NOT NULL,
    Segmento_Cliente VARCHAR(40) NOT NULL, -- Corporativo VIP, PYME Negocios, Residencial Premium, Residencial Estándar
    Fecha_Registro DATETIME NOT NULL DEFAULT GETDATE()
);

-- 3. Tabla: Contratos
CREATE TABLE dbo.Contratos (
    ID_Contrato INT IDENTITY(1,1) PRIMARY KEY,
    ID_Cliente INT NOT NULL,
    ID_Plan INT NOT NULL,
    Numero_Contrato VARCHAR(30) NOT NULL UNIQUE,
    Fecha_Firma DATETIME NOT NULL,
    Estado_Contrato VARCHAR(20) NOT NULL DEFAULT 'Activo',
    Tarifa_Mensual DECIMAL(10,2) NOT NULL,
    Direccion_IP_Asignada VARCHAR(45) NOT NULL,
    CONSTRAINT FK_Contratos_Clientes FOREIGN KEY (ID_Cliente) REFERENCES dbo.Clientes(ID_Cliente),
    CONSTRAINT FK_Contratos_Planes FOREIGN KEY (ID_Plan) REFERENCES dbo.Planes_Servicio(ID_Plan)
);

-- 4. Tabla: Tickets_Averias
CREATE TABLE dbo.Tickets_Averias (
    ID_Ticket INT IDENTITY(1,1) PRIMARY KEY,
    Codigo_Ticket VARCHAR(30) NOT NULL UNIQUE,
    ID_Cliente INT NOT NULL,
    Categoria_Incidencia VARCHAR(60) NOT NULL,
    Descripcion_Falla VARCHAR(250) NOT NULL,
    Prioridad VARCHAR(20) NOT NULL, -- Critica, Alta, Media, Baja
    Estado_Ticket VARCHAR(20) NOT NULL DEFAULT 'Abierto', -- Abierto, En Ruta, Resuelto, Cancelado
    Fecha_Apertura DATETIME NOT NULL,
    Fecha_Cierre DATETIME NULL,
    Tiempo_Resolucion_Horas DECIMAL(8,2) NULL,
    SLA_Compromiso_Horas INT NOT NULL DEFAULT 4,
    Tecnico_Asignado VARCHAR(100) NOT NULL,
    CONSTRAINT FK_Tickets_Clientes FOREIGN KEY (ID_Cliente) REFERENCES dbo.Clientes(ID_Cliente)
);

-- 5. Tabla: Auditoria_Regulatoria_INDOTEL
CREATE TABLE dbo.Auditoria_Regulatoria_INDOTEL (
    ID_Auditoria INT IDENTITY(1,1) PRIMARY KEY,
    ID_Ticket INT NOT NULL,
    Codigo_Resolucion VARCHAR(50) NOT NULL UNIQUE,
    Fecha_Fiscalizacion DATETIME NOT NULL,
    SLA_Normativo_Horas INT NOT NULL,
    SLA_Real_Horas DECIMAL(8,2) NOT NULL,
    Veredicto_Regulatorio VARCHAR(40) NOT NULL, -- CUMPLIMIENTO_OPTIMO, VIOLACION_REINCIDENTE
    Monto_Penalidad_DOP DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    Inspector_Asignado VARCHAR(100) NOT NULL,
    Estado_Expediente VARCHAR(40) NOT NULL DEFAULT 'Archivado Conforme',
    CONSTRAINT FK_Auditoria_Tickets FOREIGN KEY (ID_Ticket) REFERENCES dbo.Tickets_Averias(ID_Ticket)
);

-- Creación de Índices Estratégicos
CREATE NONCLUSTERED INDEX IX_Tickets_Cliente_Fecha ON dbo.Tickets_Averias(ID_Cliente, Fecha_Apertura DESC);
CREATE NONCLUSTERED INDEX IX_Tickets_Prioridad_Estado ON dbo.Tickets_Averias(Prioridad, Estado_Ticket) INCLUDE(Tiempo_Resolucion_Horas);
CREATE NONCLUSTERED INDEX IX_Clientes_Provincia ON dbo.Clientes(Provincia, Segmento_Cliente);
GO

-- ====================================================================================================
-- FASE 3: INSERCIÓN DE DATOS INICIALES Y CATÁLOGOS BASE
-- ====================================================================================================
PRINT '>>> FASE 3: Insertando catálogo maestro de planes de telecomunicaciones...';

INSERT INTO dbo.Planes_Servicio (Codigo_Plan, Nombre_Plan, Tecnologia, Velocidad_Bajada_Mbps, Tarifa_Mensual_DOP, SLA_Garantizado_Horas)
VALUES 
('PLAN-FIBRA-100', 'Claro Fibra Óptica 100 Mbps', 'Fibra Óptica Residencial', 100, 1595.00, 8),
('PLAN-FIBRA-300', 'Claro Fibra Óptica 300 Mbps Premium', 'Fibra Óptica Residencial', 300, 2495.00, 4),
('PLAN-CORP-GIGA', 'Enlace Troncal Metro-Ethernet 1 Gbps', 'Fibra Óptica Dedicada', 1000, 12500.00, 2),
('PLAN-5G-ILIM', 'Móvil Corporativo 5G Ultra Ilimitado', 'Móvil 5G/LTE', 250, 2895.00, 4);
GO

-- ====================================================================================================
-- FASE 4: VISTA DE FISCALIZACIÓN & MONITOREO REGULATORIO INDOTEL
-- ====================================================================================================
PRINT '>>> FASE 4: Creando Vista Regulatoria vw_MonitorSLA_IncidenciasCriticas...';
GO

IF OBJECT_ID('dbo.vw_MonitorSLA_IncidenciasCriticas', 'V') IS NOT NULL DROP VIEW dbo.vw_MonitorSLA_IncidenciasCriticas;
GO

CREATE VIEW dbo.vw_MonitorSLA_IncidenciasCriticas
AS
SELECT 
    T.Codigo_Ticket AS NumeroIncidencia,
    C.Nombre_Completo AS Cliente,
    C.Provincia AS Sector,
    P.Nombre_Plan AS Servicio,
    CAST(DATEDIFF(MINUTE, T.Fecha_Apertura, ISNULL(T.Fecha_Cierre, GETDATE())) / 60.0 AS DECIMAL(8,2)) AS HorasInterrupcion,
    T.SLA_Compromiso_Horas AS SLA_Horas,
    CASE 
        WHEN CAST(DATEDIFF(MINUTE, T.Fecha_Apertura, ISNULL(T.Fecha_Cierre, GETDATE())) / 60.0 AS DECIMAL(8,2)) > T.SLA_Compromiso_Horas 
             THEN '🚨 VIOLACIÓN DE SLA (ALERTA INDOTEL)'
        WHEN CAST(DATEDIFF(MINUTE, T.Fecha_Apertura, ISNULL(T.Fecha_Cierre, GETDATE())) / 60.0 AS DECIMAL(8,2)) >= (T.SLA_Compromiso_Horas * 0.85) 
             THEN '⚠️ ALERTA: CONSUMO > 85% SLA'
        ELSE '🟢 DENTRO DE PARÁMETROS LEGALES'
    END AS EstadoCumplimiento,
    T.Prioridad,
    T.Estado_Ticket AS Estatus
FROM dbo.Tickets_Averias T
INNER JOIN dbo.Clientes C ON T.ID_Cliente = C.ID_Cliente
INNER JOIN dbo.Contratos CT ON C.ID_Cliente = CT.ID_Cliente
INNER JOIN dbo.Planes_Servicio P ON CT.ID_Plan = P.ID_Plan;
GO

-- ====================================================================================================
-- FASE 5: GENERADOR DE CARGA MASIVA AUTOMATIZADO (DATA SEEDER)
-- Inserta 250 Clientes Dominicanos Sintéticos, 250 Contratos y 1,000 Tickets con Fiscalización INDOTEL
-- ====================================================================================================
PRINT '>>> FASE 5: Ejecutando Generador de Carga Masiva (250 Clientes + 1,000 Tickets)...';

IF OBJECT_ID('tempdb..#Nombres') IS NOT NULL DROP TABLE #Nombres;
IF OBJECT_ID('tempdb..#Apellidos') IS NOT NULL DROP TABLE #Apellidos;
IF OBJECT_ID('tempdb..#Sectores') IS NOT NULL DROP TABLE #Sectores;

CREATE TABLE #Nombres (Nombre VARCHAR(50));
INSERT INTO #Nombres VALUES 
('Juan'), ('Pedro'), ('María'), ('Ana'), ('Carlos'), ('José'), ('Luis'), ('Rosa'), 
('Miguel'), ('Carmen'), ('Francisco'), ('Altagracia'), ('Manuel'), ('Juana'), ('Ramón'),
('Mercedes'), ('Rafael'), ('Esperanza'), ('Eduardo'), ('Yomaira'), ('Kelvin'), ('Patricia');

CREATE TABLE #Apellidos (Apellido VARCHAR(50));
INSERT INTO #Apellidos VALUES 
('Peña'), ('Rodríguez'), ('Pérez'), ('Gómez'), ('Martínez'), ('García'), ('Reyes'),
('Díaz'), ('Hernández'), ('Sánchez'), ('Ramírez'), ('Cruz'), ('Morales'), ('Fernández');

CREATE TABLE #Sectores (Sector VARCHAR(100), Provincia VARCHAR(50));
INSERT INTO #Sectores VALUES 
('Piantini', 'Distrito Nacional'), ('Bella Vista', 'Distrito Nacional'), ('Gazcue', 'Distrito Nacional'),
('Naco', 'Distrito Nacional'), ('Villa Mella', 'Santo Domingo Norte'), ('Herrera', 'Santo Domingo Oeste'),
('Alma Rosa I', 'Santo Domingo Este'), ('Cerros de Gurabo', 'Santiago'), ('Villa Olga', 'Santiago'),
('El Vedado', 'La Vega'), ('Centro Ciudad', 'San Cristóbal'), ('Bávaro', 'La Altagracia'),
('Punta Cana', 'La Altagracia'), ('Baní Centro', 'Peravia');

DECLARE @i INT = 1;
DECLARE @TotalClientes INT = 250;
DECLARE @RandomNombre VARCHAR(50), @RandomApellido VARCHAR(50), @NombreCompleto VARCHAR(120);
DECLARE @RandomSector VARCHAR(100), @RandomProvincia VARCHAR(50), @RandomSegmento VARCHAR(30);
DECLARE @CedulaSimulada VARCHAR(15), @TelefonoSimulado VARCHAR(15), @EmailSimulado VARCHAR(120);

WHILE @i <= @TotalClientes
BEGIN
    SELECT TOP 1 @RandomNombre = Nombre FROM #Nombres ORDER BY NEWID();
    SELECT TOP 1 @RandomApellido = Apellido FROM #Apellidos ORDER BY NEWID();
    SELECT TOP 1 @RandomSector = Sector, @RandomProvincia = Provincia FROM #Sectores ORDER BY NEWID();

    SET @NombreCompleto = @RandomNombre + ' ' + @RandomApellido;
    SET @CedulaSimulada = '001-' + RIGHT('0000000' + CAST(FLOOR(RAND() * 8999999 + 1000000) AS VARCHAR(10)), 7) + '-' + CAST(FLOOR(RAND() * 9 + 1) AS VARCHAR(1));
    SET @TelefonoSimulado = '809-' + RIGHT('000' + CAST(FLOOR(RAND() * 899 + 100) AS VARCHAR(5)), 3) + '-' + RIGHT('0000' + CAST(FLOOR(RAND() * 8999 + 1000) AS VARCHAR(6)), 4);
    SET @EmailSimulado = LOWER(REPLACE(@RandomNombre, ' ', '')) + '.' + LOWER(REPLACE(@RandomApellido, ' ', '')) + CAST(@i AS VARCHAR(5)) + '@claro.com.do';
    
    SET @RandomSegmento = CASE 
        WHEN @i % 7 = 0 THEN 'Corporativo VIP'
        WHEN @i % 4 = 0 THEN 'PYME Negocios'
        WHEN @i % 3 = 0 THEN 'Residencial Premium'
        ELSE 'Residencial Estándar'
    END;

    INSERT INTO dbo.Clientes (Nombre_Completo, Documento_Identidad, Telefono_Contacto, Correo_Electronico, Direccion_Instalacion, Provincia, Segmento_Cliente, Fecha_Registro)
    VALUES (
        @NombreCompleto, @CedulaSimulada, @TelefonoSimulado, @EmailSimulado,
        'Calle ' + CAST((@i * 3 + 12) AS VARCHAR(5)) + ' #' + CAST((@i + 5) AS VARCHAR(4)) + ', ' + @RandomSector,
        @RandomProvincia, @RandomSegmento, DATEADD(DAY, -FLOOR(RAND() * 730 + 30), GETDATE())
    );

    SET @i = @i + 1;
END;

-- Asignación de Contratos
INSERT INTO dbo.Contratos (ID_Cliente, ID_Plan, Numero_Contrato, Fecha_Firma, Estado_Contrato, Tarifa_Mensual, Direccion_IP_Asignada)
SELECT 
    C.ID_Cliente,
    (ABS(CHECKSUM(NEWID())) % 4) + 1,
    'CTR-CLARO-' + RIGHT('000000' + CAST(C.ID_Cliente AS VARCHAR(10)), 6),
    DATEADD(DAY, 2, C.Fecha_Registro),
    CASE WHEN C.ID_Cliente % 15 = 0 THEN 'Suspendido' ELSE 'Activo' END,
    CASE 
        WHEN C.Segmento_Cliente = 'Corporativo VIP' THEN 8500.00
        WHEN C.Segmento_Cliente = 'PYME Negocios' THEN 4200.00
        WHEN C.Segmento_Cliente = 'Residencial Premium' THEN 2895.00
        ELSE 1595.00
    END,
    '10.240.' + CAST(ABS(CHECKSUM(NEWID())) % 254 + 1 AS VARCHAR(3)) + '.' + CAST(ABS(CHECKSUM(NEWID())) % 254 + 1 AS VARCHAR(3))
FROM dbo.Clientes C
WHERE NOT EXISTS (SELECT 1 FROM dbo.Contratos X WHERE X.ID_Cliente = C.ID_Cliente);

-- Inserción de 1,000 Tickets
DECLARE @t INT = 1;
DECLARE @ClienteID INT, @FechaApertura DATETIME, @FechaCierre DATETIME;
DECLARE @DuracionHoras DECIMAL(8,2), @SLA_Target INT, @EstadoTicket VARCHAR(20), @Prioridad VARCHAR(20);
DECLARE @DescripAveria VARCHAR(200);

WHILE @t <= 1000
BEGIN
    SELECT TOP 1 @ClienteID = ID_Cliente FROM dbo.Clientes ORDER BY NEWID();
    
    SET @SLA_Target = CASE @t % 4 WHEN 0 THEN 4 WHEN 1 THEN 6 WHEN 2 THEN 12 ELSE 24 END;
    SET @DescripAveria = CASE @t % 4
        WHEN 0 THEN 'Corte de Fibra Óptica por Obra Civil'
        WHEN 1 THEN 'Falla de Potencia Óptica en OLT / Splitter'
        WHEN 2 THEN 'Pérdida de Sincronismo ONT / Módem'
        ELSE 'Degradación de Latencia y Jitter en Troncal'
    END;

    SET @FechaApertura = DATEADD(MINUTE, -FLOOR(RAND() * 259200), GETDATE());

    IF @t % 10 = 0
    BEGIN
        SET @EstadoTicket = 'Abierto';
        SET @FechaCierre = NULL;
        SET @DuracionHoras = CAST(DATEDIFF(MINUTE, @FechaApertura, GETDATE()) / 60.0 AS DECIMAL(8,2));
    END
    ELSE IF @t % 12 = 0
    BEGIN
        SET @EstadoTicket = 'En Ruta';
        SET @FechaCierre = NULL;
        SET @DuracionHoras = CAST(DATEDIFF(MINUTE, @FechaApertura, GETDATE()) / 60.0 AS DECIMAL(8,2));
    END
    ELSE
    BEGIN
        SET @EstadoTicket = 'Resuelto';
        SET @DuracionHoras = CAST((RAND() * 28.0 + 0.5) AS DECIMAL(8,2));
        SET @FechaCierre = DATEADD(MINUTE, CAST(@DuracionHoras * 60 AS INT), @FechaApertura);
    END;

    SET @Prioridad = CASE 
        WHEN @t % 7 = 0 THEN 'Critica'
        WHEN @t % 3 = 0 THEN 'Alta'
        WHEN @t % 2 = 0 THEN 'Media'
        ELSE 'Baja'
    END;

    INSERT INTO dbo.Tickets_Averias (
        Codigo_Ticket, ID_Cliente, Categoria_Incidencia, Descripcion_Falla, 
        Prioridad, Estado_Ticket, Fecha_Apertura, Fecha_Cierre, 
        Tiempo_Resolucion_Horas, SLA_Compromiso_Horas, Tecnico_Asignado
    ) VALUES (
        'TK-SQL-' + RIGHT('000000' + CAST(@t AS VARCHAR(10)), 6),
        @ClienteID, 'Telecomunicaciones', @DescripAveria, @Prioridad, @EstadoTicket,
        @FechaApertura, @FechaCierre, @DuracionHoras, @SLA_Target,
        'Cuadrilla Técnica #' + CAST((@t % 18 + 1) AS VARCHAR(3))
    );

    SET @t = @t + 1;
END;

-- Fiscalizaciones Regulatorias INDOTEL
INSERT INTO dbo.Auditoria_Regulatoria_INDOTEL (
    ID_Ticket, Codigo_Resolucion, Fecha_Fiscalizacion,
    SLA_Normativo_Horas, SLA_Real_Horas, Veredicto_Regulatorio,
    Monto_Penalidad_DOP, Inspector_Asignado, Estado_Expediente
)
SELECT 
    T.ID_Ticket,
    'RES-INDOTEL-' + FORMAT(T.Fecha_Apertura, 'yyyyMM') + '-' + RIGHT('0000' + CAST(T.ID_Ticket AS VARCHAR(10)), 5),
    DATEADD(DAY, 1, ISNULL(T.Fecha_Cierre, GETDATE())),
    T.SLA_Compromiso_Horas,
    T.Tiempo_Resolucion_Horas,
    CASE WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 'VIOLACION_REINCIDENTE' ELSE 'CUMPLIMIENTO_OPTIMO' END,
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > (T.SLA_Compromiso_Horas * 2) THEN 75000.00
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 25000.00
        ELSE 0.00
    END,
    'Inspector INDOTEL Ing. Juancito Peña',
    CASE WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 'En Proceso Sancionador' ELSE 'Archivado Conforme' END
FROM dbo.Tickets_Averias T
WHERE T.Tiempo_Resolucion_Horas > (T.SLA_Compromiso_Horas * 0.9)
  AND NOT EXISTS (SELECT 1 FROM dbo.Auditoria_Regulatoria_INDOTEL A WHERE A.ID_Ticket = T.ID_Ticket);

DROP TABLE #Nombres;
DROP TABLE #Apellidos;
DROP TABLE #Sectores;

PRINT '====================================================================================================';
PRINT '>>> CARGA MASIVA Y AUDITORÍAS COMPLETADAS CON ÉXITO:';
SELECT 'Clientes Totales' AS Entidad, COUNT(*) AS Total FROM dbo.Clientes
UNION ALL
SELECT 'Contratos Activos', COUNT(*) FROM dbo.Contratos
UNION ALL
SELECT 'Tickets de Incidencias', COUNT(*) FROM dbo.Tickets_Averias
UNION ALL
SELECT 'Expedientes INDOTEL Fiscalizados', COUNT(*) FROM dbo.Auditoria_Regulatoria_INDOTEL;
PRINT '====================================================================================================';
GO

-- ====================================================================================================
-- FASE 6: LABORATORIO DE 30 CONSULTAS PRÁCTICAS COMENTADAS
-- (15 Consultas Básicas + 15 Consultas Avanzadas listas para sombreado y ejecución en SSMS)
-- ====================================================================================================

-- ----------------------------------------------------------------------------------------------------
-- BLOQUE A: 15 CONSULTAS BÁSICAS FUNDAMENTALES
-- ----------------------------------------------------------------------------------------------------

-- Consulta 1: Catálogo de Clientes con Formato de Negocio
SELECT C.ID_Cliente AS [Código], C.Nombre_Completo AS [Cliente], C.Telefono_Contacto AS [Teléfono], C.Provincia AS [Ubicación], C.Segmento_Cliente AS [Segmento]
FROM dbo.Clientes C ORDER BY C.Nombre_Completo ASC;

-- Consulta 2: Tickets Críticos Abiertos en la Red
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Prioridad, T.Estado_Ticket, T.Fecha_Apertura
FROM dbo.Tickets_Averias T WHERE T.Prioridad = 'Critica' AND T.Estado_Ticket = 'Abierto'
ORDER BY T.Fecha_Apertura DESC;

-- Consulta 3: Búsqueda de Clientes en Sectores Clave (LIKE)
SELECT C.Nombre_Completo, C.Direccion_Instalacion, C.Provincia
FROM dbo.Clientes C WHERE C.Direccion_Instalacion LIKE '%Piantini%' OR C.Direccion_Instalacion LIKE '%Bella Vista%'
ORDER BY C.Provincia;

-- Consulta 4: Tickets Reportados en los Últimos 30 Días (BETWEEN)
SELECT T.Codigo_Ticket, T.Fecha_Apertura, T.Categoria_Incidencia, T.Tecnico_Asignado
FROM dbo.Tickets_Averias T WHERE T.Fecha_Apertura BETWEEN DATEADD(DAY, -30, GETDATE()) AND GETDATE()
ORDER BY T.Fecha_Apertura ASC;

-- Consulta 5: Abonados en los Principales Polos de Telecomunicaciones (IN)
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Segmento_Cliente
FROM dbo.Clientes C WHERE C.Provincia IN ('Distrito Nacional', 'Santiago', 'La Altagracia')
ORDER BY C.Provincia, C.Nombre_Completo;

-- Consulta 6: Detección de Tickets Sin Fecha de Cierre (IS NULL)
SELECT T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket
FROM dbo.Tickets_Averias T WHERE T.Fecha_Cierre IS NULL;

-- Consulta 7: Ordenamiento Compuesto por Prioridad y Retraso
SELECT T.Codigo_Ticket, T.Prioridad, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas
FROM dbo.Tickets_Averias T
ORDER BY CASE T.Prioridad WHEN 'Critica' THEN 1 WHEN 'Alta' THEN 2 WHEN 'Media' THEN 3 ELSE 4 END ASC, T.Tiempo_Resolucion_Horas DESC;

-- Consulta 8: Paginación Eficiente (Página 1: primeros 10 registros con OFFSET & FETCH)
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Fecha_Registro
FROM dbo.Clientes C ORDER BY C.ID_Cliente ASC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;

-- Consulta 9: Métrica Global de Reportes y Usuarios Únicos Afectados
SELECT COUNT(*) AS [Total Reportes], COUNT(DISTINCT T.ID_Cliente) AS [Clientes Únicos Afectados]
FROM dbo.Tickets_Averias T;

-- Consulta 10: Facturación Mensual Recurrente por Segmento Comercial
SELECT C.Segmento_Cliente, COUNT(CT.ID_Contrato) AS [Total Contratos], SUM(CT.Tarifa_Mensual) AS [Facturación Total Mensual DOP]
FROM dbo.Clientes C INNER JOIN dbo.Contratos CT ON C.ID_Cliente = CT.ID_Cliente
WHERE CT.Estado_Contrato = 'Activo'
GROUP BY C.Segmento_Cliente ORDER BY [Facturación Total Mensual DOP] DESC;

-- Consulta 11: Promedio, Mínimo y Máximo de Resolución de Averías
SELECT ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS [Promedio Horas], MIN(T.Tiempo_Resolucion_Horas) AS [Resolución Más Rápida], MAX(T.Tiempo_Resolucion_Horas) AS [Resolución Más Lenta]
FROM dbo.Tickets_Averias T WHERE T.Estado_Ticket = 'Resuelto';

-- Consulta 12: Provincias con Tiempos Promedio de Falla Excesivos (HAVING > 10 Horas)
SELECT C.Provincia, COUNT(T.ID_Ticket) AS [Total Averías], ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS [Promedio Horas]
FROM dbo.Clientes C INNER JOIN dbo.Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia HAVING AVG(T.Tiempo_Resolucion_Horas) > 10.0
ORDER BY [Promedio Horas] DESC;

-- Consulta 13: Ticket Enriquecido con Datos de Contacto para Despacho Técnico (INNER JOIN)
SELECT T.Codigo_Ticket, C.Nombre_Completo, C.Telefono_Contacto, C.Direccion_Instalacion, T.Descripcion_Falla
FROM dbo.Tickets_Averias T INNER JOIN dbo.Clientes C ON T.ID_Cliente = C.ID_Cliente
WHERE T.Estado_Ticket IN ('Abierto', 'En Ruta');

-- Consulta 14: Clientes Satisfechos Sin Averías Reportadas (LEFT JOIN / Anti-Join)
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Provincia
FROM dbo.Clientes C LEFT JOIN dbo.Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE T.ID_Ticket IS NULL;

-- Consulta 15: Catálogo Consolidado de Tipos de Fallas Únicas (DISTINCT)
SELECT DISTINCT T.Categoria_Incidencia, T.Descripcion_Falla
FROM dbo.Tickets_Averias T ORDER BY T.Categoria_Incidencia, T.Descripcion_Falla;

-- ----------------------------------------------------------------------------------------------------
-- BLOQUE B: 15 CONSULTAS AVANZADAS & ANALÍTICAS DE NEGOCIO
-- ----------------------------------------------------------------------------------------------------

-- Consulta Avanzada 1: Última Incidencia por Cada Cliente (ROW_NUMBER & PARTITION BY)
WITH HistorialNumerado AS (
    SELECT T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket, T.Descripcion_Falla,
           ROW_NUMBER() OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura DESC) AS FilaSecuencial
    FROM dbo.Tickets_Averias T
)
SELECT C.Nombre_Completo AS [Cliente], H.Codigo_Ticket, H.Fecha_Apertura, H.Estado_Ticket, H.Descripcion_Falla
FROM HistorialNumerado H INNER JOIN dbo.Clientes C ON H.ID_Cliente = C.ID_Cliente
WHERE H.FilaSecuencial = 1;

-- Consulta Avanzada 2: Ranking de Cuadrillas Técnicas por Velocidad de Solución (DENSE_RANK)
SELECT T.Tecnico_Asignado, COUNT(T.ID_Ticket) AS [Casos Resueltos], ROUND(AVG(T.Tiempo_Resolucion_Horas), 2) AS [Promedio Horas],
       DENSE_RANK() OVER(ORDER BY AVG(T.Tiempo_Resolucion_Horas) ASC) AS [Posición Eficiencia]
FROM dbo.Tickets_Averias T WHERE T.Estado_Ticket = 'Resuelto'
GROUP BY T.Tecnico_Asignado HAVING COUNT(T.ID_Ticket) >= 5;

-- Consulta Avanzada 3: Detección de Averías Reincidentes (Intervalo en Días con LAG)
SELECT T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
       LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS FechaTicketAnterior,
       DATEDIFF(DAY, LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC), T.Fecha_Apertura) AS [Días Desde Falla Previa]
FROM dbo.Tickets_Averias T ORDER BY T.ID_Cliente, T.Fecha_Apertura;

-- Consulta Avanzada 4: Pipeline Modular CTE de Auditoría Regulatoria INDOTEL
WITH CasosEnInfraccion AS (
    SELECT T.ID_Ticket, T.Codigo_Ticket, T.ID_Cliente, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
           (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS ExcesoHoras
    FROM dbo.Tickets_Averias T WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
),
PenalizacionesCalculadas AS (
    SELECT C.*, CASE WHEN C.ExcesoHoras > 24 THEN 75000.00 WHEN C.ExcesoHoras > 8 THEN 40000.00 ELSE 15000.00 END AS MultaEstimadaDOP
    FROM CasosEnInfraccion C
)
SELECT CLI.Nombre_Completo, CLI.Provincia, P.Codigo_Ticket, P.Tiempo_Resolucion_Horas AS [Duración Real],
       P.SLA_Compromiso_Horas AS [SLA Meta], P.ExcesoHoras AS [Horas Fuera de Norma], P.MultaEstimadaDOP AS [Sanción INDOTEL]
FROM PenalizacionesCalculadas P INNER JOIN dbo.Clientes CLI ON P.ID_Cliente = CLI.ID_Cliente
ORDER BY P.MultaEstimadaDOP DESC, P.ExcesoHoras DESC;

-- Consulta Avanzada 5: Semáforo Dinámico de Riesgo Operativo SLA (CASE)
SELECT T.Codigo_Ticket, T.Tecnico_Asignado, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN '🚨 VIOLACIÓN CRÍTICA'
        WHEN T.Tiempo_Resolucion_Horas >= (T.SLA_Compromiso_Horas * 0.85) THEN '⚠️ ALERTA CONSUMO > 85%'
        ELSE '🟢 RENDIMIENTO ÓPTIMO'
    END AS [Estado Semáforo SLA]
FROM dbo.Tickets_Averias T ORDER BY T.Tiempo_Resolucion_Horas DESC;

-- Consulta Avanzada 6: Pivoteo Matricial de Severidades por Provincia (SUM CASE Pivot)
SELECT C.Provincia, COUNT(T.ID_Ticket) AS [Total General],
       SUM(CASE WHEN T.Prioridad = 'Critica' THEN 1 ELSE 0 END) AS [Críticas],
       SUM(CASE WHEN T.Prioridad = 'Alta' THEN 1 ELSE 0 END) AS [Altas],
       SUM(CASE WHEN T.Prioridad = 'Media' THEN 1 ELSE 0 END) AS [Medias]
FROM dbo.Clientes C INNER JOIN dbo.Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia ORDER BY [Críticas] DESC;

-- Consulta Avanzada 7: Subconsulta Correlacionada de Tasa de Impacto Provincial
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia,
    (SELECT COUNT(*) FROM dbo.Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS [Tickets Cliente],
    ROUND(CAST((SELECT COUNT(*) FROM dbo.Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS FLOAT) /
          NULLIF((SELECT COUNT(*) FROM dbo.Tickets_Averias T2 INNER JOIN dbo.Clientes C2 ON T2.ID_Cliente = C2.ID_Cliente WHERE C2.Provincia = C.Provincia), 0) * 100, 2) AS [% Impacto en Provincia]
FROM dbo.Clientes C
WHERE EXISTS (SELECT 1 FROM dbo.Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente)
ORDER BY [% Impacto en Provincia] DESC;

-- Consulta Avanzada 8: Clientes Corporativos VIP con Violaciones Reincidentes (EXISTS)
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Telefono_Contacto
FROM dbo.Clientes C
WHERE C.Segmento_Cliente = 'Corporativo VIP'
  AND EXISTS (
      SELECT 1 FROM dbo.Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente AND T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
      GROUP BY T.ID_Cliente HAVING COUNT(*) >= 2
  );

-- Consulta Avanzada 9: Subtotales Jerárquicos y Gran Total General (GROUP BY ROLLUP)
SELECT COALESCE(C.Provincia, '=== TODAS LAS PROVINCIAS ===') AS Provincia,
       COALESCE(C.Segmento_Cliente, '--- SUBTOTAL SEGMENTO ---') AS Segmento,
       COUNT(CT.ID_Contrato) AS [Total Contratos], SUM(CT.Tarifa_Mensual) AS [Facturación Total DOP]
FROM dbo.Clientes C INNER JOIN dbo.Contratos CT ON C.ID_Cliente = CT.ID_Cliente
GROUP BY ROLLUP (C.Provincia, C.Segmento_Cliente);

-- Consulta Avanzada 10: Acumulado Móvil de Penalidades INDOTEL (Running Total)
SELECT A.ID_Auditoria, A.Fecha_Fiscalizacion, A.Monto_Penalidad_DOP,
       SUM(A.Monto_Penalidad_DOP) OVER(ORDER BY A.Fecha_Fiscalizacion ASC, A.ID_Auditoria ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS [Penalidad Acumulada Progresiva DOP]
FROM dbo.Auditoria_Regulatoria_INDOTEL A WHERE A.Monto_Penalidad_DOP > 0;

-- Consulta Avanzada 11: Desviación de Tiempo Frente a la Media de la Categoría (OVER AVG)
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Tiempo_Resolucion_Horas AS [Duración],
       ROUND(AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla), 2) AS [Media Categoría],
       ROUND(T.Tiempo_Resolucion_Horas - AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla), 2) AS [Desviación vs Media]
FROM dbo.Tickets_Averias T ORDER BY [Desviación vs Media] DESC;

-- Consulta Avanzada 12: Trazabilidad de Primer y Último Estado de Asignación (FIRST_VALUE / LAST_VALUE)
SELECT T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
       FIRST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS [Primer Técnico Asignado],
       LAST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS [Último Técnico Asignado]
FROM dbo.Tickets_Averias T;

-- Consulta Avanzada 13: Clasificación No-EquiJoin de Tramos de Infracción INDOTEL
WITH EscalaMultas AS (
    SELECT 'Leve' AS Tramo, 0.01 AS MinH, 4.00 AS MaxH, 10000.00 AS Tarifa UNION ALL
    SELECT 'Grave', 4.01, 12.00, 35000.00 UNION ALL
    SELECT 'Muy Grave', 12.01, 999.00, 85000.00
)
SELECT T.Codigo_Ticket, (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS ExcesoHoras, M.Tramo, M.Tarifa AS [Tarifa Normativa Aplicable DOP]
FROM dbo.Tickets_Averias T
INNER JOIN EscalaMultas M ON (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) BETWEEN M.MinH AND M.MaxH
WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas;

-- Consulta Avanzada 14: Verificación Cruzada de Integridad Referencial (FULL OUTER JOIN)
SELECT COALESCE(C.ID_Cliente, T.ID_Cliente) AS [ID Evaluado],
    CASE 
        WHEN C.ID_Cliente IS NULL THEN 'ALERTA: Ticket sin cliente registrado'
        WHEN T.ID_Ticket IS NULL THEN 'Cliente activo sin historial de averías'
        ELSE 'Relación Íntegra Validada'
    END AS [Estado Consistencia]
FROM dbo.Clientes C FULL OUTER JOIN dbo.Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE C.ID_Cliente IS NULL OR T.ID_Ticket IS NULL;

-- Consulta Avanzada 15: Scoring Predictivo de Riesgo INDOTEL (0 a 100)
WITH AnalisisCliente AS (
    SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente,
           COUNT(T.ID_Ticket) AS TotalTickets,
           SUM(CASE WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 1 ELSE 0 END) AS ViolacionesSLA
    FROM dbo.Clientes C INNER JOIN dbo.Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
    GROUP BY C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente
)
SELECT A.ID_Cliente, A.Nombre_Completo, A.Segmento_Cliente, A.TotalTickets, A.ViolacionesSLA,
       ROUND((A.ViolacionesSLA * 30.0) + (A.TotalTickets * 5.0) + (CASE WHEN A.Segmento_Cliente = 'Corporativo VIP' THEN 25.0 ELSE 10.0 END), 1) AS [Score Riesgo Fiscalización (0-100)],
       CASE 
           WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 70 THEN '🔴 ALTO RIESGO DE SANCIÓN INDOTEL'
           WHEN (A.ViolacionesSLA * 30.0 + A.TotalTickets * 5.0) >= 40 THEN '🟡 RIESGO MODERADO'
           ELSE '🟢 BAJO RIESGO'
       END AS [Clasificación de Riesgo]
FROM AnalisisCliente A ORDER BY [Score Riesgo Fiscalización (0-100)] DESC;
GO

PRINT '>>> SCRIPT MAESTRO SQL SERVER EJECUTADO CON ÉXITO TOTAL.';
