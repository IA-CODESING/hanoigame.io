let objetos = {
    "a": ["torre_1", "torre_2", "torre_3"]
}
let torresTotales = 3;
let contador = 0;
// Funcion iniciadora
function main() {
    pintar("a");
    inicio();
}

// inicio del juego
function inicio() {
    console.log("Juego cargardo");
    let torres = document.querySelectorAll("div#contenedor > div > div");
    let soltar = document.querySelectorAll("div#contenedor > div");

// Handles de agarrado
    for(let i = 0; i < torres.length; i++) {
        torres[i].addEventListener("dragstart", arrastradoInicial, false);
        torres[i].addEventListener("dragend", finalizado, false);
    }
    
// Handles de soltado
    for(let i = 0; i < soltar.length; i++) {
        soltar[i].addEventListener("dragenter", (e)=>e.preventDefault(), false);
        soltar[i].addEventListener("dragover", (e)=>e.preventDefault(), false);
        soltar[i].addEventListener("drop", dropFinal, false);
    }
    
}

/* Funciones de arrastrar y soltar */
// Arrastrado
function arrastradoInicial(e) {
    let padre = e.target.parentNode;
    if(padre.childNodes[0].id === e.target.id) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("Text", e.target.id);        
    }

}
function finalizado(e) {
    e.preventDefault();
    let final = document.getElementById("c");
    let ganar = document.querySelector("div#salida > div");
    if(final.childNodes.length === torresTotales) {
        ganar.innerHTML = "HAS GANADO UN PREMIO :)";
    }
}

//Soltado

function dropFinal(e) {
    // Es la caja donde caen los discos
    e.preventDefault();
    let puntero = e.target;
    let padre = document.getElementById(puntero.id).childNodes;   
    // es el id que recibe
    let item = e.dataTransfer.getData("Text");

    // Comparar la posicion de las piezas
    let puedoPoner = cortaCompa(padre, item);

    if(puntero.id != "torre_1" && puntero.id != "torre_2" && puntero.id != "torre_3" && item != '' &&  puedoPoner) {
        
        let quitar = document.getElementById(item);
        quitar.parentNode.removeChild(quitar);
        puntero.innerHTML = '<div id="'+item+'" draggable="true"></div>' + puntero.innerHTML;
        contador++;
    }
  
    let sal = document.querySelector("div#salida span");
    sal.innerHTML = contador;
    inicio();
}
// Pintador
function pintar(p) {
    let cajas = document.getElementById(p);
    cajas.innerHTML = '';
    for(let i = 0; i < objetos[p].length; i++) {
        cajas.innerHTML += '<div id="'+objetos[p][i]+'" draggable="true"></div>';
    }
    
}

// Funciones de ayuda

// Funcion para cortar y comparar quien es el mayor devolverá true solo si se puede poner el elemento de lo contrario será false
// @param primero - Array
// @Param segundo - string
function cortaCompa(primero, segundo) {
    if(primero[0] == undefined) {
        salida = true;
    } else {
        let salida = ( segundo.split("_")[1] < primero[0].id.split("_")[1] ) ? true: false;
    }
    return salida;
}
// setTimeout(main, 2000);
window.addEventListener("load", main, false);