/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />
// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"
angular.module('myApp', []).controller('CommitController', function ($http) {
    $http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK").success(function (data) {
        $('#commits').html(data.data.map(function (c) {
            return c.commit.message;
        }).join('<br>'));
    });
});
