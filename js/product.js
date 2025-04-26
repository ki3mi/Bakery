// Función para aumentar / disminuir cantidad

function renderProduct(id, url, product){
    const container = document.getElementById(id)
    fetch(url)
        .then(res => res.text())
        .then(data => {
            container.innerHTML += data
            const component = container.lastElementChild
            component.id = product.id
            component.children[0].textContent = product.name
            component.children[1].src = product.img
            component.children[2].textContent = product.price
        })
        .catch(error => console.log("Error al cargar el Producto" + url, error))
}

function modifyQuantity(e){
    const input = e.target.closest("div").children[1]
    switch(e.target.className){
        case "add":
            input.value = Number(input.value) + 1
            break
        case "decrease":
            if (Number(input.value) > 1){
                input.value = Number(input.value) - 1
            }
            break
    }
}

// Guardar producto en el carrit de compras
function saveInShoppingCart(id, quantity){
    const element = {
        "id":id,
        "quantity":quantity
    }
    storageElementInLocalStorage(element, shopCart)
}