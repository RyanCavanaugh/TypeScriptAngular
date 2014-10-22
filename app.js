/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="angular-route.d.ts" />
/// <reference path="octokit.d.ts" />
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

    GitHubService.prototype.getUser = function (username, callback) {
        this.$http.jsonp("https://api.github.com/users/" + username + "?callback=JSON_CALLBACK").success(function (c) {
            return callback(c.data);
        });
    };
    GitHubService.name = 'GitHubService';
    return GitHubService;
})();

var CommitController;
(function (CommitController) {
    function Controller(GitHubService, $scope) {
        GitHubService.getCommits(function (data) {
            $scope.commits = data;
        });
    }
    CommitController.Controller = Controller;
})(CommitController || (CommitController = {}));

var IssueController;
(function (IssueController) {
    function Controller(GitHubService, $scope) {
        GitHubService.getIssues(function (data) {
            $scope.issues = data;
        });
    }
    IssueController.Controller = Controller;
})(IssueController || (IssueController = {}));

var UserInfoController;
(function (UserInfoController) {
    function Controller($routeParams, GitHubService, $scope) {
        GitHubService.getUser($routeParams.userId, function (user) {
            $scope.user = user;
        });
    }
    UserInfoController.Controller = Controller;
})(UserInfoController || (UserInfoController = {}));

function route($routeProvider) {
    $routeProvider.when('/listing', { templateUrl: 'listing.html', controller: 'CommitController' }).when('/userView/:userId', { templateUrl: 'userView.html', controller: 'UserInfoController' }).otherwise({ redirectTo: '/listing' });
}

angular.module('myApp', ['ngRoute']).config(route).controller('CommitController', CommitController.Controller).controller('UserInfoController', UserInfoController.Controller).controller('IssueController', IssueController.Controller).service(GitHubService.name, GitHubService).filter('limit', limitFactory);
