var source   = document.querySelector('#oficinas').innerHTML;
var template = Handlebars.compile(source);
var online = navigator.onLine;
var oficinas = new db("oficinas");
var DOMcollection = [];

var listaRender = function (_list) {
  document.getElementById("content").innerHTML = template(_list);
  var templaMap = document.querySelector('#mapa').innerHTML;
  var renderMap = Handlebars.compile(templaMap);
  document.getElementById("contentMap").innerHTML = renderMap();
  DOMcollection = document.querySelectorAll('.sede');
  
  Array.prototype.forEach.call( DOMcollection, function ( DOMelement ) {
    DOMelement.addEventListener( 'click', mostrarMapa, false );
  });
}

getJSON('http://localhost:8888/localdb/oficinas.json?' + Date.now(),
  function (data) {
    oficinas.clear();
    oficinas.set(data);
    listaRender(oficinas.data[0]);
  },
  function () {
    listaRender(oficinas.data[0]);
  }
);

var mostrarMapa = function () {
        if (online) {
            // Get data element
            var city = this.querySelector('.ciudad').innerHTML,
                address = this.querySelector('.direccion').innerHTML,
                latitude = this.getAttribute('data-lat'),
                longitude = this.getAttribute('data-lon');

            document.querySelector('.city-title').innerHTML = city;

            function initMap(lat, lon, title) {

                var latlon = new google.maps.LatLng(lat, lon);
                var mapOptions = {
                    center: latlon,
                    zoom: 18,
                    zoomControlOptions: {
                        style: google.maps.ZoomControlStyle.SMALL
                    },
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }

                var el_map = document.getElementById("map");

                var map = new google.maps.Map(el_map, mapOptions);

                var marker = new google.maps.Marker({
                    position: latlon,
                    title: title,
                    animation: google.maps.Animation.DROP
                });

                marker.setMap(map);
            }
            initMap(latitude, longitude, city);
        } else {
            alert('Para mejores resultados, active Wi-fi o datos');

            var city = this.querySelector('.ciudad').innerHTML;
            var imagePath = this.getAttribute('data-image');
            var imageElement = document.createElement("img");

            document.querySelector('.city-title').innerHTML = city;
            imageElement.setAttribute('src', imagePath);
            document.querySelector('#map').innerHTML = '';
            document.querySelector('#map').appendChild(imageElement);
        }
};


//window.$ = document.querySelector.bind(document);
//var online = false;
// setTimeout(function (){ 
//     $('.status').classList.add('down');
// }, 4000);
// $('.ocultar').addEventListener('click', function (){
//     $('.status').classList.remove('down');
// });
