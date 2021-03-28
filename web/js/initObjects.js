document.addEventListener('keyup', function (event) {
    let txtId = event.target.id;
      if (event.key  === 'Enter' && txtId === 'txtBuscar') {
        qryType = `like/${document.getElementById('txtBuscar').value}/1/${regPage}`;
        qryCount = `like/${document.getElementById('txtBuscar').value}`;
        asyncFncCount(qryCount);
        asyncFncProducts(qryType);
      }
});

document.addEventListener('change', (event) => {
    let changeId = event.target.id;
    if(changeId == 'cat-select'){
        let catId = event.target.value;
        if (catId == 0){
            qryCount = `all/0`;
            qryType = `all/0/1/${regPage}`;
            asyncFncCount(qryCount);
            asyncFncProducts(qryType);
        }
        else{
            qryType = `category/${catId}/1/${regPage}`;
            qryCount = `category/${catId}`;
            asyncFncCount(qryCount);
            asyncFncProducts(qryType);
        }
    }else{
        let page = event.target.value;
        if(qryCount == '')
            asyncFncProducts(`all/0/${page}/${regPage}`);
        else
            asyncFncProducts(`${qryCount}/${page}/${regPage}`);
    }
});

document.addEventListener('click', (event) => {
    let clickId = event.target.id;
    if (clickId == 'btnBuscar'){
        qryType = `like/${document.getElementById('txtBuscar').value}/1/${regPage}`;
        qryCount = `like/${document.getElementById('txtBuscar').value}`;
        asyncFncCount(qryCount);
        asyncFncProducts(qryType);
    }
});

$('.ir-arriba').click(function(){
    $(".navbar").find(".active").removeClass("active");
    $('.navbar-collapse').collapse('hide');
        $('body, html').animate({
            scrollTop: '0px'
        }, 10);
});