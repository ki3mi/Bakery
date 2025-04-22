const productSection = document.getElementById("productSection")
const btnClearSearch = document.getElementById("btn-clearSearch")
const searchBar = document.getElementById("searchBar")


const productUrl = "../products.json"
let products = []

// Unificar el render para que siempre inluya el filtro
function renderFetchProducts(filter){
    const containerProduct = document.getElementById("productSection")
    fetch(productUrl)
        .then(res => res.json())
        .then(data => {
            products = data.filter(product => product.name.toLowerCase().includes(filter))
            containerProduct.innerHTML = ""
            products.forEach(product => {
                renderProduct("productSection", "/components/product.html", product)                
            });
        })
}

// Cargar los componentes
document.addEventListener("DOMContentLoaded", ()=>{
    cargarComponente("header", "/components/header.html")
    cargarComponente("footer", "/components/footer.html")
    // Cargar productos del Json
    renderFetchProducts("")
})

// Eventos de la sección de productos
productSection.addEventListener("click", (e)=>{
    if(e.target.className == "decrease" || e.target.className == "add")
    modifyQuantity(e)
})

// Evento para limpiar la busqueda
btnClearSearch.addEventListener("click", ()=>{
    searchBar.value = ""
    renderFetchProducts("")
})

// Evento para filtrar los datos
searchBar.addEventListener("input", ()=>{
    const text = searchBar.value.toLowerCase()
    renderFetchProducts(text)
})