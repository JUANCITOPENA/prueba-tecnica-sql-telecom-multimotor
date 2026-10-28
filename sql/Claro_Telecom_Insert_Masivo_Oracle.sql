-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - MASTERCLASS MULTI-MOTOR (ORACLE DATABASE)
-- SCRIPT ADICIONAL: GENERADOR DE CARGA MASIVA DE DATOS SINTÉTICOS (DATA SEEDER)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
-- MOTOR: Oracle Database 19c / 21c / 23ai (PL/SQL)
-- ====================================================================================================

SET SERVEROUTPUT ON;

DECLARE
    TYPE t_array IS VARRAY(10) OF VARCHAR2(50);
    v_nombres t_array := t_array('Juan', 'Pedro', 'María', 'Ana', 'Carlos', 'José', 'Luis', 'Rosa', 'Carmen', 'Miguel');
    v_apellidos t_array := t_array('Peña', 'Rodríguez', 'Pérez', 'Gómez', 'Martínez', 'García', 'Reyes', 'Díaz', 'Hernández', 'Sánchez');
    v_sectores t_array := t_array('Piantini', 'Bella Vista', 'Gazcue', 'Naco', 'Villa Mella', 'Cerros Gurabo', 'El Vedado', 'Bávaro', 'Punta Cana', 'Baní');

    v_random_nom VARCHAR2(50);
    v_random_ape VARCHAR2(50);
    v_sector VARCHAR2(50);
    v_provincia VARCHAR2(50);
    v_seg VARCHAR2(30);
    v_ced VARCHAR2(20);
    v_tel VARCHAR2(20);
    v_email VARCHAR2(100);

    v_cliente_id NUMBER;
    v_falla VARCHAR2(150);
    v_sla NUMBER;
    v_f_open DATE;
    v_f_close DATE;
    v_dur NUMBER(8,2);
    v_est VARCHAR2(20);
    v_prio VARCHAR2(20);
