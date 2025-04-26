// Variables globales
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
            const elements = getElementInLocalStorage(shopCart)
            elements.forEach(el => {
                document.getElementById("modalContent").textContent += "id: " + el.id + " quan: " + el.quantity
            })
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

