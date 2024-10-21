//Definicion de variables globales
let baraja = [];
let tipoCarta = ["C","D","P","T"];
let especiales = ["A","K","Q","J"]
let puntosJugador1 = 0;
let puntosJugador2 =0;
let puntosJugador3 =0;
let puntosJugador4 =0;
let puntosJugador5 =0;
let puntosJugador6 =0;
let puntosBanca = 0;
let numeroJugadores =Number(prompt("dime el numero de jugadores"));
let turno = 0;
let jugadores = [puntosJugador1,puntosJugador2,puntosJugador3,puntosJugador4,puntosJugador5,puntosJugador6];
let dineroJugadores = [];
let apuestas=[];


//Referencias a objetos
const botonPedir = document.querySelector("#btnPedir");
const botonPasar = document.querySelector("#btnPasar");
const botonNuevo = document.querySelector("#btnNuevo");
const marcador = document.querySelectorAll("small");
const banco = document.querySelectorAll("h5");
const divJugadorCarta = document.querySelector("#jugador-cartas");
const divJugadorCarta2 = document.querySelector("#jugador-cartas-2");
const divJugadorCarta3 = document.querySelector("#jugador-cartas-3");
const divJugadorCarta4 = document.querySelector("#jugador-cartas-4");
const divJugadorCarta5 = document.querySelector("#jugador-cartas-5");
const divJugadorCarta6 = document.querySelector("#jugador-cartas-6");
const divBancaCarta = document.querySelector("#banca-cartas");
const resultado = document.querySelector("#ganador");
const divs = [divJugadorCarta,divJugadorCarta2,divJugadorCarta3,divJugadorCarta4,divJugadorCarta5,divJugadorCarta6];



//crear baraja para repartir.
//se van a crear con bucle for.
//se mezcla la baraja con _.shuffle
const crearBaraja = () => {

for (let i=2; i<=10;i++){
    for (let tipo of tipoCarta){
    baraja.push(i + tipo);
}
}
for(let tipo of tipoCarta){
    for(let esp of especiales){
        baraja.push(esp + tipo);
    }
}
baraja = _.shuffle(baraja)
return baraja;
}
//pedir una carta y retirarla de la baraja retirandola desde el final con pop. 
//Y lanzamos un aviso en el caso de que nos quedemos sin cartas.
const pedirCarta = () =>{
    const carta = baraja.pop();
    if(baraja.length ===0){
        throw "No hay cartas";
    }
    return(carta);
}
// Calculamos el valor de la carta teniendo en cuenta con isNaN si nos ha salido una de las figuras
//utilizamos el operador ternario con el isNaN para darle el valor de 11 al As
const valorCarta=(carta) => {
    let puntos = carta.substring(0,carta.length -1 );
    let valor = (isNaN(puntos) ? (puntos==="A") ? 11:10 : puntos * 1 );
    return valor;
       };

/*creamos la constante repartir que con un bucle for que tiene como limite el numero de jugadores
este bucle pide una carta con la funcion pedir carta y el bucle al utilizar como indice 
la i y tener como limite el numero de jugadores reparte una carta a cada jugador cambiando su marcador en el html 
para sumarle los puntos de la carta y creando la imagen respectiva a cada carta*/      
         const repartir =() => {
        for (let i = 0; i < numeroJugadores; i++) { 
            
            const cartaR = pedirCarta(); 
            jugadores[i] = jugadores[i] + valorCarta(cartaR); 
            marcador[(i+1)].innerHTML = jugadores[i];
            const imgCartaR = document.createElement("img");
            imgCartaR.src = "img/" + cartaR + ".png";
            imgCartaR.classList.add("carta");
            divs[i].append(imgCartaR);
                   
              
        }
    };

/* con la siguiente funcion vamos a repartir el dinero a cada jugador que este jugando en el tablero. Van a empezar
todos con una cantidad de 1000 monedas*/


    repartirDinero = () =>{
        for (let i = 0; i < numeroJugadores; i++) { 
            dineroJugadores[i]=1000;
            banco[i].innerHTML = dineroJugadores[i];  
            banco[i].innerHTML = dineroJugadores[i];      
        }
    };




/*creamos una funcion para realizar la apuesta de cada jugador creamos de nuevo un bucle for con limite de numeroJugadores
en este bucle por cada vez que se ejecuta metemos en el array de apuestas la apuesta realizada por cada jugador
(un prompt) y le decimos al jugador cuanto dinero le queda*/ 

    apuestasJugador = () =>{
        for(let i = 0; i < numeroJugadores; i++){
            apuestas[i]= Number(prompt("cuanto quieres apostar jugadador "+(i+1)+" tienes disponible: "+ (dineroJugadores[i])));
            dineroJugadores[i]= (dineroJugadores[i]-apuestas[i] );
            banco[i].innerHTML = dineroJugadores[i];
        }
    }


     
   
 


    const repartirCrupier =() => {
        
        const cartaOculta = pedirCarta();
        //calcular valor de la carta que nos da el crupier
        puntosBanca = puntosBanca + valorCarta(cartaOculta);
        //poner puntos en html
        marcador[0].innerHTML = puntosBanca;
        //creada carta al html
        const imgCartaOculta = document.createElement("img");
        imgCartaOculta.src = "img/reverso-gris.png";
        imgCartaOculta.id="cartaOculta";
        imgCartaOculta.classList.add("carta");
        //añadir carta al divisor dek html
        divBancaCarta.append(imgCartaOculta);

        const cartaB = pedirCarta();
        //calcular valor de la carta que nos da el crupier
        puntosBanca = puntosBanca + valorCarta(cartaB);
        //poner puntos en html
        marcador[0].innerHTML = "?";
        //creada carta al html
        const imgCartaB = document.createElement("img");
        imgCartaB.src = "img/" + cartaB +".png";
        imgCartaB.classList.add("carta");
        //añadir carta al divisor dek html
        divBancaCarta.append(imgCartaB);
        
       vuelta = () => {
        const imgCambiada = document.getElementById("cartaOculta");
        imgCambiada.src =  "img/" + cartaOculta +".png";
        marcador[0].innerHTML = puntosBanca; 
       }
        return vuelta;
       
    };

    
    

