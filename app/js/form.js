// Patron para la validacion del Telefono
var patron = new Array(3, 3, 4);

var //Se acostumbra esta estructura para poder comentar una variable sin rimpar el codigo.
    dependencia = ""
  , nombre = ""
  , apellido = ""
  , correo = ""
  , descripcion = ""
  , telefono = ""
  , fecha = ""
  , reincide = ""
  , direccion = ""
  ;

var folio = '';
// Instancia del objeto db para almacenar datos JSON con LocalStorage
var datosFormulario = new db("datosFormulario");

// addReport: Redirige a 'notifications.html' y pasa el folio del reporte como parametro.
function addReport() {
  location.href = "notifications.html?folio=" + folio;
}

// !IMPORTANTE: Esta función se debe optimizar para la siguiente version
// sendForm:
//  Valida e envia el formulario, 
//  de ser enviado correcta mente muestra el Folio del reporte,
//  de los contrario almacena los datos para emviarlos posterios mente. 
var sendForm = function () {
  var online = navigator.onLine;
  
  nombre = $('#nombre').value;
  apellido = $('#apellido').value;
  correo = $('#correo').value;
  correo = $('#direccion').value;
  descripcion = $('#descripcion').value;
  telefono = $('#telefono').value;
  fecha = $('#fecha').value;
  reincide = $('#reincide').checked;

  if ( nombre != "" && apellido != "" && telefono != "" && descripcion != "" && fecha != "") {
    if (online) {
      //go.href = '#newcomment';


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

      var request = new XMLHttpRequest( { mozSystem: true } ); // for FFOS
        console.log("entro");      
        request.open("get", url, true);

      request.onreadystatechange = function () {

        if (request.readyState == 4) {
          if (request.status == 200 || request.status == 0) {
            var data = request.responseText;
            data = JSON.parse(data);
            console.log(data[0].pk);
            var spanElement = document.createElement("span");
            folio = data[0].pk;
            spanElement.innerHTML = 'Su folio es: ' + data[0].pk;

            $('#resultado').appendChild(spanElement);
            $('#title').innerHTML = 'Su reporte ha sido recibido y está siendo atendido';
            $('#subtitle').innerHTML = '';
            $('#progress').classList.add('hidden');
            datosFormulario.clear();
          } 
        }
      }
      request.send();
    } else {
        setLocalData();
        alert("Su dispositivo no tiene conexion a internet intentelo mas tarde.");                  
    }
  } else {
    return false;
    console.log("aqui estoy");
  }
}

// !IMPORTANTE: Esta función se debe optimizar para la siguiente version
// formatPhone: Da el formato con guiones al telefono
// params:
//    d: 'Elemento del DOM this'
//    sep: 'Separador'
//    pat: 'Patron del formato'
//    nums: 'isnum' 
function formatPhone(d, sep, pat, nums) {
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
        d.valant = val;
  }
}

// upperCase: Pasa a mayusculas los campos nombre y apellido
var upperCase = function () {
  var name = document.getElementById("nombre");
  var lastname = document.getElementById("apellido");
  name.value = name.value.toUpperCase();
  lastname.value = lastname.value.toUpperCase();
}

// Set LocalData: Tomal los valores de los campos del formularios y los almacena en local storage.
var setLocalData = function () {
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

  var data = { //Se crea el objeto
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
  data = null;
}

// Get LocalData: Recupera los datos del local storage y los muestras en lsus respectivos campos
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

// otherAgency: Muestra el imput 'otro' al selecionar la opcion del mismo nombre del select list.
// params:  
//   element: Se pasa el elemento this.
var otherAgency = function (element) {
  var value = $('#dependencia').value;
  $('.opcionDependencia').innerHTML = value;
  if( value == "Otro") {
    $('.cajaOtro').classList.remove('hidden');
  }else{
    $('.cajaOtro').classList.add('hidden');
  }
}

// Agrego el listener Click al Boton con id='go'
//$('#go').addEventListener('click', sendForm);

/*var saludar = function(){
  if ( nombre != "" && apellido != "" && telefono != "" && descripcion != "" && fecha != "") {
    console.log("invalido");
    return false;
    console.log("esta cosa no se ejecuta");
  }
  else{
    console.log("esta cosa funciona");
  }
}*/