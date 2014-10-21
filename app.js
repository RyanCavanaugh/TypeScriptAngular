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

angular.module('myApp', []).controller('CommitController', function (GitHubService, $scope) {
    GitHubService.getCommits(function (data) {
        $scope.commits = data.map(function (c) {
            return c.commit;
        });
    });
}).controller('IssueController', function (GitHubService, $scope) {
    GitHubService.getIssues(function (data) {
        $scope.issues = data;
    });
}).service('GitHubService', function ($http) {
    function getIssues(callback) {
        $http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/issues?callback=JSON_CALLBACK").success(function (c) {
            return callback(c.data);
        });
    }
    function getCommits(callback) {
        $http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK").success(function (c) {
            return callback(c.data);
        });
    }
    return { getIssues: getIssues, getCommits: getCommits };
}).filter('limit', limitFactory);
