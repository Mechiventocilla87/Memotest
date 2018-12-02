var imagenes = ['imagenes/alce.jpg', 'imagenes/epelante.jpg', 'imagenes/nena.jpg','imagenes/peces.jpg',
'imagenes/unichancho.jpg', 'imagenes/zapas.jpg','imagenes/alce.jpg', 'imagenes/epelante.jpg', 
'imagenes/nena.jpg', 'imagenes/peces.jpg', 'imagenes/unichancho.jpg', 'imagenes/zapas.jpg'];
var valorInput;
var nivel;
var cantMov = 0;
var pieza1;
var pieza2;
var clicks = 0;
var intentos = 0;  
var aciertos = 1;
var ganaste = false;
var perdiste = false;
var rankings= JSON.parse(localStorage.getItem('Winners'));

// inicializo intentos en 1 porque sino empieza a contar desde 0 en el par de piezas,
// más abajo le resto 1.

//funcion randoom
//--------------------------------------------------

const dRandoom = shuffle(imagenes)

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return a;
}

//--------------------------------------------------


//niveles del juego (evento por cada nivel)
//--------------------------------------------------
$('#nivel_facil').on('click', function (){
    
    nivel = 'FACIL';

    cantMov = 18;
    
    welcome();

    gameBegin();

});

    
$('#nivel_intermedio').on('click', function (){

    nivel = 'INTERMEDIO';
    
    cantMov = 12;
    
    welcome();

    gameBegin();

});


$('#nivel_experto').on('click', function (){

    nivel = 'EXPERTO';
    
    cantMov = 9;
    
    welcome();

    gameBegin();

});

//-------------------------------------------------


//Función welcome, representa los datos del tablero de las piezas, nombre, cantidad de intentos etc.
//--------------------------------------------------------------
function welcome() {

    valorInput = $('#ingresar_nombre').val();

    if (valorInput == "") {

        $('#box_error').removeClass('hidden');
        setTimeout(function () {
        $('#box_error').addClass('hidden');

        },3000);
        
    }else{

        $('#main_content').removeClass('hidden');
        $('#choice_niveles').addClass('hidden');
        $('#textoBienvenida').html('Hola '+ valorInput);
        $('#intentos').html(' '+cantMov+' ')
        $('#text_nivel').html(nivel);

    }
    
}

//--------------------------------------------------------------
 

//carga de imagenes del array en data-img 
//------------------------------------------------------
var imagenesLength = $('.img_tapada').length

for (var i = 0; i < imagenesLength; i++){

    $('.img_tapada').eq(i).attr('data-img', imagenes[i])
    $('.img_tapada').eq(i).attr('data-id', i )
}
//------------------------------------------------------


//Funcion para la dinámica del juego
//---------------------------------------------------------

function gameBegin() {
  
    $('.img_tapada').on('click', function() {
    
        clicks = clicks + 1;

        $('.counter').html(intentos);

     
        if(clicks == 1){

            $(this).addClass('flip');

            var visible = $(this).attr('data-img')
            $(this).attr('src', visible);
            
            var cargaId = $(this).attr('data-id')
            $(this).attr('id', cargaId);
    

            //Trasnformo la varibale 'pieza1' declarada afuera en objeto, 
            //seteando los datos de la pieza que hago click en ese momento.

            pieza1 = { 
    
                id : $(this).attr('data-id'),
                img : $(this).attr('data-img'),
    
            }
            
            

        } else if (clicks == 2) {

            $(this).addClass('flip');

            var visible = $(this).attr('data-img')
            $(this).attr('src', visible);
            
            var cargaId = $(this).attr('data-id')
            $(this).attr('id', cargaId);
    

            //Trasnformo la variable 'pieza2' declarada afuera en objeto, 
            //seteando los datos de la pieza que hago click en ese momento.
            
            pieza2 = { 
    
                id : $(this).attr('data-id'),
                img : $(this).attr('data-img'),
                
            }

            
            //Comparo la pieza del 1er click con la pieza del 2do click,
            //con condiciones que determinan una coincidencia con esta función:
            validation()

            //Llamo a la función que valida la cantidad de aciertos:
            validacionAciertos(aciertos);

            //Llamo a la función que determina el resultado final:
            result(ganaste, perdiste);
                        
               
        }
    
    
    });
    

}

