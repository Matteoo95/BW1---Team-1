const score = 4

//quando avro i dati di Giuseppe
//const score = Number(sessionStorage.getItem("score"))

//funzione che conta il numero complessivo di domande
//dall'array fornito contenente le domande
function countQuestion(arrQuestions){
    return arrQuestions.length
}

const totalQuestions = countQuestion(questions)


//Funzione che presi i dati forniti calcola le risposte totali, corrette, incorrette, e le varie percentuali
function calculateResults(score, totalQuestions){
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

//funzione che restituisce un valore booleano . true se passato false se bocciato
function checkPassed(percentage){
    return percentage >= 60
}


// Funzione che recupera gli elementi del DOM scritti da Matteo
function renderResults(results){

    // Prendo percentuale corretta e counter corrette
    const correctPercent = document.getElementById('correct-percent')
    const correctAnswer = document.getElementById('correct-count')

    // Prendo percentuale sbagliata e counter sbagliate
    const wrongPercent = document.getElementById('wrong-percent')
    const wrongAnswer = document.getElementById('wrong-count')

    // Modifico gli elementi con i risultati effettivi
    correctPercent.innerText = results.correctPercentage + "%"
    correctAnswer.innerText = results.correctAnswer + " / " + results.total + " questions"

    wrongPercent.innerText = results.wrongPercentage + "%"
    wrongAnswer.innerText = results.wrongAnswer + " / " + results.total + " questions"
}

//funcione che in base al risultato dell'esame comunica se è passato oppure no
//con un messaggio testuale
function renderMessage(isPassed){
    const resultMessage = document.getElementById('result-message')
    if(isPassed){
        resultMessage.innerText = "Congratulations! You passed the exam."
    }else{
        resultMessage.innerText = "Unfortunately, you did not pass the exam."
    }
}

//funzione che in base alla percentuale cambia sia il valore allìinterno del cerchio
//sia il colore del cerchio modificando il css in base comunque alla percentuale
function renderChart(percentage){
    //recupero elemento score center e score visual
    const scoreCenter = document.getElementById ('score-center')
    const scoreVisual = document.getElementById ('score-visual')

    scoreCenter.innerText = percentage + "%"

    //modifico scoreVisual (quindi cerchio) con setProperty (nuova)
    //(proprieta e valore) , quindi --score-percent, 60%
    scoreVisual.style.setProperty("--score-percent", 
        percentage +"%")
}


//funzione che richiama le altre funzioni e passa
function showResults(score,totalQuestions){
    const allResults = calculateResults(score, totalQuestions)
    renderResults(allResults)

    const isPassed = checkPassed(allResults.correctPercentage)
    renderMessage(isPassed)
    renderChart(allResults.correctPercentage)
}

showResults(score, totalQuestions)