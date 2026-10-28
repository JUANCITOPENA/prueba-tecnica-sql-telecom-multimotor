-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - MASTERCLASS MULTI-MOTOR
-- SCRIPT ADICIONAL: GENERADOR DE CARGA MASIVA DE DATOS SINTÉTICOS (DATA SEEDER)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
-- PROPÓSITO: Poblar la base de datos con cientos de registros relacionales para prácticas de analítica
--            avanzada, estrés de índices, análisis de planes de ejecución y auditorías INDOTEL.
-- ====================================================================================================

-- 1. SELECCIÓN DE BASE DE DATOS (Asegúrate de haber ejecutado antes el script base DDL)
-- USE Claro_Telecom_Audit;
-- GO

PRINT '>>> INICIANDO PIPELINE DE CARGA MASIVA RELACIONAL...';
SET NOCOUNT ON;

-- ----------------------------------------------------------------------------------------------------
-- A. TABLA TEMPORAL CON SEMILLAS DE CLIENTES DOMINICANOS REALISTAS
-- ----------------------------------------------------------------------------------------------------
IF OBJECT_ID('tempdb..#Nombres') IS NOT NULL DROP TABLE #Nombres;
IF OBJECT_ID('tempdb..#Apellidos') IS NOT NULL DROP TABLE #Apellidos;
IF OBJECT_ID('tempdb..#Sectores') IS NOT NULL DROP TABLE #Sectores;

CREATE TABLE #Nombres (Nombre VARCHAR(50));
INSERT INTO #Nombres VALUES 
('Juan'), ('Pedro'), ('María'), ('Ana'), ('Carlos'), ('José'), ('Luis'), ('Rosa'), 
('Miguel'), ('Carmen'), ('Francisco'), ('Altagracia'), ('Manuel'), ('Juana'), ('Ramón'),
('Mercedes'), ('Rafael'), ('Esperanza'), ('Eduardo'), ('Yomaira'), ('Kelvin'), ('Patricia'),
('Ángel'), ('Yudelka'), ('Héctor'), ('Deyanira'), ('Alejandro'), ('Gissel'), ('Roberto');

CREATE TABLE #Apellidos (Apellido VARCHAR(50));
INSERT INTO #Apellidos VALUES 
('Peña'), ('Rodríguez'), ('Pérez'), ('Gómez'), ('Martínez'), ('García'), ('Reyes'),
('Díaz'), ('Hernández'), ('Sánchez'), ('Ramírez'), ('Cruz'), ('Morales'), ('Fernández'),
('Jiménez'), ('Rosario'), ('Castillo'), ('Vargas'), ('Batista'), ('De la Cruz'), ('Mejía');

CREATE TABLE #Sectores (Sector VARCHAR(100), Provincia VARCHAR(50), TipoZona VARCHAR(30));
INSERT INTO #Sectores VALUES 
('Piantini', 'Distrito Nacional', 'Urbana VIP'),
('Bella Vista', 'Distrito Nacional', 'Urbana Residencial'),
('Gazcue', 'Distrito Nacional', 'Urbana Histórica'),
('Naco', 'Distrito Nacional', 'Urbana VIP'),
('Ensanche La Fe', 'Distrito Nacional', 'Urbana Comercial'),
('Villa Mella', 'Santo Domingo Norte', 'Sub-Urbana'),
('Herrera', 'Santo Domingo Oeste', 'Industrial / Comercial'),
('Alma Rosa I', 'Santo Domingo Este', 'Urbana Residencial'),
('Los Mina', 'Santo Domingo Este', 'Urbana Alta Densidad'),
('Cerros de Gurabo', 'Santiago', 'Urbana VIP'),
('Villa Olga', 'Santiago', 'Urbana Residencial'),
('Cienfuegos', 'Santiago', 'Sub-Urbana'),
('El Vedado', 'La Vega', 'Urbana Residencial'),
('Centro Ciudad', 'San Cristóbal', 'Comercial'),
('Bávaro', 'La Altagracia', 'Turística / Comercial'),
('Punta Cana', 'La Altagracia', 'Turística VIP'),
('La Romana Centro', 'La Romana', 'Comercial / Portuaria'),
('San Pedro Centro', 'San Pedro de Macorís', 'Industrial'),
('Puerto Plata Malecón', 'Puerto Plata', 'Turística'),
('Baní Centro', 'Peravia', 'Agro-Industrial');

