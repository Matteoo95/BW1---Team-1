const checkbox  = document.getElementById("promise-checkbox")
const button    = document.getElementById("proceed-button")

// Il bottone PROCEED si abilita solo quando la checkbox è spuntata
checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        button.removeAttribute("disabled")
    } else {
        button.setAttribute("disabled", "true")
    }   
})

button.addEventListener("click", () =>{
    window.location.href = "./quiz.html"
})