//turno computadora
const turnoBanca = () =>{
    vuelta();
        
    //Definimos que el crupier solo pida cartas si esta por debajo de 11 
    //para poder ganar al mayor numero posible de jugadores ya que el objetivo de blackjack con mas de un jugador es ese
    while(puntosBanca<=11){
         
       console.log("PUNTOS="+puntosBanca);
        const cartaB = pedirCarta();
        //calcular valor de la carta que nos da el crupier
        puntosBanca = puntosBanca + valorCarta(cartaB);
        //poner puntos en html
        marcador[0].innerHTML = puntosBanca;
        //creada carta al html
        const imgCartaB = document.createElement("img");
        imgCartaB.src = "img/" + cartaB +".png";
        imgCartaB.classList.add("carta");
        //añadir carta al divisor dek html
        divBancaCarta.append(imgCartaB);
    
       
    }
    /*con el siguiente for y los condicionales estamos haciendo que una vez finalizado el turno de la banca
    se comparen los puntos de todos los jugadores con los de la banca y 
    segun el resultado (si ha ganado, empatado o perdido) al jugador se le devuelve lo que ha apostado en caso de empate
    el doble de lo que ha apostado en caso de victoria y nada si ha perdido*/ 
    for(let i=0 ;i<numeroJugadores;i++){
        if(jugadores[i]>puntosBanca&&jugadores[i]<=21){
            dineroJugadores[i] = (dineroJugadores[i]+(apuestas[i]*2));
            banco[i].innerHTML = dineroJugadores[i];
        }else if(puntosBanca == jugadores[i]){
            dineroJugadores[i] = (apuestas[i]+dineroJugadores[i]);
            banco[i].innerHTML = dineroJugadores[i]; 
        }else if(puntosBanca>21&&jugadores[i]<21){
            dineroJugadores[i] = (dineroJugadores[i]+(apuestas[i]*2));
            banco[i].innerHTML = dineroJugadores[i];
        }
    }
};


   
        
    
   

//creamos el evento jugar con los turnos
const jugar = () =>{
    
    const carta = pedirCarta();
    //calcular valor de la carta que nos da el crupier
    jugadores[turno] = jugadores[turno] + valorCarta(carta);
    //poner puntos en html
    marcador[(turno +1)].innerHTML = jugadores[turno];
    //creada carta al html
    const imgCarta = document.createElement("img");
    imgCarta.src = "img/" + carta +".png";
    imgCarta.classList.add("carta");
    //añadir carta al divisor del html
    divs[turno].append(imgCarta);
   //si los puntos se pasan de 21 pasamos al siguiente turno 
    if(jugadores[turno]>21){
        turno++;
        alert("Turno del siguiente jugador");
    }
    //si los puntos son iguales a 21 pasamos al siguiente turno
    if(jugadores[turno]==21){
        turno++;
        alert("Turno del siguiente jugador");
    }
    //si terminamos el numero de jugadores menos 1 empieza el turno de la banca 
    if(turno>(numeroJugadores-1)){
        turnoBanca();
        botonPedir.disabled = true;
        botonPasar.disabled = true;
    };
    

}



//eventos del juego
botonPedir.addEventListener("click", () => {
    
    jugar();
    
});




//definismos el boton pasar para sumar un turno
botonPasar.addEventListener("click", ()=>{
    turno = turno+1;
    alert("Turno del siguiente jugador");
    //si terminamos el numero de jugadores menos 1 empieza el turno de la banca
    if(turno>(numeroJugadores-1)){
        turnoBanca();
        botonPedir.disabled = true;
        botonPasar.disabled = true;
    }
    
});
//boton juego nuevo restablece todos los valores menos el dinero
botonNuevo.addEventListener("click", ()=>{
    console.clear;
    turno=0;
    puntosBanca=0;
    jugadores = [puntosJugador1=0,puntosJugador2=0,puntosJugador3=0,puntosJugador4=0,puntosJugador5=0,puntosJugador6=0];
    baraja=[];
    crearBaraja();
    divJugadorCarta.innerHTML ="";
    divJugadorCarta2.innerHTML ="";
    divJugadorCarta3.innerHTML ="";
    divJugadorCarta4.innerHTML ="";
    divJugadorCarta5.innerHTML ="";
    divJugadorCarta6.innerHTML ="";
    divBancaCarta.innerHTML ="";
    resultado.innerHTML = "";
    botonPedir.disabled = false;
    botonPasar.disabled = false;
    marcador[1].innerHTML ="0";
    marcador[0].innerHTML ="0";
    marcador[2].innerHTML ="0";
    marcador[3].innerHTML ="0";
    marcador[4].innerHTML ="0";
    marcador[5].innerHTML ="0";
    repartir();
    repartir();
    repartirCrupier();
    apuestasJugador();
});







//MAIN*****************************************************************************************
crearBaraja();
repartir();
repartir();
repartirCrupier();
repartirDinero();
apuestasJugador();
