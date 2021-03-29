/*
JS encargado de gestionar las llamadas al la API. 
*/

/* 
asyncFncProducts es la encargada de invocar a la api con ruta products/ + parametros.
Con los resultados de la llamada genera y despliega un html con los productos sobre el div #div-products
*/
async function asyncFncProducts (qry) {

    fncMostrarLoading();
    
    try {

        await fetch(apiUrl + 'products/' + qry, callOptions).then(function (response) {
            return response.json();
        }).then(function (data) {

            fncOcultarLoading();
            
            let largo = parseInt(data.length);

            if (largo > 0 && data)
                fncHtmlProductos(data);
            else
                fncMsgError("No exxistem productos."); 

        }).catch(function (err) {

            fncOcultarLoading();
            fncMsgError("Ha ocurrido un problema. Favor intentar más tarde.");

        });
        
    } catch (error) {

        fncOcultarLoading();
        fncMsgError("Ha ocurrido un problema. Favor intentar más tarde.");

    }
}


/* 
asyncFncCategories es la encargada de invocar a la api con ruta categories/
Con los resultados de la llamada llena el combo #cat-select con sus respectivas opciones
*/
async function asyncFncCategories () {
    try{

        await fetch(apiUrl + 'categories/', callOptions).then(function (response) {
            return response.json();
        }).then(function (data) {
            for (let i = 0; i < data.length; i++) {
                catSelect = document.getElementById('cat-select');
                catSelect.options[catSelect.options.length] = new Option(data[i].name , data[i].id);
            }
        }).catch(function (err) {
            fncMsgError("Ha ocurrido un problema. Favor intentar más tarde.");
        });

    } catch (error) {
        fncMsgError("Ha ocurrido un problema. Favor intentar más tarde.");
    }
}


/* 
asyncFncCount es la encargada de invocar a la api con ruta count-products/ + parametros
Con los resultados de la llamada llena el combo #count-select con la paginación
según categoría seleccionada o like del texto excrito en buscar
*/
async function asyncFncCount (qry) {
    try{

        document.getElementById('count-select').options.length = 0;
        await fetch(apiUrl + 'count-products/' + qry, callOptions).then(function (response) {
            return response.json();
        }).then(function (data) {
            let totalRows = Math.ceil(data[0].total_rows / regPage);
            let modResto  = totalRows % regPage;
            if(modResto > 0)  totalRows += 1;
            for (let i = 1; i < totalRows; i++) {
                countSelect = document.getElementById('count-select');
                countSelect.options[countSelect.options.length] = new Option(i , i);
            }
        }).catch(function (err) {
            fncMsgError("Ha ocurrido un problema. Favor intentar más tarde.");
        });

    } catch (error) {
        fncMsgError("Ha ocurrido un problema. Favor intentar más tarde.");
    }
}


/*
Funciones contenido html
*/
function fncHtmlProductos(data){
    var htmlProducts = "";
    var imgProduct = "";

    for (var i = 0; i < data.length; i++) {
        htmlProducts += '<div class="card" style="width: 15rem; margin:15px 15px 0px 0px;">';
        
        if (data[i].url_image === null || data[i].url_image == "")
            imgProduct = "no-disponible.png";
        else
            imgProduct = data[i].url_image;
        
        htmlProducts += `<br>`;
        htmlProducts += `<img src="${imgProduct}" class="card-img-top" alt="${data[i].name}" width="214" height="214">`;
        htmlProducts += `<div class="card-body">`;
        htmlProducts += `<h6 class="card-title">${data[i].name}</h6>`;
        htmlProducts += `<hr></hr>`;
        htmlProducts += `<h6 class="card-title"><span style="padding-right:100px;">${formatter.format(data[i].price)}</span>`;
        htmlProducts += `<span style="font-size: 1.5em;"><i class="fas fa-cart-plus" title="Agregar al carro"></i></span></h6>`;
        htmlProducts += `</div>`;
        htmlProducts += `</div>`;
    }
    document.getElementById("div-products").innerHTML = htmlProducts;
}


function fncMsgError(msgError){
    let htmlError = `<div class="alert alert-danger" role="alert">${msgError}</div>`;
    document.getElementById("div-products").innerHTML = "";
    document.getElementById("div-loading").innerHTML = '&nbsp;';
    document.getElementById("div-error").innerHTML = htmlError;
}

function fncOcultarLoading(){
    document.getElementById("div-loading").innerHTML = '&nbsp;';
}

function fncMostrarLoading(){
    document.getElementById("div-products").innerHTML = "";
    document.getElementById("div-error").innerHTML = "";
    document.getElementById("div-loading").innerHTML = '<div class="spinner-border" role="status"></div>';
}