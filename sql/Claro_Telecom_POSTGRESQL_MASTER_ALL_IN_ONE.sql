-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - MASTERCLASS SQL MULTI-MOTOR
-- SCRIPT MAESTRO 100% COMPLETO (TODO-EN-UNO): POSTGRESQL (PL/pgSQL)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com | SANTO DOMINGO, REPÚBLICA DOMINICANA
-- ====================================================================================================
-- ESTRUCTURA DEL ENTREGABLE:
--   FASE 1: Configuración de Esquema y Entorno PostgreSQL (public / claro_ops)
--   FASE 2: Esquema Relacional DDL (Tablas, Claves Primarias, Foráneas & Restricciones)
--   FASE 3: Inserción de Datos Iniciales y Catálogos Semilla
--   FASE 4: Creación de la Vista de Monitoreo & Auditoría Regulatoria INDOTEL
--   FASE 5: Generador de Carga Masiva Automatizado (Data Seeder: 250 Clientes + 1,000 Tickets)
--   FASE 6: Laboratorio de 30 Consultas Prácticas Comentadas (15 Básicas + 15 Avanzadas)
-- ====================================================================================================

-- ====================================================================================================
-- FASE 1, 2, 3 Y 4: DDL, ESQUEMA RELACIONAL Y VISTA REGULATORIA INDOTEL
-- ====================================================================================================
-- ============================================================================
-- MOTOR: POSTGRESQL 14+ / 16+
-- ESQUEMA COMPLETO: GESTIÓN DE AVERÍAS CLARO DOMINICANA
-- ============================================================================
DROP TABLE IF EXISTS tickets_averias CASCADE;
DROP TABLE IF EXISTS nodos_distribucion CASCADE;
DROP TABLE IF EXISTS clientes_telecom CASCADE;
DROP TABLE IF EXISTS tipos_servicios CASCADE;

CREATE TABLE tipos_servicios (
    servicio_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo_servicio VARCHAR(20) NOT NULL UNIQUE,
    descripcion VARCHAR(100) NOT NULL,
    sla_estandar_horas INT NOT NULL
);

