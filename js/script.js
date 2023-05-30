
var images = [
    {src: 'rompe01'}, 
    {src: 'rompe02'}, 
    {src: 'rompe03'}, 
    {src: 'rompe04'}
];

var indexImage;
var randomValues;
var first = null, second=null;
var pasos;

$(document).ready(function(){
    indexImage = Math.floor(Math.random() * 4);
    aleatorios();
    setImage();
    reDimen();
    armarTablero();
    cambiarImagen();
    revisaGanador();
});    

function cambiarImagen(){
    $('table').on('click', '.casilla', function(){
        if (first == null){
            first = $(this).attr('id');
        }else{
            second = $(this).attr('id'); 
        }
        if (first != null && second != null){
            var aux = document.getElementById(first).style.backgroundImage;
            document.getElementById(first).style.backgroundImage = document.getElementById(second).style.backgroundImage;
            document.getElementById(second).style.backgroundImage = aux;
            pasos++;
            mostrarPasos();
            revisaGanador();
            first = null;
            second = null;
        }
    });
}
function mostrarPasos(){
    $('.pasos').text("Pasos : " + pasos);
}

function revisaGanador(){
    var ans = true;
    var casillas = document.getElementsByClassName('casilla');
    for (let i = 0; i < casillas.length; i++) {
        var id = casillas[i].id;
        var bi = casillas[i].style.backgroundImage.split('/'); 
        bi = bi[bi.length - 1].split('.')[0];
        if (id === ('b'+bi)){
            ans = ans && true;
        }else{
            ans = ans && false;
        }
    }
    if (ans){
        alert("Acabaste en " + pasos + " pasos!!");
        pasos= 0;
        mostrarPasos();
        indexImage = Math.floor(Math.random() * 4);
        armarTablero();
        setImage();
    }
}

function armarTablero(){
    pasos = 0;
    var k = 0, clase = 'b';
    $("table").empty();
    for (let i = 0; i < 4; i++) {
        var linea  = '<tr>';
        for (let j = 0; j < 3; j++) {
            const element = randomValues[k];
            k++;
            linea += '<td id='+ clase +' ondragover="event.preventDefault()"  ondrop="dropWord(event)">'
            linea += '   <div class="casilla" id="'+ clase + k + '" style= "background-image: url(src/img-puzzle/' 
            linea += images[indexImage].src + '/'+ element +'.jpg); background-size: cover" draggable="true" ondragstart="dragWord(event)"></div></td>';            
        }
        linea += '</tr>';
		$("table").append(linea);
        efectoZoom('.casilla');
    }
}

function aleatorios(){
    randomValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    randomValues = randomValues.sort(function() { return Math.random() - 0.5 });
}

function efectoZoom(clase){
    // '.image-zoom'
    $(clase).hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });
}

function reDimen(){
    $('.image-zoom').each(function(){
        var width = $(this).width();
        var new_width = 200;
        if (width > new_width){
            var height = $(this).height();
            var calculo = Math.round((100*new_width)/ width);
            var new_height = Math.round((height*calculo)/100);
            $(this).css( {
                width  : new_width+'px',
                height : new_height+'px'
            });
        }
    });
}

function setImage(){
    $('.image-zoom').attr('src', 
                        'src/img-puzzle/' + images[indexImage].src + 
                        '/' + images[indexImage].src + '.jpg');
}

function siguiente(){
    indexImage++;
    if (indexImage > images.length-1){
        indexImage = 0;
    }
    setImage();
    armarTablero();
    pasos = 0;
    mostrarPasos();
}

function anterior(){ 
    indexImage--;
    if (indexImage < 0){
        indexImage = images.length-1;
    }
    setImage();
    armarTablero();
    pasos = 0;
    mostrarPasos();
}