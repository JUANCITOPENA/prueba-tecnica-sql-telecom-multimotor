/**
 * ====================================================================================================
 * PROYECTO: MASTERCLASS MULTI-MOTOR & AUDITORÍA INDOTEL (CLARO DOMINICANA)
 * ARCHIVO: js/matrix-terminal.js
 * DESCRIPCIÓN: Fondo Matrix animado (Digital Rain) y Máquina de escribir para el Mensaje Motivacional
 * AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
 * ====================================================================================================
 */

function inicializarLluviaMatrix() {
  const canvas = document.getElementById('matrix-rain-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function redimensionar() {
    canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || 500;
  }
  redimensionar();
  window.addEventListener('resize', redimensionar);

  // Caracteres Matrix: Katakana, binario, letras de bases de datos
  const letras = '01SELECT*FROM_WHERE_JOIN_INDEX_ACID_CLARO_INDOTEL_DATA_AI_2026_Ωπ∑√µ0101010101';
  const fontSize = 15;
  const columnas = Math.floor(canvas.width / fontSize);
  const gotas = Array(columnas).fill(1);

  function dibujarLluvia() {
    ctx.fillStyle = 'rgba(10, 15, 20, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF66'; // Verde fósforo estilo Matrix
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < gotas.length; i++) {
      const texto = letras.charAt(Math.floor(Math.random() * letras.length));
      ctx.fillText(texto, i * fontSize, gotas[i] * fontSize);

      if (gotas[i] * fontSize > canvas.height && Math.random() > 0.975) {
        gotas[i] = 0;
      }
      gotas[i]++;
    }
  }

  setInterval(dibujarLluvia, 40);
}

// Máquina de escribir para el Manifiesto de Ingeniería y Oportunidades
const MENSAJE_MOTIVACIONAL_MATRIX = `// ============================================================================
// MANIFIESTO DEL ARQUITECTO DIGITAL | POR ING. JUANCITO PEÑA
// CEO DataIADev.com | Santo Domingo, República Dominicana
// ============================================================================

> INICIANDO SECUENCIA DE TRANSMISIÓN NEURAL...
> PROTOCOLO: OPORTUNIDAD & DISRUPCIÓN 2026+

Vivimos el momento más fascinante y desafiante en toda la historia de la tecnología.
La Inteligencia Artificial no vino a quitarte el trabajo: vino a erradicar la mediocridad
y a potenciar a quienes dominan los cimientos reales de la computación.

Muchos cometen el error mortal de creer que la IA lo resuelve todo mágicamente.
Pero una IA sin fundamentos relacionales sólidos, sin comprensión de integridad transaccional,
sin optimización de índices, sin modelado dimensional y sin gobierno de datos,
solo genera alucinaciones a escala industrial.

¡AHORA ES TU MOMENTO!
Las empresas globales y los líderes de telecomunicaciones buscan profesionales que sepan
gobernar los datos con precisión quirúrgica, que entiendan la latencia, el costo del I/O de disco,
los bloqueos ACID y el cumplimiento normativo.

No te quedes estático esperando a que el futuro te alcance.
El conocimiento no se delega: se conquista línea por línea, consulta por consulta, proyecto por proyecto.
Toma el control de tu destino técnico. Construye sistemas resistentes, lidera con ética
y conviértete en la referencia de ingeniería que tu país e industria necesitan.

> FIN DE TRANSMISIÓN: "EL CÓDIGO NO MIENTE. EL FUTURO LO ESCRIBES TÚ."`;

function inicializarMecanografiaMotivacional() {
  const terminalElement = document.getElementById('matrix-typed-text');
  if (!terminalElement) return;

  let index = 0;
  terminalElement.textContent = '';

  function escribirCaracter() {
    if (index < MENSAJE_MOTIVACIONAL_MATRIX.length) {
      terminalElement.textContent += MENSAJE_MOTIVACIONAL_MATRIX.charAt(index);
      index++;
      // Velocidad de escritura realista
      setTimeout(escribirCaracter, MENSAJE_MOTIVACIONAL_MATRIX.charAt(index) === '\n' ? 35 : 12);
    }
  }

  // Activar cuando la sección sea visible con IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && index === 0) {
        escribirCaracter();
      }
    });
  }, { threshold: 0.2 });

  const seccion = document.getElementById('seccion-manifiesto-matrix');
  if (seccion) observer.observe(seccion);
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarLluviaMatrix();
  inicializarMecanografiaMotivacional();
});
