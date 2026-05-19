var API = {
  baseURL: 'http://localhost:3000',
  get: function(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.baseURL + url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          cb(null, JSON.parse(xhr.responseText));
        } else {
          cb({status: xhr.status, body: xhr.responseText}, null);
        }
      }
    };
    xhr.send();
  },
  getText: function(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', this.baseURL + url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          cb(null, xhr.responseText);
        } else {
          cb({status: xhr.status, body: xhr.responseText}, null);
        }
      }
    };
    xhr.send();
  },
  post: function(url, data, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.baseURL + url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          cb(null, JSON.parse(xhr.responseText));
        } else {
          cb({status: xhr.status, body: xhr.responseText}, null);
        }
      }
    };
    xhr.send(JSON.stringify(data));
  },
  del: function(url, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', this.baseURL + url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          cb(null, JSON.parse(xhr.responseText));
        } else {
          cb({status: xhr.status, body: xhr.responseText}, null);
        }
      }
    };
    xhr.send(JSON.stringify(body || {}));
  }
};
