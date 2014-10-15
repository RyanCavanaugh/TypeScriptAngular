/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />
function commitListController($scope, CommitData) {
    CommitData.getCommits(function (commits) {
        $scope.commits = commits.map(function (c) {
            return ({
                title: c.commit.message,
                author: c.commit.author.name,
                link: c.html_url
            });
        });
    });
}

function commitDataService($http) {
    return {
        getCommits: function (callback) {
            $http.jsonp('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(function (data) {
                callback(data.data);
            });
        }
    };
}

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

angular.module('sampleApp', []).service('CommitData', commitDataService).controller('CommitList', commitListController).filter('shorten', messageShortenerFilter);
