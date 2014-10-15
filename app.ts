/// <reference path="angular.d.ts" />

function jsonp(url: string) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
}

function acceptData(data) {
    document.getElementById('results').innerText = JSON.stringify(data);
}

window.onload = function () {
    var url = 'https://api.github.com/repos/Microsoft/TypeScript/commits?callback=acceptData';
    jsonp(url);
}