CREATE TABLE clientes_telecom (
    cliente_id INT GENERATED ALWAYS AS IDENTITY (START WITH 100000) PRIMARY KEY,
    identificacion VARCHAR(15) NOT NULL UNIQUE,
    nombre_completo VARCHAR(150) NOT NULL,
    telefono_contacto VARCHAR(15) NOT NULL,
    provincia VARCHAR(50) NOT NULL,
    municipio VARCHAR(50) NOT NULL,
    fecha_alta TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE nodos_distribucion (
    nodo_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    codigo_nodo VARCHAR(30) NOT NULL UNIQUE,
    sector VARCHAR(80) NOT NULL,
    tecnologia VARCHAR(30) NOT NULL
);

CREATE TABLE tickets_averias (
    ticket_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    numero_incidencia VARCHAR(30) GENERATED ALWAYS AS ('TK-' || ticket_id::TEXT) STORED,
    cliente_id INT NOT NULL REFERENCES clientes_telecom(cliente_id),
    servicio_id INT NOT NULL REFERENCES tipos_servicios(servicio_id),
    nodo_id INT NOT NULL REFERENCES nodos_distribucion(nodo_id),
    tipo_reclamo VARCHAR(50) NOT NULL,
    prioridad VARCHAR(15) NOT NULL CHECK (prioridad IN ('Baja', 'Media', 'Alta', 'Critica')),
    estatus VARCHAR(20) NOT NULL CHECK (estatus IN ('Abierto', 'En Ruta', 'En Pruebas', 'Cerrado', 'Escalado_Indotel')),
    fecha_apertura TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    fecha_cierre TIMESTAMPTZ NULL,
    minutos_interrupcion INT DEFAULT 0
);

CREATE INDEX idx_pg_tickets_estatus_prioridad 
ON tickets_averias (estatus, prioridad) 
INCLUDE (servicio_id, nodo_id, minutos_interrupcion, fecha_apertura);

INSERT INTO tipos_servicios (codigo_servicio, descripcion, sla_estandar_horas) VALUES
('FTTH_GPON', 'Fibra Óptica Residencial', 4),
('MOVIL_5G', 'Móvil Postpago 5G Ultra', 6),
('CLARO_TV', 'Televisión Digital Claro TV+', 12),
('SIP_TRUNK', 'Troncal Enlace Dedicado', 2);

INSERT INTO nodos_distribucion (codigo_nodo, sector, tecnologia) VALUES
('ND-SD-PIANTINI-01', 'Piantini, Distrito Nacional', 'FTTH-GPON'),
('ND-SD-BELLAVISTA-02', 'Bella Vista, Distrito Nacional', 'FTTH-GPON'),
('ND-SD-NACO-03', 'Naco, Distrito Nacional', 'FTTH-GPON'),
('ND-STI-CENTRO-01', 'Santiago Centro, Santiago', '5G-NR'),
('ND-HG-BAVARO-01', 'Bávaro, La Altagracia', 'LTE-A');

INSERT INTO clientes_telecom (identificacion, nombre_completo, telefono_contacto, provincia, municipio) VALUES
('001-1234567-8', 'Juan Carlos Pérez', '809-555-0101', 'Distrito Nacional', 'Santo Domingo'),
('001-9876543-2', 'María Altagracia Rodríguez', '809-555-0102', 'Distrito Nacional', 'Santo Domingo'),
('031-4567890-1', 'Pedro Martínez', '829-555-0103', 'Santiago', 'Santiago de los Caballeros'),
('402-2345678-9', 'Ana Sofía Morales', '849-555-0104', 'La Altagracia', 'Higüey'),
('001-5544332-1', 'Luis Fernando Gómez', '809-555-0105', 'Distrito Nacional', 'Santo Domingo'),
('031-9988776-5', 'Carmen Mercedes Peña', '829-555-0106', 'Santiago', 'Santiago de los Caballeros');

INSERT INTO tickets_averias (cliente_id, servicio_id, nodo_id, tipo_reclamo, prioridad, estatus, minutos_interrupcion) VALUES
(100000, 1, 1, 'Corte Total de Fibra por Obra Metro', 'Critica', 'Abierto', 720),
(100001, 1, 1, 'Atenuación Severa en OLT', 'Alta', 'En Ruta', 680),
(100004, 1, 1, 'ONT Sin Sincronismo Óptico', 'Critica', 'Escalado_Indotel', 840),
(100000, 1, 2, 'Rotura de Splitter Secundario', 'Critica', 'Abierto', 910),
(100001, 1, 2, 'Fibra Caída por Poste Dañado', 'Alta', 'En Ruta', 950),
(100004, 1, 2, 'Pérdida de Potencia Óptica', 'Alta', 'Abierto', 450),
(100002, 2, 4, 'Caída de Portadora 5G Banda 3.5GHz', 'Critica', 'Abierto', 1100),
(100005, 2, 4, 'Degradación de Throughput Móvil', 'Alta', 'En Ruta', 800),
(100003, 3, 5, 'Decodificador con Error IPTV-302', 'Media', 'Cerrado', 90),
(100002, 1, 4, 'Router Reiniciando Continuamente', 'Baja', 'Cerrado', 45);

SELECT 
    n.codigo_nodo,
    n.sector,
    s.descripcion AS nombre_servicio,
    COUNT(t.ticket_id) AS cantidad_averias,
    SUM(t.minutos_interrupcion) AS total_minutos_caidos,
    ROUND(AVG(t.minutos_interrupcion), 2) AS promedio_por_cliente
FROM tickets_averias t
JOIN nodos_distribucion n ON t.nodo_id = n.nodo_id
JOIN tipos_servicios s ON t.servicio_id = s.servicio_id
WHERE t.estatus IN ('Abierto', 'En Ruta', 'Escalado_Indotel')
  AND t.prioridad IN ('Alta', 'Critica')
GROUP BY n.codigo_nodo, n.sector, s.descripcion
HAVING SUM(t.minutos_interrupcion) > 1000
ORDER BY total_minutos_caidos DESC
LIMIT 5;

-- ====================================================================================================
-- FASE 5: DATA SEEDER MASIVO (250 CLIENTES, 1,000 TICKETS & EVALUACIÓN SANCIONES INDOTEL)
-- ====================================================================================================
-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - MASTERCLASS MULTI-MOTOR (POSTGRESQL)
-- SCRIPT ADICIONAL: GENERADOR DE CARGA MASIVA DE DATOS SINTÉTICOS (DATA SEEDER)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
-- MOTOR: PostgreSQL 14+ / 16+ (PL/pgSQL)
-- ====================================================================================================

DO $$
DECLARE
    v_nombres TEXT[] := ARRAY['Juan', 'Pedro', 'María', 'Ana', 'Carlos', 'José', 'Luis', 'Rosa', 
                              'Miguel', 'Carmen', 'Francisco', 'Altagracia', 'Manuel', 'Juana', 'Ramón',
                              'Mercedes', 'Rafael', 'Esperanza', 'Eduardo', 'Yomaira', 'Kelvin', 'Patricia',
                              'Ángel', 'Yudelka', 'Héctor', 'Deyanira', 'Alejandro', 'Gissel', 'Roberto'];
    v_apellidos TEXT[] := ARRAY['Peña', 'Rodríguez', 'Pérez', 'Gómez', 'Martínez', 'García', 'Reyes',
                                'Díaz', 'Hernández', 'Sánchez', 'Ramírez', 'Cruz', 'Morales', 'Fernández',
                                'Jiménez', 'Rosario', 'Castillo', 'Vargas', 'Batista', 'De la Cruz', 'Mejía'];
    v_sectores TEXT[] := ARRAY['Piantini', 'Bella Vista', 'Gazcue', 'Naco', 'Ensanche La Fe', 'Villa Mella',
                               'Herrera', 'Alma Rosa I', 'Los Mina', 'Cerros de Gurabo', 'Villa Olga',
                               'Cienfuegos', 'El Vedado', 'Centro Ciudad', 'Bávaro', 'Punta Cana',
                               'La Romana Centro', 'San Pedro Centro', 'Puerto Plata Malecón', 'Baní Centro'];
    v_provincias TEXT[] := ARRAY['Distrito Nacional', 'Distrito Nacional', 'Distrito Nacional', 'Distrito Nacional', 'Distrito Nacional',
                                 'Santo Domingo Norte', 'Santo Domingo Oeste', 'Santo Domingo Este', 'Santo Domingo Este',
                                 'Santiago', 'Santiago', 'Santiago', 'La Vega', 'San Cristóbal', 'La Altagracia',
                                 'La Altagracia', 'La Romana', 'San Pedro de Macorís', 'Puerto Plata', 'Peravia'];

    v_random_nombre TEXT;
    v_random_apellido TEXT;
    v_nombre_completo TEXT;
    v_sector TEXT;
    v_provincia TEXT;
    v_segmento TEXT;
    v_cedula TEXT;
    v_telefono TEXT;
    v_email TEXT;
    v_cliente_id INT;

    v_tipo_idx INT;
    v_falla TEXT;
    v_sla_target INT;
    v_fecha_apertura TIMESTAMP;
    v_fecha_cierre TIMESTAMP;
    v_duracion NUMERIC(8,2);
    v_estado TEXT;
    v_prioridad TEXT;
    v_ticket_id INT;

    i INT;
    t INT;
    v_rnd INT;
BEGIN
    RAISE NOTICE '>>> [POSTGRESQL] 1/4 Insertando 250 Clientes Sintéticos...';
    
    FOR i IN 1..250 LOOP
        v_random_nombre := v_nombres[1 + floor(random() * array_length(v_nombres, 1))::int];
        v_random_apellido := v_apellidos[1 + floor(random() * array_length(v_apellidos, 1))::int];
        v_rnd := 1 + floor(random() * array_length(v_sectores, 1))::int;
        v_sector := v_sectores[v_rnd];
        v_provincia := v_provincias[v_rnd];
        v_nombre_completo := v_random_nombre || ' ' || v_random_apellido;

        v_cedula := '001-' || lpad((floor(random() * 8999999 + 1000000)::bigint)::text, 7, '0') || '-' || (floor(random() * 9 + 1)::int)::text;
        v_telefono := '809-' || lpad((floor(random() * 899 + 100)::int)::text, 3, '0') || '-' || lpad((floor(random() * 8999 + 1000)::int)::text, 4, '0');
        v_email := lower(replace(v_random_nombre, ' ', '')) || '.' || lower(replace(v_random_apellido, ' ', '')) || i::text || '@claro.com.do';

        IF i % 7 = 0 THEN v_segmento := 'Corporativo VIP';
        ELSIF i % 4 = 0 THEN v_segmento := 'PYME Negocios';
        ELSIF i % 3 = 0 THEN v_segmento := 'Residencial Premium';
        ELSE v_segmento := 'Residencial Estándar';
        END IF;

        INSERT INTO Clientes (Nombre_Completo, Documento_Identidad, Telefono_Contacto, Correo_Electronico, Direccion_Instalacion, Provincia, Segmento_Cliente, Fecha_Registro)
        VALUES (
            v_nombre_completo,
            v_cedula,
            v_telefono,
            v_email,
            'Calle ' || (i * 3 + 12)::text || ' #' || (i + 5)::text || ', ' || v_sector,
            v_provincia,
            v_segmento,
            NOW() - ((floor(random() * 730 + 30)::int || ' days')::interval)
        );
    END LOOP;

    RAISE NOTICE '>>> [POSTGRESQL] 2/4 Creando Contratos y Asignaciones de Red...';
    INSERT INTO Contratos (ID_Cliente, ID_Plan, Numero_Contrato, Fecha_Firma, Estado_Contrato, Tarifa_Mensual, Direccion_IP_Asignada)
    SELECT 
        C.ID_Cliente,
        (1 + floor(random() * 4)::int) AS ID_Plan,
        'CTR-CLARO-' || lpad(C.ID_Cliente::text, 6, '0'),
        C.Fecha_Registro + INTERVAL '2 days',
        CASE WHEN C.ID_Cliente % 15 = 0 THEN 'Suspendido' ELSE 'Activo' END,
        CASE 
            WHEN C.Segmento_Cliente = 'Corporativo VIP' THEN 8500.00
            WHEN C.Segmento_Cliente = 'PYME Negocios' THEN 4200.00
            WHEN C.Segmento_Cliente = 'Residencial Premium' THEN 2895.00
            ELSE 1595.00
        END,
        '10.240.' || (1 + floor(random() * 254)::int)::text || '.' || (1 + floor(random() * 254)::int)::text
    FROM Clientes C
    WHERE NOT EXISTS (SELECT 1 FROM Contratos X WHERE X.ID_Cliente = C.ID_Cliente);

    RAISE NOTICE '>>> [POSTGRESQL] 3/4 Generando 1,000 Tickets con tiempos SLA variados...';
    FOR t IN 1..1000 LOOP
        SELECT ID_Cliente INTO v_cliente_id FROM Clientes ORDER BY random() LIMIT 1;
        
        v_rnd := t % 8;
        IF v_rnd = 0 THEN v_falla := 'Corte de Fibra Óptica por Obra Civil'; v_sla_target := 4;
        ELSIF v_rnd = 1 THEN v_falla := 'Falla de Potencia Óptica en OLT / Splitter'; v_sla_target := 6;
        ELSIF v_rnd = 2 THEN v_falla := 'Pérdida de Sincronismo ONT / Módem'; v_sla_target := 12;
        ELSIF v_rnd = 3 THEN v_falla := 'Degradación de Latencia y Jitter en Troncal'; v_sla_target := 4;
        ELSIF v_rnd = 4 THEN v_falla := 'Bloqueo de Puertos por Ataque DDoS'; v_sla_target := 2;
        ELSIF v_rnd = 5 THEN v_falla := 'Falla de Energía en Radiobase Celular'; v_sla_target := 3;
        ELSIF v_rnd = 6 THEN v_falla := 'Intermitencia de Señal en Zona Residencial'; v_sla_target := 8;
        ELSE v_falla := 'Reemplazo de Router Wi-Fi 6 averiado'; v_sla_target := 24;
        END IF;

        v_fecha_apertura := NOW() - ((floor(random() * 259200)::int || ' minutes')::interval);

        IF t % 10 = 0 THEN
            v_estado := 'Abierto';
            v_fecha_cierre := NULL;
            v_duracion := round((EXTRACT(EPOCH FROM (NOW() - v_fecha_apertura)) / 3600.0)::numeric, 2);
        ELSIF t % 12 = 0 THEN
            v_estado := 'En Ruta';
            v_fecha_cierre := NULL;
            v_duracion := round((EXTRACT(EPOCH FROM (NOW() - v_fecha_apertura)) / 3600.0)::numeric, 2);
        ELSE
            v_estado := 'Resuelto';
            v_duracion := round((random() * 28.0 + 0.5)::numeric, 2);
            v_fecha_cierre := v_fecha_apertura + ((v_duracion::text || ' hours')::interval);
        END IF;

        IF t % 7 = 0 THEN v_prioridad := 'Critica';
        ELSIF t % 3 = 0 THEN v_prioridad := 'Alta';
        ELSIF t % 2 = 0 THEN v_prioridad := 'Media';
        ELSE v_prioridad := 'Baja';
        END IF;

        INSERT INTO Tickets_Averias (
            Codigo_Ticket, ID_Cliente, Categoria_Incidencia, Descripcion_Falla, 
            Prioridad, Estado_Ticket, Fecha_Apertura, Fecha_Cierre, 
            Tiempo_Resolucion_Horas, SLA_Compromiso_Horas, Tecnico_Asignado
        ) VALUES (
            'TK-PG-' || lpad(t::text, 6, '0'),
            v_cliente_id,
            'Telecomunicaciones',
            v_falla,
            v_prioridad,
            v_estado,
            v_fecha_apertura,
            v_fecha_cierre,
            v_duracion,
            v_sla_target,
            'Cuadrilla Técnica #' || (t % 18 + 1)::text
        );
    END LOOP;

    RAISE NOTICE '>>> [POSTGRESQL] 4/4 Evaluando Fiscalizaciones Regulatorias INDOTEL...';
    INSERT INTO Auditoria_Regulatoria_INDOTEL (
        ID_Ticket, Codigo_Resolucion, Fecha_Fiscalizacion,
        SLA_Normativo_Horas, SLA_Real_Horas, Veredicto_Regulatorio,
        Monto_Penalidad_DOP, Inspector_Asignado, Estado_Expediente
    )
    SELECT 
        T.ID_Ticket,
        'RES-INDOTEL-' || to_char(T.Fecha_Apertura, 'YYYYMM') || '-' || lpad(T.ID_Ticket::text, 5, '0'),
        COALESCE(T.Fecha_Cierre, NOW()) + INTERVAL '1 day',
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
        'Inspector INDOTEL Ing. Francisco Rodríguez',
        CASE 
            WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 'En Proceso Sancionador'
            ELSE 'Archivado Conforme'
        END
    FROM Tickets_Averias T
    WHERE T.Tiempo_Resolucion_Horas > (T.SLA_Compromiso_Horas * 0.9)
      AND NOT EXISTS (SELECT 1 FROM Auditoria_Regulatoria_INDOTEL A WHERE A.ID_Ticket = T.ID_Ticket);

    RAISE NOTICE '>>> [POSTGRESQL] CARGA MASIVA COMPLETADA SATISFACTORIAMENTE.';
END $$;



-- ====================================================================================================
-- FASE 6: LABORATORIO DE 30 CONSULTAS PRÁCTICAS COMENTADAS (15 BÁSICAS + 15 AVANZADAS)
-- MOTOR ACTIVO: POSTGRES
-- ====================================================================================================

-- ----------------------------------------------------------------------------------------------------
-- PARTE 6.1: 15 CONSULTAS BÁSICAS DE GESTIÓN Y FILTRADO HORIZONTAL / VERTICAL
-- ----------------------------------------------------------------------------------------------------

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 1: 1. Catálogo de Clientes con Alias Legibles
-- Finalidad Técnica: Proyección limpia de datos de abonados con nombres ejecutivos.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL PL/pgSQL] Consulta 1
SELECT 
    C.ID_Cliente AS "Código Cliente",
    C.Nombre_Completo AS "Cliente",
    C.Telefono_Contacto AS "Teléfono",
    C.Provincia AS "Ubicación",
    C.Segmento_Cliente AS "Segmento"
