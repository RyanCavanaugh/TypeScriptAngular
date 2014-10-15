/// <reference path="angular.d.ts" />

function jsonp(url) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    document.head.appendChild(script);
}

function acceptData(data) {
    var descriptions = data.data.map(function (c) {
        return c.commit.message;
    });
    document.getElementById('results').innerHTML = descriptions.join('<br>');
}

window.onload = function () {
    var url = 'https://api.github.com/repos/Microsoft/TypeScript/commits?callback=acceptData';
    jsonp(url);
};
