/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />
angular.module('sampleApp', []).controller('commitList', function ($http) {
    $http.jsonp('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(function (data) {
        var descriptions = data.data.map(function (c) {
            return c.commit.message;
        });
        document.getElementById('results').innerHTML = descriptions.join('<br>');
    });
});
