/// <reference path="angular.d.ts" />
/// <reference path="angular-route.d.ts" />
/// <reference path="octokit.d.ts" />
var CommitDataService = (function () {
    function CommitDataService(http) {
        this.http = http;
    }
    CommitDataService.prototype.getCommits = function (callback) {
        this.http.jsonp('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(function (data) {
            callback(data.data);
        });
    };
    CommitDataService.Name = 'CommitData';
    CommitDataService.Constructor = ['$http', CommitDataService];
    return CommitDataService;
})();

var CommitListController;
(function (CommitListController) {
    CommitListController.Constructor = ['$scope', CommitDataService.Name, Controller];
    function Controller(scope, commitData) {
        commitData.getCommits(function (commits) {
            scope.commits = commits.map(function (c) {
                return ({
                    title: c.commit.message,
                    author: c.commit.author.name,
                    link: c.html_url
                });
            });
        });
    }
    CommitListController.Controller = Controller;
})(CommitListController || (CommitListController = {}));

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
    $routeProvider.when('/commitList', { templateUrl: 'commitList.html', controller: 'CommitList' }).otherwise({ redirectTo: '/commitList' });
}

angular.module('sampleApp', ['ngRoute']).config(route).service(CommitDataService.Name, CommitDataService.Constructor).controller('CommitList', CommitListController.Constructor).filter('shorten', messageShortenerFilter);
