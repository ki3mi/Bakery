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

header.addEventListener("click", (e)=>{
    // console.log(e.target);
    if(e.target.id == "closeModalCart" || e.target.id == "shop-modal" || e.target.id == "shoppingCart"){
        console.log("Encontrado");
        header.children[1].classList.toggle("hiddenOption")
    }

    // AÑADIR LOS ELEMENTOS AGREGADOS AL CARRITO
})