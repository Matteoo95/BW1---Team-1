const checkbox  = document.getElementById("promise-checkbox")
const button    = document.getElementById("proceed-button")

//quando la checkbox cambia, quindi viene selzionata, 
//tolgo l'attributo disabled, altrimenti se toglie la spunto lo rimetto 
checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        button.removeAttribute("disabled")
    } else {
        button.setAttribute("disabled", "true")
    }   
})

//quando il bottone è abilitato, al click si carica la pagina del quiz
button.addEventListener("click", () =>{
    window.location.href = "./quiz.html"
})