FROM Clientes C
ORDER BY C.Nombre_Completo ASC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 2: 2. Filtrado de Tickets Críticos Abiertos
-- Finalidad Técnica: Identifica incidencias de prioridad crítica que continúan sin resolverse.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 2
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Prioridad, T.Estado_Ticket, T.Fecha_Apertura
FROM Tickets_Averias T
WHERE T.Prioridad = 'Critica' AND T.Estado_Ticket = 'Abierto'
ORDER BY T.Fecha_Apertura DESC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 3: 3. Búsqueda por Patrón de Zona (LIKE)
-- Finalidad Técnica: Localiza clientes en sectores del polígono central metropolitano.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 3
SELECT C.Nombre_Completo, C.Direccion_Instalacion, C.Provincia
FROM Clientes C
WHERE C.Direccion_Instalacion ILIKE '%Piantini%' OR C.Direccion_Instalacion ILIKE '%Bella Vista%'
ORDER BY C.Provincia;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 4: 4. Rango de Fechas en los Últimos 30 Días (BETWEEN)
-- Finalidad Técnica: Filtra incidentes en la ventana temporal del último mes.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 4
SELECT T.Codigo_Ticket, T.Fecha_Apertura, T.Categoria_Incidencia, T.Tecnico_Asignado
FROM Tickets_Averias T
WHERE T.Fecha_Apertura BETWEEN (NOW() - INTERVAL '30 days') AND NOW()
ORDER BY T.Fecha_Apertura ASC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 5: 5. Pertenencia a Conjuntos de Provincias (IN)
-- Finalidad Técnica: Abona clientes de los tres principales nodos de tráfico de la red.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 5
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Segmento_Cliente
FROM Clientes C
WHERE C.Provincia IN ('Distrito Nacional', 'Santiago', 'La Altagracia')
ORDER BY C.Provincia, C.Nombre_Completo;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 6: 6. Detección de Tickets Sin Cierre (IS NULL)
-- Finalidad Técnica: Aplica la lógica tri-valuada para detectar casos pendientes de atención.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 6
SELECT T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket
FROM Tickets_Averias T
WHERE T.Fecha_Cierre IS NULL;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 7: 7. Ordenamiento Compuesto de Criticidad (ORDER BY Multi-Columna)
-- Finalidad Técnica: Prioriza por severidad de avería y tiempo de retraso acumulado.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 7
SELECT T.Codigo_Ticket, T.Prioridad, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas
FROM Tickets_Averias T
ORDER BY 
    CASE T.Prioridad WHEN 'Critica' THEN 1 WHEN 'Alta' THEN 2 WHEN 'Media' THEN 3 ELSE 4 END ASC,
    T.Tiempo_Resolucion_Horas DESC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 8: 8. Paginación Eficiente (OFFSET & LIMIT)
