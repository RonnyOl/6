let containerTienda = document.getElementById("containerTienda") 
let titleTienda = document.getElementById("titleTienda")

let btnMostrar = document.getElementById("mostrarTienda")
let subContainerInfo = document.getElementById("subContainerInfo")
let index = 0;
function actualizarHora(d){
    let hora = ` ${d.date}`.substring(0,11)
    titleTienda.innerText = "Tienda de fortnite del dia" + hora;
    
}

 
fetch("https://fortnite-api.com/v2/shop/br")
.then((res) => res.json())
.then((json) => actualizarHora(json.data));


fetch("https://fortnite-api.com/v2/shop/br")
.then((res) => res.json())
.then((json) => btnMostrar.addEventListener("click", () => {
    index = 0;
    subContainerInfo.innerHTML = ""
    containerTienda.innerHTML = ""
    mostrarListaInformacion(json.data.featured.entries)
    
}));

 function mostrarListaInformacion(objTiendas){

    objTiendas.forEach(nodo=> {
            mostrarInformacion(nodo)
    })
    
}

function mostrarInformacion(obj) {
    
    let containerObjeto = document.createElement("div");
    containerObjeto.setAttribute(`style`, `background-repeat: no-repeat;background-size: cover;background-image:url("${obj.layout.background != null ? obj.layout.background : `https://i.redd.it/ab94i3q4agk21.jpg` }")`)
    containerObjeto.innerHTML = `
        <h4>${obj.bundle != undefined ? obj.bundle.name : obj.items[0].name}</h4>
        <img width="250px" src="${obj.bundle == null ? obj.items[0].images.icon : obj.bundle.image}">
        <p style="display:flex;gap:0.3rem;">${obj.finalPrice} <img width="30px" src="https://fortnite-api.com/images/vbuck.png"></p> 
        <button id="btnDetalle${index}">Detalle</button>
    `;
    
    containerTienda.appendChild(containerObjeto)
    
    btnDetalleP(index)
    
    index++;
    
}

function btnDetalleP(id){
    
    let btnDetalle = document.getElementById(`btnDetalle${id}`)
    
    btnDetalle.addEventListener("click", () => {
        cargarInformacionDetallada(id)
    })
}

function cargarInformacionDetallada(id){
    console.log(id)
    fetch("https://fortnite-api.com/v2/shop/br")
.then((res) => res.json())
.then((json) => mostrarInformacionDetallada(json.data.featured.entries[id]));
        
    
}

function mostrarInformacionDetallada(obj) {
    let infoDetallada = document.createElement("div")
    containerTienda.innerHTML = ""
    console.log(obj)
    infoDetallada.setAttribute(`style`, `background-repeat: no-repeat;background-size: center;background-image:url("${obj.layout.background != null ? obj.layout.background : `https://i.redd.it/ab94i3q4agk21.jpg` }")`)
    infoDetallada.innerHTML = `
    <h4>${obj.bundle != undefined ? obj.bundle.name : obj.items[0].name}</h4>
        <img width="300px" src="${obj.bundle == null ? obj.items[0].images.icon : obj.bundle.image}">
        <p>${obj.finalPrice} <img width="20px" src="https://fortnite-api.com/images/vbuck.png"></p> 
    `;
    containerTienda.appendChild(infoDetallada)
    
    obj.items.forEach((item) =>{
        let objItems = document.createElement("div")
        objItems.setAttribute(`style`, `background-repeat: no-repeat;background-size: cover;background-image:url("${obj.layout.background != null ? obj.layout.background : `https://i.redd.it/ab94i3q4agk21.jpg` }")`)
        
        objItems.innerHTML = `
            <h4> ${item.name}</h4>
            <img width="300px"src="${item.images.featured != null ? item.images.featured: item.images.icon}">

        `
        console.log(item)
        subContainerInfo.appendChild(objItems)
    })

}
