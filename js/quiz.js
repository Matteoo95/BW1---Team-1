// Pagina per il quiz, mostra una domanda alla volta con timer di 30 secondi,
// conta le risposte corrette e alla fine va a results.html

const questionText = document.getElementById("question-text")
const answersContainer = document.getElementById("answers-container")
const questionCurrent = document.getElementById("question-current")
const questionTotal = document.getElementById("question-total")
const questionTimer = createQuestionTimer(
    document.getElementById("timer-seconds"),
    document.getElementById("timer-progress"),
    () => submitAnswer(null)
)

let correctAnswers = 0
let activeQuestion = null

// Mostra la domanda e le risposte, e riavvia il timer
function renderQuestion(currentQuestion) {
    activeQuestion = currentQuestion
    questionText.innerHTML = currentQuestion.question
    renderAnswers(currentQuestion.answers)
    questionTimer.start(30)
}

function renderAnswers(answers) {
    answersContainer.innerHTML = ""
    for (const answer of answers) {
        const answerButton = document.createElement("button")
        answerButton.classList.add("answer-button")
        // innerHTML e non textContent perché nei dati ci sono codici come &#039;
        // che vanno trasformati nel carattere vero.
        answerButton.innerHTML = answer
        answersContainer.appendChild(answerButton)
        
        answerButton.addEventListener("click", () => {
            const allButtons = answersContainer.getElementsByClassName("answer-button")
            // Disabilito tutti i bottoni dopo il click, così non si può rispondere due volte
            for (const button of allButtons) {
                button.classList.remove("selected")
                button.setAttribute("disabled", "true")
            }
            answerButton.classList.add("selected")
            submitAnswer(answer)
        })
    }
}

function updateQuestionCounter(current, total) {
    questionCurrent.textContent = current
    questionTotal.textContent = total
}

// Registra la risposta (null se il tempo è scaduto) e passa alla domanda successiva
function submitAnswer(answer) {
    questionTimer.stop()
    if (answer !== null && answer === activeQuestion.correctAnswer) {
        correctAnswers++
    }
    const next = extractAnswersQuestion()

    if (next === null) {
        // Salvo i risultati per la pagina results.html
        sessionStorage.setItem("score", correctAnswers)
        window.location.href = "./results.html"
        return
    }
    renderQuestion(next)
    updateQuestionCounter(currentPosition, questions.length)
}

renderQuestion(extractAnswersQuestion())
updateQuestionCounter(currentPosition, questions.length)
