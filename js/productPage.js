const productSection = document.getElementById("productSection")
const btnClearSearch = document.getElementById("btn-clearSearch")
const searchBar = document.getElementById("searchBar")

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
                            "<input type='number' value='1' id='amount' disabled data-quantity>"+
                            "<button class='add'>+</button>"+
                        "</div>"+
                        "<div class='options'>"+
                            "<button class='addToCart'>Añadir al carrito</button>"+
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
    const option = e.target

    if(option.className == "decrease" || e.target.className == "add"){
        modifyQuantity(e)
    }
    // AÑADIR AL CARRITO DE COMPRAS
    if(option.className == "addToCart"){
        // Global(app.js) -> shopCart = "shopCartBakery"
        const container = option.closest(".container")
        const productId = Number(container.id) // ID del producto
        let quantity = Number(container.querySelector("[data-quantity]").value)       
        const shopList = getElementInLocalStorage(shopCart)
        const repeated = shopList.filter(el => el.id == productId)

        let id = productId // ID en el localStorage
        if(repeated.length != 0){
            quantity = Number(quantity) + Number(repeated[0].quantity)
            shopList.forEach((el, index) =>{                
                if(el.id == repeated[0].id){
                    id = index
                }
            })
            const element = {
                "id":productId,
                "quantity":quantity
            }
            editElementInLocalStorage(element, id, shopCart)
        }else{
            saveInShoppingCart(productId, quantity)
        }
        // Activar el conteo de cosas en el carrito de compras
        const shopQuantity = document.getElementById("shoppingQuantity")
        shopQuantity.textContent = getElementInLocalStorage(shopCart).length
        shopQuantity.classList.remove("hiddenOption")
        resetQuantity(e)
    }
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
