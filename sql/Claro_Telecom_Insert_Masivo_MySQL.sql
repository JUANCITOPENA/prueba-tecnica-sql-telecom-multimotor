-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - MASTERCLASS MULTI-MOTOR (MYSQL 8.0+)
-- SCRIPT ADICIONAL: GENERADOR DE CARGA MASIVA DE DATOS SINTÉTICOS (DATA SEEDER)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
-- MOTOR: MySQL 8.0+ / 8.4 LTS (InnoDB)
-- ====================================================================================================

DELIMITER $$

DROP PROCEDURE IF EXISTS sp_GenerarCargaMasivaTelecom$$
CREATE PROCEDURE sp_GenerarCargaMasivaTelecom()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE t INT DEFAULT 1;
    DECLARE v_cliente_id INT;
    DECLARE v_nom VARCHAR(50);
    DECLARE v_ape VARCHAR(50);
    DECLARE v_sec VARCHAR(100);
    DECLARE v_prov VARCHAR(50);
    DECLARE v_seg VARCHAR(30);
    DECLARE v_ced VARCHAR(15);
    DECLARE v_tel VARCHAR(15);
    DECLARE v_em VARCHAR(120);
    DECLARE v_falla VARCHAR(150);
    DECLARE v_sla INT;
    DECLARE v_f_open DATETIME;
    DECLARE v_f_close DATETIME;
    DECLARE v_dur DECIMAL(8,2);
    DECLARE v_est VARCHAR(20);
    DECLARE v_prio VARCHAR(20);

    -- 1. Inserción de 250 Clientes
    WHILE i <= 250 DO
        SET v_nom = ELT(1 + FLOOR(RAND() * 8), 'Juan', 'Pedro', 'María', 'Carlos', 'Ana', 'Luis', 'Rosa', 'Carmen');
        SET v_ape = ELT(1 + FLOOR(RAND() * 8), 'Peña', 'Rodríguez', 'Pérez', 'Gómez', 'Martínez', 'Reyes', 'Díaz', 'Hernández');
        SET v_sec = ELT(1 + FLOOR(RAND() * 6), 'Piantini', 'Bella Vista', 'Gazcue', 'Naco', 'Villa Mella', 'Cerros Gurabo');
        SET v_prov = CASE 
            WHEN v_sec IN ('Piantini', 'Bella Vista', 'Gazcue', 'Naco') THEN 'Distrito Nacional'
            WHEN v_sec = 'Villa Mella' THEN 'Santo Domingo Norte'
            ELSE 'Santiago'
        END;

        SET v_ced = CONCAT('001-', LPAD(FLOOR(RAND() * 8999999 + 1000000), 7, '0'), '-', FLOOR(RAND() * 9 + 1));
        SET v_tel = CONCAT('809-', LPAD(FLOOR(RAND() * 899 + 100), 3, '0'), '-', LPAD(FLOOR(RAND() * 8999 + 1000), 4, '0'));
        SET v_em = LOWER(CONCAT(v_nom, '.', v_ape, i, '@claro.com.do'));

        SET v_seg = CASE 
            WHEN i % 7 = 0 THEN 'Corporativo VIP'
            WHEN i % 4 = 0 THEN 'PYME Negocios'
            WHEN i % 3 = 0 THEN 'Residencial Premium'
            ELSE 'Residencial Estándar'
        END;

        INSERT INTO Clientes (Nombre_Completo, Documento_Identidad, Telefono_Contacto, Correo_Electronico, Direccion_Instalacion, Provincia, Segmento_Cliente, Fecha_Registro)
        VALUES (
            CONCAT(v_nom, ' ', v_ape),
            v_ced,
            v_tel,
            v_em,
            CONCAT('Calle ', (i * 3 + 12), ' #', (i + 5), ', ', v_sec),
            v_prov,
            v_seg,
            DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 730 + 30) DAY)
        );

        SET i = i + 1;
    END WHILE;

    -- 2. Contratos y Asignaciones
    INSERT INTO Contratos (ID_Cliente, ID_Plan, Numero_Contrato, Fecha_Firma, Estado_Contrato, Tarifa_Mensual, Direccion_IP_Asignada)
    SELECT 
        C.ID_Cliente,
        FLOOR(1 + RAND() * 4),
        CONCAT('CTR-CLARO-', LPAD(C.ID_Cliente, 6, '0')),
        DATE_ADD(C.Fecha_Registro, INTERVAL 2 DAY),
        IF(C.ID_Cliente % 15 = 0, 'Suspendido', 'Activo'),
        CASE 
            WHEN C.Segmento_Cliente = 'Corporativo VIP' THEN 8500.00
            WHEN C.Segmento_Cliente = 'PYME Negocios' THEN 4200.00
            WHEN C.Segmento_Cliente = 'Residencial Premium' THEN 2895.00
            ELSE 1595.00
        END,
        CONCAT('10.240.', FLOOR(1 + RAND() * 254), '.', FLOOR(1 + RAND() * 254))
    FROM Clientes C
    WHERE NOT EXISTS (SELECT 1 FROM Contratos X WHERE X.ID_Cliente = C.ID_Cliente);

    -- 3. 1,000 Tickets con diversidad SLA
    WHILE t <= 1000 DO
        SELECT ID_Cliente INTO v_cliente_id FROM Clientes ORDER BY RAND() LIMIT 1;

        SET v_sla = ELT(1 + (t % 4), 4, 6, 12, 24);
        SET v_falla = ELT(1 + (t % 4), 
            'Corte de Fibra Óptica por Obra Civil',
            'Falla de Potencia Óptica en OLT',
            'Pérdida de Sincronismo ONT Módem',
            'Degradación de Latencia en Enlace Troncal'
        );

        SET v_f_open = DATE_SUB(NOW(), INTERVAL FLOOR(RAND() * 259200) MINUTE);

        IF t % 10 = 0 THEN
            SET v_est = 'Abierto';
            SET v_f_close = NULL;
            SET v_dur = ROUND(TIMESTAMPDIFF(MINUTE, v_f_open, NOW()) / 60.0, 2);
        ELSEIF t % 12 = 0 THEN
            SET v_est = 'En Ruta';
            SET v_f_close = NULL;
            SET v_dur = ROUND(TIMESTAMPDIFF(MINUTE, v_f_open, NOW()) / 60.0, 2);
        ELSE
            SET v_est = 'Resuelto';
            SET v_dur = ROUND(RAND() * 28.0 + 0.5, 2);
            SET v_f_close = DATE_ADD(v_f_open, INTERVAL ROUND(v_dur * 60) MINUTE);
        END IF;

        SET v_prio = CASE 
            WHEN t % 7 = 0 THEN 'Critica'
            WHEN t % 3 = 0 THEN 'Alta'
            WHEN t % 2 = 0 THEN 'Media'
            ELSE 'Baja'
        END;

        INSERT INTO Tickets_Averias (
            Codigo_Ticket, ID_Cliente, Categoria_Incidencia, Descripcion_Falla, 
            Prioridad, Estado_Ticket, Fecha_Apertura, Fecha_Cierre, 
            Tiempo_Resolucion_Horas, SLA_Compromiso_Horas, Tecnico_Asignado
        ) VALUES (
            CONCAT('TK-MY-', LPAD(t, 6, '0')),
            v_cliente_id,
            'Telecomunicaciones',
            v_falla,
            v_prio,
            v_est,
            v_f_open,
            v_f_close,
            v_dur,
            v_sla,
            CONCAT('Técnico Cuadrilla #', (t % 18 + 1))
        );

        SET t = t + 1;
    END WHILE;

    -- 4. Auditoría INDOTEL
    INSERT INTO Auditoria_Regulatoria_INDOTEL (
        ID_Ticket, Codigo_Resolucion, Fecha_Fiscalizacion,
        SLA_Normativo_Horas, SLA_Real_Horas, Veredicto_Regulatorio,
        Monto_Penalidad_DOP, Inspector_Asignado, Estado_Expediente
    )
    SELECT 
        T.ID_Ticket,
        CONCAT('RES-INDOTEL-', DATE_FORMAT(T.Fecha_Apertura, '%Y%m'), '-', LPAD(T.ID_Ticket, 5, '0')),
        DATE_ADD(COALESCE(T.Fecha_Cierre, NOW()), INTERVAL 1 DAY),
        T.SLA_Compromiso_Horas,
        T.Tiempo_Resolucion_Horas,
        IF(T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas, 'VIOLACION_REINCIDENTE', 'CUMPLIMIENTO_OPTIMO'),
        CASE 
            WHEN T.Tiempo_Resolucion_Horas > (T.SLA_Compromiso_Horas * 2) THEN 75000.00
            WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 25000.00
            ELSE 0.00
        END,
        'Inspector INDOTEL Ing. Juancito Peña',
        IF(T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas, 'En Proceso Sancionador', 'Archivado Conforme')
    FROM Tickets_Averias T
    WHERE T.Tiempo_Resolucion_Horas > (T.SLA_Compromiso_Horas * 0.9)
      AND NOT EXISTS (SELECT 1 FROM Auditoria_Regulatoria_INDOTEL A WHERE A.ID_Ticket = T.ID_Ticket);

END$$

DELIMITER ;

-- Ejecución del procedimiento de carga masiva
CALL sp_GenerarCargaMasivaTelecom();
DROP PROCEDURE IF EXISTS sp_GenerarCargaMasivaTelecom;
