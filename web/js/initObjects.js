/*
JS encargado de gestionar los eventos de botones, select e input text. 
*/


/*
Al escribir en el buscador y darle enter busca productos mediante LIKE y los despliega. 
También genera la paginación en base a los resultados del LIKE
*/
document.addEventListener('keyup', function (event) {
    let txtId = event.target.id;
      if (event.key  === 'Enter' && txtId === 'txtBuscar') {
        qryType = `like/${document.getElementById('txtBuscar').value}/1/${regPage}`;
        qryCount = `like/${document.getElementById('txtBuscar').value}`;
        asyncFncCount(qryCount);
        asyncFncProducts(qryType);
      }
});


/*
Si un select ejecuta el evento change 
*/
document.addEventListener('change', (event) => {
    let changeId = event.target.id;

    //Si se selecciona una opción sobre eñl combo categorías
    if(changeId == 'cat-select'){
        let catId = event.target.value;
        if (catId == 0){
            //ejecutamos llamada de productos y paginación para todas las categoría
            qryCount = `all/0`;
            qryType = `all/0/1/${regPage}`;
            asyncFncCount(qryCount);
            asyncFncProducts(qryType);
        }
        else{
             //ejecutamos llamada de productos y paginación según categoría seleccionada
            qryType = `category/${catId}/1/${regPage}`;
            qryCount = `category/${catId}`;
            asyncFncCount(qryCount);
            asyncFncProducts(qryType);
        }
    }else{
         //ejecutamos llamada de productos según página seleccionada y filtro (por categoría o LIKE de lo escrito en buscar)
        let page = event.target.value;
        if(qryCount == '')
            asyncFncProducts(`all/0/${page}/${regPage}`);
        else
            asyncFncProducts(`${qryCount}/${page}/${regPage}`);
    }
});

/*
Si se ejecuta el evento click 
*/
document.addEventListener('click', (event) => {
    let clickId = event.target.id;
    //Si clickea botón buscar
    if (clickId == 'btnBuscar'){
         //ejecutamos llamada de productos y paginación según LIKE de lo escrito en buscar
        qryType = `like/${document.getElementById('txtBuscar').value}/1/${regPage}`;
        qryCount = `like/${document.getElementById('txtBuscar').value}`;
        asyncFncCount(qryCount);
        asyncFncProducts(qryType);
    }
});


/*
Inicializamos con JQUERY la flecha para volver al top de la página
*/
$('.ir-arriba').click(function(){
    $(".navbar").find(".active").removeClass("active");
    $('.navbar-collapse').collapse('hide');
        $('body, html').animate({
            scrollTop: '0px'
        }, 10);
});