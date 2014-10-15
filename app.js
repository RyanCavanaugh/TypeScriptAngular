/// <reference path="angular.d.ts" />
/// <reference path="angular-route.d.ts" />
/// <reference path="octokit.d.ts" />
var GitHubDataService = (function () {
    function GitHubDataService(http) {
        this.http = http;
    }
    GitHubDataService.prototype.getCommits = function (callback) {
        this.http.jsonp('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(function (data) {
            callback(data.data);
        });
    };

    GitHubDataService.prototype.getUserInfo = function (username, callback) {
        this.http.jsonp('https://api.github.com/users/' + username + '?callback=JSON_CALLBACK').success(function (data) {
            callback(data.data);
        });
    };
    GitHubDataService.Name = 'GitHubData';
    GitHubDataService.Constructor = ['$http', GitHubDataService];
    return GitHubDataService;
})();

var CommitListController;
(function (CommitListController) {
    CommitListController.Constructor = ['$scope', GitHubDataService.Name, Controller];
    function Controller(scope, commitData) {
        commitData.getCommits(function (commits) {
            scope.commits = commits.map(function (c) {
                return ({
                    title: c.commit.message,
                    author: c.commit.author.name,
                    link: c.html_url,
                    authorLink: '#/userView/' + c.author.login
                });
            });
        });
    }
    CommitListController.Controller = Controller;
})(CommitListController || (CommitListController = {}));

var UserInfoController;
(function (UserInfoController) {
    UserInfoController.Constructor = ['$scope', '$routeParams', GitHubDataService.Name, Controller];
    function Controller(scope, params, dataService) {
        dataService.getUserInfo(params.userId, function (data) {
            scope.name = data.name;
            scope.id = data.login;
            scope.picture = data.avatar_url;
        });
    }
    UserInfoController.Controller = Controller;
})(UserInfoController || (UserInfoController = {}));

function messageShortenerFilter() {
    return function (s) {
        var max = 80;
        if (s.length > max) {
            return s.substr(0, max - 3) + '...';
        } else {
            return s;
        }
    };
}

function route($routeProvider) {
    $routeProvider.when('/commitList', { templateUrl: 'commitList.html', controller: 'CommitList' }).when('/userView/:userId', { templateUrl: 'userView.html', controller: 'UserInfo' }).otherwise({ redirectTo: '/commitList' });
}

angular.module('sampleApp', ['ngRoute']).config(route).service(GitHubDataService.Name, GitHubDataService.Constructor).controller('CommitList', CommitListController.Constructor).controller('UserInfo', UserInfoController.Constructor).filter('shorten', messageShortenerFilter);
