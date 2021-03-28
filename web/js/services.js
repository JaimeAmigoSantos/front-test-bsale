async function asyncFncProducts (qry) {

    document.getElementById("div-products").innerHTML = "";
    document.getElementById("div-loading").innerHTML = '<div class="spinner-border" role="status"></div>';

    await fetch(apiUrl + 'products/' + qry, callOptions).then(function (response) {
        return response.json();
    }).then(function (data) {
        htmlProducts = "";
        
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
    });
    document.getElementById("div-products").innerHTML = htmlProducts;
    document.getElementById("div-loading").innerHTML = '&nbsp;';

}

async function asyncFncCategories () {
    await fetch(apiUrl + 'categories/', callOptions).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (let i = 0; i < data.length; i++) {
            catSelect = document.getElementById('cat-select');
            catSelect.options[catSelect.options.length] = new Option(data[i].name , data[i].id);
        }
    });
}

async function asyncFncCount (qry) {
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
    });
}