-- Finalidad Técnica: Recupera la primera página de 10 clientes sin sobrecargar la memoria.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 8: LIMIT & OFFSET
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia, C.Fecha_Registro
FROM Clientes C
ORDER BY C.ID_Cliente ASC
LIMIT 10 OFFSET 0;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 9: 9. Conteo de Tickets y Clientes Afectados (COUNT / DISTINCT)
-- Finalidad Técnica: Calcula el volumen global de reportes versus usuarios únicos impactados.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 9
SELECT COUNT(*) AS "Total Reportes", COUNT(DISTINCT T.ID_Cliente) AS "Clientes Únicos"
FROM Tickets_Averias T;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 10: 10. Facturación Mensual por Segmento (SUM & GROUP BY)
-- Finalidad Técnica: Totaliza los ingresos recurrentes clasificados por categoría comercial.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 10
SELECT 
    C.Segmento_Cliente,
    COUNT(CT.ID_Contrato) AS "Total Contratos",
    SUM(CT.Tarifa_Mensual) AS "Facturación Total (DOP)"
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
WHERE CT.Estado_Contrato = 'Activo'
GROUP BY C.Segmento_Cliente
ORDER BY "Facturación Total (DOP)" DESC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 11: 11. Estadísticas de Resolución: Promedio, Mínimo y Máximo (AVG, MIN, MAX)
-- Finalidad Técnica: Métricas cuantitativas clave del rendimiento de las cuadrillas de campo.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 11
SELECT 
    ROUND(AVG(T.Tiempo_Resolucion_Horas)::numeric, 2) AS "Promedio Horas",
    MIN(T.Tiempo_Resolucion_Horas) AS "Mínimo Horas",
    MAX(T.Tiempo_Resolucion_Horas) AS "Máximo Horas"
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto';

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 12: 12. Filtrado de Agrupaciones Críticas (HAVING)
-- Finalidad Técnica: Aísla provincias donde el promedio de fallas sobrepasa 10 horas.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 12
SELECT C.Provincia, COUNT(T.ID_Ticket) AS "Total Averías", ROUND(AVG(T.Tiempo_Resolucion_Horas)::numeric, 2) AS "Promedio"
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia
HAVING AVG(T.Tiempo_Resolucion_Horas) > 10.0
ORDER BY "Promedio" DESC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 13: 13. Cruce Relacional de Tickets y Abonados (INNER JOIN)
-- Finalidad Técnica: Combina tickets activos con el teléfono y dirección para despacho técnico.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 13
SELECT T.Codigo_Ticket, C.Nombre_Completo, C.Telefono_Contacto, C.Direccion_Instalacion, T.Descripcion_Falla
FROM Tickets_Averias T
INNER JOIN Clientes C ON T.ID_Cliente = C.ID_Cliente
WHERE T.Estado_Ticket IN ('Abierto', 'En Ruta');

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 14: 14. Detección de Clientes Sin Incidentes (LEFT JOIN / Anti-Join)
-- Finalidad Técnica: Identifica a todos los abonados con servicio continuo y sin averías registradas.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 14
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Provincia
FROM Clientes C
LEFT JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE T.ID_Ticket IS NULL;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Básica 15: 15. Catálogo Único de Tipos de Fallas (DISTINCT)
-- Finalidad Técnica: Genera la lista consolidada sin duplicados de problemas en la red.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta 15
SELECT DISTINCT T.Categoria_Incidencia, T.Descripcion_Falla
FROM Tickets_Averias T
ORDER BY T.Categoria_Incidencia, T.Descripcion_Falla;

