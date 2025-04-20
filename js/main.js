
// Elementos
const slider = document.getElementById("slider")
const ofertContainer = document.getElementById("secOfert")


// Cargar los componetes principales
document.addEventListener("DOMContentLoaded", () => {
    cargarComponente("header", "components/header.html")
    cargarComponente("footer", "components/footer.html")
    cargarComponente("ofertContainer", "components/product.html")
    cargarComponente("ofertContainer", "components/product.html")
    cargarComponente("ofertContainer", "components/product.html")
    
})
// Cargar las animaciones principales
// window.addEventListener("load", () => {
//     document.querySelectorAll(".fade-in").forEach(element =>{
//         element.classList.add("show")
//     })
// })

// Evento para el slider
slider.addEventListener("click", (e) => {
    const btn = e.target.closest("button")
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
})

// Evento para las ofertas (Función del Porduct.js)
ofertContainer.addEventListener("click", (e)=>modifyQuantity(e))