//------------------------------------------------------------------------------


//Funcion que valida casos de coincidencia y diferencia entre las dos piezas
//------------------------------------------------------------------------------

function validation(){

    //Comparo la pieza del 1er click con la pieza del 2do click,
    //con condiciones que determinan una coincidencia.
    if(pieza1.id!=pieza2.id && pieza1.img==pieza2.img ){
        

        aciertos = aciertos + 1; //si hay coincidencia variable aciertos suma 1.

        intentos = intentos + 1;//suma 1 en intentos, si en caso se compara piezas con DISTINTO ID e IGUAL IMAGEN. 


        $("#"+ pieza1.id).addClass('pointer');
        $("#"+ pieza2.id).addClass('pointer');

                        
        setTimeout(function () {

        $("#" + pieza2.id).addClass("grayscale");
        $("#" + pieza1.id).addClass("grayscale");

        clicks = 0; //reseteo variable clicks a 0 .

        },500); 
        

    } else if (pieza1.id!=pieza2.id && pieza1.img!=pieza2.img){ //sino hay coincidencia:

        intentos = intentos + 1; //suma 1 en intentos, si en caso se compara piezas con DISTINTO ID y DISTINTA IMAGEN.

        setTimeout(function () {


        $("#"+ pieza1.id).attr("src","imagenes/tapada.jpg");
        $("#"+ pieza2.id).attr("src","imagenes/tapada.jpg"); 
        $("#"+ pieza1.id).removeClass('flip');
        $("#"+ pieza2.id).removeClass('flip');

        clicks = 0; //reseteo variable clicks a 0 .

        },2000);


    } else if(pieza1.id==pieza2.id && pieza1.img==pieza2.img){

        //hipotético caso si se hace click en la misma pieza.

        setTimeout(function () {


            $("#"+ pieza1.id).attr("src","imagenes/tapada.jpg");
            $("#"+ pieza2.id).attr("src","imagenes/tapada.jpg"); 
            $("#"+ pieza1.id).removeClass('flip');
            $("#"+ pieza2.id).removeClass('flip');
    
            clicks = 0; //reseteo variable clicks a 0 .
    
        },2000);

    }


};

//---------------------------------------------------------------------


//Función que valida los aciertos
//---------------------------------------------------------------

function validacionAciertos(a) { 

    if (a == 6 && intentos - 1 <= cantMov) {
        ganaste = true;
        console.log('ganaste');
        console.log(ganaste);
        
                    
    }else if ( a < 6 && intentos - 1 == cantMov){
        perdiste = true;
        console.log('perdiste');
        console.log(perdiste);
        
    }

}

//---------------------------------------------------------------


//Funcion que determina resultado final
//---------------------------------------------------------------

function result(a, b) {
    
    if (a == true) {

        $('#final_result').removeClass('hidden');
        $('.modal').removeClass('hidden');
        $('.text_result').html('GANASTE🎉! con ' + (intentos - 1) + ' intentos.');
        
        saveLocalStorage(); // Llamo a la función que guarda LocalStorage.

    } else if (b == true) {
        $('#final_result').removeClass('hidden');
        $('.modal').removeClass('hidden');
        $('.text_result').html('PERDISTE😪! con ' + (intentos - 1 ) + ' intentos.');

    }
   
}

//-------------------------------------------------------------


//Funcion que guarda en LocalStorage
//-------------------------------------------------------------

function saveLocalStorage() {

    var jugador = {

        nombre: valorInput,
        nivel : nivel,
        intentos : intentos

    }


    if (rankings == null) {

        rankings = [];  

    }

    
    rankings.push(jugador);

    console.log(rankings);
    

    localStorage.setItem('Winners', JSON.stringify(rankings)); 

    for (let i = 0; i < rankings.length; i++) {
        
        $('.little_box').append(`<p>${rankings[i].nombre}</p>`)
        $('.medium_box').append(`<p>${rankings[i].nivel}</p>`)
        $('.large_box').append(`<p>${rankings[i].intentos}</p>`)

    } 

}

//--------------------------------------------------------------


//evento onclick del boton volver a jugar para recargar
//-----------------------------------------------------------

$('#reload').on('click', function(){

    location.reload();

})

//-----------------------------------------------------------
