// Mozillians-CTIM Team
// Nobiembre 2013
// Github: https://raw.github.com/MalitoCorp/CNDH/master/app/js/tools.js

// $: cache del metodo querySelector
window.$ = document.querySelector.bind(document);

// db: Clase para el almacenamiento de objetos JSON en localStorage.
// params:
//      _name: 'String' con el nombre de la colección.
// method:
//  length: devuelve el tamaño de la colección.
//  set:
//    params:
//      _data: Recibe un objeto y lo almacena.
//  _get(privado): Devuelve un array con todos los elementos de la colección.
//  clear: Limpia la colección.
//  data:  Envoltorio del metodo get que devuelve nulo en caso de error.
function db(_name) {
  this.name = _name;

  this.length = function () {
    return this.data.length;
  }
  this.set = function (_data) {
    this.data.push(_data);
    var data_string = JSON.stringify(this.data);
    localStorage.setItem(this.name, data_string);
  }
  this._get = function () {
    var data_string = localStorage.getItem(this.name);
    return JSON.parse(data_string);
  }
  this.clear = function () {
    localStorage.setItem(this.name, '[]');
    this.data = [];
  }
  this.data = this._get() || [];
}

// Get JSON: Descargar un Archivo JSON de manera asincrona.
// params:
//    url: URL del archivo JSON
//    callback: función callback (se pasa como parametro el objeto JSON descargado)
//    error: funcion que se ejecuta en caso de error al descargar el archivo.
var getJSON = function (url, callback, error) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'json';
  xhr.onload = function () {
    var status = xhr.status;
    if (status == 200) {
      callback && callback(xhr.response);
    } else {
      error && error(status);
    }
  };
  xhr.send();
};

// getURLParameter: Devuelve un objeto con todos los parametros get.
// return: Objeto JSON
function getURLParameter(name) {
    return decodeURIComponent(
        (location.search.match(RegExp("[?|&]"+name+'=(.+?)(&|$)'))||[,null])[1]
    );
}

// formToJSON: Encapsula el formulario en un objeto JSOM
// params: un objeto DOM o vacio para el primer formulario del documento
// return: un objeto JSON con el contenido del formulario
function formToJSON( form ) {
  form = document.querySelector( form ) || document.forms[0];
  var elems = form.elements;
  var i, len = elems.length;
  var jsonForm = {};
  
  for( i = 0 ; i < len ; i++ ) {
  
    var element = elems[i];
    var type = element.type;
    var name = element.name;
    var value = element.value;
    
    switch(type) {
      case 'color':
      case 'date':
      case 'datetime':
      case 'datetime-local':
      case 'email':
      case 'month':
      case 'number':
      case 'range':
      case 'search':
      case 'tel':
      case 'time':
      case 'url':
      case 'week':
      case 'text':
      case 'radio':
      case 'tel':
      case 'textarea':
      case 'select-one':
        jsonForm[ name ] = value;
      break;
      case 'checkbox':
        if ( element.checked )
          jsonForm[ name ] = value;
      break;
      default: break;
    }
  }
  return jsonForm;
}