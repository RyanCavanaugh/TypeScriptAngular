/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />
function commitListController($scope, $http) {
    $http.jsonp('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(function (data) {
        $scope.commits = data.data.map(function (c) {
            return ({
                title: c.commit.message,
                author: c.commit.author.name,
                link: c.commit.html_url
            });
        });
    });
}

angular.module('sampleApp', []).controller('CommitList', commitListController);
