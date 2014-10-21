/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />
// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"
function limitFactory() {
    return function (s) {
        if (s.length > 80) {
            return s.substr(0, 77) + '...';
        } else {
            return s;
        }
    };
}

angular.module('myApp', []).controller('CommitController', function ($http, $scope) {
    $http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK").success(function (data) {
        $scope.commits = data.data.map(function (c) {
            return c.commit;
        });
    });
}).controller('IssueController', function ($http, $scope) {
    $http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/issues?callback=JSON_CALLBACK").success(function (data) {
        $scope.issues = data.data;
    });
}).filter('limit', limitFactory);
