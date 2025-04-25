const productSection = document.getElementById("productSection")
const btnClearSearch = document.getElementById("btn-clearSearch")
const searchBar = document.getElementById("searchBar")

// Link de  los productos
const productUrl = "../products.json"
let products = []

// Unificar el render para que siempre inluya el filtro
function renderFetchProducts(filter){
    const containerProduct = document.getElementById("productSection")
    let productHtml = ""
    fetch(productUrl)
        .then(res => res.json())
        .then(data => {
            products = data.filter(product => product.name.toLowerCase().includes(filter))
            products.forEach(product => {
                productHtml += 
                "<div class='container product fade-in' id='"+product.id+"'>"+
                    // <!-- Title -->
                    "<h1>"+product.name+"</h1>"+
                    // <!-- img -->
                    "<img src='"+product.img+"' alt=''>"+
                    // <!-- Price -->
                    "<p class='price'>S/. "+product.price+"</p>"+
                    // <!-- Buttons -->
                    "<div>"+
                        "<div class='amount'>"+
                            "<button class='decrease'>-</button>"+
                            "<input type='number' value='1' id='amount' disabled>"+
                            "<button class='add'>+</button>"+
                        "</div>"+
                        "<div class='options'>"+
                            "<button class=''>Añadir al carrito</button>"+
                        "</div>"+
                    "</div>"+
                "</div>"
                // renderProduct("productSection", "/components/product.html", product)                
            })
            containerProduct.innerHTML = productHtml
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
