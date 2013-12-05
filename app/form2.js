var $ = function (selector) {
    return document.querySelector(selector);
}
// Form fields
var dependencia = "",
    nombre = "",
    apellido = "",
    correo = "",
    descripcion = "",
    telefono = "",
    fecha = "",
    reincide = "",
    direccion = "";

var datosFormulario = new db("datosFormulario");

$('#go').addEventListener('click', function () {

    nombre = $('#nombre').value;
    apellido = $('#apellido').value;
    correo = $('#correo').value;
    correo = $('#direccion').value;
    descripcion = $('#descripcion').value;
    telefono = $('#telefono').value;
    fecha = $('#fecha').value;
    reincide = $('#reincide').checked;

    var online = navigator.onLine;

    if (otro != "" && nombre != "" && apellido != "" && telefono != "" && descripcion != "" && fecha != "") {
        // console.log(nombre + "-" + apellido);
        if (online) {
            go.href = '#newcomment';
            // se construye la url
            // fields: dependencia, nombre, apellidos, correo, telefono, descripcion, fecha, reincide
            var url = "http://firefox-cndh.herokuapp.com/search/?";
            url += 'dependencia=1';
            url += '&nombre=' + nombre;
            url += '&apellidos=' + apellido;
            url += '&correo=' + correo;
            url += '&direccion=' + direccion;
            url += '&telefono=' + telefono;
            url += '&descripcion=' + descripcion;
            url += '&fecha=' + fecha;
            url += '&reincide=' + reincide;


            var request = new XMLHttpRequest({
                mozSystem: true
            }); // for FFOS

            request.open("get", url, true);

            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200 || request.status == 0) {

                        var data = request.responseText;

                        data = JSON.parse(data);
                        console.log(data[0].pk);
                        var spanElement = document.createElement("span");

                        spanElement.innerHTML = 'Su folio es: ' + data[0].pk;

                        $('#resultado').appendChild(spanElement);
                        $('#title').innerHTML = 'Su reporte ha sido recibido y está siendo atendido';
                        $('#subtitle').innerHTML = '';
                        $('#progress').classList.add('hidden');
                        /*
            $('#resultado').append('<span> Su Folio es: ' + fecha_s + '</span>');
              $('#title').html('Su reporte ha sido recibido.');
              $('#subtitle').html('');
              $('#progress').hide();
              $('#acept').show();
            */

                    } 
                }
            } // end request.onreadystatechange
            request.send();

        } else { // no connected

                        // error 
                        setLocalData();
                        alert("Su dispositivo no tiene conexion a internet intentelo mas tarde.");                  
                    
        } // end if
    } else {
        if (otro == "") {
            document.getElementById("otro").style.border = "0.1rem solid #820000";
        }
        if (nombre == "") {
            document.getElementById("nombre").style.border = "0.1rem solid #820000";
        }
        if (apellido == "") {
            document.getElementById("apellido").style.border = "0.1rem solid #820000";
        }
        if (telefono == "") {
            document.getElementById("telefono").style.border = "0.1rem solid #820000";
        }if (direccion == "") {
            document.getElementById("direccion").style.border = "0.1rem solid #820000";
        }
        if (descripcion == "") {
            document.getElementById("descripcion").style.border = "0.1rem solid #820000";
        }
        if (fecha == "") {
            document.getElementById("fechax").style.border = "0.1rem solid #820000";
        }
    }
});


function newWindow() {
    location.href = "../index.html";
}

var formatoTelefono = function ( event , element ){
  // console.log( event.keyCode );
  var tel  = element.value;
  var size = tel.length;

  console.log(tel.length);
  if( tel.length == 3  || tel.length == 7 )
    element.value += '-';
  
  if( event.keyCode == 8 )
    if( (tel.length == 5 || tel.length == 9) && tel[ tel.length - 2 ] == '-' )
       element.value = tel.substring( 0, tel.length - 1 );
    //else
      //element.value = tel.substring( 0, tel.length - 1 );

  console.log(tel.length);

}
//validation for telephone
var patron = new Array(3, 3, 4);

function validation(d, sep, pat, nums) {
    if (d.valant != d.value) {
        val = d.value;
        largo = val.length;
        val = val.split(sep);
        val2 = '';
        for (r = 0; r < val.length; r++) {
            val2 += val[r];
        }
        if (nums) {
            for (z = 0; z < val2.length; z++) {
                if (isNaN(val2.charAt(z))) {
                    letra = new RegExp(val2.charAt(z), "g");
                    val2 = val2.replace(letra, "");
                }
            }
        }
        val = '';
        val3 = new Array()
        for (s = 0; s < pat.length; s++) {
            val3[s] = val2.substring(0, pat[s]);
            val2 = val2.substr(pat[s]);
        }
        for (q = 0; q < val3.length; q++) {
            if (q == 0) {
                val = val3[q];
            } else {
                if (val3[q] != "") {
                    val += sep + val3[q];
                }
            }
        }
        d.value = val;
        // console.log(d.value);
        // setLocalData();
        d.valant = val;
    }
}

function validation2() {
    var name = document.getElementById("nombre");
    var lastname = document.getElementById("apellido");
    name.value = name.value.toUpperCase();
    lastname.value = lastname.value.toUpperCase();
}


var setLocalData = function(){

  dependencia = $('#dependencia').value;
  otro = $('#otro').value;
  nombre = $('#nombre').value;
  apellido = $('#apellido').value;
  correo = $('#correo').value;
  direccion = $('#direccion').value;
  descripcion = $('#descripcion').value;
  telefono = $('#telefono').value;
  fecha = $('#fecha').value;
  reincide = $('#reincide').checked;

  var data = {
    dependencia: dependencia,
    otro: otro,
    nombre : nombre,
    apellido: apellido,
    correo: correo,
    direccion: direccion,
    telefono: telefono,
    descripcion: descripcion,
    fecha: fecha,
    reincide: reincide
  };

  datosFormulario.clear();
  datosFormulario.set(data);
}

var getLocalData = function () {
  var datos = datosFormulario.data[0];

  $('#dependencia').value = datos.dependencia;
  $('#otro').value = datos.otro;
  $('#nombre').value = datos.nombre;
  $('#apellido').value = datos.apellido;
  $('#correo').value = datos.correo;
  $('#direccion').value = datos.direccion;
  $('#descripcion').value = datos.descripcion;
  $('#telefono').value = datos.telefono;
  $('#fecha').value = datos.fecha;
  $('#reincide').checked = datos.reincide;
}

var oter = function (element) {
  var value = element.value;
  if( value == "Otro" ) {
    $('.cajaOtro').classList.remove('hidden');
  }else{
    $('.cajaOtro').classList.add('hidden');
  }
}


