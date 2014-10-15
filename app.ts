/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />

function commitListController($http: ng.IHttpService) {
    $http.jsonp<CommitData>('https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK').success(data => {
        var descriptions: string[] = data.data.map(c => c.commit.message);
        document.getElementById('results').innerHTML = descriptions.join('<br>');
    });
}

angular.module('sampleApp', [])
    .controller('CommitList', commitListController);

