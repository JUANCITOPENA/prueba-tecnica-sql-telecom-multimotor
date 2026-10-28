/**
 * ====================================================================================================
 * PROYECTO: MASTERCLASS MULTI-MOTOR & AUDITORÍA INDOTEL (CLARO DOMINICANA)
 * ARCHIVO: js/massive-insert.js
 * DESCRIPCIÓN: Controlador para la sección del Generador de Carga Masiva Multi-Motor
 * AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
 * ====================================================================================================
 */

// Scripts de inserción masiva en los 4 dialectos
const SCRIPTS_MASIVOS_DIALECTOS = {
  sqlserver: `-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - SCRIPT ADICIONAL DE CARGA MASIVA (SQL SERVER T-SQL)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
-- ====================================================================================================

-- 1. POBLADO MASIVO DE 250 CLIENTES CON CÉDULAS Y DIRECCIONES RD VÁLIDAS
-- 2. ASIGNACIÓN DE CONTRATOS, TARIFAS Y SEGMENTOS COMERCIALES
-- 3. GENERACIÓN DE 1,000 TICKETS DE AVERÍA CON TIEMPOS DE SOLUCIÓN CONTROLADOS
-- 4. FISCALIZACIÓN AUTOMÁTICA Y REGISTRO DE MULTAS INDOTEL ANTE INCUMPLIMIENTO DE SLA

-- Puedes descargar el archivo SQL completo mediante el botón 'Descargar Script Masivo (.sql)'
-- o descargar el Script Maestro Todo-en-Uno con DDL, Seeder y Consultas.`,

  postgres: `-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - SCRIPT ADICIONAL DE CARGA MASIVA (POSTGRESQL PL/pgSQL)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
-- ====================================================================================================

DO $$
DECLARE
    -- Arreglos sintéticos dominicanos
    v_nombres TEXT[] := ARRAY['Juan', 'Pedro', 'María', 'Ana', 'Carlos', 'José', 'Luis', 'Rosa', 'Carmen'];
    v_apellidos TEXT[] := ARRAY['Peña', 'Rodríguez', 'Pérez', 'Gómez', 'Martínez', 'García', 'Reyes'];
    -- 1. Generación de 250 Clientes con NOW() - INTERVAL y random()
    -- 2. Inserción de 1,000 Tickets con tiempos de resolución y estados
    -- 3. Evaluación de expedientes sancionadores de auditoría INDOTEL
BEGIN
    RAISE NOTICE '>>> [POSTGRESQL] Ejecutando Seeder de 1,000 Tickets y 250 Clientes...';
    -- [Descarga el script completo para ver el bloque DO completo listo para ejecutar]
END $$;`,

  oracle: `-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - SCRIPT ADICIONAL DE CARGA MASIVA (ORACLE PL/SQL)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
-- ====================================================================================================

SET SERVEROUTPUT ON;
DECLARE
    -- Bloque anónimo PL/SQL con DBMS_RANDOM para generar 250 clientes y 1,000 tickets
    v_nom VARCHAR2(50);
    v_ape VARCHAR2(50);
BEGIN
    DBMS_OUTPUT.PUT_LINE('>>> [ORACLE] Iniciando Carga Masiva Telecom con Bloque PL/SQL...');
    -- 1. Inserción masiva de 250 Clientes con Cédulas y Segmentos
    -- 2. Asignación de 1,000 Tickets con SYSDATE y cálculo de varianza de SLA
    -- 3. Registro de expedientes sancionadores INDOTEL
    COMMIT;
END;
/`,

  mysql: `-- ====================================================================================================
-- PROYECTO: CLARO DOMINICANA TELECOM - SCRIPT ADICIONAL DE CARGA MASIVA (MYSQL 8.0+ INNODB)
-- AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
-- ====================================================================================================

DELIMITER $$
DROP PROCEDURE IF EXISTS sp_GenerarCargaMasivaTelecom$$
CREATE PROCEDURE sp_GenerarCargaMasivaTelecom()
BEGIN
    -- Procedimiento almacenado MySQL para inserción iterativa:
    -- 1. Inserción de 250 Clientes sintéticos dominicanos
    -- 2. Asignación de 1,000 Tickets con TIMESTAMPDIFF y RAND()
    -- 3. Auditorías regulatorias INDOTEL automáticas
END$$
DELIMITER ;
CALL sp_GenerarCargaMasivaTelecom();`
};

window.actualizarScriptMasivoMotor = function(motor) {
  const codeEl = document.getElementById('code-massive-insert');
  if (!codeEl) return;

  const scriptSnippet = SCRIPTS_MASIVOS_DIALECTOS[motor] || SCRIPTS_MASIVOS_DIALECTOS['sqlserver'];
  codeEl.textContent = scriptSnippet;

  if (window.Prism) {
    Prism.highlightElement(codeEl);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.actualizarScriptMasivoMotor) {
    window.actualizarScriptMasivoMotor(window.motorActivo || 'sqlserver');
  }
});
