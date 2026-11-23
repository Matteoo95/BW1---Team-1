const score = Number(sessionStorage.getItem("score"))

function countQuestion(arrQuestions) {
    return arrQuestions.length
}

const totalQuestions = countQuestion(questions)

// Calcola risposte giuste, sbagliate e percentuali
function calculateResults(score, totalQuestions) {
    const total = totalQuestions
    const correctAnswer = score
    const wrongAnswer = totalQuestions - score
    const correctPercentage = (score / totalQuestions) * 100
    const wrongPercentage = (wrongAnswer / totalQuestions) * 100

    return {
        total: total,
        correctAnswer: correctAnswer,
        wrongAnswer: wrongAnswer,
        correctPercentage: correctPercentage,
        wrongPercentage: wrongPercentage
    }

}

// true se il test è superato (60%)
function checkPassed(percentage) {
    return percentage >= 60
}


// Mostra numeri e percentuali nella pagina
function renderResults(results) {

    const correctPercent = document.getElementById('correct-percent')
    const correctAnswer = document.getElementById('correct-count')
    const wrongPercent = document.getElementById('wrong-percent')
    const wrongAnswer = document.getElementById('wrong-count')

    correctPercent.innerText = results.correctPercentage + "%"
    correctAnswer.innerText = results.correctAnswer + " / " + results.total + " questions"

    wrongPercent.innerText = results.wrongPercentage + "%"
    wrongAnswer.innerText = results.wrongAnswer + " / " + results.total + " questions"
}

// Messaggio di esito: superato o non superato
function renderMessage(isPassed) {
    const resultMessage = document.getElementById('result-message')
    if (isPassed) {
        resultMessage.innerText = "Congratulations! You passed the exam."
    } else {
        resultMessage.innerText = "Unfortunately, you did not pass the exam."
    }
}

// Aggiorna il numero al centro e il grafico circolare
function renderChart(percentage) {
    const scoreCenter = document.getElementById('score-center')
    const scoreVisual = document.getElementById('score-visual')

    scoreCenter.innerText = percentage + "%"

    // aggiorna la variabile CSS che disegna il grafico
    scoreVisual.style.setProperty("--score-percent",
        percentage + "%")
}


// Calcola i risultati e li mostra nella pagina
function showResults(score, totalQuestions) {
    const allResults = calculateResults(score, totalQuestions)
    renderResults(allResults)

    const isPassed = checkPassed(allResults.correctPercentage)
    renderMessage(isPassed)
    renderChart(allResults.correctPercentage)
}

showResults(score, totalQuestions)