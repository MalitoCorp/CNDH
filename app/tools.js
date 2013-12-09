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