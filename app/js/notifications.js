var reportes = new db( 'reportes' );
var folios = new db( 'folios' );

var folio = getURLParameter( 'folio' );

if ( folio != 'null' ) {
	folios.set( { folio: folio } );
}

var source = $('#reportesTemplate').innerHTML;
var template = Handlebars.compile(source);
$('#reportes').innerHTML = template( {folios: folios.data} );

// getJSON( 'http://localhost/reportes/' + folio,
//   function (data) {
//     reportes.set(data);
//     reportesRender(reportes.data[0]);
//   },
//   function () {
//     reportesRender(reportes.data[0]);
//   }
// );