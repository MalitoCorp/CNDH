var reportes = new db( 'reportes' );
var folios = new db( 'folios' );

var folio = getURLParameter( 'folio' );

if ( folio != 'null' ) {
	var fechaActual = dateFormat();
	folios.set( { folio: folio, fecha: fechaActual} );
}

function dateFormat() {
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1; //Months are zero based
	var curr_year = d.getFullYear();
	return curr_year + "-" + curr_month + "-" + curr_date;
}

var render = function () {
	var source = $('#reportesTemplate').innerHTML;
	var template = Handlebars.compile(source);
	
	$('#reportes').innerHTML = template( { folios: folios.data } );

	var DOMcollection = document.querySelectorAll('.reporte');

	Array.prototype.forEach.call( DOMcollection, function ( DOMelement ) {
		DOMelement.addEventListener( 'click', verReporte, false );
	});
}

var verReporte = function (e) {
	e.preventDefault();
	var idFolio = this.getElementsByTagName('span')[0].innerHTML;

	getJSON( 'http://localhost:3000/folios/' + idFolio,
		function (data) {
			$('#folio').innerHTML = data.folio;
			$('#status').innerHTML = data.status;
		},
		function () {
			console.log("Malo");
		}
	);
	location.href="#confirm";
}

render();