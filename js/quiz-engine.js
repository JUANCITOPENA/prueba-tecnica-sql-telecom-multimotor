/**
 * ====================================================================================================
 * PROYECTO: MASTERCLASS MULTI-MOTOR & AUDITORÍA INDOTEL (CLARO DOMINICANA)
 * ARCHIVO: js/quiz-engine.js
 * DESCRIPCIÓN: Motor de Examen Técnico Profesional (30 Preguntas, Timer 30m, 3 Rondas Sin Repetición,
 *              Feedback Interactivo Verde/Rojo, Historial LocalStorage y Repaso)
 * AUTOR: ING. JUANCITO PEÑA | CEO DataIADev.com
 * ====================================================================================================
 */

class QuizEngine {
  constructor() {
    this.totalPreguntasPorExamen = 30;
    this.duracionTotalSegundos = 30 * 60; // 30 minutos = 1800s
    this.segundosRestantes = this.duracionTotalSegundos;
    this.timerInterval = null;

    this.preguntasActuales = [];
    this.indicePreguntaActual = 0;
    this.respuestasUsuario = {}; // { indicePregunta: { opcionSeleccionada, esCorrecta, respondida: true } }
    
    this.buenas = 0;
    this.malas = 0;
    this.examenEnCurso = false;
    this.examenFinalizado = false;

    this.init();
  }

  init() {
    this.vincularEventos();
    this.renderizarHistorialEnPantalla();
  }

  vincularEventos() {
    const btnIniciar = document.getElementById('btn-iniciar-quiz');
    const btnReiniciar = document.getElementById('btn-reiniciar-quiz');
    const btnAnterior = document.getElementById('btn-quiz-anterior');
    const btnSiguiente = document.getElementById('btn-quiz-siguiente');
    const btnFinalizar = document.getElementById('btn-quiz-finalizar');

    if (btnIniciar) btnIniciar.addEventListener('click', () => this.iniciarExamen());
    if (btnReiniciar) btnReiniciar.addEventListener('click', () => this.iniciarExamen());
    if (btnAnterior) btnAnterior.addEventListener('click', () => this.navegar(-1));
    if (btnSiguiente) btnSiguiente.addEventListener('click', () => this.navegar(1));
    if (btnFinalizar) btnFinalizar.addEventListener('click', () => this.finalizarExamen(true));
  }

  // Algoritmo de selección: 3 tandas de 30 sin repetición garantizadas, luego aleatorio
  seleccionarPreguntasParaExamen() {
    const banco = window.BANCO_PREGUNTAS_100 || [];
    if (banco.length === 0) return [];

    let preguntasUsadas = JSON.parse(localStorage.getItem('quiz_preguntas_usadas_ids') || '[]');
    let intentosPrevios = JSON.parse(localStorage.getItem('quiz_intentos_historico') || '[]');

    // Filtramos las no usadas en las tandas previas
    let disponibles = banco.filter(p => !preguntasUsadas.includes(p.id));

    // Si quedan menos de 30 o ya se completaron 3 tandas completas (>= 90 preguntas), reiniciamos ciclo
    if (disponibles.length < this.totalPreguntasPorExamen || intentosPrevios.length >= 3) {
      preguntasUsadas = [];
      localStorage.setItem('quiz_preguntas_usadas_ids', JSON.stringify([]));
      disponibles = [...banco];
    }

    // Mezcla de Fisher-Yates sobre las disponibles
    const barajadas = [...disponibles];
    for (let i = barajadas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [barajadas[i], barajadas[j]] = [barajadas[j], barajadas[i]];
    }

    const seleccionadas = barajadas.slice(0, this.totalPreguntasPorExamen);

    // Actualizamos preguntas usadas en localStorage
    const nuevosUsados = [...preguntasUsadas, ...seleccionadas.map(p => p.id)];
    localStorage.setItem('quiz_preguntas_usadas_ids', JSON.stringify(nuevosUsados));

    // Rotación y barajado de las 4 opciones por cada pregunta seleccionada
    // Garantiza que la respuesta correcta no esté siempre en la misma posición (ej. opción 2 / índice 1)
    // El sutil guiño (" .") viaja de manera transparente con el texto de la opción correcta.
    const seleccionadasConOpcionesRotadas = seleccionadas.map(p => {
      const textoCorrecto = p.opciones[p.correcta];
      const opcionesCopia = [...p.opciones];

      for (let k = opcionesCopia.length - 1; k > 0; k--) {
        const r = Math.floor(Math.random() * (k + 1));
        [opcionesCopia[k], opcionesCopia[r]] = [opcionesCopia[r], opcionesCopia[k]];
      }

      const nuevoIndiceCorrecta = opcionesCopia.indexOf(textoCorrecto);

      return {
        ...p,
        opciones: opcionesCopia,
        correcta: nuevoIndiceCorrecta
      };
    });

    return seleccionadasConOpcionesRotadas;
  }