-- ----------------------------------------------------------------------------------------------------
-- B. INSERCIÓN MASIVA DE CLIENTES (250 CLIENTES ADICIONALES)
-- ----------------------------------------------------------------------------------------------------
PRINT '>>> 1/4 Insertando 250 Clientes con Cédulas y Segmentos Válidos...';

DECLARE @i INT = 1;
DECLARE @TotalClientes INT = 250;
DECLARE @RandomNombre VARCHAR(50), @RandomApellido VARCHAR(50), @NombreCompleto VARCHAR(120);
DECLARE @RandomSector VARCHAR(100), @RandomProvincia VARCHAR(50), @RandomSegmento VARCHAR(20);
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

    INSERT INTO Clientes (Nombre_Completo, Documento_Identidad, Telefono_Contacto, Correo_Electronico, Direccion_Instalacion, Provincia, Segmento_Cliente, Fecha_Registro)
    VALUES (
        @NombreCompleto,
        @CedulaSimulada,
        @TelefonoSimulado,
        @EmailSimulado,
        'Calle ' + CAST((@i * 3 + 12) AS VARCHAR(5)) + ' #' + CAST((@i + 5) AS VARCHAR(4)) + ', ' + @RandomSector,
        @RandomProvincia,
        @RandomSegmento,
        DATEADD(DAY, -FLOOR(RAND() * 730 + 30), GETDATE())
    );

    SET @i = @i + 1;
END;

-- ----------------------------------------------------------------------------------------------------
-- C. ASIGNACIÓN MASIVA DE CONTRATOS Y PLANES (FIBRA, MÓVIL, CORPORATIVO)
-- ----------------------------------------------------------------------------------------------------
PRINT '>>> 2/4 Creando Contratos Activos y Planes de Servicio...';

INSERT INTO Contratos (ID_Cliente, ID_Plan, Numero_Contrato, Fecha_Firma, Estado_Contrato, Tarifa_Mensual, Direccion_IP_Asignada)
SELECT 
    C.ID_Cliente,
    (ABS(CHECKSUM(NEWID())) % 4) + 1 AS ID_Plan,
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
FROM Clientes C
WHERE NOT EXISTS (SELECT 1 FROM Contratos X WHERE X.ID_Cliente = C.ID_Cliente);

-- ----------------------------------------------------------------------------------------------------
-- D. GENERACIÓN DE 1,000 TICKETS DE AVERÍA / INCIDENCIAS DE RED
-- ----------------------------------------------------------------------------------------------------
PRINT '>>> 3/4 Generando 1,000 Tickets con Tiempos de Solución y Severidades Variadas...';

IF OBJECT_ID('tempdb..#TiposAveria') IS NOT NULL DROP TABLE #TiposAveria;
CREATE TABLE #TiposAveria (ID INT IDENTITY(1,1), Descripcion VARCHAR(150), Categoria VARCHAR(50), SLA_Horas_Base INT);
INSERT INTO #TiposAveria VALUES 
('Corte de Fibra Óptica por Obra Civil', 'Infraestructura', 4),
('Falla de Potencia Óptica en OLT / Splitter', 'Red Acceso', 6),
('Pérdida de Sincronismo ONT / Módem', 'Equipos CPE', 12),
('Degradación de Latencia y Jitter en Enlace Troncal', 'Core IP / MPLS', 4),
('Bloqueo de Puertos por Ataque DDoS detectado', 'Ciberseguridad', 2),
('Falla de Energía en Radiobase Celular', 'Móvil 5G/LTE', 3),
('Intermitencia de Señal en Zona Residencial', 'Acceso Inalámbrico', 8),
('Reemplazo de Router Wi-Fi 6 averiado', 'Soporte Domiciliario', 24);

DECLARE @t INT = 1;
DECLARE @TotalTickets INT = 1000;
DECLARE @ClienteID INT, @TipoAveriaID INT, @FechaApertura DATETIME, @FechaCierre DATETIME;
DECLARE @DuracionHoras DECIMAL(8,2), @SLA_Target INT, @EstadoTicket VARCHAR(20), @Prioridad VARCHAR(20);
DECLARE @DescripAveria VARCHAR(200);

