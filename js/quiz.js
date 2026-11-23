
 // ======================== DOM (Gabriel) ========================
 //
 // COME USARE LE MIE FUNZIONI (per Giuseppe)
 //
 // renderQuestion(questionObj)
 //   Mostra domanda e risposte. Va chiamata a ogni nuova domanda con l'oggetto
 //   { question, answers, correctAnswer } che restituisce extractAnswersQuestion() di Alessandro.
 //   Svuota da sola le risposte precedenti: i bottoni nuovi nascono già abilitati.
 //
 // updateQuestionCounter(current, total)
 //   Aggiorna "QUESTION x / y" in fondo alla pagina.
 //   current parte da 1 (prima domanda = 1), non da 0 come l'indice dell'array.
 //
 // Click su una risposta
 //   Chiamo submitAnswer(answer), che scrivi tu. answer è la stringa identica a quella
 //   nei dati, quindi si confronta direttamente con correctAnswer dell'oggetto domanda.
 //   Dopo il click tutti i bottoni sono disabilitati: si riattivano da soli
 //   quando chiami di nuovo renderQuestion con la domanda successiva.
 //
 // Non ho fatto getSelectedAnswer: al click la risposta arriva già a submitAnswer.
 // ===============================================================


 // Elementi di quiz.html che aggiorno a ogni domanda
 const questionText = document.getElementById("question-text")
 const answersContainer = document.getElementById("answers-container")
 const questionCurrent = document.getElementById("question-current")
 const questionTotal = document.getElementById("question-total")
 const questionTimer = createQuestionTimer(
     document.getElementById("timer-seconds"),
     document.getElementById("timer-progress"),
     () => submitAnswer(null)
 )

 // Variabili per memorizzare le risposte corrette e la domanda attuale
 let correctAnswers = 0
 let activeQuestion = null


 // Mostra nella pagina la domanda ricevuta e le sue risposte.
 // Riceve: un oggetto { question: stringa, answers: array di stringhe }
 // Non controlla se la risposta è giusta: quello lo fa submitAnswer
 function renderQuestion(currentQuestion) {
     // Memorizzo la domanda attuale per verificare la risposta
     activeQuestion = currentQuestion

     // innerHTML e non textContent: vedi il commento in renderAnswers
     questionText.innerHTML = currentQuestion.question
     renderAnswers(currentQuestion.answers)
      // Riavvio il timer a ogni nuova domanda
     questionTimer.start(30)
 }


 // Crea un bottone per ogni risposta dentro answersContainer.
 // Riceve: un array di stringhe
 function renderAnswers(answers) {
     // svuoto il contenitore, così non restano le risposte della domanda precedente
     answersContainer.innerHTML = ""

     for (const answer of answers) {
         const answerButton = document.createElement("button")
         // classe scritta in quiz.css da Matteo
         answerButton.classList.add("answer-button")
         // innerHTML e non textContent: nei dati ci sono codici come &#039; (l'apostrofo)
         // che vanno trasformati nel carattere vero.
         // Nelle domande vere non ci sono tag HTML, quindi innerHTML non crea problemi
         answerButton.innerHTML = answer
         answersContainer.appendChild(answerButton)

         // SELEZIONE: al click coloro solo la risposta scelta.
         // La classe "selected" è scritta in quiz.css da Matteo
         answerButton.addEventListener("click", () => {
             // cerco solo dentro il contenitore delle risposte, non in tutta la pagina
             const allButtons = answersContainer.getElementsByClassName("answer-button")

             // tolgo "selected" da tutti, così è colorata sempre e solo una risposta.
             // Disabilito anche tutti i bottoni: se Giuseppe vuole aspettare un attimo
             // prima della domanda dopo, l'utente non può cliccare un'altra risposta
             for (const button of allButtons) {
                 button.classList.remove("selected")
                 button.setAttribute("disabled", "true")
             }

             // poi la aggiungo solo a quello cliccato
             answerButton.classList.add("selected")

             // passo la risposta scelta a submitAnswer, la funzione di Giuseppe
             submitAnswer(answer)
         })
     }
 }


 // Aggiorna il contatore in fondo alla pagina.
 // Riceve: current = numero della domanda mostrata (parte da 1), total = numero di domande
 function updateQuestionCounter(current, total) {
     questionCurrent.textContent = current
     questionTotal.textContent = total
 }


 // ===================== PROVVISORIO =====================
 // Da sostituire con la logica di Giuseppe.
 // Usa le funzioni di Alessandro (questions.js): funziona solo dopo il merge della sua PR.

 // submitAnswer di prova: stampa la risposta e passa alla domanda successiva
 function submitAnswer(answer) {
     questionTimer.stop()
     console.log("Risposta ricevuta:", answer)

     // Controllo se la risposta data è corretta
     if (answer !== null && answer === activeQuestion.correctAnswer) {
         correctAnswers++
     }

     // salvo in next il risultato della funzione di Alessandro, cioè la domanda successiva
     const next = extractAnswersQuestion()

     // se è null le domande sono finite
     if (next === null) {
         console.log("Domande finite")

         // Salvo i risultati nella memoria della sessione
         sessionStorage.setItem("quizResults", JSON.stringify({
             correct: correctAnswers,
             total: questions.length
         }))

         // Passo alla pagina dei risultati
         window.location.href = "./results.html"
         return
     }

     // altrimenti mostro la nuova domanda e aggiorno il contatore
     renderQuestion(next)
     updateQuestionCounter(currentPosition, questions.length)
 }

 // all'apertura della pagina mostro la prima domanda
 renderQuestion(extractAnswersQuestion())
 updateQuestionCounter(currentPosition, questions.length)
