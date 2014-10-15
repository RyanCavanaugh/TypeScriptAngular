/// <reference path="angular.d.ts" />
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
    commitListController.dependencies = ['$scope', CommitDataService.Name];
    commitListController.constructor = commitListController.dependencies.concat(commitListController);
})(commitListController || (commitListController = {}));

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

angular.module('sampleApp', []).service(CommitDataService.Name, CommitDataService.Constructor).controller('CommitList', commitListController.constructor).filter('shorten', messageShortenerFilter);
