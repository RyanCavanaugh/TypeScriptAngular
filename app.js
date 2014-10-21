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

var GitHubService = (function () {
    function GitHubService($http) {
        this.$http = $http;
    }
    GitHubService.prototype.getIssues = function (callback) {
        this.$http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/issues?callback=JSON_CALLBACK").success(function (c) {
            return callback(c.data);
        });
    };

    GitHubService.prototype.getCommits = function (callback) {
        this.$http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK").success(function (c) {
            return callback(c.data);
        });
    };
    GitHubService.name = 'GitHubService';
    return GitHubService;
})();

function CommitController(GitHubService, $scope) {
    GitHubService.getCommits(function (data) {
        $scope.commits = data.map(function (c) {
            return c.commit;
        });
    });
}

function IssueController(GitHubService, $scope) {
    GitHubService.getIssues(function (data) {
        $scope.issues = data;
    });
}

angular.module('myApp', []).controller('CommitController', CommitController).controller('IssueController', IssueController).service(GitHubService.name, GitHubService).filter('limit', limitFactory);
