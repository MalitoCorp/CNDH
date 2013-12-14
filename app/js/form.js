// form.js
// Mozilians Team - CTIN

// Instancia del objeto db para almacenar datos JSON con LocalStorage
var datosFormulario = new db("datosFormulario");
var folio = '';

// formatPhone: Da el formato con guiones al telefono
function formatPhone() {
  if ( this.tempValue != this.value ) {
    // Patron para la validacion del Telefono
    var patron = new Array(3, 3, 4);
    var
      val = this.value
    , largo = val.length
    , val = val.split('-')
    , val2 = ''
    , val3 = new Array()
    , i
    ;
    
    for ( i = 0; i < val.length; i++ ) {
      val2 += val[i];
    }
    
    for ( i = 0; i < val2.length; i++ ) {
      if ( isNaN( val2.charAt( i ) ) ) {
        letra = new RegExp(val2.charAt( i ), "g");
        val2 = val2.replace(letra, "");
      }
    }

    val = '';
    for ( i = 0; i < patron.length; i++ ) {
      val3[i] = val2.substring( 0, patron[i] );
      val2 = val2.substr( patron[i] );
    }

    for ( i = 0; i < val3.length; i++ ) {
      if ( i == 0 ) {
        val = val3[i];
      } else {
        if ( val3[i] != "" ) val += '-' + val3[i];
      }
    }
    this.tempValue = this.value = val;
  }
}

// SaveForm: Funcion que gestiona todo lo relasionado con el 
// almacenamiento de los datos del formulario en localStorage.
function saveForm(){
  var data = formToJSON();
  datosFormulario.clear();
  datosFormulario.set(data);
  delete data;
}

// Get LocalData: Recupera los datos del local storage y los muestras en lsus respectivos campos
function getLocalData() {
  var datos = datosFormulario.data[0];
  if ( !datos ) return;
  
  $('#dependencia').selectedIndex = datos.dependencia - 1; //Fix para usar el selectIndex el cual es un array que inicia en 0
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

// evalDependencia: Muestra el imput 'otro' al selecionar la opcion del mismo nombre del select list.
function evalDependencia() {
  var value = $('#dependencia').selectedOptions[0].text;
  if ( value == "Otro" )
    $('.cajaOtro').classList.remove('hidden');
  else
    $('.cajaOtro').classList.add('hidden');
  $('.opcionDependencia').innerHTML = value;
}

// sendForm:
//  Valida y envia el formulario, 
//  de ser enviado correcta mente muestra el Folio del reporte,
//  de lo contrario almacena los datos para emviarlos posterios mente. 
function sendForm(event) {
  event.preventDefault();
  var formData = formToJSON('#reporte');
  var form = $('#reporte');
  var actionURL = form.action;
  var request = new XMLHttpRequest( { mozSystem: true } );
  request.open('post', actionURL, true);
  request.responseType = 'json';
  
  request.onload = function () {
    var status = request.status;
    if (status == 200) {
      location.href="#newcomment";
      var data = request.response;
      var spanElement = document.createElement("span");
      spanElement.innerHTML = 'Su folio es: ' + data.folio;
      $('#resultado').appendChild(spanElement);
      $('#title').innerHTML = 'Su reporte ha sido recibido y está siendo atendido';
      $('#subtitle').innerHTML = '';
      $('#progress').classList.add('hidden');
      folio = data.folio;
      delete data;
    }
  };

  request.onerror = function() {
    saveForm();
    alert("El servidor no responde intentalo mas tarde.");
  };

  request.send( JSON.stringify( formData ) );
  //form.reset(); //Temporar
  datosFormulario.clear();
  delete formData;
}

// saveFolio: Redirige a 'notifications.html' y pasa el folio del reporte como parametro.
function saveFolio() {
  location.href = "notifications.html?folio=" + folio;
}

// load: Metodo que inicializa todos los eventos y demas acciones.
window.onload = function() {
  $('#telefono').addEventListener( 'keyup', formatPhone );
  $('#saveFolio').addEventListener( 'click', saveFolio );
  $('#dependencia').addEventListener( 'change', function() {
    evalDependencia();
    saveForm();
  });

  document.forms[0].addEventListener( 'keyup', saveForm );
  document.forms[0].addEventListener( 'change', saveForm );
  document.forms[0].addEventListener('submit', sendForm );

  getLocalData();
  evalDependencia();
};