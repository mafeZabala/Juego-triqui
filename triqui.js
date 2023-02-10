/* cuando es 1 le toca ala X si el turno es 0 le toca al circulo */
let turno = 1
/* un aray de las figuras o fichas */
let figuras = ["O","X"]
/* figurasPuestas que va indicar el numero de fichas colocadas */
let figurasPuestas=0
/* array.from: instancia una copia superficial con un objeto que es iterable */
let buttons= document.querySelectorAll(".boton")
buttons.forEach(element => element.addEventListener("click",()=>ponerFigura(element)))
/* paratida finalizada */
let partidaFinished = false
let textVictory = document.getElementById("textVictory")
/* utilizada para colocar la fichas del juego */
function ponerFigura(boton){
    /* verificar si la partida no se a acabado y que el boton no haya precionado un boton antes (comprobar que le text del boton este vacio)*/
    if(boton.innerHTML == "" &&             !partidaFinished){
        boton.innerHTML = figuras[turno]
        figurasPuestas += 1
        let partida = EstadoDeLaPartida()
        if(partida == 0){
            Turno()
            if(figurasPuestas < 9){
                /* funcion */
                Boxito()
                /* estado */
                partida = EstadoDeLaPartida()
                figurasPuestas += 1
                Turno()
            }
        }
    }
    /* texto*/
    if(partida == 1){
        textVictory.innerHTML = "GANASTES:)"
        textVictory.style.visibility = "visible"
        partidaFinished = true
    }
    if(partida == -1){
        textVictory.innerHTML = "PERDISTE:("
        textVictory.style.visibility = "visible"
        partidaFinished = true
    }
   
}
 /* mirar el estado de la partida para que devuelva quien a ganado es decir que si devuelve un 0(nadie gana),1(si gano el usuario) y -1(si ganado la maquina )*/
 function EstadoDeLaPartida() {
    let posicionVictory = 0
    let numeroEstado = 0
    /* comparacion de cada linea y coloco la posicion de victoria */
    console.log(buttons[0])
    if(comparacion(buttons[0],buttons[1],buttons[2])){
        posicionVictory = 1
    }
    if(comparacion(buttons[3],buttons[4],buttons[5])){
        posicionVictory = 2
    }
    if(comparacion(buttons[6],buttons[7],buttons[8])){
        posicionVictory = 3
    }
    /* columnas */
    if(comparacion(buttons[0],buttons[3],buttons[6])){
        posicionVictory = 4
    }
    if(comparacion(buttons[1],buttons[4],buttons[7])){
        posicionVictory = 5
    }
    if(comparacion(buttons[2],buttons[5],buttons[8])){
        posicionVictory = 6
    }
    /* diagonal */
    if(comparacion(buttons[0],buttons[4],buttons[8])){
        posicionVictory = 7
    }
    if(comparacion(buttons[2],buttons[4],buttons[6])){
        posicionVictory = 8
    }
    /* comprobacion de quien gana */
    if(posicionVictory > 0){
        if(turno === 1){
            numeroEstado = 1
        }else{
            numeroEstado = -1
        }
    }
    return numeroEstado
 }
 /* funcion para comprar elementos iguales */
 /* every va a determinar si todos los elementos de array cumplen esa condicion */

function comparacion(...comp){
    valores = comp.map(element => element.innerHTML)
    let every = valores.every((element, _, array)=>element===array[0])
    if(valores[0] !="" && every){
        comp.forEach(aplicarColor => aplicarColor.style.backgroundColor = "morado")
        return
    }
}
/* cambiar el turno */
function Turno(){
    if (turno === 1) {
        turno = 0
    }else{
        turno = 1
    }
}
function Boxito(){
    ramdom()
    console.log(buttons)
    const buttonArr = Array.from(buttons)
    let valor = buttonArr.map(element => element.innerHTML)
    let posicion = -1

    if(valor[4] == ""){
        posicion= 4
    }else{
        let num = ramdom(0,buttons.length-1)
        if(valor[0]!=""){
         num = ramdom(0,buttons.length-1)
        }
        posicion= num

    }
    buttons[posicion].innerHTML ="O"
    return posicion
}
/* mathfloor para devolver el maximo entero menor o igual a x numero,mathrandom devolver numeros aleatorios. inicia con el minimo y a el le suma la distancia entre el maximo y el minimo + 1 y se multiplica por el random*/
function ramdom(min,max){
    return Math.floor(Math.random()*(max-min+1)+ min)
}


