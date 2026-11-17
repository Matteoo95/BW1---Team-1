// ========DOM(Gabriel)=======//

// elementi di quiz.html che aggiorno a ogni domanda
const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const questionCurrent = document.getElementById("question-current")
const questionTotal = document.getElementById("question-total")


// OGGETTO DI PROVA: stessa forma di quello che restituisce la funzione di Alessandro
// ({ question, answers }). Da togliere quando il suo codice è in main
const testQuestion = {
    question: "Colore giusto?",
    answers: ["<p>blu</p>","verde","giallo","rosso"]
}


// Mostra nella pagina la domanda ricevuta e le sue risposte.
// Riceve: un oggetto { question: stringa, answers: array di stringhe }
// Non controlla se la risposta è giusta --> quello lo fa la logica del quiz
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
        // classe definita in quiz.css da Matteo
        answerButton.classList.add("answer-button")
        // sia qui che sopra textContent e non innerHTML: le risposte contengono tag HTML
        // che vanno mostrati come testo, non interpretati dal browser
        answerButton.textContent = answer
        answersContainer.appendChild(answerButton)
    }
}

// PROVA PER CHIAMARELA FUNZIONE: da togliere, sarà Giuseppe a chiamare renderQuestion
renderQuestion(testQuestion)