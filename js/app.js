
// Elementos
const slider = document.getElementById("slider")

// Función para cargar componentes
function cargarComponente(id, url){
    fetch(url)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML += data
        })
        .catch(error => console.log("Error al cargar " + url, error))
}

// Cargar los componetes principales
document.addEventListener("DOMContentLoaded", () => {
    cargarComponente("header", "components/header.html")
    cargarComponente("footer", "components/footer.html")
    cargarComponente("secOfert", "components/product.html")
})
slider.addEventListener("click", (e) => {
    const btn = e.target.closest("button")
    console.log(btn.className);
    if(btn.className.includes("next")){
        const img =  document.getElementById("img-slider")
        if(img.className.includes("clr-secondary")){
            console.log("true");
        }
        img.classList.toggle("clr-secondary")
        img.classList.toggle("clr-alert")
    }else if(btn.className.includes("back")){
        alert("Back")
    }
    console.log(btn);
})

