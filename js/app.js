// Variables globales
const productUrl = "../products.json" // Link de  los productos
const shopCart = "shopCartBakery" // Nombre del item en el localStorage del carrito de compras
const header = document.getElementById("header")
// console.log(header);


// Cargar componentes
function cargarComponente(id, url){
    return fetch(url)
        .then(res => res.text()
        )
        .then(data => {
            document.getElementById(id).innerHTML += data
        })
        .catch(error => console.log("Error al cargar " + url, error))
}


// CARRITO DE COMPRAS
let isModalOpen = false
header.addEventListener("click", (e)=>{
    if(e.target.id == "closeModalCart" || e.target.id == "shop-modal" || e.target.id == "shoppingCart"){
        header.children[1].classList.toggle("displayNoneOption")
        isModalOpen = !isModalOpen
        if(isModalOpen){
            document.getElementById("shoppingQuantity").classList.add("hiddenOption")
            fetch(productUrl)
                .then(res => res.json())
                .then(data => {
                    let elementsInShopCart = getElementInLocalStorage(shopCart)

                    // Filtrando los produtos en funcion a los IDs del localStorage
                    const ids = new Set(elementsInShopCart.map(element => element.id))
                    const productResults = data.filter(element => ids.has(element.id))

                    let finalHtml = ""
                    elementsInShopCart.sort((a, b) => a.id - b.id) // Ordena la lista de ID/Quantity de forma ascendente
                                     
                    productResults.forEach((product, index) => {
                        const quantity = elementsInShopCart[index].quantity                        
                        const totalPrice = (product.price * quantity).toFixed(2)
                        finalHtml += 
                        "<div class='productInModal' id='"+product.id+"'>"+
                            "<img src='"+product.img+"' alt='' class='imgProduct' data-img>"+
                            "<p data-name>("+quantity+")"+product.name+"</p>"+
                            "<p data-price style='font-weight: bold;'>S/"+totalPrice+"</p>"+
                            "<button class='btn-delete btn-modal'>Quitar</button>"+
                        "</div>"
                    })
                    document.getElementById("modalContent").innerHTML = finalHtml
                    
                })
                .catch(error => console.log("Error al recuperar los datos" + url, error))
            
            
        }
    }
})


// FUNCIONES DEL LOCAL STORAGE
// Obtener grupo de elementos del LocalStorage
function getElementInLocalStorage(group){
    const res = JSON.parse(localStorage.getItem(group) || "[]")
    return res
}

// Obtener grupo de elementos del LocalStorage
function storageElementInLocalStorage(element ,group){
    const elements = getElementInLocalStorage(group)
    elements.push(element)
    localStorage.setItem(group, JSON.stringify(elements))
}

function editElementInLocalStorage(element, id, group){
    const elements = getElementInLocalStorage(group)
    elements[id] = element
    localStorage.setItem(group, JSON.stringify(elements))
}

function deleteElementInLocalStorage(id, group){
    const elements = getElementInLocalStorage(group)
    elements.splice(id, 1)
    localStorage.setItem(group, JSON.stringify(elements))
}

