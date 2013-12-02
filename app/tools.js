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
    this.get = function () {
        var data_string = localStorage.getItem(this.name);
        return JSON.parse(data_string);
    }
    this.clear = function () {
        localStorage.setItem(this.name, '[]');
        this.data = [];
    }
    this.data = this.get() || [];
}

var getJSON = function (url, callback, errorCallback) {
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