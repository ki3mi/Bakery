// Función para aumentar / disminuir cantidad

// NOTA : ARREGLAR EL ERROR DE EVENT. Que solo detecte el producto
document.addEventListener("click", (e)=>{
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
})