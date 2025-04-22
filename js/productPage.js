const productSection = document.getElementById("productSection")
const btnClearSearch = document.getElementById("btn-clearSearch")
const searchBar = document.getElementById("searchBar")


const productUrl = "../products.json"
let products = []

// Error en el fetch de los datos, mucha redundancia
function renderFetchProducts(filtered){
    const containerProduct = document.getElementById("productSection")
    if(filtered != null){
        filtered.forEach(product => {
            containerProduct.innerHTML = ""
            renderProduct("productSection", "/components/product.html", product)
        })
    }else{
        fetch(productUrl)
            .then(res=>res.json())
            .then(data=>{
                containerProduct.innerHTML = ""
                products = data                
            })
            .then(()=>{
                products.forEach(product => {
                    renderProduct("productSection", "/components/product.html", product)
                });
            })
            .catch(error => console.log(error))
    }
}

// Función para filtrar productos
function filterProducts(text){
    let filtered = []
    fetch(productUrl)
        .then(res=>res.json())
        .then(data => {
            filtered = data.filter(product => product.name.toLowerCase().includes(text))
            renderFetchProducts(filtered)
        }).catch(error => console.log(error))
}
// Cargar los componentes
document.addEventListener("DOMContentLoaded", ()=>{
    cargarComponente("header", "/components/header.html")
    cargarComponente("footer", "/components/footer.html")
    // Cargar productos del Json
    renderFetchProducts()
})

// Eventos de la sección de productos
productSection.addEventListener("click", (e)=>{
    if(e.target.className == "decrease" || e.target.className == "add")
    modifyQuantity(e)
})

// Evento para limpiar la busqueda
btnClearSearch.addEventListener("click", ()=>{
    searchBar.value = ""
    filterProducts("")
})

// Evento para filtrar los datos
searchBar.addEventListener("input", ()=>{
    const text = searchBar.value.toLowerCase()
    filterProducts(text)
})