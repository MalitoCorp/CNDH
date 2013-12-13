// form.js
// Mozilians Team - CTIN

// Instancia del objeto db para almacenar datos JSON con LocalStorage
var datosFormulario = new db("datosFormulario");

// formatPhone: Da el formato con guiones al telefono
// params:
//    element: 'Elemento del DOM this'
//    patron: 'Patron del formato'
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

function evalDependencia () {
  var value = $('#dependencia').selectedOptions[0].text;
  $('.opcionDependencia').innerHTML = value;
  if ( value == "Otro" )
    $('.cajaOtro').classList.remove('hidden');
  else
    $('.cajaOtro').classList.add('hidden');
}

function sendForm(event) {
    event.preventDefault();
    var a = formToJSON();
    console.dir(a);
}

// load: Metodo que inicializa todos los eventos y demas acciones.
window.onload = function( ) {
  //Preguntar por que el UPERCASE
  $('#telefono').addEventListener( 'keyup', formatPhone );
  $('#dependencia').addEventListener( 'change', evalDependencia )
  document.forms[0].addEventListener( 'keyup', saveForm );
  document.forms[0].addEventListener( 'change', saveForm );
  document.forms[0].addEventListener('submit', sendForm );

  getLocalData();
  evalDependencia();
};





