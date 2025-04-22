// Función para aumentar / disminuir cantidad

// ERROR ENCONTRADO / AGREGAR EL HTML EN JAVASCRIP Y ENVIARLO TODO COMPLETO PARA RENDERIZAR
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
function getProduct(e){
    const quantity = Number(e.target.closest("div").children[3].textContent)
    const id = Number(e.target.closest("div").id)
    const res = {
        id : id,
        quantity : quantity
    }
    return res
}