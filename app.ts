/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />

function commitListController($scope: any, $http: ng.IHttpService) {
    $http.jsonp<CommitData>('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(data => {
        $scope.commits = data.data.map(c => ({
            title: c.commit.message,
            author: c.commit.author.name,
            link: c.html_url
        }));
    });
}

function messageShortenerFilter() {
    return function (s: string): string {
        var max = 80;
        if (s.length > max) {
            return s.substr(0, max - 3) + '...';
        } else {
            return s;
        }
    }
}

angular.module('sampleApp', [])
    .controller('CommitList', commitListController)
    .filter('shorten', messageShortenerFilter);

