
 // Timer autonomo e riutilizzabile, un conto alla rovescia per domanda.
function createQuestionTimer(secondsElement, circleElement, onExpire) {
  const radius = 49;
  const circumference = 2 * Math.PI * radius;
  let intervalId = null;
  circleElement.style.strokeDasharray = String(circumference);

  function stop() {
    if (intervalId !== null) clearInterval(intervalId);
    intervalId = null;
  }

  function start(durationSeconds) {
    stop();
    const deadline = Date.now() + durationSeconds * 1000;
    let expired = false;
    function draw() {
      const remainingMs = Math.max(0, deadline - Date.now());
      secondsElement.textContent = String(Math.ceil(remainingMs / 1000));
      circleElement.style.strokeDashoffset = String(circumference * (1 - remainingMs / (durationSeconds * 1000)));
      if (remainingMs === 0 && !expired) {
        expired = true;
        stop();
        onExpire();
      }
    }
    draw();
    intervalId = setInterval(draw, 100);
  }
  return { start, stop };
}


// ======================== RESULTS ========================
//
// Recupero i risultati salvati da quiz.js tramite sessionStorage.
// Aggiorno le percentuali, il numero di risposte corrette e sbagliate
// e il grafico circolare nella pagina results.html.
// =========================================================

// Recupero i risultati dalla memoria della sessione
const savedResults = sessionStorage.getItem("quizResults")

if (savedResults) {

    // Converto i dati salvati in un oggetto JavaScript
    const results = JSON.parse(savedResults)

    // Recupero il numero di risposte corrette e il totale
    const correct = results.correct
    const total = results.total

    // Calcolo le risposte sbagliate
    const wrong = total - correct

    // Calcolo le percentuali
    const correctPercent = total > 0
        ? Math.round((correct / total) * 100)
        : 0

    const wrongPercent = 100 - correctPercent

    // ================= RISPOSTE CORRETTE =================

    document.getElementById("correct-percent").textContent =
        correctPercent + "%"

    document.getElementById("correct-count").textContent =
        `${correct} / ${total} questions`


    // ================= RISPOSTE SBAGLIATE =================

    document.getElementById("wrong-percent").textContent =
        wrongPercent + "%"

    document.getElementById("wrong-count").textContent =
        `${wrong} / ${total} questions`


    // ================= GRAFICO RISULTATI =================

    // Aggiorno la percentuale al centro del grafico
    document.getElementById("score-center").textContent =
        correctPercent + "%"

    // Aggiorno il grafico circolare tramite la variabile CSS
    document.getElementById("score-visual").style.setProperty(
        "--score-percent",
        correctPercent + "%"
    )

    // ================= MESSAGGIO FINALE =================

    document.getElementById("result-message").textContent =
        "Your exam is complete."

} else {

    // Se non ci sono risultati salvati
    document.getElementById("result-message").textContent =
        "No results available. Please complete the quiz."

}
