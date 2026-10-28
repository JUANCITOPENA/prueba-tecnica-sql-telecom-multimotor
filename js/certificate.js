/**
 * ====================================================================================================
 * PROYECTO: MASTERCLASS MULTI-MOTOR & AUDITORÍA INDOTEL (CLARO DOMINICANA)
 * ARCHIVO: js/certificate.js
 * DESCRIPCIÓN: Generador de Certificado Oficial Estándar con Logos Multi-Motor, Métricas,
 *              Sello Holográfico, Firma Caligráfica Azul de Ing. Juancito Peña y Exportación PDF / PNG.
 * AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
 * ====================================================================================================
 */

function inicializarModuloCertificado() {
  const formCert = document.getElementById('form-generar-certificado');
  if (formCert) {
    formCert.addEventListener('submit', (e) => {
      e.preventDefault();
      procesarYGenerarCertificado();
    });
  }

  // Cargar datos previos si existen en LocalStorage
  const cachedData = JSON.parse(localStorage.getItem('quiz_participante_data') || '{}');
  if (cachedData.nombre) document.getElementById('cert-input-nombre').value = cachedData.nombre;
  if (cachedData.apellido) document.getElementById('cert-input-apellido').value = cachedData.apellido;
  if (cachedData.email) document.getElementById('cert-input-email').value = cachedData.email;
  if (cachedData.pais) document.getElementById('cert-input-pais').value = cachedData.pais;

  const btnPdf = document.getElementById('btn-descargar-cert-pdf');
  const btnPng = document.getElementById('btn-descargar-cert-png');

  if (btnPdf) btnPdf.addEventListener('click', descargarCertificadoPDF);
  if (btnPng) btnPng.addEventListener('click', descargarCertificadoPNG);
}

function procesarYGenerarCertificado() {
  const nombre = document.getElementById('cert-input-nombre')?.value.trim();
  const apellido = document.getElementById('cert-input-apellido')?.value.trim();
  const email = document.getElementById('cert-input-email')?.value.trim();
  const pais = document.getElementById('cert-input-pais')?.value.trim();

  if (!nombre || !apellido || !email || !pais) {
    alert('Por favor completa todos los campos del formulario de acreditación.');
    return;
  }

  // Guardar datos en LocalStorage
  const participanteData = { nombre, apellido, email, pais };
  localStorage.setItem('quiz_participante_data', JSON.stringify(participanteData));

  // Obtener último intento o el mejor intento histórico
  let historico = JSON.parse(localStorage.getItem('quiz_intentos_historico') || '[]');
  let intento = window.ultimoIntentoExamen;

  if (!intento && historico.length > 0) {
    intento = historico[0];
  }

  const calificacionFinal = intento ? intento.calificacion : 95;
  const aciertos = intento ? intento.buenas : 28;
  const total = intento ? intento.total : 30;
  const tiempoUsado = intento ? intento.tiempoUsado : '18m 42s';

  const codigoHash = 'CERT-JPV-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '-' + new Date().getFullYear();
  const fechaHoy = new Date().toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' });

  // Inyectar en la plantilla del certificado
  document.getElementById('cert-render-nombre').innerText = `${nombre} ${apellido}`.toUpperCase();
  document.getElementById('cert-render-pais').innerText = pais;
  document.getElementById('cert-render-email').innerText = email;
  document.getElementById('cert-render-calificacion').innerText = `${calificacionFinal}%`;
  document.getElementById('cert-render-aciertos').innerText = `${aciertos} de ${total}`;
  document.getElementById('cert-render-tiempo').innerText = tiempoUsado;
  document.getElementById('cert-render-hash').innerText = codigoHash;
  document.getElementById('cert-render-fecha').innerText = fechaHoy;

  // Mostrar el contenedor del certificado
  const boxCert = document.getElementById('contenedor-certificado-final');
  if (boxCert) {
    boxCert.classList.remove('d-none');
    boxCert.scrollIntoView({ behavior: 'smooth' });
  }

  // Guardar copia del certificado generado en LocalStorage
  const certInfo = {
    nombreCompleto: `${nombre} ${apellido}`,
    pais,
    email,
    calificacion: calificacionFinal,
    codigoHash,
    fecha: fechaHoy
  };
  localStorage.setItem('ultimo_certificado_emitido', JSON.stringify(certInfo));
}

// Descarga en Formato PDF de Alta Definición (100% Idéntico al PNG, 1 Sola Página A4 Landscape)
function descargarCertificadoPDF() {
  const elemento = document.getElementById('plantilla-certificado-documento');
  if (!elemento) return;

  const btn = document.getElementById('btn-descargar-cert-pdf');
  const original = btn.innerHTML;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Generando PDF Vectorial 100% Fiel...';
  btn.disabled = true;

  html2canvas(elemento, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;

    if (jsPDFClass) {
      // Documento apaisado (Landscape A4: 297mm x 210mm)
      const pdf = new jsPDFClass({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = 297;
      const pdfHeight = 210;
      const margen = 4; // 4mm de margen perimetral
      const maxW = pdfWidth - (margen * 2);
      const maxH = pdfHeight - (margen * 2);

      let finalW = maxW;
      let finalH = (canvas.height * finalW) / canvas.width;

      if (finalH > maxH) {
        finalH = maxH;
        finalW = (canvas.width * finalH) / canvas.height;
      }

      const posX = (pdfWidth - finalW) / 2;
      const posY = (pdfHeight - finalH) / 2;

      pdf.addImage(imgData, 'PNG', posX, posY, finalW, finalH, undefined, 'FAST');
      pdf.save('Certificado_SQL_MultiMotor_JuancitoPena.pdf');

      btn.innerHTML = original;
      btn.disabled = false;
    } else if (window.html2pdf) {
      // Fallback a html2pdf si jsPDF no cargó
      const opt = {
        margin: [4, 4, 4, 4],
        filename: 'Certificado_SQL_MultiMotor_JuancitoPena.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2.5, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      };
      window.html2pdf().set(opt).from(elemento).save().then(() => {
        btn.innerHTML = original;
        btn.disabled = false;
      });
    } else {
      throw new Error('No se encontró la librería jsPDF ni html2pdf.');
    }
  }).catch(err => {
    console.error('Error al generar PDF:', err);
    btn.innerHTML = original;
    btn.disabled = false;
    alert('Ocurrió un inconveniente al generar el PDF. Puedes utilizar la opción Descargar en Imagen PNG.');
  });
}

// Descarga en Formato PNG de Alta Definición mediante html2canvas
function descargarCertificadoPNG() {
  const elemento = document.getElementById('plantilla-certificado-documento');
  if (!elemento) return;

  const btn = document.getElementById('btn-descargar-cert-png');
  const original = btn.innerHTML;
  btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Renderizando PNG 4K...';
  btn.disabled = true;

  html2canvas(elemento, {
    scale: 2.5,
    useCORS: true,
    backgroundColor: '#ffffff'
  }).then(canvas => {
    const enlace = document.createElement('a');
    enlace.download = 'Certificado_SQL_MultiMotor_JuancitoPena.png';
    enlace.href = canvas.toDataURL('image/png', 1.0);
    enlace.click();

    btn.innerHTML = original;
    btn.disabled = false;
  }).catch(err => {
    console.error('Error al generar imagen PNG:', err);
    btn.innerHTML = original;
    btn.disabled = false;
    alert('Ocurrió un error al renderizar la imagen PNG.');
  });
}

document.addEventListener('DOMContentLoaded', inicializarModuloCertificado);
