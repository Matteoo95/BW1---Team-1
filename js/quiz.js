// ========DOM(Gabriel)=======//
//
// COME USARE LE MIE FUNZIONI (per Giuseppe):
// - renderQuestion(questionObj): mostra domanda e risposte. Va chiamata a ogni nuova domanda
//   con l'oggetto { question, answers } che restituisce la funzione di Alessandro.
//   Svuota da sola le risposte precedenti: i bottoni nuovi nascono già abilitati.
// - updateQuestionCounter(current, total): aggiorna "QUESTION x / y" in fondo alla pagina.
//   current parte da 1 (prima domanda = 1), non da 0 come l'indice dell'array.
// - Al click su una risposta chiamo submitAnswer(answer), che scrivi tu.
//   answer è la stringa della risposta identica a quella nei dati,
//   quindi si può confrontare direttamente con correct_answer.
//   Dopo il click tutti i bottoni sono disabilitati: per riattivarli basta
//   chiamare di nuovo renderQuestion con la domanda successiva.
// - Non ho fatto getSelectedAnswer perchè al click si passa subito la risposta selezionata, non serve.

// elementi di quiz.html che aggiorno a ogni domanda
const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const questionCurrent = document.getElementById("question-current")
const questionTotal = document.getElementById("question-total")


// OGGETTI DI PROVA: stessa forma di quello che restituisce la funzione di Alessandro
// ({ question, answers }). Da togliere quando il suo codice è in main.
// La seconda serve solo per provare il passaggio a una domanda nuova
const testQuestion = {
    question: "Colore giusto?",
    answers: ["<p>blu</p>","verde","giallo","rosso"]
}
const testQuestion2 = {
    question: "Piatto giusto?",
    answers: ["<p>carbonare</p>","cacio e pepe","amatriciana","lasagna"]
}


// Mostra nella pagina la domanda ricevuta e le sue risposte.
// Riceve: un oggetto { question: stringa, answers: array di stringhe }
// Non controlla se la risposta è giusta, quello va fatto nella funzione submitAnswer
function renderQuestion(currentQuestion) {
    questionText.textContent = currentQuestion.question
    renderAnswers(currentQuestion.answers)
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
        // sia qui che sopra textContent e non innerHTML perchè le risposte contengono tag HTML
        // che vanno mostrati come testo
        answerButton.textContent = answer
        answersContainer.appendChild(answerButton)

        // SELEZIONE: al click coloro solo la risposta scelta.
        // La classe "selected" è scritta in quiz.css da Matteo
        answerButton.addEventListener("click", () =>{
            // cerco solo dentro il contenitore delle risposte, non in tutta la pagina
            const allButtons = answersContainer.getElementsByClassName("answer-button")

            // prima tolgo "selected" da tutti, così è colorata sempre e solo una risposta
            //disabilito anche tutti i bottoni così se Giuseppe vuole
            //far aspettare qualche secondo prima di passare alla domanda dopo
            //l'utente non può cliccare un'altra risposta
            for (const button of allButtons){
                button.classList.remove("selected")
                button.setAttribute("disabled", "true")
            }

            // poi la aggiungo solo a quello cliccato
            answerButton.classList.add("selected")
            //chiamo la funzione per memorizzare la risposta che farà Giuseppe, 
            //passandogli la risposta selezionata 
            submitAnswer(answer)
        })
    }
}

// Aggiorna il contatore in fondo alla pagina.
// Riceve: current = numero della domanda mostrata, total = numero di domande
function updateQuestionCounter(current, total){
    questionCurrent.textContent = current
    questionTotal.textContent = total
}

// PROVA: submitAnswer è la funzione di Giuseppe
// L'ho messa qui con un console.log solo per controllare che al click
// arrivi il testo giusto. Da togliere quando c'è la sua versione vera
function submitAnswer(answer) {
    console.log("Risposta ricevuta:", answer)
}

// PROVA PER CHIAMARE LA FUNZIONE: da togliere, sarà Giuseppe a chiamare renderQuestion
renderQuestion(testQuestion)