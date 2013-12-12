// form.js
// Mozilians Team

// Patron para la validacion del Telefono
var patron = new Array(3, 3, 4);

document.forms[0].addEventListener('submit',function(event){
  event.preventDefault();
  var a = formToJSON();
  console.dir(a);
});

// !IMPORTANTE: Esta función se debe optimizar para la siguiente version
// formatPhone: Da el formato con guiones al telefono
// params:
//    element: 'Elemento del DOM this'
//    patron: 'Patron del formato'
function formatPhone(element, patron) {
  if ( element.tempValue != element.value ) {
    var
      val = element.value
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

    element.tempValue = element.value = val;
  }
}

var load = function( ) {

}

window.onload = load;