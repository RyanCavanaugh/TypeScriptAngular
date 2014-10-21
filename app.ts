/// <reference path="jquery.d.ts" />
/// <reference path="angular.d.ts" />
/// <reference path="octokit.d.ts" />

// "https://api.github.com/repos/Microsoft/TypeScript/issues?callback=?"

angular.module('myApp', [])
    .controller('CommitController', ($http: ng.IHttpService, $scope: any) => {
        $http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/commits?callback=JSON_CALLBACK")
            .success((data: Octokit.CommitQuery) => {
                $scope.commits = data.data.map(c => c.commit);
         });
    })
    .controller('IssueController', ($http: ng.IHttpService, $scope: any) => {
        $http.jsonp("https://api.github.com/repos/Microsoft/TypeScript/issues?callback=JSON_CALLBACK")
            .success((data: Octokit.IssueQuery) => {
                $scope.issues = data.data;
            });
    })
