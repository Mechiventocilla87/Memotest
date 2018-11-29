var imagenes = ['imagenes/alce.jpg', 'imagenes/epelante.jpg', 'imagenes/nena.jpg','imagenes/peces.jpg',
'imagenes/unichancho.jpg', 'imagenes/zapas.jpg','imagenes/alce.jpg', 'imagenes/epelante.jpg', 
'imagenes/nena.jpg', 'imagenes/peces.jpg', 'imagenes/unichancho.jpg', 'imagenes/zapas.jpg'];
var valorInput;
var nivel;
var cantMov = 0;
var pieza1;
var pieza2;
var clicks = 0;
var aciertos = 0
var intentos = 0;
var ganaste = false;
var perdiste = false;
var rankings= JSON.parse(localStorage.getItem('Winners'));


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


//funcion welcome, representa los datos del tablero de las piezas, nombre, cantidad de intentos etc.
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
            
            intentos = intentos + 1;


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


            
            if (aciertos == 6 && intentos<=cantMov ) {
                ganaste = true;
                console.log('ganaste');
                console.log(ganaste);
                
                            
            }else if( aciertos < 6 && intentos == cantMov){
                perdiste = true;
                console.log('perdiste');
                console.log(perdiste);
                
            }


            result(ganaste, perdiste);
                        
               
        }
    
    
    });
    

}




function validation(){

    //Comparo la pieza del 1er click con la pieza del 2do click,
    //con condiciones que determinan una coincidencia.
    if(pieza1.id!=pieza2.id && pieza1.img==pieza2.img ){
        

        aciertos = aciertos + 1; //si hay coincidencia variable aciertos suma 1.
        

        $("#"+ pieza1.id).addClass('pointer');
        $("#"+ pieza2.id).addClass('pointer');

                        
        setTimeout(function () {

        $("#" + pieza2.id).addClass("grayscale");
        $("#" + pieza1.id).addClass("grayscale");

        clicks = 0; //reseteo variable clicks a 0 .

        },500); 
        

    } else { //sino hay coincidencia: 


        setTimeout(function () {


        $("#"+ pieza1.id).attr("src","imagenes/tapada.jpg");
        $("#"+ pieza2.id).attr("src","imagenes/tapada.jpg"); 
        $("#"+ pieza1.id).removeClass('flip');
        $("#"+ pieza2.id).removeClass('flip');

        clicks = 0; //reseteo variable clicks a 0 .

        },2000);


    }


};



function result(a, b) {
    
    if (a == true) {

        $('#final_result').removeClass('hidden');
        $('.modal').removeClass('hidden');
        $('.text_result').html('GANASTE🎉! con ' + intentos + ' intentos.');

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
                

    } else if (b == true) {
        $('#final_result').removeClass('hidden');
        $('.modal').removeClass('hidden');
        $('.text_result').html('PERDISTE😪! con ' + intentos + ' intentos.');

    }
   
}



//evento onclick del boton volver a jugar para recargar
//-----------------------------------------------------------

$('#reload').on('click', function(){

    location.reload();

})

//-----------------------------------------------------------
