/**
 * ====================================================================================================
 * PROYECTO: MASTERCLASS MULTI-MOTOR & AUDITORÍA INDOTEL (CLARO DOMINICANA)
 * ARCHIVO: js/main.js
 * DESCRIPCIÓN: Controlador General de UI, Portapapeles, Sincronización y Descargas Todo-en-Uno
 * AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
 * ====================================================================================================
 */

// Función universal para copiar código al portapapeles con feedback visual
function copiarAlPortapapeles(elementId, boton) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const codigo = (el.innerText || el.textContent).trim();

  navigator.clipboard.writeText(codigo).then(() => {
    const original = boton.innerHTML;
    boton.innerHTML = '<i class="bi bi-check2-circle text-success"></i> ¡Copiado con Éxito!';
    boton.classList.add('btn-success', 'text-white');
    setTimeout(() => {
      boton.innerHTML = original;
      boton.classList.remove('btn-success', 'text-white');
    }, 2200);
  }).catch(err => {
    console.error('Error al copiar al portapapeles:', err);
    alert('No se pudo copiar el texto. Por favor selecciónalo manualmente.');
  });
}

// Función directa para copiar un fragmento exacto de texto (útil para comandos de terminal específicos)
function copiarTextoAlPortapapeles(texto, boton) {
  navigator.clipboard.writeText(texto).then(() => {
    const original = boton.innerHTML;
    boton.innerHTML = '<i class="bi bi-check2-circle text-success"></i> ¡Copiado!';
    boton.classList.add('btn-success', 'text-white');
    setTimeout(() => {
      boton.innerHTML = original;
      boton.classList.remove('btn-success', 'text-white');
    }, 2000);
  }).catch(err => {
    console.error('Error al copiar texto:', err);
    alert('No se pudo copiar automáticamente. Por favor selecciónalo manualmente.');
  });
}

// Descarga directa de scripts específicos
function descargarScriptEspecifico(tipo) {
  let contenido = '';
  let nombre = '';

  const motorActual = window.motorActivo || 'sqlserver';

  if (tipo === 'sqlserver') {
    contenido = document.getElementById('code-sqlserver')?.innerText;
    nombre = 'Claro_Telecom_SQLServer.sql';
  } else if (tipo === 'postgres') {
    contenido = document.getElementById('code-postgres')?.innerText;
    nombre = 'Claro_Telecom_PostgreSQL.sql';
  } else if (tipo === 'oracle') {
    contenido = document.getElementById('code-oracle')?.innerText;
    nombre = 'Claro_Telecom_Oracle.sql';
  } else if (tipo === 'mysql') {
    contenido = document.getElementById('code-mysql')?.innerText;
    nombre = 'Claro_Telecom_MySQL.sql';
  } else if (tipo === 'massive') {
    // Descargar el masivo correspondiente al motor actual
    if (window.MASTER_SCRIPTS && window.MASTER_SCRIPTS[motorActual]) {
      contenido = window.MASTER_SCRIPTS[motorActual].massive;
      nombre = `Claro_Telecom_Insert_Masivo_${motorActual.toUpperCase()}.sql`;
    } else {
      contenido = document.getElementById('code-massive-insert')?.innerText;
      nombre = `Claro_Telecom_Insert_Masivo_${motorActual.toUpperCase()}.sql`;
    }
  }

  if (!contenido) {
    alert('No se encontró el contenido del script para descargar.');
    return;
  }

  dispararDescargaBlob(contenido, nombre);
}

// Descarga del Script Maestro 100% Completo Todo-en-Uno (DDL + Seeder + 30 Consultas)
function descargarScriptTodoEnUno(motor) {
  const m = motor || window.motorActivo || 'sqlserver';
  const nombreArchivo = `Claro_Telecom_${m.toUpperCase()}_MASTER_COMPLETO.sql`;
  const rutaRelativa = `sql/${nombreArchivo}`;

  // Intentar descarga directa por enlace del archivo físico pre-generado
  const link = document.createElement('a');
  link.href = rutaRelativa;
  link.download = nombreArchivo;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Si se desea respaldo instantáneo por Blob en caso de bloqueo local:
  if (window.MASTER_SCRIPTS && window.MASTER_SCRIPTS[m] && window.MASTER_SCRIPTS[m].allInOne) {
    dispararDescargaBlob(window.MASTER_SCRIPTS[m].allInOne, nombreArchivo);
    return;
  }
}

function dispararDescargaBlob(contenido, nombreArchivo) {
  const blob = new Blob([contenido], { type: 'text/sql;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Inicialización de tooltips de Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  if (window.bootstrap) {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
});