-- ----------------------------------------------------------------------------------------------------
-- PARTE 6.2: 15 CONSULTAS AVANZADAS DE ANALÍTICA, WINDOW FUNCTIONS, CTE & AUDITORÍA INDOTEL
-- ----------------------------------------------------------------------------------------------------

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 1: 1. Última Incidencia por Cada Cliente (ROW_NUMBER & PARTITION BY)
-- Finalidad Técnica: Calcula el estado más reciente de cada cliente sin subconsultas lentas.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 1
WITH HistorialNumerado AS (
    SELECT 
        T.Codigo_Ticket, T.ID_Cliente, T.Fecha_Apertura, T.Estado_Ticket, T.Descripcion_Falla,
        ROW_NUMBER() OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura DESC) AS FilaSecuencial
    FROM Tickets_Averias T
)
SELECT C.Nombre_Completo AS "Cliente", H.Codigo_Ticket, H.Fecha_Apertura, H.Estado_Ticket, H.Descripcion_Falla
FROM HistorialNumerado H
INNER JOIN Clientes C ON H.ID_Cliente = C.ID_Cliente
WHERE H.FilaSecuencial = 1;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 2: 2. Ranking Denso de Técnicos Más Rápidos (DENSE_RANK)
-- Finalidad Técnica: Clasifica las cuadrillas de campo por velocidad de solución sin saltos numéricos.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 2
SELECT 
    T.Tecnico_Asignado,
    COUNT(T.ID_Ticket) AS "Casos Resueltos",
    ROUND(AVG(T.Tiempo_Resolucion_Horas)::numeric, 2) AS "Promedio Horas",
    DENSE_RANK() OVER(ORDER BY AVG(T.Tiempo_Resolucion_Horas) ASC) AS "Posición Eficiencia"
