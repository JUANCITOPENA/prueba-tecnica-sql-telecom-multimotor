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
