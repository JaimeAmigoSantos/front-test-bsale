<!doctype html>
<html>
	<meta charset="utf-8">
	<title>B - SALE</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">

	<link href="css/fonts.css" rel="stylesheet">
	<style>
		.ir-arriba {
			display: inline-block;
			padding: 20px;
			background: #000;
			font-size: 20px;
			color: #fff;
			cursor: pointer;
			position: fixed;
			bottom: 20px;
			right: 20px;
			z-index: 999999999;
		}
	</style>


	<!--  
		Variables de uso global
	-->
	<script>
		const callOptions = { method: 'GET', cache: 'no-cache' };
		const apiUrl = 'https://api-test-bsale.herokuapp.com/api/v1/'
		//const apiUrl = 'http://localhost:5000/api/v1/'
		const regPage = 5;
		const formatter = new Intl.NumberFormat('es-CL', {
			style: 'currency',
			currency: 'CLP',
			minimumFractionDigits: 0
		});

		var qryType = `all/0/1/${regPage}`;
		var qryCount = '';
	</script>

</head>

<body>
	<!-- Despliega flecha volver al top  -->
	<span class="ir-arriba icon-cheveron-up" data-ancla="arriba"></span>
	<!-- Despliega flecha volver al top  -->

	<!-- Navbar con la búsqueda -->
	<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top" style="z-index: 999999999;">
		<div class="container-fluid">
		  <a class="navbar-brand" href="#">B - SALE</a>
		  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
			  <li class="nav-item">
				<a class="nav-link active" aria-current="page" href="#">Tienda</a>
			  </li>
			</ul>
			<div class="d-flex">
			  <input class="form-control me-2" id="txtBuscar" type="search" placeholder="Search" autocomplete="off" aria-label="Search">
			  <button class="btn btn-outline-primary" id="btnBuscar" type="submit">Search</button>
			</div>
		  </div>
		</div>
	  </nav>
	<!-- Navbar con la búsqueda -->

	<!-- Contenedor con selects de categorías y paginación -->
	<div class="container fixed-top" style="padding-top: 70px; background: white;">
		<div class="row">
			<div class="col-md-6">
				<span>Categorías:</span>
				<select class="form-select" id="cat-select" aria-label="Default select example">
					<option value ="0" selected>Todas las categoría</option>
			 	</select>
			</div>
			<div class="col-md-6">
				<span>Página:</span>
				<select class="form-select" id="count-select" aria-label="Default select example"></select>
			</div>
		</div>
	</div>
	<!-- Contenedor con selects de categorías y paginación -->

	<!-- Contenedor principal -->
	<div class="container" style="padding-top: 160px;">

		<!-- Contenedor loading -->
		<div class="d-flex justify-content-center" id="div-loading"></div>
		<!-- Contenedor loading -->

		<!-- Contenedor mensaje error -->
		<div class="row" id="div-error"></div>
		<!-- Contenedor mensaje error -->

		<!-- Contenedor donde se muestran los productos. Es refrescado cada vez que se invoca al servicio de productos -->
		<div class="row" id="div-products" style="padding-left:30px;"></div>
		<!-- Contenedor donde se muestran los productos. Es refrescado cada vez que se invoca al servicio de productos -->

	</div>
	<!-- Contenedor principal -->



	<!-- 
		Agregamos referencias a JQUERY y BOOTSTRAP
	-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

  	<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"
    integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU"
    crossorigin="anonymous"></script>

  	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js"
    integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj"
    crossorigin="anonymous"></script>

	<script src="https://kit.fontawesome.com/c8e5d6e878.js" crossorigin="anonymous"></script>
	
	<!-- Agregamos referencia a JS encargado de conectarse a la API	-->
	<script src="js/services.js"></script>

	<!-- Agregamos referencia a JS encargado de gestionar eventos de cajas de textos, botones, select, etc.	-->
	<script src="js/initObjects.js"></script>

	<script>
		//Incocamos función existente en js/services.js para desplegar los productos
		asyncFncProducts(qryType);

		//Incocamos función existente en js/services.js para llenar combo con categprías
		asyncFncCategories();

		//Incocamos función existente en js/services.js para llenar combo con  las páginas
		asyncFncCount("");
	</script>
</body>
</html>