FROM Tickets_Averias T
WHERE T.Estado_Ticket = 'Resuelto'
GROUP BY T.Tecnico_Asignado
HAVING COUNT(T.ID_Ticket) >= 5;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 3: 3. Días Entre Averías Consecutivas con LAG
-- Finalidad Técnica: Calcula el intervalo entre fallas repetidas del mismo usuario.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 3
SELECT 
    T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS "FechaPrevia",
    ROUND(EXTRACT(EPOCH FROM (T.Fecha_Apertura - LAG(T.Fecha_Apertura, 1) OVER (PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC))) / 86400.0) AS "Días Desde Falla Previa"
FROM Tickets_Averias T
ORDER BY T.ID_Cliente, T.Fecha_Apertura;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 4: 4. Pipeline CTE de Severidad Regulatoria INDOTEL
-- Finalidad Técnica: Calcula excesos de tiempo y cuantifica sanciones normativas.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 4
WITH CasosEnInfraccion AS (
    SELECT T.ID_Ticket, T.Codigo_Ticket, T.ID_Cliente, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
           (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS ExcesoHoras
    FROM Tickets_Averias T WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
)
SELECT CLI.Nombre_Completo, CLI.Provincia, C.Codigo_Ticket, C.Tiempo_Resolucion_Horas, C.SLA_Compromiso_Horas, C.ExcesoHoras,
       CASE WHEN C.ExcesoHoras > 24 THEN 75000.00 WHEN C.ExcesoHoras > 8 THEN 40000.00 ELSE 15000.00 END AS MultaEstimadaDOP
FROM CasosEnInfraccion C
INNER JOIN Clientes CLI ON C.ID_Cliente = CLI.ID_Cliente
ORDER BY MultaEstimadaDOP DESC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 5: 5. Semáforo Dinámico de Riesgo Operativo (CASE)
-- Finalidad Técnica: Calcula alertas según el porcentaje de consumo de la ventana SLA.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 5
SELECT T.Codigo_Ticket, T.Tecnico_Asignado, T.Tiempo_Resolucion_Horas, T.SLA_Compromiso_Horas,
    CASE 
        WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN '🚨 VIOLACIÓN CRÍTICA'
        WHEN T.Tiempo_Resolucion_Horas >= (T.SLA_Compromiso_Horas * 0.85) THEN '⚠️ ALERTA CONSUMO > 85%'
        ELSE '🟢 RENDIMIENTO ÓPTIMO'
    END AS "Estado Semáforo SLA"
FROM Tickets_Averias T ORDER BY T.Tiempo_Resolucion_Horas DESC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 6: 6. Pivoteo Matricial de Severidades por Provincia (SUM CASE)
-- Finalidad Técnica: Traspone filas a columnas para dashboards de mando ejecutivo.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 6: Pivot Universal
SELECT 
    C.Provincia,
    COUNT(T.ID_Ticket) AS "Total",
    SUM(CASE WHEN T.Prioridad = 'Critica' THEN 1 ELSE 0 END) AS "Críticas",
    SUM(CASE WHEN T.Prioridad = 'Alta' THEN 1 ELSE 0 END) AS "Altas",
    SUM(CASE WHEN T.Prioridad = 'Media' THEN 1 ELSE 0 END) AS "Medias"
FROM Clientes C
INNER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
GROUP BY C.Provincia ORDER BY "Críticas" DESC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 7: 7. Subconsulta Correlacionada de Impacto Provincial
-- Finalidad Técnica: Calcula en el SELECT el porcentaje de quejas del cliente frente a su provincia.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 7
SELECT C.ID_Cliente, C.Nombre_Completo, C.Provincia,
    (SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS "Tickets Cliente",
    ROUND(CAST((SELECT COUNT(*) FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente) AS NUMERIC) /
          NULLIF((SELECT COUNT(*) FROM Tickets_Averias T2 INNER JOIN Clientes C2 ON T2.ID_Cliente = C2.ID_Cliente WHERE C2.Provincia = C.Provincia), 0) * 100, 2) AS "% Impacto"
FROM Clientes C
WHERE EXISTS (SELECT 1 FROM Tickets_Averias T WHERE T.ID_Cliente = C.ID_Cliente)
ORDER BY "% Impacto" DESC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 8: 8. Clientes VIP en Riesgo de Churn (EXISTS)
-- Finalidad Técnica: Aísla cuentas de alto valor con más de 2 incumplimientos de SLA.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 8
SELECT C.ID_Cliente, C.Nombre_Completo, C.Segmento_Cliente, C.Telefono_Contacto
FROM Clientes C
WHERE C.Segmento_Cliente = 'Corporativo VIP'
  AND EXISTS (
      SELECT 1 FROM Tickets_Averias T 
      WHERE T.ID_Cliente = C.ID_Cliente AND T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas
      GROUP BY T.ID_Cliente HAVING COUNT(*) >= 2
  );

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 9: 9. Subtotales y Gran Total Jerárquico (GROUP BY ROLLUP)
-- Finalidad Técnica: Genera árboles de agregación para reportes contables.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 9
SELECT 
    COALESCE(C.Provincia, '=== TODAS ===') AS "Provincia",
    COALESCE(C.Segmento_Cliente, '--- SUBTOTAL ---') AS "Segmento",
    COUNT(CT.ID_Contrato) AS "Total Contratos",
    SUM(CT.Tarifa_Mensual) AS "Facturación DOP"
FROM Clientes C
INNER JOIN Contratos CT ON C.ID_Cliente = CT.ID_Cliente
GROUP BY ROLLUP (C.Provincia, C.Segmento_Cliente);

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 10: 10. Acumulado Móvil de Penalidades INDOTEL (Running Total)
-- Finalidad Técnica: Curva acumulativa financiera a lo largo del tiempo.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 10
SELECT A.ID_Auditoria, A.Fecha_Fiscalizacion, A.Monto_Penalidad_DOP,
    SUM(A.Monto_Penalidad_DOP) OVER(ORDER BY A.Fecha_Fiscalizacion ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS "Acumulado Multas DOP"
FROM Auditoria_Regulatoria_INDOTEL A
WHERE A.Monto_Penalidad_DOP > 0;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 11: 11. Desviación Frente a la Media de la Categoría (OVER AVG)
-- Finalidad Técnica: Calcula cuántas horas se desvía cada ticket frente a la media de su tipología.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 11
SELECT T.Codigo_Ticket, T.Descripcion_Falla, T.Tiempo_Resolucion_Horas,
    ROUND(AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla)::numeric, 2) AS "Media Categoría",
    ROUND((T.Tiempo_Resolucion_Horas - AVG(T.Tiempo_Resolucion_Horas) OVER(PARTITION BY T.Descripcion_Falla))::numeric, 2) AS "Desviación"
FROM Tickets_Averias T ORDER BY "Desviación" DESC;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 12: 12. Trazabilidad de Primer y Último Estado (FIRST_VALUE / LAST_VALUE)
-- Finalidad Técnica: Inspecciona el comportamiento inicial de la orden y su cuadrilla de cierre.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 12
SELECT T.ID_Cliente, T.Codigo_Ticket, T.Fecha_Apertura,
    FIRST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC) AS "Primer Técnico",
    LAST_VALUE(T.Tecnico_Asignado) OVER(PARTITION BY T.ID_Cliente ORDER BY T.Fecha_Apertura ASC ROWS BETWEEN CURRENT ROW AND UNBOUNDED FOLLOWING) AS "Último Técnico"
FROM Tickets_Averias T;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 13: 13. Clasificación de Tramos Regulatorios (Non-Equi Join)
-- Finalidad Técnica: Asocia registros con bandas de tolerancia sin igualdad exacta.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 13
WITH EscalaMultas AS (
    SELECT 'Leve' AS Tramo, 0.01 AS MinH, 4.00 AS MaxH, 10000.00 AS Multa UNION ALL
    SELECT 'Grave', 4.01, 12.00, 35000.00 UNION ALL
    SELECT 'Muy Grave', 12.01, 999.00, 85000.00
)
SELECT T.Codigo_Ticket, (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) AS Exceso, M.Tramo, M.Multa AS "Tarifa Normativa DOP"
FROM Tickets_Averias T
INNER JOIN EscalaMultas M ON (T.Tiempo_Resolucion_Horas - T.SLA_Compromiso_Horas) BETWEEN M.MinH AND M.MaxH
WHERE T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 14: 14. Auditoría de Integridad Referencial (FULL OUTER JOIN)
-- Finalidad Técnica: Detecta registros huérfanos o discordancias entre abonados y averías.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 14
SELECT COALESCE(C.ID_Cliente, T.ID_Cliente) AS "ID Evaluado",
    CASE 
        WHEN C.ID_Cliente IS NULL THEN 'ALERTA: Ticket sin cliente'
        WHEN T.ID_Ticket IS NULL THEN 'Cliente activo sin incidencias'
        ELSE 'Relación Íntegra Validada'
    END AS "Estado Consistencia"
FROM Clientes C
FULL OUTER JOIN Tickets_Averias T ON C.ID_Cliente = T.ID_Cliente
WHERE C.ID_Cliente IS NULL OR T.ID_Ticket IS NULL;

-- ----------------------------------------------------------------------------------------------------
-- Consulta Avanzada 15: 15. Matriz Scoring de Riesgo INDOTEL (0 a 100)
-- Finalidad Técnica: Modelo scoring en SQL puro que combina fallas, retrasos y tipo de enlace.
-- ----------------------------------------------------------------------------------------------------
-- [PostgreSQL] Consulta Avanzada 15
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
FROM AnalisisCliente A ORDER BY "Score Riesgo" DESC;



-- ====================================================================================================
-- FIN DEL SCRIPT MAESTRO COMPLETO PARA POSTGRESQL (PL/pgSQL)
-- ====================================================================================================