WHILE @t <= @TotalTickets
BEGIN
    SELECT TOP 1 @ClienteID = ID_Cliente FROM Clientes ORDER BY NEWID();
    SELECT TOP 1 @TipoAveriaID = ID, @DescripAveria = Descripcion, @SLA_Target = SLA_Horas_Base FROM #TiposAveria ORDER BY NEWID();
    
    -- Fecha de apertura en los últimos 180 días
    SET @FechaApertura = DATEADD(MINUTE, -FLOOR(RAND() * 259200), GETDATE());

    -- Estado del ticket y tiempos simulados
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
        -- Duración aleatoria entre 0.5 y 48 horas (algunos violarán SLA para INDOTEL)
        SET @DuracionHoras = CAST((RAND() * 28.0 + 0.5) AS DECIMAL(8,2));
        SET @FechaCierre = DATEADD(MINUTE, CAST(@DuracionHoras * 60 AS INT), @FechaApertura);
    END;

    SET @Prioridad = CASE 
        WHEN @t % 7 = 0 THEN 'Critica'
        WHEN @t % 3 = 0 THEN 'Alta'
        WHEN @t % 2 = 0 THEN 'Media'
        ELSE 'Baja'
    END;

    INSERT INTO Tickets_Averias (
        Codigo_Ticket, 
        ID_Cliente, 
        Categoria_Incidencia, 
        Descripcion_Falla, 
        Prioridad, 
        Estado_Ticket, 
        Fecha_Apertura, 
        Fecha_Cierre, 
        Tiempo_Resolucion_Horas, 
        SLA_Compromiso_Horas,
        Tecnico_Asignado
    )
    VALUES (
        'TK-MAS-' + RIGHT('000000' + CAST(@t AS VARCHAR(10)), 6),
        @ClienteID,
        'Telecomunicaciones',
        @DescripAveria,
        @Prioridad,
        @EstadoTicket,
        @FechaApertura,
        @FechaCierre,
        @DuracionHoras,
        @SLA_Target,
        'Técnico Cuadrilla #' + CAST((@t % 18 + 1) AS VARCHAR(3))
    );

    SET @t = @t + 1;
END;

-- ----------------------------------------------------------------------------------------------------
-- E. POBLAR AUDITORÍAS REGULATORIAS INDOTEL
-- ----------------------------------------------------------------------------------------------------
PRINT '>>> 4/4 Evaluando y Registrando Auditorías INDOTEL para Violaciones de SLA...';

INSERT INTO Auditoria_Regulatoria_INDOTEL (
    ID_Ticket,
    Codigo_Resolucion,
    Fecha_Fiscalizacion,
    SLA_Normativo_Horas,
    SLA_Real_Horas,
    Veredicto_Regulatorio,
    Monto_Penalidad_DOP,
    Inspector_Asignado,
    Estado_Expediente
)
SELECT 
    T.ID_Ticket,
    'RES-INDOTEL-' + FORMAT(T.Fecha_Apertura, 'yyyyMM') + '-' + RIGHT('0000' + CAST(T.ID_Ticket AS VARCHAR(10)), 5),
    DATEADD(DAY, 1, COALESCE(T.Fecha_Cierre, GETDATE())),
    T.SLA_Compromiso_Horas,
    T.Tiempo_Resolucion_Horas,
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 'VIOLACION_REINCIDENTE'
        ELSE 'CUMPLIMIENTO_OPTIMO'
    END,
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > (T.SLA_Compromiso_Horas * 2) THEN 75000.00
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 25000.00
        ELSE 0.00
    END,
    'Inspector INDOTEL Lic. ' + (SELECT TOP 1 Nombre + ' ' + Apellido FROM #Nombres, #Apellidos ORDER BY NEWID()),
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 'En Proceso Sancionador'
        ELSE 'Archivado Conforme'
    END
FROM Tickets_Averias T
WHERE T.Tiempo_Resolucion_Horas > (T.SLA_Compromiso_Horas * 0.9) -- Auditar los críticos o que rozan límite
  AND NOT EXISTS (SELECT 1 FROM Auditoria_Regulatoria_INDOTEL A WHERE A.ID_Ticket = T.ID_Ticket);

-- Limpieza de temporales
DROP TABLE #Nombres;
DROP TABLE #Apellidos;
DROP TABLE #Sectores;
DROP TABLE #TiposAveria;

PRINT '====================================================================================================';
PRINT '>>> PIPELINE DE CARGA MASIVA FINALIZADO CON ÉXITO:';
SELECT 'Clientes Totales' AS Entidad, COUNT(*) AS Total FROM Clientes
UNION ALL
SELECT 'Contratos Activos', COUNT(*) FROM Contratos
UNION ALL
SELECT 'Tickets de Incidencias', COUNT(*) FROM Tickets_Averias
UNION ALL
SELECT 'Expedientes INDOTEL', COUNT(*) FROM Auditoria_Regulatoria_INDOTEL;
PRINT '====================================================================================================';
GO
