// Cargar componentes
function cargarComponente(id, url){
    fetch(url)
        .then(res => res.text()
        )
        .then(data => {
            document.getElementById(id).innerHTML += data            
        })
        .catch(error => console.log("Error al cargar " + url, error))
}