BEGIN
    DBMS_OUTPUT.PUT_LINE('>>> [ORACLE] 1/4 Insertando 250 Clientes Sintéticos...');

    FOR i IN 1..250 LOOP
        v_random_nom := v_nombres(TRUNC(DBMS_RANDOM.VALUE(1, 10)));
        v_random_ape := v_apellidos(TRUNC(DBMS_RANDOM.VALUE(1, 10)));
        v_sector := v_sectores(TRUNC(DBMS_RANDOM.VALUE(1, 10)));
        
        IF v_sector IN ('Piantini', 'Bella Vista', 'Gazcue', 'Naco') THEN
            v_provincia := 'Distrito Nacional';
        ELSIF v_sector = 'Villa Mella' THEN
            v_provincia := 'Santo Domingo Norte';
        ELSIF v_sector = 'Cerros Gurabo' THEN
            v_provincia := 'Santiago';
        ELSE
            v_provincia := 'La Altagracia';
        END IF;

        v_ced := '001-' || LPAD(TRUNC(DBMS_RANDOM.VALUE(1000000, 9999999)), 7, '0') || '-' || TRUNC(DBMS_RANDOM.VALUE(1, 9));
        v_tel := '809-' || LPAD(TRUNC(DBMS_RANDOM.VALUE(100, 999)), 3, '0') || '-' || LPAD(TRUNC(DBMS_RANDOM.VALUE(1000, 9999)), 4, '0');
        v_email := LOWER(v_random_nom || '.' || v_random_ape || i || '@claro.com.do');

        IF MOD(i, 7) = 0 THEN v_seg := 'Corporativo VIP';
        ELSIF MOD(i, 4) = 0 THEN v_seg := 'PYME Negocios';
        ELSIF MOD(i, 3) = 0 THEN v_seg := 'Residencial Premium';
        ELSE v_seg := 'Residencial Estándar';
        END IF;

        INSERT INTO Clientes (Nombre_Completo, Documento_Identidad, Telefono_Contacto, Correo_Electronico, Direccion_Instalacion, Provincia, Segmento_Cliente, Fecha_Registro)
        VALUES (
            v_random_nom || ' ' || v_random_ape,
            v_ced,
            v_tel,
            v_email,
            'Calle ' || (i * 3 + 12) || ' #' || (i + 5) || ', ' || v_sector,
            v_provincia,
            v_seg,
            SYSDATE - TRUNC(DBMS_RANDOM.VALUE(30, 730))
        );
    END LOOP;

    DBMS_OUTPUT.PUT_LINE('>>> [ORACLE] 2/4 Creando Contratos Activos...');
    INSERT INTO Contratos (ID_Cliente, ID_Plan, Numero_Contrato, Fecha_Firma, Estado_Contrato, Tarifa_Mensual, Direccion_IP_Asignada)
    SELECT 
        C.ID_Cliente,
        TRUNC(DBMS_RANDOM.VALUE(1, 5)),
        'CTR-CLARO-' || LPAD(C.ID_Cliente, 6, '0'),
        C.Fecha_Registro + 2,
        CASE WHEN MOD(C.ID_Cliente, 15) = 0 THEN 'Suspendido' ELSE 'Activo' END,
        CASE 
            WHEN C.Segmento_Cliente = 'Corporativo VIP' THEN 8500.00
            WHEN C.Segmento_Cliente = 'PYME Negocios' THEN 4200.00
            WHEN C.Segmento_Cliente = 'Residencial Premium' THEN 2895.00
            ELSE 1595.00
        END,
        '10.240.' || TRUNC(DBMS_RANDOM.VALUE(1, 254)) || '.' || TRUNC(DBMS_RANDOM.VALUE(1, 254))
    FROM Clientes C
    WHERE NOT EXISTS (SELECT 1 FROM Contratos X WHERE X.ID_Cliente = C.ID_Cliente);

    DBMS_OUTPUT.PUT_LINE('>>> [ORACLE] 3/4 Generando 1,000 Tickets con diversidad SLA...');
    FOR t IN 1..1000 LOOP
        SELECT ID_Cliente INTO v_cliente_id FROM (SELECT ID_Cliente FROM Clientes ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM = 1;

        CASE MOD(t, 4)
            WHEN 0 THEN v_sla := 4; v_falla := 'Corte de Fibra Óptica por Obra Civil';
            WHEN 1 THEN v_sla := 6; v_falla := 'Falla de Potencia Óptica en OLT';
            WHEN 2 THEN v_sla := 12; v_falla := 'Pérdida de Sincronismo ONT Módem';
            ELSE v_sla := 24; v_falla := 'Degradación de Latencia en Enlace Troncal';
        END CASE;

        v_f_open := SYSDATE - (DBMS_RANDOM.VALUE(1, 180));

        IF MOD(t, 10) = 0 THEN
            v_est := 'Abierto';
            v_f_close := NULL;
            v_dur := ROUND((SYSDATE - v_f_open) * 24, 2);
        ELSIF MOD(t, 12) = 0 THEN
            v_est := 'En Ruta';
            v_f_close := NULL;
            v_dur := ROUND((SYSDATE - v_f_open) * 24, 2);
        ELSE
            v_est := 'Resuelto';
            v_dur := ROUND(DBMS_RANDOM.VALUE(0.5, 28.5), 2);
            v_f_close := v_f_open + (v_dur / 24);
        END IF;

        IF MOD(t, 7) = 0 THEN v_prio := 'Critica';
        ELSIF MOD(t, 3) = 0 THEN v_prio := 'Alta';
        ELSIF MOD(t, 2) = 0 THEN v_prio := 'Media';
        ELSE v_prio := 'Baja';
        END IF;

        INSERT INTO Tickets_Averias (
            Codigo_Ticket, ID_Cliente, Categoria_Incidencia, Descripcion_Falla, 
            Prioridad, Estado_Ticket, Fecha_Apertura, Fecha_Cierre, 
            Tiempo_Resolucion_Horas, SLA_Compromiso_Horas, Tecnico_Asignado
        ) VALUES (
            'TK-ORA-' || LPAD(t, 6, '0'),
            v_cliente_id,
            'Telecomunicaciones',
            v_falla,
            v_prio,
            v_est,
            v_f_open,
            v_f_close,
            v_dur,
            v_sla,
            'Técnico Cuadrilla #' || (MOD(t, 18) + 1)
        );
    END LOOP;

    DBMS_OUTPUT.PUT_LINE('>>> [ORACLE] 4/4 Fiscalizaciones Regulatorias INDOTEL...');
    INSERT INTO Auditoria_Regulatoria_INDOTEL (
        ID_Ticket, Codigo_Resolucion, Fecha_Fiscalizacion,
        SLA_Normativo_Horas, SLA_Real_Horas, Veredicto_Regulatorio,
        Monto_Penalidad_DOP, Inspector_Asignado, Estado_Expediente
    )
    SELECT 
        T.ID_Ticket,
        'RES-INDOTEL-' || TO_CHAR(T.Fecha_Apertura, 'YYYYMM') || '-' || LPAD(T.ID_Ticket, 5, '0'),
        NVL(T.Fecha_Cierre, SYSDATE) + 1,
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
        'Inspector INDOTEL Ing. Juancito Peña',
        CASE 
            WHEN T.Tiempo_Resolucion_Horas > T.SLA_Compromiso_Horas THEN 'En Proceso Sancionador'
            ELSE 'Archivado Conforme'
        END
    FROM Tickets_Averias T
    WHERE T.Tiempo_Resolucion_Horas > (T.SLA_Compromiso_Horas * 0.9)
      AND NOT EXISTS (SELECT 1 FROM Auditoria_Regulatoria_INDOTEL A WHERE A.ID_Ticket = T.ID_Ticket);

    COMMIT;
    DBMS_OUTPUT.PUT_LINE('>>> [ORACLE] CARGA MASIVA Y AUDITORÍAS COMPLETADAS CON COMMIT.');
END;
/