  iniciarExamen() {
    this.preguntasActuales = this.seleccionarPreguntasParaExamen();
    this.indicePreguntaActual = 0;
    this.respuestasUsuario = {};
    this.buenas = 0;
    this.malas = 0;
    this.segundosRestantes = this.duracionTotalSegundos;
    this.examenEnCurso = true;
    this.examenFinalizado = false;

    // Ajustar visibilidad de contenedores UI
    document.getElementById('quiz-intro-card')?.classList.add('d-none');
    document.getElementById('quiz-result-card')?.classList.add('d-none');
    document.getElementById('quiz-active-card')?.classList.remove('d-none');

    this.actualizarMetricasEnVivo();
    this.renderizarPreguntaActual();
    this.iniciarTemporizador();

    // Scroll suave hacia la sección del quiz
    document.getElementById('seccion-quiz')?.scrollIntoView({ behavior: 'smooth' });
  }

  iniciarTemporizador() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    const timerBadge = document.getElementById('quiz-timer-display');
    const timerProgress = document.getElementById('quiz-timer-progress');

    this.actualizarTextoTimer(timerBadge, timerProgress);

    this.timerInterval = setInterval(() => {
      this.segundosRestantes--;
      this.actualizarTextoTimer(timerBadge, timerProgress);

      if (this.segundosRestantes <= 0) {
        clearInterval(this.timerInterval);
        alert('⏳ ¡Tiempo expirado! Los 30 minutos de la prueba técnica han concluido. Se consolidarán tus respuestas.');
        this.finalizarExamen(false);
      }
    }, 1000);
  }

  actualizarTextoTimer(timerBadge, timerProgress) {
    if (!timerBadge) return;
    const minutos = Math.floor(this.segundosRestantes / 60);
    const segundos = this.segundosRestantes % 60;
    const formato = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
    
    timerBadge.innerHTML = `<i class="bi bi-stopwatch"></i> ${formato}`;

    // Alerta visual últimos 5 minutos
    if (this.segundosRestantes <= 300) {
      timerBadge.classList.remove('badge-soft-dark');
      timerBadge.classList.add('bg-danger', 'text-white', 'animate-pulse');
    } else {
      timerBadge.classList.remove('bg-danger', 'animate-pulse');
      timerBadge.classList.add('badge-soft-dark');
    }

    if (timerProgress) {
      const porcentaje = ((this.duracionTotalSegundos - this.segundosRestantes) / this.duracionTotalSegundos) * 100;
      timerProgress.style.width = `${porcentaje}%`;
    }
  }

  renderizarPreguntaActual() {
    const q = this.preguntasActuales[this.indicePreguntaActual];
    if (!q) return;

    // Actualizar números de cabecera
    const txtNumero = document.getElementById('quiz-pregunta-numero');
    const txtCategoria = document.getElementById('quiz-pregunta-categoria');
    const txtTitulo = document.getElementById('quiz-pregunta-texto');
    const containerOpciones = document.getElementById('quiz-opciones-container');

    if (txtNumero) txtNumero.innerText = `Pregunta ${this.indicePreguntaActual + 1} de ${this.totalPreguntasPorExamen}`;
    if (txtCategoria) txtCategoria.innerText = q.categoria;
    if (txtTitulo) txtTitulo.innerText = q.pregunta;

    const respondida = this.respuestasUsuario[this.indicePreguntaActual];

    const letras = ['A', 'B', 'C', 'D'];
    containerOpciones.innerHTML = q.opciones.map((opc, idx) => {
      let estiloClase = "quiz-opcion-btn";
      let iconoStatus = `<span class="quiz-opcion-letra">${letras[idx]}</span>`;

      if (respondida) {
        if (idx === q.correcta) {
          // Fondo verde para la respuesta correcta
          estiloClase += " quiz-opcion-correcta";
          iconoStatus = `<span class="badge bg-success me-2"><i class="bi bi-check-lg"></i> Correcta</span>`;
        } else if (idx === respondida.opcionSeleccionada && !respondida.esCorrecta) {
          // Texto rojo y borde de error si fue la seleccionada incorrectamente
          estiloClase += " quiz-opcion-erronea";
          iconoStatus = `<span class="badge bg-danger me-2"><i class="bi bi-x-lg"></i> Tu Respuesta</span>`;
        }
      }

      return `
        <button class="btn w-100 text-start mb-3 p-3 border border-2 border-dark rounded-3 ${estiloClase}" 
                onclick="window.quizEngineInstance.seleccionarOpcion(${idx})"
                ${respondida ? 'disabled' : ''}>
          <div class="d-flex align-items-center">
            ${iconoStatus}
            <div class="ms-2 flex-grow-1">${opc}</div>
          </div>
        </button>
      `;
    }).join('');

    // Explicación técnica visible si ya respondió
    const feedbackBox = document.getElementById('quiz-feedback-explicacion');
    if (feedbackBox) {
      if (respondida) {
        feedbackBox.classList.remove('d-none');
        feedbackBox.innerHTML = `
          <div class="alert ${respondida.esCorrecta ? 'alert-success border-success' : 'alert-danger border-danger'} border-2 rounded-3 mt-3 shadow-sm">
            <h6 class="fw-bold mb-1">
              ${respondida.esCorrecta ? '✅ ¡Respuesta Exacta!' : '❌ Respuesta Incorrecta'}
            </h6>
            <p class="mb-0 small">${q.explicacion}</p>
          </div>
        `;
      } else {
        feedbackBox.classList.add('d-none');
        feedbackBox.innerHTML = '';
      }
    }

    // Botones de navegación
    const btnAnterior = document.getElementById('btn-quiz-anterior');
    const btnSiguiente = document.getElementById('btn-quiz-siguiente');
    const btnFinalizar = document.getElementById('btn-quiz-finalizar');

    if (btnAnterior) btnAnterior.disabled = (this.indicePreguntaActual === 0);
    
    if (this.indicePreguntaActual === this.totalPreguntasPorExamen - 1) {
      btnSiguiente?.classList.add('d-none');
      btnFinalizar?.classList.remove('d-none');
    } else {
      btnSiguiente?.classList.remove('d-none');
      btnFinalizar?.classList.add('d-none');
    }
  }

  seleccionarOpcion(idx) {
    if (this.respuestasUsuario[this.indicePreguntaActual]) return; // ya respondida

    const q = this.preguntasActuales[this.indicePreguntaActual];
    const esCorrecta = (idx === q.correcta);

    this.respuestasUsuario[this.indicePreguntaActual] = {
      opcionSeleccionada: idx,
      esCorrecta: esCorrecta,
      preguntaId: q.id
    };

    if (esCorrecta) {
      this.buenas++;
    } else {
      this.malas++;
    }

    this.actualizarMetricasEnVivo();
    this.renderizarPreguntaActual();
  }

  actualizarMetricasEnVivo() {
    const txtBuenas = document.getElementById('quiz-metric-buenas');
    const txtMalas = document.getElementById('quiz-metric-malas');
    const txtRestantes = document.getElementById('quiz-metric-restantes');
    const barraProgreso = document.getElementById('quiz-progreso-preguntas');

    const respondidasTotal = Object.keys(this.respuestasUsuario).length;
    const pendientes = this.totalPreguntasPorExamen - respondidasTotal;

    if (txtBuenas) txtBuenas.innerText = this.buenas;
    if (txtMalas) txtMalas.innerText = this.malas;
    if (txtRestantes) txtRestantes.innerText = pendientes;

    if (barraProgreso) {
      const porcentaje = (respondidasTotal / this.totalPreguntasPorExamen) * 100;
      barraProgreso.style.width = `${porcentaje}%`;
    }
  }

  navegar(delta) {
    const nuevoIndice = this.indicePreguntaActual + delta;
    if (nuevoIndice >= 0 && nuevoIndice < this.totalPreguntasPorExamen) {
      this.indicePreguntaActual = nuevoIndice;
      this.renderizarPreguntaActual();
    }
  }

  finalizarExamen(confirmadoPorUsuario = true) {
    if (confirmadoPorUsuario) {
      const respondidas = Object.keys(this.respuestasUsuario).length;
      if (respondidas < this.totalPreguntasPorExamen) {
        const confirmar = confirm(`Aún tienes ${this.totalPreguntasPorExamen - respondidas} preguntas sin responder. ¿Deseas entregar el examen ahora?`);
        if (!confirmar) return;
      }
    }

    clearInterval(this.timerInterval);
    this.examenEnCurso = false;
    this.examenFinalizado = true;

    const tiempoUsadoSegundos = this.duracionTotalSegundos - this.segundosRestantes;
    const minutosUsados = Math.floor(tiempoUsadoSegundos / 60);
    const segundosUsados = tiempoUsadoSegundos % 60;
    const tiempoFormato = `${minutosUsados}m ${segundosUsados}s`;

    const calificacion = Math.round((this.buenas / this.totalPreguntasPorExamen) * 100);

    // Guardar en histórico de LocalStorage
    const intento = {
      id: 'EXAM-' + Date.now(),
      fecha: new Date().toLocaleString('es-DO', { dateStyle: 'medium', timeStyle: 'short' }),
      calificacion: calificacion,
      buenas: this.buenas,
      malas: this.malas,
      total: this.totalPreguntasPorExamen,
      tiempoUsado: tiempoFormato,
      segundosUsados: tiempoUsadoSegundos,
      preguntasResumen: this.preguntasActuales.map((p, idx) => ({
        pregunta: p.pregunta,
        correcta: p.correcta,
        opciones: p.opciones,
        explicacion: p.explicacion,
        respuestaUsuario: this.respuestasUsuario[idx] ? this.respuestasUsuario[idx].opcionSeleccionada : null,
        acerto: this.respuestasUsuario[idx] ? this.respuestasUsuario[idx].esCorrecta : false
      }))
    };

    let historico = JSON.parse(localStorage.getItem('quiz_intentos_historico') || '[]');
    historico.unshift(intento);
    localStorage.setItem('quiz_intentos_historico', JSON.stringify(historico));

    this.renderizarReporteDeNotas(intento);
    this.renderizarHistorialEnPantalla();
  }

  renderizarReporteDeNotas(intento) {
    document.getElementById('quiz-active-card')?.classList.add('d-none');
    const resultCard = document.getElementById('quiz-result-card');
    if (!resultCard) return;

    resultCard.classList.remove('d-none');

    const badgeAprobado = intento.calificacion >= 75
      ? `<span class="badge bg-success text-white border border-dark p-2 fs-6">🏆 APROBADO (NIVEL PROFESIONAL SENIOR)</span>`
      : `<span class="badge bg-danger text-white border border-dark p-2 fs-6">⚠️ REPROBADO (REQUIERE REPASO TÉCNICO)</span>`;

    document.getElementById('result-badge-aprobacion').innerHTML = badgeAprobado;
    document.getElementById('result-score-number').innerText = `${intento.calificacion} / 100`;
    document.getElementById('result-score-buenas').innerText = `${intento.buenas} de ${intento.total}`;
    document.getElementById('result-score-malas').innerText = `${intento.malas}`;
    document.getElementById('result-score-tiempo').innerText = intento.tiempoUsado;

    // Guardar último intento para el generador de certificado
    window.ultimoIntentoExamen = intento;

    // Renderizar desglose detallado para repasar
    const containerRepaso = document.getElementById('quiz-repaso-preguntas-lista');
    if (containerRepaso) {
      containerRepaso.innerHTML = intento.preguntasResumen.map((item, idx) => {
        const estadoBadge = item.acerto
          ? `<span class="badge bg-success text-white border border-dark">Acierto</span>`
          : `<span class="badge bg-danger text-white border border-dark">Fallo</span>`;

        return `
          <div class="p-3 mb-3 border border-2 border-dark rounded-3 bg-white" style="box-shadow: 3px 3px 0 #000;">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <strong class="text-dark">Pregunta ${idx + 1}</strong>
              ${estadoBadge}
            </div>
            <p class="fw-bold mb-2 text-dark">${item.pregunta}</p>
            <div class="small mb-2">
              <div class="text-success fw-bold">✓ Respuesta Correcta: ${item.opciones[item.correcta]}</div>
              ${!item.acerto && item.respuestaUsuario !== null ? `<div class="text-danger fw-bold">✗ Tu Elección: ${item.opciones[item.respuestaUsuario]}</div>` : ''}
              ${item.respuestaUsuario === null ? `<div class="text-muted fw-bold">○ Sin responder</div>` : ''}
            </div>
            <div class="p-2 bg-light border rounded small text-secondary">
              <strong>Explicación:</strong> ${item.explicacion}
            </div>
          </div>
        `;
      }).join('');
    }

    resultCard.scrollIntoView({ behavior: 'smooth' });
  }

  renderizarHistorialEnPantalla() {
    const containerHistorial = document.getElementById('quiz-historial-tbody');
    if (!containerHistorial) return;

    const historico = JSON.parse(localStorage.getItem('quiz_intentos_historico') || '[]');

    if (historico.length === 0) {
      containerHistorial.innerHTML = `
        <tr>
          <td colspan="6" class="text-center text-muted py-4">
            <i class="bi bi-info-circle me-1"></i> Aún no has realizado intentos. Haz clic en "Iniciar Prueba Técnica" para registrar tu primer examen.
          </td>
        </tr>
      `;
      return;
    }

    containerHistorial.innerHTML = historico.map((h, idx) => `
      <tr>
        <td class="fw-bold">${historico.length - idx}</td>
        <td>${h.fecha}</td>
        <td><span class="badge ${h.calificacion >= 75 ? 'bg-success' : 'bg-danger'} border border-dark">${h.calificacion}%</span></td>
        <td class="text-success fw-bold">${h.buenas}</td>
        <td class="text-danger fw-bold">${h.malas}</td>
        <td>${h.tiempoUsado}</td>
      </tr>
    `).join('');
  }
}

// Inicialización global
document.addEventListener('DOMContentLoaded', () => {
  window.quizEngineInstance = new QuizEngine();
});
