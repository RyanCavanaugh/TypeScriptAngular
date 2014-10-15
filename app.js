/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />

function commitListController($scope, commitData) {
    commitData.getCommits(function (commits) {
        $scope.commits = commits.map(function (c) {
            return ({
                title: c.commit.message,
                author: c.commit.author.name,
                link: c.html_url
            });
        });
    });
}
var commitListController;
(function (commitListController) {
    commitListController.dependencies = ['$scope', commitDataService.ServiceName];
    commitListController.constructor = commitListController.dependencies.concat(commitListController);
})(commitListController || (commitListController = {}));

function commitDataService($http) {
    return {
        getCommits: function (callback) {
            $http.jsonp('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(function (data) {
                callback(data.data);
            });
        }
    };
}
var commitDataService;
(function (commitDataService) {
    commitDataService.ServiceName = 'CommitData';
})(commitDataService || (commitDataService = {}));

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

angular.module('sampleApp', []).service(commitDataService.ServiceName, commitDataService).controller('CommitList', commitListController.constructor).filter('shorten', messageShortenerFilter);
