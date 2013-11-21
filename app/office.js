var online = navigator.onLine;
//var online = false;
window.$ = document.querySelector.bind(document);

setTimeout(function (){
    $('.status').classList.add('down');
}, 4000);

$('.ocultar').addEventListener('click', function (){
    $('.status').classList.remove('down');
});


[].forEach.call(document.querySelectorAll('.sede'), function (el) {
    el.addEventListener('click', function () {

        if (online) {
            // Get data element
            var city = this.querySelector('.ciudad').innerHTML,
                address = this.querySelector('.direccion').innerHTML,
                latitude = this.getAttribute('data-lat'),
                longitude = this.getAttribute('data-lon');

            // set the 'city Title' in map screen
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
            var imagePath = this.getAttribute('data-image');
            var imageElement = document.createElement("img");

            imageElement.setAttribute('src', imagePath);

            document.querySelector('#map').appendChild(imageElement);
            console.log(imageElement);
        }

    }, false);
});

function newWindow() {
    location.href = "#primary";
}